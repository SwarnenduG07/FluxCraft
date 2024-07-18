
 import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";
 import { MAX_FREE_COUNTS } from "@/constants";

 export const increseApiLimit = async () => {
     const {  userId } =  auth();
      
     if (!userId) {
        return;
     }
     const userApiLimit = await prismadb.userAPI.findUnique({
        where: {
            userId
        }
     });
     if (userApiLimit) {
        await prismadb.userAPI.update({
            where: {userId: userId},
            data: {count: userApiLimit.count + 1 }
        })
     } else {
        await prismadb.userAPI.create({
            data: {userId: userId, count: 1},
        })
     }
 };
export const checkApiLimit = async () => {
    const { userId } = auth();
     if (!userId) {
        return false
     }
     
     const  userApiLimit = await prismadb.userAPI.findUnique({
        where:{
            userId: userId
        }
     });

     if (!userApiLimit  || userApiLimit.count <MAX_FREE_COUNTS) {
        return true
     } else {
        return false
     }
};
