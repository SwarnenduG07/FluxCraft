"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const montserrat = Montserrat({
   weight: "600", subsets: ["latin"]
})

const SideBar = () =>{
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
             <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                   <div className="relative w-8 h-8 mr-4">
                    <Image fill alt="Logo" src="/logo.png"/>
                   </div>
                   <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                      FluxCraft
                   </h1>
                </Link>
             </div>
        </div>
    )
}
export default SideBar