import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

require("dotenv").config();

import { checkApiLimit, increseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const GenAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!process.env.GOOGLE_API_KEY) {
            return new NextResponse("Google API key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        
        const free = await checkApiLimit();
        const isPro = checkSubscription();

        if (!free && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const model = GenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Can you help me create a React component that displays a list of items?" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Sure! Here's a React component that displays a list of items." }],
                },
                {
                    role: "user",
                    parts: [{ text: "How do I style this component using Tailwind CSS?" }],
                },
                {
                    role: "model",
                    parts: [{ text: "You can style the component using Tailwind CSS classes like this:" }],
                }
            ],
            generationConfig: { maxOutputTokens: 500 },
        });

        if (!isPro) {
            await increseApiLimit();
        }

        const userMessage = messages[messages.length - 1].content;
        const result = await model.generateContentStream(userMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ content: text });

    } catch (e: any) {
        console.log("Code Error", e);

        if (e.response && e.response.status === 429) {
            return new NextResponse("Rate limit exceeded. Please check your API quota.", { status: 429 });
        }

        return new NextResponse("Internal error", { status: 500 });
    }
}
