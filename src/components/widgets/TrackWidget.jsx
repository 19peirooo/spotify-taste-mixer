"use client"
import { useState } from "react"
import DebouncedSearchBar from "../DebouncedSearchBar"
import { spotifyRequest } from "@/lib/spotify"

import SongSearchList from "../SongSearchList"

export default function TrackWidget({ onSelect, selectedItems }) {

    const [songs, setSongs] = useState([])

    const handleSelect = (track) => {
        const exists = selectedItems.some(t => t.id === track.id)

        if (!exists) {
            onSelect(track)
        }
    }

    const handleSearch = async (query) => {
            if (!query) {
                setSongs([])
            } else {
                const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=${query}&limit=5`)
                const track_data = data?.tracks?.items || []
                setSongs(track_data)
            }
        }

    return (
        <>
            <h2 className="text-2xl font-bold text-white text-center">Buscar canciones</h2>
            <DebouncedSearchBar onSearch={handleSearch}></DebouncedSearchBar>
            <SongSearchList songs={songs} onSelect={handleSelect}/>
        </>
        
    )

}