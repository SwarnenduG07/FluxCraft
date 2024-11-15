import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkApiLimit, increseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

require("dotenv").config();


interface RequestBody {
    prompt: string;
    models: string; 
}

// Define the structure of the error response from Hugging Face API
interface ErrorResponse {
    error: {
        code: string;
        message: string;
    };
}

function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number = 10000
): Promise<Response> {
    return Promise.race([
        fetch(url, options),
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
}
const modelUrl = {
    "RealV-Mk-1": "https://api-inference.huggingface.co/models/DiegoJR1973/NSFW-TrioHMH-Flux",
    "Stable-diffusion-3-M": "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo",
    "Flux V1": "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    "Lora- M1": "https://api-inference.huggingface.co/models/prithivMLmods/Fashion-Hut-Modeling-LoRA"
   
};

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body: RequestBody = await req.json();
        const { prompt, models } = body;

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!models) {
            return new NextResponse("Model URL is required", { status: 400 });
        }

        const free = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!free && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const timeoutDuration = 60000; // 60 seconds

        const response = await fetchWithTimeout(
            models,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY_II}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt ,modelUrl }),
            },
            timeoutDuration
        );

        if (!response.ok) {
            const errorDetails: ErrorResponse = await response.json();
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
        if (e.message === 'Request timed out') {
            return new NextResponse("Request timed out", { status: 504 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
