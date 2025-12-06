"use client"
import GenreWidget from "@/components/widgets/GenreWidget"
import { useState } from "react"
import SongList from "@/components/SongList"
import { spotifyRequest } from "@/lib/spotify"

export default function GenreFinder() {
    const [tracks, setTracks] = useState([])
    const [genres, setGenres] = useState([])

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id !== trackId))
    }

    const findSongs = async () => {
        setTracks([])
        if (genres.length < 3 || genres.length > 5) return;

        let allTracks = []

        for (const genre of genres) {
            const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=5`)
            const track_data = data?.tracks?.items || []
            allTracks = [...allTracks, ...track_data]
        }
        setTracks(allTracks)
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <GenreWidget onSelect={setGenres} selectedItems={genres}/>
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
            <h2 className="text-2xl font-bold text-white mt-2">Canciones Encontradas: </h2>
            <SongList songs={tracks} onSelect={null} onDelete={removeTrack} onFavourite={null}/>    
        </div>
    )
}