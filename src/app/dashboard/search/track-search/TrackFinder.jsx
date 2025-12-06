"use client"
import TrackWidget from "@/components/widgets/TrackWidget";
import { useState } from "react";
import SongList from "@/components/SongList";

export default function TrackFinder() {

    const [tracks, setTracks] = useState([])

    const addTrack = (track) => {
        setTracks([...tracks,track])
    }

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <TrackWidget onSelect={addTrack} selectedItems={tracks}/>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Seleccionadas: </h2>
            <SongList songs={tracks} onSelect={null} onDelete={removeTrack} onFavourite={null}/>    
        </div>
    )
}