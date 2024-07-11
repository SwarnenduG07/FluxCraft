"use client"
import { Headings } from "@/components/headings"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <div>
            <Headings 
                title="Conversation"
                description="Our Most Advanced Conversation"
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
                                                {...field} // Bind field properties to the input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                           <Button className="col-span-2 lg:col-span-2 w-full" disabled={isLoading}>
                                 Genarate
                           </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                   Messages content
                </div>
            </div>
        </div>
    )
}

export default ConversationPage
