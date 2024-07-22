"use client"

import { Zap } from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface SubscriptionbuttonPros {
    isPro: boolean;
};

export const SubsccriptionButton = ({isPro = false}: SubscriptionbuttonPros) => {
    const [loading,setLoading] = useState(false);
    const OnClick = async () => {
         try {
            setLoading(true);
            const response  = await axios.get("/api/stripe");
            
            window.location.href = response.data.url;
         } catch (e) {
             toast.error("something went wrong");
             setLoading(false);
         }
    }
   return (
    <Button  disabled={loading} variant={isPro ? "default": "premium"} onClick={OnClick}>
        {isPro? "Manage Subscription":"Upgrade"}
        {!isPro && <Zap  className="w-4 h-4 ml-2 fill-white"/>}
    </Button>
   )
}