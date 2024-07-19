
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { DarkModeToggle } from "./toggle";
import { get } from "http";
import { getApiLimitCount } from "@/lib/api-limit";
 
const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount()
    return (
        <div className="flex items-center p-4">
             <MobileSidebar  apiLimitCount={apiLimitCount}/>
             <div className="flex w-full justify-end ">
             <div className="pr-6">
                <DarkModeToggle />
             </div>
             <UserButton afterSwitchSessionUrl="/" />
             </div>
        </div>
    );
}
export default Navbar