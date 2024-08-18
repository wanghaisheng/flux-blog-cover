// import { PrismaClient } from "@prisma/client"

// export default defineEventHandler(async (event) => {
 
// const prisma = new PrismaClient();
 
// // 查询数据
// const users = await prisma.user.findMany();
// return users
// })


import connection from '../utils/db';


export default defineEventHandler(async (nuxtApp) => {
    try {
        let sql = 'select * from user';
        const results = await connection.query(sql)
        console.log(results[0])
        // connection.end()
        return results[0]
    } catch(e) {
        console.error(e);
    }
});