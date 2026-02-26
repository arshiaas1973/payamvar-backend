#!/bin/sh
set -e

mkdir -p /etc/trino /etc/trino/catalog

cp /trino-init/config.properties /etc/trino/config.properties
cp /trino-init/jvm.config /etc/trino/jvm.config
cp /trino-init/node.properties /etc/trino/node.properties
cp /trino-init/cassandra.properties /etc/trino/catalog/cassandra.properties

echo "Trino config initialized."
