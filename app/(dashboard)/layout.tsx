import FreeCounter from "@/components/freeCounter";
import Navbar from "@/components/navbar"
import SideBar from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";


const DashboardLayout = async({
    children
}: {children : React.ReactNode}) => {
   const apiLimitCount = await getApiLimitCount();
   const isPro = await checkSubscription();
   return (
    <div className="h-full relative">
       <div className="hidden w-full h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <div className="bg-blue-600">
            <SideBar isPro={isPro} apiLimitCount={apiLimitCount}/>
            <div className="pb-60 pt-2.5"></div>
         </div>  
       </div>
       <main className="md:pl-72">
            <Navbar/>
            {children}
       </main>
    </div>
   )
}
export default DashboardLayout