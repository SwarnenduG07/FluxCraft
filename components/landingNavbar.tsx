"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "./toggle"

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavBar = () => {
    const { isSignedIn } = useAuth()
    return (
        <nav className=" p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
               <div className="relative h-8 w-8 mr-4">
                <Image 
                fill
                alt="logo"
                src="/logo.png"
                />   
               </div>
               <h1 className={cn("text-2xl fonr-bold text-gray-800 dark:text-white" , font.className)}>
                FluxCraft
               </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <DarkModeToggle/>
              <Link href={isSignedIn? "/dashboard" : "/sign-up" }>
                <Button  className="rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 mr-4 ml-2 transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-violet-400">
                       Get Started
                </Button>
              </Link>
            </div>
        </nav>
    )
}
export default LandingNavBar;