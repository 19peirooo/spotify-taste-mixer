"use client"

import { useState } from "react"
import DecadeList from "../DecadeList"
import SongSearchList from "../SongSearchList"
import { spotifyRequest } from "@/lib/spotify"

export default function DecadeWidget({ onSelect, selectedItems, onDelete }) {

    const availableDecades = ["1950","1960","1970","1980","1990","2000","2010","2020"]
    const [decades, setDecades] = useState([])
    const [songs, setSongs] = useState([])

    const toggleDecade = (decade) => {

        const exists = decades.some(d => d === decade)

        if (exists) {
            setDecades(decades.filter(d => d !== decade))
        } else {
            setDecades([...decades,decade])
        }

    }

    const findSongs = async () => {
        setSongs([])

        let allTracks = []

        if (decades.length === 0) return

        for (const decade of decades) {
            const start = parseInt(decade)
            const end = start + 9

            const data = await spotifyRequest(`https://api.spotify.com/v1/search?q=year:${start}-${end}&type=track&limit=5`)
            const track_data = data.tracks.items || []
            allTracks = [...allTracks,...track_data]
        }

        setSongs(allTracks)
        
    }

    return (
         <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-white text-center">Buscar canciones</h2>
            <DecadeList decades={availableDecades} onSelect={toggleDecade} selectedDecades={decades}/>
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
            <h2 className="text-xl font-bold text-white mt-2">Canciones Encontradas: </h2>
            <SongSearchList songs={songs} onSelect={onSelect}/>
        </div>
    )

}