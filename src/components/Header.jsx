"use client"

import { useEffect, useState } from "react";

export default function Header({title}) {

    const [pfp,setPfp] = useState(null)

    async function getProfilePic() {
        const accessToken = localStorage.getItem('spotify_token')
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch("https://api.spotify.com/v1/me",{
            headers: headers
        })
        const data = await response.json()

        if (data.images && data.images.length > 0) {
            return data.images[0].url;
        } else {
            return null
        }
    }
    useEffect(() => {
        async function loadPfp() {
            const url = await getProfilePic()
            setPfp(url)
        }
        loadPfp()
    },[])
    

    return(
        <header className="bg-[#191414] flex items-center justify-center relative h-24 px-4">
            <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                 text-2xl md:text-4xl text-white font-bold">{title}</h1>
            <img 
                src={pfp ?? "/blank_pfp.webp"}
                alt="Foto de Perfil"
                className="ml-auto h-3/4 w-auto rounded-full"
            ></img>
        </header>
    )
}