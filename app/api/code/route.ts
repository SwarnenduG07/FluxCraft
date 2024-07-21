import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
require("dotenv").config();

import  { checkApiLimit ,increseApiLimit } from "@/lib/api-limit";
import { checkSubscribtion } from "@/lib/subscription";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }
        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        
        const free = await checkApiLimit()
        const isPro = checkSubscribtion();

        if  (!free && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            messages: [{ role: "system", 
                content: "You are a a code generator. You must answer only in markdown code snippets.Use cpde comments for explanations." , ...messages
            }],
            model: "gpt-3.5-turbo",
        });
         
        if (!isPro) {
            await increseApiLimit();
            }

        return NextResponse.json(response.choices[0].message);

    } catch (e: any) {
        console.log("Code Error", e);

        if (e.response && e.response.status === 429) {
            return new NextResponse("Rate limit exceeded. Please check your OpenAI quota.", { status: 429 });
        }

        return new NextResponse("Internal errorr", { status: 500 });
    }
}
