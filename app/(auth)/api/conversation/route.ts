import { auth } from "@clerk/nextjs/server";
import next from "next";
import { NextResponse } from "next/server";
import {  OpenAI } from "openai"
require ("dotenv").config();

 const openAiClient = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
 })

 export async function POST(req: Request, res: Response) {
     try {
        const {userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("UnAuthorized",{status:401});
        }
        if (!openAiClient) {
            return new NextResponse("OpenAI Api key not configured",{status:500});
        }
        if(!messages){
            return new NextResponse("Messages are required",{status:400})
        }
        const response = await openAiClient.chat.completions.create({
           model: "gpt-3.5-turbo",
           messages,
        })
        return NextResponse.json(response.choices[0].message)
     } catch (e) {
        console.log(e);
        return new NextResponse("Internal error", {status: 500})
     }
 }

 


