"use client"
import DecadeWidget from "@/components/widgets/DecadeWidget"
import { useState } from "react"
import SongList from "@/components/SongList"
import { spotifyRequest } from "@/lib/spotify"
import PlaylistMenu from "@/components/PlaylistMenu"

export default function DecadeFinder() {
    const [tracks, setTracks] = useState([])
    const [decades, setDecades] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    const findSongs = async () => {
        setTracks([])

        let allTracks = []

        if (decades.length === 0) return

        for (const decade of decades) {
            const start = parseInt(decade)
            const end = start + 9

            const data = await spotifyRequest(`https://api.spotify.com/v1/search?q=year:${start}-${end}&type=track&limit=5`)
            const track_data = data.tracks.items || []
            allTracks = [...allTracks,...track_data]
        }

        setTracks(allTracks)
        
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
            <DecadeWidget selectedItems={decades} onSelect={setDecades} />
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Seleccionadas: </h2>
            <SongList songs={tracks} onSelect={saveTrack} onDelete={removeTrack} />
            {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}    
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
        </div>
    )
}