import { auth } from "@clerk/nextjs/server";
import next from "next";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
require("dotenv").config();

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

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages 
        });

        return NextResponse.json(response.choices[0].message);

    } catch (e: any) {
        console.log("Error", e);

        if (e.response && e.response.status === 429) {
            return new NextResponse("Rate limit exceeded. Please check your OpenAI quota.", { status: 429 });
        }

        return new NextResponse("Internal errorr", { status: 500 });
    }
}
