// import mysql from 'mysql2/promise';

// export default defineNuxtPlugin(async (nuxtApp) => {
//   // 创建 MySQL 连接配置
//   const connectionConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: 'hch123456',
//     database: 'flux',
//     port: 3306,
//   };
//   // 异步函数用于初始化数据库连接
//   // async function getConnection() {
//     try {
//       // 使用 mysql2/promise 创建连接
//       let connection = await mysql.createPool(connectionConfig);
//       nuxtApp.provide('db',connection);
//       // console.log('Database connection initialized:', connection);
//       console.log('Connected!');

//       try {
//         let sql = 'select * from user';
//         connection.query(sql).then(results => {
//           console.log('Results:', results[0]);
//         })
//         .catch(error => {
//           console.error('Query error', error);
//         });
//       } catch(e) {
//         console.error(e);
//       }
     
//     } catch (err) {
//       // nuxtApp.provide('db1',connection);
//       console.error('Error initializing database connection:', err);
//     }
//   // }

  


// });