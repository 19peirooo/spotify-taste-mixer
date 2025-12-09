"use client"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import { useState } from "react"
import ArtistList from "@/components/ArtistList"
import { useRouter } from "next/navigation"

export default function ArtistFinder() {
    const [artists,setArtists] = useState([])
    const router = useRouter()

    const addArtist = (artist) => {
        setArtists([...artists,artist])
    }

    const removeArtist = (artistId) => {
        setArtists(artists.filter(a => a.id !== artistId))
    }

    const handleArtist = (id) => {
        router.push(`/dashboard/artists/${id}`)
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <ArtistWidget onSelect={addArtist} selectedItems={artists}/>
            <h2 className="text-xl font-bold text-white">Artistas Seleccionados: </h2>
            <ArtistList artists={artists} onSelect={handleArtist} onDelete={removeArtist}/>
        </div>
    )
}