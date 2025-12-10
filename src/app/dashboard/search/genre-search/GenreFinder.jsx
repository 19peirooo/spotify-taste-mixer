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

    const removeTrack = (track) => {
        setTracks(tracks.filter(t => t.id !== track.id))
    }

    const findSongs = async () => {
        setLoading(true)
        try {
            setTracks([])
            if (genres.length < 3 || genres.length > 5) return;

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
        </div>
    )
}