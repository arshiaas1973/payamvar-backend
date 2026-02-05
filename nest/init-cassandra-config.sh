#!/bin/bash
set -e

CONFIG_FILE="/etc/cassandra/cassandra.yaml"

echo "🔧 Setting up cassandra.yaml for ${HOSTNAME}..."

# Common settings for all nodes
sed -i "s/^cluster_name:.*/cluster_name: '${CASSANDRA_CLUSTER_NAME}'/" "$CONFIG_FILE"
sed -i "s/^authenticator:.*/authenticator: ${CASSANDRA_AUTHENTICATOR}/" "$CONFIG_FILE"
sed -i "s/^authorizer:.*/authorizer: ${CASSANDRA_AUTHORIZER}/" "$CONFIG_FILE"
sed -i "s/- seeds:.*/- seeds: \"${CASSANDRA_SEEDS}\"/" "$CONFIG_FILE"

# Start Cassandra in background
echo "🚀 Starting Cassandra..."
docker-entrypoint.sh cassandra -f &

if [[ "$HOSTNAME" == "nest-main-nosql-instance-1" ]]; then
  echo "🧠 This is the seed node — initializing keyspace and user..."

  # Wait for Cassandra ready
  until cqlsh "$HOSTNAME" 9042 -u cassandra -p cassandra -e "DESCRIBE KEYSPACES;" >/dev/null 2>&1; do
    echo "⏳ Waiting for Cassandra to start..."
    sleep 5
  done

  echo "✅ Cassandra up. Creating keyspace and user..."

  cqlsh -u cassandra -p cassandra <<EOF
CREATE KEYSPACE IF NOT EXISTS ${CASSANDRA_KEYSPACE}
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': ${CASSANDRA_REPLICATION_FACTOR}};
EOF

  cqlsh -u cassandra -p cassandra <<EOF
CREATE ROLE IF NOT EXISTS ${CASSANDRA_USERNAME}
WITH PASSWORD = '${CASSANDRA_PASSWORD}'
AND LOGIN = true;
GRANT ALL PERMISSIONS ON KEYSPACE ${CASSANDRA_KEYSPACE} TO ${CASSANDRA_USERNAME};
ALTER ROLE cassandra WITH PASSWORD = '${CASSANDRA_DEFAULT_PASSWORD}' AND LOGIN = false;
EOF

  echo "✅ Initialization complete."
else
  echo "📡 Non-seed node, joining cluster at ${CASSANDRA_SEEDS}"
fi

# Keep process alive
wait
