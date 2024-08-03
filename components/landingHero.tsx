"use client"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"
const LandingHero = () => {
    const { isSignedIn } = useAuth()
    return (
        <div className="text-green-400 font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1 className="">
                    The best AI tool for
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-700">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Image Generation",
                            "Video Generation",
                            "Music Generation",
                            "Chatbot",
                            "Code Generation",                            
                        ],
                        autoStart: true,
                        loop: true,          
                       }}
                    />
                </div>
            </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create Content Using AI 10X Faster
                </div>
             <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                  <Button  className="md:text-lg p-4 md:p-6 transition ease-in-out delay-100 bg-gradient-to-r from-lime-500 to-pink-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-full scale-100">
                    Start Generating For Free
                   </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                 No credit card required
            </div>
        </div>
    )

}
export default LandingHero