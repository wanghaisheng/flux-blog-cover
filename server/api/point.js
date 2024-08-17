import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
 
const prisma = new PrismaClient();
 
// 查询数据
const users = await prisma.user.findMany();
return users
})
