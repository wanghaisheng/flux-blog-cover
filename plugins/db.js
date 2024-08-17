import mysql from 'mysql2/promise';

export default defineNuxtPlugin((nuxtApp) => {
  // 创建 MySQL 连接配置
  const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'hch123456',
    database: 'flux',
    port: 3306,
  };

  // 异步函数用于初始化数据库连接
  async function getConnection() {
    try {
      // 使用 mysql2/promise 创建连接
      const connection = await mysql.createConnection(connectionConfig);
      console.log('Database connection initialized:', connection);
      nuxtApp.provide('db', connection);
      console.log('Connected!');
    } catch (err) {
      console.error('Error initializing database connection:', err);
    }
  }

  setTimeout(getConnection, 0)


});