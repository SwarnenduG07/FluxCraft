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
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 pr-10">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Chatbot",
                            "Photo Generation",
                            "Video Generation",
                            "Music Generation",
                            "Code Generation",                            
                        ],
                        autoStart: true,
                        loop: true,          
                       }}
                    />
                </div>
            </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create Content useing AI 10X faster
                </div>
             <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                  <Button variant={"outline"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Start Generating For Free
                   </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                 No Card required
            </div>
        </div>
    )

}
export default LandingHero