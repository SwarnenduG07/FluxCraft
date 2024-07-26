"use client"
import axios from "axios"
import * as z from "zod"
import { Headings } from "@/components/headings"
import { Image, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Music = () => {
    const proModel = useProModel()
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution:"512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            const response = await axios.post("/api/image",values);

         const urls = response.data.map(( image: {url : string}) =>  image.url)
         setImages(urls)
            
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
                         <FormField 
                         control={form.control}
                          name="amount"
                          render={( { field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                               <Select 
                               disabled={isLoading}
                               onValueChange={field.onChange}
                               value={field.value}
                               defaultValue={field.value}
                               >
                             <FormControl>
                                <SelectTrigger>
                                     <SelectValue defaultValue={field.value}/>
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {amountOptions.map((option) => (
                                        <SelectItem 
                                        key={option.value}
                                        value={option.value}
                                        >
                                         {option.lable}
                                        </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                            </FormItem> 
                          )}
                         
                         />
                         <FormField 
                         control={form.control}
                          name="resolution"
                          render={( { field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                               <Select 
                               disabled={isLoading}
                               onValueChange={field.onChange}
                               value={field.value}
                               defaultValue={field.value}
                               >
                             <FormControl>
                                <SelectTrigger>
                                     <SelectValue defaultValue={field.value}/>
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {resolutionOptions.map((option) => (
                                        <SelectItem 
                                        value={option.value}
                                        key={option.value}
                                        >
                                         {option.lable}
                                        </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
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
                     <div className="p-20">
                       <Loader />
                        </div>
                    )}
                    {images.length ===  0 && !isLoading && (
                        <Empty label={"No Image generated"} />
                    )}
                  <div>
                      Image will be generated
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Music
