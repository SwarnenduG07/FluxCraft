import { Value } from "@radix-ui/react-select";
import * as z from "zod";

export const formSchema = z.object({
     prompt: z.string().min(1, {
        message: "Image Prompt is required"
     }),
     amount: z.string().min(1),
     resolution: z.string().min(1),
     models: z.string().min(1),
});
export const amountOptions = [
   {
      value: "1",
      lable:"1 Photo"
   },
]

 export const resolutionOptions =[

   {
      value:"256x256",
      lable:"256x256"
   },
    {
      value: "512x512",
      lable:"512x512"
    },
    {
      value: "1024x1024",
      lable:"1024x1024"
    }
 ]

 export const modelsOptions = [
    {
       value:"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large-turbo",
       lable:"Model-> Stable-diffusion-3-M"
    },
   {
      value: "https://api-inference.huggingface.co/models/DiegoJR1973/NSFW-TrioHMH-Flux",
      lable: "RealV-Mk-1"
   },
   {
      value: "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      lable: "Flux V1"
   },
   {
      value: "https://api-inference.huggingface.co/models/prithivMLmods/Fashion-Hut-Modeling-LoRA",
      lable: "Lora-V1"
   },
 ]