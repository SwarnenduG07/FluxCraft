"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"

const PageNotfound = () => {
    return (
       <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-90% ...">
        <div className="text-4xl sm:text-5xl font-serif md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
             <TypewriterComponent 
              options={{
                strings: [
                    "Coming Soon..."
                ],
                autoStart: true,
                loop: true,
              }}
             />
          </div>
        </div>   
        <div className="pt-4 pb-4">
            <Link href="/dashboard">
            <Button variant={"outline"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                Go Back to Dashboard
            </Button>
            </Link>     
        </div>
        </div>
        
    )
}
export default PageNotfound