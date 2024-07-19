"use client"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader ,  DialogTitle ,DialogDescription, DialogFooter} from "@/components/ui/dialog"
import { useProModel } from "@/app/hooks/use-pro-model"
import { TOOLS_DESCRIPTIONS } from "@/constants"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Check, Zap } from "lucide-react"
import { Button } from "./ui/button"


export const Promodel = () => {
    const proModel = useProModel()
    return (
         <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center  flex-col gap-y-4 pb-2">
                         <div className="flex items-center gap-x-2 font-bold py-1">
                              Upgrade To FluxCraft
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                Pro
                            </Badge>
                          </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-green-500 font-semibold">
                                {TOOLS_DESCRIPTIONS.map(tool => (
                                    <Card key={tool.lable} className="p-3 border-black/5 flex items-center justify-between" >
                                        <div className="flex items-center gap-x-4">
                                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                                <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                                <div className="font-semibold text-sm">
                                                    {tool.lable}
                                                </div>
                                            </div>
                                        </div>
                                      <Check className="text-primary w-5 h-5"/>
                                    </Card>
                                ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                      <Button size="lg"
                      variant="premium"
                      className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                      </Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
    )
}    