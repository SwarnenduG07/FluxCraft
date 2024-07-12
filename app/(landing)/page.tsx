import { LandingContent } from "@/components/landingContent";
import LandingHero from "@/components/landingHero";
import LandingNavBar from "@/components/landingNavbar";

 const Landingpage = () => {
     return (
        <div className="h-full">
      <LandingNavBar />
      <LandingHero />
      <LandingContent />
        </div>
     )
 }
 export default Landingpage;