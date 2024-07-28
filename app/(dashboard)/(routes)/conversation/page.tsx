"use client"
import axios from "axios"
import * as z from "zod"
import { Headings } from "@/components/headings"
import { Code, Divide, MessageSquare } from "lucide-react"
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
import ReactMarkdown from "react-markdown";
import { useProModel } from "@/app/hooks/use-pro-model"
import toast from "react-hot-toast"

const Codepage = () => {
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
            const userMessage = {
               role: "user",
               content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages,
            })

            const botMessage = {
                role: "model",
                content: response.data.content,
            };

            setMessages((current) => [...current, userMessage, botMessage]);
            form.reset();
        } catch (e: any) {
            if(e?.response?.status === 403)  {
                proModel.onOpen();
           } else {
            toast.error("We don't have API credits left. Try after some time.")
         }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Headings 
                title="Conversation"
                description="Chat with our advance chat bot"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
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
                                                {...field}
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Simple sidebar component using shadcn ⇒"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                           <Button className="col-span-3 lg:col-span-2 w-full" 
                           disabled={isLoading}
                           >
                                 Generate
                           </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                     <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                       <Loader />
                        </div>
                    )}
                    {messages.length ===  0 && !isLoading && (
                        <Empty label={"No Conversation Started"} />
                    )}
                   <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                        <div 
                        key={message.content}
                        className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg ", message.role === "user" ? "bg-white border border-black/10": "bg-muted")}
                        >
                            {message.role === "user" ? <UserAvater /> : <BotAvater />}
                           <ReactMarkdown components= {{
                                pre: ({node , ...props}) => (
                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">  
                                    <pre {...props} />     
                                    </div>
                                ),
                                code: ({node , ...props}) => (
                                    <code  className="bg-black/10 rounded-lg p-1 " {...props}/>
                                )
                           }} className="text-sm overflow-hidden leading-7"
                           >
                              {message.content || ""}
                           </ReactMarkdown>
                        </div>
                    ))}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Codepage;
