import { cn } from "@/lib/utils";
import { Icon, LucideIcon } from "lucide-react";

interface HeadingProps {
    title : string;
    description : string;
    icon: LucideIcon;
    iconColor? : string;
    bgColor? : string;
}

export const Headings = ({title , description, icon: Icon, iconColor, bgColor}: HeadingProps) => {
    return (
      

        <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-3">
            <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                <Icon className={cn("w-8 h-8", iconColor)}/>
            </div>
            <div>
                <h2 className="text-3xl font-bold">
                    {title}
                </h2>
                <div className="text-sm text-muted-foreground">
                    {description}
                </div>
            </div>
        </div>

      

    )
}
