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
import { useProModel } from "@/app/hooks/use-pro-model"
import toast from "react-hot-toast"


const Videopage = () => {
    const proModel = useProModel()
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
                        <Empty label={"No video Started"} />
                    )}
                   {video && (
                       <video className="w-full aspect-video mt-8 border bg-black" controls>
                        <source src={video}/>
                       </video>
                   )}
                </div>
            </div>
        </div>
    )
}

export default Videopage
