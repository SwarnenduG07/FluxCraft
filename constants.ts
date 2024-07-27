import { Code, Image, MessageSquare, Music, Video } from "lucide-react";

export const MAX_FREE_COUNTS = 10;

export const  TOOLS_DESCRIPTIONS = [
    {
      lable: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500",
      
    },
    {
      lable: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500",
    },
    {
      lable: "Video Generation",
      icon: Video,
      color: "text-sky-500",
      bgColor: "bg-sky-500",
    },
    {
      lable: "Image Generation",
      icon: Image,
      color: "text-pink-500",
      bgColor: "bg-pink-500",
    },
    {
      lable: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-500",
    }
  ]