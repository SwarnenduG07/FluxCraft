import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import  { checkApiLimit ,increseApiLimit } from "@/lib/api-limit";
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

        if  (!free) {
            return new NextResponse("Feww trial has expired", { status: 403 });
        }
        
        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { 
            input: {
                    fps: 24,
                    width: 1024,
                    height: 576,
                    prompt: prompt,
                    guidance_scale: 17.5,
                    negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
            }
         });

         await increseApiLimit()
        return NextResponse.json(response)
    } catch (e: any) {
        console.log("Video Error", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
