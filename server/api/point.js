// import { PrismaClient } from "@prisma/client"

// export default defineEventHandler(async (event) => {
 
// const prisma = new PrismaClient();
 
// // 查询数据
// const users = await prisma.user.findMany();
// return users
// })


import mysql from 'mysql2/promise';


export default defineEventHandler(async (nuxtApp) => {
    // 创建 MySQL 连接配置
    const env = process.env
    const connectionConfig = {
        host: env.db_host,
        user: env.db_user,
        password: env.db_password,
        database: env.db_database,
        port: env.db_port,
    };
    // 异步函数用于初始化数据库连接
    try {
        // 使用 mysql2/promise 创建连接
        let connection = await mysql.createConnection(connectionConfig);
        console.log('Connected!');

        try {
            let sql = 'select * from user';
            const results = await connection.query(sql)
            console.log(results[0])
            connection.end()
            return results[0]
        } catch(e) {
            console.error(e);
        }
        
    } catch (err) {
        console.error('Error initializing database connection:', err);
    }
});