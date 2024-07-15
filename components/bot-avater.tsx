import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvater = () => {
    return (
        <Avatar className="h-8 w-8 ">
         <AvatarImage className="p-1" src="/logo.png"/>
        </Avatar>
    )
}