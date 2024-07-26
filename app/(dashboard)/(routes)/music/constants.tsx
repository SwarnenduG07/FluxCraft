import { Label } from "@radix-ui/react-dropdown-menu";
import * as z from "zod";

export const formSchema = z.object({
     prompt: z.string().min(1, {
        message: "Music Prompt is required"
     }),
})