import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvater = () => {
    const { user } = useUser();
    return (
       <Avatar className="h-8 w-8">
        <AvatarImage src={user?.setProfileImage} />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
            </Avatar>    
    );
};