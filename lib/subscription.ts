import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 80_400_000;

export const checkSubscribtion = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId,
        },
        select: {
            stripeSubcriptionId: true,
            stripCustomerId: true,
            stripeCurrentPeriodEnd: true,
            stripePriceId: true,
        }
    })
    if (!userSubscription) {
        return false;
    }
    const isValid = userSubscription.stripePriceId && 
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    return !!isValid;
}