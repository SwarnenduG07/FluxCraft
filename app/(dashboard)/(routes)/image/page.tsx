"use client"
import axios from "axios"
import * as z from "zod"
import { Headings } from "@/components/headings"
import { Download, ImageIcon } from "lucide-react"
import Image from 'next/image'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { amountOptions, formSchema, modelsOptions, resolutionOptions } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { useProModel } from "@/app/hooks/use-pro-model"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"

const Music = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
            models: modelsOptions[0].value
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);
            const base64Img = await response.data.image;
            const imageUrl = `data:image/png;base64,${base64Img}`;
            setImages([imageUrl]);  // Assuming you're getting a single image

            form.reset();
        } catch (e: any) {
            if (e?.response?.status === 403) {
                proModel.onOpen();
            } else {
                toast.error("API Cradit's are ended Plsese wait and Try after sometime");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Headings
                title="Image"
                description="Our Most Advanced Image Generation Model"
                icon={ImageIcon}
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="p-0 m-0">
                                            <Input
                                                {...field}
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Generate an image of a man sitting on a horse ⇒"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
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
                                name="models"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {modelsOptions.map((option) => (
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
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
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
                               >
                                Generate
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
                    {images.length === 0 && !isLoading && (
                        <Empty label={"No Image generated"} />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:ml-72 xl:pl-20 mt-10">
                        {images.map((src) => (
                            <Card key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Generated Image"
                                        fill
                                        src={src}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button
                                        onClick={() => window.open(src)}
                                        variant="secondary"
                                        className="w-full">
                                          
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music;
