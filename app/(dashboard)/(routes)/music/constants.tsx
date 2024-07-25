import { Label } from "@radix-ui/react-dropdown-menu";
import * as z from "zod";

export const formSchema = z.object({
     prompt: z.string().min(1, {
        message: "Music Prompt is required"
     }),
     amount: z.string().min(1),
     resolution: z.string().min(1)
});
export const authOptions = [
   {
      value: "1",
      Label: "1 Photo"
   },
   {
      value: "2",
      Label:"2 Photo"
   },
   {
      value: "3",
      lable:"3 Photo"
   },
   {
      value: "4",
      lable: "4 Photo"
   }
]

 export const resolutionOptions =[
    {
       value : "256x256",
       lable:"256x256"
    },
    {
      value: "512x512",
      Label: "512x512",
    },
    {
      value: "1024x1024",
      lable:"1024x1024"
    }
 ]