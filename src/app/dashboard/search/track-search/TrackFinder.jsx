"use client"
import TrackWidget from "@/components/widgets/TrackWidget";
import { useState } from "react";
import SongList from "@/components/SongList";
import PlaylistMenu from "@/components/PlaylistMenu";

export default function TrackFinder() {

    const [tracks, setTracks] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [confirmMsg,setConfirmMsg] = useState("")
    const [showConfirmMsg, setShowConfirmMsg] = useState(false)
    
    const displayConfirmMsg = (msg) => {
        setConfirmMsg(msg)
        setShowConfirmMsg(true)
        setTimeout(() => setShowConfirmMsg(false),3000)
    }

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
        displayConfirmMsg("Cancion Guardada con Exito")
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <TrackWidget onSelect={addTrack} selectedItems={tracks}/>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Seleccionadas: </h2>
            <SongList songs={tracks} onSelect={saveTrack} onDelete={removeTrack} />
            {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}
            {showConfirmMsg && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg
                                transform transition-all duration-500 opacity-100 animate-slide-in">
                    {confirmMsg}
                </div>
            )}     
        </div>
    )
}