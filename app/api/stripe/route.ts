import { auth , currentUser} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { ablosuteUrl } from "@/lib/utils";


const settingsUrl = ablosuteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();

        const user = await currentUser();
          
        if (!userId || !user) {
             return new NextResponse("unauthorized", {status: 401});
        }
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if(userSubscription &&  userSubscription.stripCustomerId) {
             const stripeSession = await stripe.billingPortal.sessions.create({
                customer:userSubscription.stripCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({url : stripeSession.url, status: 200}));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "FluxCraft Pro",
                            description: "Unlimited AI Generation",
                        },
                        unit_amount: 1000,
                        recurring: {
                            interval: "month",
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId
            }
        })

        return new NextResponse(JSON.stringify({url: stripeSession.url}))

    } catch (e) {
       console.log("STRIPE ERROR",e);
       return new NextResponse("Internal Error", {status: 500});
       
    }
}