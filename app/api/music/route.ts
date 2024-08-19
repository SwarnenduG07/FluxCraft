import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import  { checkApiLimit ,increseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
require("dotenv").config();

 const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
 })


export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }
    
        if (!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }
        const free = await checkApiLimit()
        const isPro = checkSubscription();

        if  (!free && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        
        const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { 
            input: {
                prompt: prompt,
                model_version: "stereo-large",
                output_format: "mp3",
                normalization_strategy: "peak"
            }
         });
         if (!isPro) {
            await increseApiLimit();
            }
         
        return NextResponse.json({audio: response})
    } catch (e: any) {
        console.log("Music Error", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
