"use client"
import TrackWidget from "@/components/widgets/TrackWidget";
import { useState } from "react";

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
        </div>
    )
}