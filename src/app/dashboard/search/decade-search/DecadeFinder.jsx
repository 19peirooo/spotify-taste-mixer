"use client"
import DecadeWidget from "@/components/widgets/DecadeWidget"
import { useState } from "react"

export default function DecadeFinder() {
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
        <DecadeWidget selectedItems={tracks} onSelect={addTrack} onDelete={removeTrack}/>
    )
}