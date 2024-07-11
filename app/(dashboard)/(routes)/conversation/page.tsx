"use client"
import { Headings } from "@/components/headings"
import { Form } from "@/components/ui/form"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const ConversationPage =  () => {
    const form = useForm({
        defaultValues: {
            prompt: "",
        }
    });

    return (
        <div>
            <Headings 
            title="Conversation"
             description="Our Most Advance Conversation"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"/>
            <div className="px-4 lg:px-8 text-center">
                
            </div>
        </div>
    )

}
export default ConversationPage