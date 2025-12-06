"use client"

import { useState } from "react"
import ArtistWidget from "./widgets/ArtistWidget"
import ArtistList from "./ArtistList"
import GenreWidget from "./widgets/GenreWidget"
import DecadeWidget from "./widgets/DecadeWidget"
import TrackWidget from "./widgets/TrackWidget"
import PopularityWidget from "./widgets/PopularityWidget"
import MoodWidget from "./widgets/MoodWidget"

export default function PlaylistGenerator() {
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [genres, setGenres] = useState([])
    const [decades, setDecades] = useState([])
    const [popularity, setPopularity] = useState({min: 0, max: 100})

    const addArtist = (artist) => {
        setArtists([...artists,artist])
    }

    const removeArtist = (artistId) => {
        setArtists(artists.filter(a => a.id !== artistId))
    }

    const addTrack = (track) => {
        setTracks([...tracks,track])
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
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <DecadeWidget selectedItems={decades} onSelect={setDecades}/>
            </div>
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <PopularityWidget selectedItems={popularity} onSelect={setPopularity}/>
            </div>
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <MoodWidget selectedItems={null} onSelect={null}/>
            </div>
            <div className="flex flex-col items-center w-full bg-[#191414] rounded-2xl my-2 p-4">
                <TrackWidget selectedItems={tracks} onSelect={addTrack}/>
            </div>
        </div>
    )

}