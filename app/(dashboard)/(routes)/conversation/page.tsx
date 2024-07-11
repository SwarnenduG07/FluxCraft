import { Headings } from "@/components/headings"
import { MessageSquare } from "lucide-react"


const ConversationPage =  () => {
    return (
        <div>
            <Headings 
            title="Conversation"
             description="our Most advance conversation"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"/>
        </div>
    )

}
export default ConversationPage