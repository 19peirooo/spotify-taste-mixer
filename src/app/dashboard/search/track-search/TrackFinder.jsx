"use client"
import TrackWidget from "@/components/widgets/TrackWidget";
import { useState } from "react";
import SongList from "@/components/SongList";
import PlaylistMenu from "@/components/PlaylistMenu";

export default function TrackFinder() {

    const [tracks, setTracks] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)

    const addTrack = (track) => {
        setTracks([...tracks,track])
    }

    const removeTrack = (track) => {
        setTracks(tracks.filter(t => t.id !== track.id))
    }

    const saveTrack = (track) => {
        setSelectedTrack(track)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectedTrack(null)
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <TrackWidget onSelect={addTrack} selectedItems={tracks}/>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Seleccionadas: </h2>
            <SongList songs={tracks} onSelect={saveTrack} onDelete={removeTrack} />
            {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}    
        </div>
    )
}