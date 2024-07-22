"use client"
import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("04533654-e39e-46c4-935b-eed4c929fa74")
    },[])
    return null
}