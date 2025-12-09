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
            setArtists(artist_list)
        }
    }

    const handleSelect = (artist) => {
        const exists = selectedItems.some(a => a.id === artist.id)

        if (!exists && selectedItems.length < 5) {
            onSelect(artist)
        }

    }

    return (
        
        <>
            <h2 className="text-2xl font-bold text-white text-center">Busca a tu artista favorito</h2>
            <DebouncedSearchBar onSearch={handleSearch}></DebouncedSearchBar>
            <ArtistSearchList artists={artists} onSelect={handleSelect}/>
        </>

    )

}