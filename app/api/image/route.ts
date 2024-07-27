import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

require("dotenv").config();
import { checkApiLimit, increseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const free = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!free && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY_II}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error(`Hugging Face API error: ${response.statusText}`, errorDetails);
            return new NextResponse("Error generating image", { status: response.status });
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64'); 
    
        if (!isPro) {
            await increseApiLimit();
            }

        return NextResponse.json({ image: base64Image }, {
            headers: { "Content-Type": "application/json" },
        });
    } catch (e: any) {
        console.error("Image generation error:", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
