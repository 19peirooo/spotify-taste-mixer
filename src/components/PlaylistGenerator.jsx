"use client"

import { useState } from "react"
import ArtistWidget from "./widgets/ArtistWidget"
import ArtistList from "./ArtistList"
import GenreWidget from "./widgets/GenreWidget"

export default function PlaylistGenerator() {
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [genres, setGenres] = useState([])

    const addArtist = (artist) => {
        setArtists([...artists,artist])
    }

    const removeArtist = (artistId) => {
        setArtists(artists.filter(a => a.id !== artistId))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white text-center my-2 p-4 w-full bg-[#191414] rounded-2xl">Generador de Playlists</h1>
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <ArtistWidget selectedItems={artists} onSelect={addArtist}/>
                <h2 className="text-xl font-bold text-white">Artistas Seleccionados: </h2>
                <ArtistList artists={artists} onSelect={null} onDelete={removeArtist}/>
            </div>
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <GenreWidget selectedItems={genres} onSelect={setGenres}/>
            </div>
        </div>
    )

}