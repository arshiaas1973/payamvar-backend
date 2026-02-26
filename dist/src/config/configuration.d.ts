declare const _default: () => {
    port: number;
    database: {
        sql: {
            host: string;
            database: string;
            user: string;
            password: string;
            port: number;
        };
        nosql: {
            cassandra: {
                host: string;
                keyspace: string;
                user: string;
                password: string;
                port: number;
            };
        };
    };
    grpc: {
        url: string;
    };
    origins: {
        frontend: string;
    };
};
export default _default;
