"use-client"
import { useAuth } from "@clerk/nextjs"
import { Description } from "@radix-ui/react-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
const testimonials = [
    {
        name: "Harkirat Sing",
        title: "Full-Stack + web3 sr.Engineer",
        description: "This is the best application I am using now a days. This website works seamlessly",
    },
    {
        name: "Swarnendu Ghosh",
        title: "Full-Stack Engineer",
        description: "I am using this in my daily life now. In terms of Frontend this looks really good",
    },
    {
        name: "100xDevs",
        title: "Edtech Organisation",
        description: "Cool product Man. You have done a nice job",
    },
    {
        name: "Sam Altman",
        title: "CEO OpenAI",
        description: "User friendly and got a seamless experience ",
    }
]
export const LandingContent = () => {
    return (
         <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {testimonials.map((item) => (
                <Card 
                key={item.description}
                className="bg-[#192339] border-none text-white"
                >
                 <CardHeader >
                   <CardTitle className="flex items-center gap-x-2">
                     <div>
                        <p className="text-kg">{item.name}</p>
                        <p className="text-zinc-400 text-sm">{item.title}</p>
                     </div>
                   </CardTitle>
                   <CardContent className="pt-4 px-0">
                        {item.description}
                   </CardContent>
                 </CardHeader>
                </Card>
             ))}
            </div>
         </div>
    )
}
export default LandingContent