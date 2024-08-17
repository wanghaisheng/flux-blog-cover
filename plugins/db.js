import mysql from 'mysql2'
console.log(mysql)
export default defineNuxtPlugin((nuxtApp) => {
    // 创建 MySQL 连接
    const connection = mysql.createConnection({
        host: "127.0.0.1", //服务器地址
        user: "root",
        password: "hch123456", //密码
        database: "flux",
    });
    console.log(connection)
    connection.connect(err => {
        if (err) throw err;
        console.log('Connected!');
    });
    nuxtApp.provide('db', connection)
})
