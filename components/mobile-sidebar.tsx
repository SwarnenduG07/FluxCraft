"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SideBar from "@/components/sidebar"

 const MobileSidebar = () => {
   return (
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
                 <Menu />
             </Button>
        </SheetTrigger>  
        <SheetContent side="left" className="p-0">
            <SideBar />
        </SheetContent> 
      </Sheet>
   )
 }
 export default MobileSidebar
