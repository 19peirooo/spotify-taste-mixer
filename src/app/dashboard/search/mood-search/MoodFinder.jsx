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
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylist, setFilteredPlaylist] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [loading, setLoading] = useState(false)
    const pathname = usePathname()
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
            if (!filteredPlaylist) return

            let allTracks = []
            let offset = 0

            while (offset < filteredPlaylist.tracks.total) {
                const data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${filteredPlaylist.id}/tracks?limit=100&offset=${offset}`)
                const track_data = data?.items || []
                const track_list = track_data.map(t => t.track).filter(t => t !== null)
                allTracks = [...allTracks,...track_list]
                offset += 100
            }

            const filtered_list = allTracks.filter(t => {
                return Object.keys(mood).every(key =>{
                    const randNum = Math.random()
                    const min = mood[key]?.min || 0
                    const max = mood[key]?.max || 1
                    return randNum >= min && randNum <= max
                })
            })
            setTracks(filtered_list)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        const stored = localStorage.getItem('playlists')
        const stored_playlists = JSON.parse(stored) || []

        setPlaylists(stored_playlists)
    },[pathname])

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
            <div>
                <h1 className="text-2xl font-bold text-white text-center">Elegir Playlist A Filtrar</h1>
                <PlaylistGrid playlists={playlists} onSelect={setFilteredPlaylist}/>
            </div>
            <h1 className="text-xl font-bold text-white text-center">Playlist Seleccionada: {filteredPlaylist?.name || "none"}</h1>
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