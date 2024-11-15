"use client"
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/app/hooks/use-pro-model";

interface FreeCounterProps {
    apiLimitCount : number;
    isPro: boolean
}

export const FreeCounter = ({apiLimitCount = 0, isPro = false}: FreeCounterProps) => {
    const proModel = useProModel();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    },[])
    if (!mounted) {
        return null;
    }
    if(isPro) {
        return null
    }
    return (
        <div className="py-52">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-5">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                           {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                           <Progress  className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100}/>
                        </p>
                    </div>
                     <Button onClick={proModel.onOpen} className="w-full" variant="premium">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>         
        </div>
    )
}
export default FreeCounter