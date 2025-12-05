"use client"
import GenreWidget from "@/components/widgets/GenreWidget"
import { useState } from "react"

export default function GenreFinder() {

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
            <GenreWidget onSelect={addTrack} onDelete={removeTrack} selectedItems={tracks}/>
        </div>
    )
}