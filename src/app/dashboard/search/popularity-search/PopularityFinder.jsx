"use client"

import SongList from "@/components/SongList"
import PopularityWidget from "@/components/widgets/PopularityWidget"
import { useState } from "react"

export default function PopularityFinder() {

    const [tracks,setTracks] = useState([])
    const [popularity, setPopularity] = useState({min: 0, max: 100})

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    const findSongs = async () => {
        setTracks([])
        
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <PopularityWidget selectedItems={popularity} onSelect={setPopularity}/>
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Encontradas: </h2>
            <SongList songs={tracks} onSelect={null} onDelete={removeTrack} />    
        </div>
    )

}