"use client"

import { useEffect, useState } from "react"
import { Promodel } from "@/components/promodel"

export const ModelProvider =() => {
    const [ismounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if (!ismounted) {
        return null
    }
    return (
         <>
           <Promodel  />
        </>
    )
}