"use client"
import axios from "axios"
import * as z from "zod"
import { Headings } from "@/components/headings"
import { Image, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvater } from "@/components/user-avater"
import { BotAvater } from "@/components/bot-avater"
import { useProModel } from "@/app/hooks/use-pro-model"
import toast from "react-hot-toast"

const Music = () => {
    const proModel = useProModel()
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: any = {
               role : "user",
               content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            })
            setMessages((current) => [...current, userMessage, response.data]);
           form.reset();
        } catch (e: any) {
           if(e?.response?.status === 403)  {
                proModel.onOpen();
           } else {
              toast.error("We don't have API cradit's left.Try after some time")
           }
           
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Headings 
                title="Image"
                description="Our Most Advanced Image Generation Model "
                icon={Image}
                iconColor="text-pink-500"
                bgColor="bg-pink-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField 
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="p-0 m-0">
                                            <Input 
                                                {...field} // Bind field properties to the input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Generate A image of a Man setting on a Horse ⇒"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                           <Button className="col-span-3 lg:col-span-2 w-full" 
                           disabled={isLoading}
                           variant="premium"
                           >
                                 Genarate
                           </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                     <div className="p-8 rounded-lg w-full floex items-center justify-center bg-muted">
                       <Loader />
                        </div>
                    )}
                    {messages.length ===  0 && !isLoading && (
                        <Empty label={"No Image generated"} />
                    )}
                   <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                        <div 
                        key={message.content}
                        className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10": "bg-muted")}
                        >
                            {message.role === "user" ? <UserAvater /> : <BotAvater />}
                            <p className="text-sm">
                              {message.content}
                            </p>
                        </div>
                    ))}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Music
