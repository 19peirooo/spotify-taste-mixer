"use client"

import { useState } from "react"
import DebouncedSearchBar from "../DebouncedSearchBar"
import { spotifyRequest } from "@/lib/spotify"
import ArtistSearchList from "../ArtistSearchList"


export default function ArtistWidget({ onSelect, selectedItems }) {

    const [artists, setArtists] = useState([])

    const handleSearch = async (query) => {
        if (!query) {
            setArtists([])
        } else {
            const artist_data = await spotifyRequest(`https://api.spotify.com/v1/search?type=artist&q=${query}&limit=5`)
            let artist_list = artist_data?.artists?.items || []
            if (artist_list) {
                artist_list = artist_list.map(a => ({
                    id: a.id,
                    name: a.name,
                    image: a?.images[0] || null,
                }))
            }
            setArtists(artist_list)
        }
    }

    return (
        
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-white text-center">Busca a tu artista favorito</h2>
            <DebouncedSearchBar onSearch={handleSearch}></DebouncedSearchBar>
            <ArtistSearchList artists={artists} onSelect={onSelect}/>
        </div>

    )

}