"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import { getAccessToken, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Header({title}) {

    const [pfp,setPfp] = useState(null)
    const [username,setUsername] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter();

    async function getUserData() {
        const accessToken = getAccessToken()
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch("https://api.spotify.com/v1/me",{
            headers: headers
        })
        const data = await response.json()

        return {
            imageUrl: data.images?.[0]?.url || null,
            username: data.display_name || "Usuario No Encontrado"
        };
    }

    useEffect(() => {
        async function loadData() {
            const data = await getUserData()
            setPfp(data.imageUrl)
            setUsername(data.username)
        }
        loadData()
    },[])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    
    const handleClose = () => {
        setIsOpen(false)
    }

    return(
        <header className="bg-[#191414] flex items-center justify-center relative h-24 px-4">
            <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                 text-2xl md:text-4xl text-white font-bold">🎵 Spotify Taste Mixer</h1>
            <div className="ml-auto relative">
                <Image
                        src={pfp ?? "/blank_pfp.webp"}
                        alt="Foto de Perfil"
                        width={60}
                        height={60}
                        className="rounded-full cursor-pointer object-cover"
                        onClick={handleClick}
                    />
                
                {isOpen && (
                    <AccountMenu username={username} onLogout={handleLogout} onClose={handleClose}></AccountMenu>
                )}
            </div>
        </header>
    )
}