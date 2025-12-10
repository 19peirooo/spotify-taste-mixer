"use client"

import PlaylistGrid from "@/components/PlaylistGrid"
import PlaylistMenu from "@/components/PlaylistMenu"
import SongList from "@/components/SongList"
import MoodWidget from "@/components/widgets/MoodWidget"
import { spotifyRequest } from "@/lib/spotify"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function MoodFinder() {

    const [tracks,setTracks] = useState([])
    const [mood, setMood]= useState({
        "energy": {min:0,max:1},
        "valence": {min:0,max:1},
        "danceability": {min:0,max:1},
        "acousticness": {min:0,max:1}
    })
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [loading, setLoading] = useState(false)
    const [confirmMsg,setConfirmMsg] = useState("")
    const [showConfirmMsg, setShowConfirmMsg] = useState(false)
    
    const displayConfirmMsg = (msg) => {
        setConfirmMsg(msg)
        setShowConfirmMsg(true)
        setTimeout(() => setShowConfirmMsg(false),3000)
    }

    const removeTrack = (track) => {
        setTracks(tracks.filter(t => t.id !== track.id))
    }

    const findSongs = async () => {
        setLoading(true)
        try {
            setTracks([])
            let allTracks = []
            const mood_genres = []
            if (mood.energy.min >= 0.6 && mood.danceability.min >= 0.7 && mood.valence.min >= 0.4) {
                mood_genres.push("reggaeton")
            }
            if (mood.energy.min >= 0.4 && mood.energy.max <= 0.8 && mood.valence.min >= 0.5) {
                mood_genres.push("pop")
            }
            if (mood.energy.min >= 0.7 && mood.danceability.min >= 0.6) {
                mood_genres.push("edm")
            }
            if (mood.energy.max <= 0.6 && mood.valence.max <= 0.6) {
                mood_genres.push("indie")
            }
            if (mood.energy.max <= 0.6 && mood.valence.max <= 0.6) {
                mood_genres.push("acoustic")
            }

            for (const genre of mood_genres) {
                const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`)
                const track_data = data?.tracks?.items || []
                allTracks = [...allTracks, ...track_data]
            }

            setTracks(allTracks)
        } finally {
            setLoading(false)
        }
        
    }

    const saveTrack = (track) => {
        setSelectedTrack(track)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectedTrack(null)
        setIsOpen(false)
        displayConfirmMsg("Cancion guardada con exito")
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-xl font-bold mt-2">Cargando Canciones</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <div className="flex flex-col items-center ">
                <MoodWidget selectedItems={mood} onSelect={setMood}/>
                <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                            hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
                <h2 className="text-2xl font-bold text-white mt-2">Canciones Encontradas: </h2>
                <SongList songs={tracks} onSelect={saveTrack} onDelete={removeTrack} />
                {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}    
            </div>
            {showConfirmMsg && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg
                                transform transition-all duration-500 opacity-100 animate-slide-in">
                    {confirmMsg}
                </div>
            )} 
        </div>
        
    )

}