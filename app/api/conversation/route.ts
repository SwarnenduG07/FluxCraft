import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

require("dotenv").config();
import { google } from "@ai-sdk/google"
import { generateText } from 'ai';


export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }
    
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await generateText({
            model: google('models/gemini-1.5-flash-latest'),
            messages: [{ role: "user", 
                content: "You are a chatbot.Your answers should be precise & and simple. so that everyon can " , ...messages
            }],
          });
          return NextResponse.json(response);
    } catch (e: any) {
        console.log("Conversation Error", e);
        return new NextResponse("Internal errorr", { status: 500 });
    }
}
