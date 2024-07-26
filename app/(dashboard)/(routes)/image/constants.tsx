import * as z from "zod";

export const formSchema = z.object({
     prompt: z.string().min(1, {
        message: "Image Prompt is required"
     }),
     amount: z.string().min(1),
     resolution: z.string().min(1)
});
export const amountOptions = [
   {
      value: "1",
      lable:"1 Photo"
   },
   {
      value: "2",
      lable: "2 Photo"
   },
   {
      value: "3",
      lable:"3 photos"
   },
   {
      value: "4",
      lable:"4 photos"
   }
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