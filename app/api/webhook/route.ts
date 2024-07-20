import Stripe from "stripe";
import { headers } from "next/headers";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { Fullscreen } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signatire") as string;

    let event: Stripe.Event;

    try {
       event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ""
       )
    } catch(e: any) {
          console.log(e);
        return new NextResponse(`Webhook Error: ${e.message}`, {status: 200});
    } 
    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed") {
        const subscription= await stripe.subscriptions.retrieve(
            session.subscription as string
        )
    if (!session?.metadata?.userId) {
      return new NextResponse("User Id is required", {status: 400})
       }
       await prismadb.userSubscription.create({
        data: {
            userId: session?.metadata?.userId,
            stripeSubcriptionId: subscription.id,
            stripCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end* 1000
            ),
           },
       });
    }
     if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
        );
        await prismadb.userSubscription.update({
            where: {
                stripeSubcriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        });
     }
     return new NextResponse(null, {status: 200})
}