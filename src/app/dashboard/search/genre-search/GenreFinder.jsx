"use client"
import GenreWidget from "@/components/widgets/GenreWidget"
import { useState } from "react"
import { spotifyRequest } from "@/lib/spotify"
import PlaylistMenu from "@/components/PlaylistMenu"
import SongList from "@/components/SongList"

export default function GenreFinder() {
    const [tracks, setTracks] = useState([])
    const [genres, setGenres] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [loading, setLoading] = useState(null)
    const [errMsg,setErrMsg] = useState("")
    const [showErrMsg, setShowErrMsg] = useState(false)
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

    const displayErrMsg = (msg) => {
        setErrMsg(msg)
        setShowErrMsg(true)
        setTimeout(() => setShowErrMsg(false),3000)

    }

    const findSongs = async () => {
        setLoading(true)
        try {
            setTracks([])
            if (genres.length < 3) {
                displayErrMsg("Se necesitan 3 o mas generos para poder buscar por genero")
                return
            }

            if (genres.length > 5) {
                displayErrMsg("Se necesitan menos de 5 generos para poder buscar por genero")
                return
            }


            let allTracks = []

            for (const genre of genres) {
                const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=5`)
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
        displayConfirmMsg("Cancion Guardada con Exito")
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
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <GenreWidget onSelect={setGenres} selectedItems={genres}/>
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Encontradas: </h2>
            <SongList songs={tracks} onSelect={saveTrack} onDelete={removeTrack} />
            {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}
            {showErrMsg && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg
                                transform transition-all duration-500 opacity-100 animate-slide-in">
                    {errMsg}
                </div>
            )}
            {showConfirmMsg && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg
                                transform transition-all duration-500 opacity-100 animate-slide-in">
                    {confirmMsg}
                </div>
            )}        
        </div>
    )
}