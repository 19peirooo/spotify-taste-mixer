"use client"

import PlaylistGrid from "@/components/PlaylistGrid"
import SongList from "@/components/SongList"
import PopularityWidget from "@/components/widgets/PopularityWidget"
import { spotifyRequest } from "@/lib/spotify"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PopularityFinder() {

    const [tracks,setTracks] = useState([])
    const [popularity, setPopularity] = useState({min: 0, max: 100})
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylist, setFilteredPlaylist] = useState(null)
    const pathname = usePathname()

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    const findSongs = async () => {
        setTracks([])
        if (!filteredPlaylist) return

        const data = await spotifyRequest(filteredPlaylist.tracks.href)
        const track_data = data?.items || []
        const track_list = track_data.map(t => t.track)

        const filtered_list = track_list.filter(t => t.popularity >= popularity.min && t.popularity <= popularity.max)
        console.log(filtered_list)
        setTracks(filtered_list)
        
    }

    useEffect(() => {
        const stored = localStorage.getItem('playlists')
        const stored_playlists = JSON.parse(stored) || []

        setPlaylists(stored_playlists)
    },[pathname])

    return (
        <div className="w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <div>
                <h1 className="text-2xl font-bold text-white text-center">Elegir Playlist A Filtrar</h1>
                <PlaylistGrid playlists={playlists} onSelect={setFilteredPlaylist}/>
            </div>
            <h1 className="text-xl font-bold text-white text-center">Playlist Seleccionada: {filteredPlaylist?.name || "none"}</h1>
            <div className="flex flex-col items-center ">
                <PopularityWidget selectedItems={popularity} onSelect={setPopularity}/>
                <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                            hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
                <h2 className="text-2xl font-bold text-white mt-2">Canciones Encontradas: </h2>
                <SongList songs={tracks} onSelect={null} onDelete={removeTrack} />    
            </div>
        </div>
        
    )

}