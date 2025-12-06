"use client"
import TrackWidget from "@/components/widgets/TrackWidget";
import { useState } from "react";
import SongList from "@/components/SongList";

export default function TrackFinder() {

    const [tracks, setTracks] = useState([])

    const addTrack = (track) => {
        const exists = tracks.some(t => t.id === track.id)

        if (!exists) {
            setTracks([...tracks,track])
        }
    }

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    return (
        <div>
            <TrackWidget onSelect={addTrack} onDelete={removeTrack} selectedItems={tracks}/>
            <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mt-2">Canciones Seleccionadas: </h2>
                <SongList songs={tracks} onSelect={null} onDelete={removeTrack} onFavourite={null}/>    
            </div>
            
        </div>
    )
}