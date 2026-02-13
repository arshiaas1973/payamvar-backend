
export default () => ({
  port: parseInt(process.env.PORT ?? "3000", 10) || 3000,
  database: {
    sql: {
      host: process.env.PSQL_HOST || "127.0.0.1",
      database: process.env.POSTGRES_DB || "database",
      user: process.env.POSTGRES_USER || "username",
      password: process.env.POSTGRES_PASSWORD || "password",
      port: parseInt(process.env.PSQL_PORT ?? "5432", 10) || 5432,
    },
    nosql: {
      cassandra: {
        host: process.env.CASSANDRA_HOST || "127.0.0.1",
        keyspace: process.env.CASSANDRA_KEYSPACE || "keyspace",
        user: process.env.CASSANDRA_USERNAME || "username",
        password: process.env.CASSANDRA_PASSWORD || "password",
        port: parseInt(process.env.CASSANDRA_PORT ?? "9042", 10) || 9042,
      },
    },
  },
  grpc: {
    url: process.env.GRPC_URL || 'localhost:50051',
  },
  origins:{
    frontend: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  }
});
