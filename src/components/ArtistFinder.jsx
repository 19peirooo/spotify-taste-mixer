"use client"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import { useState } from "react"

export default function ArtistFinder() {
    const [artists,setArtists] = useState([])

    const addArtist = (artist) => {
        const exists = artists.some(a => a.id === artist.id)

        if (!exists && artists.length < 5) {
            setArtists([...artists,artist])
        }
    }

    const removeArtist = (artistId) => {
        setArtists(artists.filter(a => a.id !== artistId))
    }

    return (
        <div>
            <ArtistWidget onSelect={addArtist} selectedItems={artists} onDelete={removeArtist}/>
        </div>
    )
}