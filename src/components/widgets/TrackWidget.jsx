"use client"
import { useState } from "react"
import DebouncedSearchBar from "../DebouncedSearchBar"
import { spotifyRequest } from "@/lib/spotify"

import SongSearchList from "../SongSearchList"

export default function TrackWidget({ onSelect, selectedItems }) {

    const [songs, setSongs] = useState([])

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
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-white text-center">Buscar canciones</h2>
            <DebouncedSearchBar onSearch={handleSearch}></DebouncedSearchBar>
            <SongSearchList songs={songs} onSelect={onSelect}/>
        </div>
        
    )

}