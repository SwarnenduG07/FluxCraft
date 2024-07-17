import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

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
        
        const response = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { 
            input: {
                prompt: prompt,
                model_version: "stereo-large",
                output_format: "mp3",
                normalization_strategy: "peak"
            }
         });
        return NextResponse.json({audio: response})
    } catch (e: any) {
        console.log("Music Error", e);
        return new NextResponse("Internal errorr", { status: 500 });
    }
}
