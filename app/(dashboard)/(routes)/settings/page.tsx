import { Headings } from "@/components/headings"
import { SubsccriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"

const SettingsPage = async () => {
const isPro = await checkSubscription();

    return (
        <div>
            <Headings 
                title="settings" description="Manage account settings" icon={Settings} iconColor="text-sky-500" bgColor="bg-sky-500/10"            
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are currently on a pro plan" : "You cerrnetly on a free plan"}
                </div>
                <SubsccriptionButton isPro={isPro}/>
            </div>
        </div>
    )
}
export default SettingsPage