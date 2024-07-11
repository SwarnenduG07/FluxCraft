
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { DarkModeToggle } from "./toggle";
 
const Navbar = () => {
    return (
        <div className="flex items-center p-4">
             <MobileSidebar />
             <div className="flex w-full justify-end ">
             <div className=" pr-6">
                <DarkModeToggle />
             </div>
             <UserButton afterSwitchSessionUrl="/" />
             </div>
        </div>
    );
}
export default Navbar