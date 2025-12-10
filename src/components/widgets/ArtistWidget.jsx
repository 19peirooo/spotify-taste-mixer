"use client"

import { useState } from "react"
import DebouncedSearchBar from "../DebouncedSearchBar"
import { spotifyRequest } from "@/lib/spotify"
import ArtistSearchList from "../ArtistSearchList"


export default function ArtistWidget({ onSelect, selectedItems }) {

    const [artists, setArtists] = useState([])
    const [errMsg,setErrMsg] = useState("")
    const [showErrMsg, setShowErrMsg] = useState(false)

    const displayErrMsg = (msg) => {
        setErrMsg(msg)
        setShowErrMsg(true)
        setTimeout(() => setShowErrMsg(false),3000)

    }

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

        if (exists) {
            displayErrMsg("Artista ya añadido")
        }

        if (selectedItems.length >= 5) {
            displayErrMsg("Solo se puede añadir 5 artistas")
        }

    }

    return (
        
        <>
            <h2 className="text-2xl font-bold text-white text-center">Busca a tu artista favorito</h2>
            <DebouncedSearchBar onSearch={handleSearch}></DebouncedSearchBar>
            <ArtistSearchList artists={artists} onSelect={handleSelect}/>
            {showErrMsg && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg
                                transform transition-all duration-500 opacity-100 animate-slide-in">
                    {errMsg}
                </div>
            )}  
        </>

    )

}