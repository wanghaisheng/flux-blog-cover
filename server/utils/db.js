import mysql from 'mysql2/promise';

// 创建一个连接池，可以在整个应用程序中复用

const {env} = process

const connection = mysql.createPool({
    host: env.db_host,
    user: env.db_user,
    password: env.db_password,
    database: env.db_database,
    port: env.db_port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;