 "use client"
import axios from "axios"
import * as z from "zod"
import { Headings } from "@/components/headings"
import { MessageSquare, MusicIcon, VideoIcon } from "lucide-react"
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


const Videopage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values)
            setVideo(response.data.audio)
           form.reset();
        } catch (e: any) {
            //TODO: I will add premium model
            console.log(e);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Headings 
                title="Video Generation"
                description="Our Most Advanced Videp Generator"
                icon={VideoIcon}
                iconColor="text-sky-500"
                bgColor="bg-sky-500/10"
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
                                                placeholder="Clown fish swimming around a coral reef ⇒"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                           <Button className="col-span-3 lg:col-span-2 w-full" 
                       
                           disabled={isLoading}>
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
                    { !video && !isLoading && (
                        <Empty label={"No Music Started"} />
                    )}
                   {video && (
                       <audio controls className="w-full mt-8">
                          <source src= {video}/>
                       </audio>
                   )}
                </div>
            </div>
        </div>
    )
}

export default Videopage
