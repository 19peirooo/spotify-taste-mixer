"use client"

import { useState } from "react"
import ArtistWidget from "@/components/widgets/ArtistWidget"
import ArtistList from "@/components/ArtistList"
import GenreWidget from "@/components/widgets/GenreWidget"
import DecadeWidget from "@/components/widgets/DecadeWidget"
import TrackWidget from "@/components/widgets/TrackWidget"
import PopularityWidget from "@/components/widgets/PopularityWidget"
import MoodWidget from "@/components/widgets/MoodWidget"
import SongList from "@/components/SongList"
import { generatePlaylist, spotifyRequest } from "@/lib/spotify"
import SubmitForm from "@/components/SubmitForm"
import { getAccessToken } from "@/lib/auth"
import DraggableSongList from "@/components/DraggableSongList"

export default function PlaylistGenerator() {
    const [activeWidgets, setActiveWidgets] = useState({
        artist: true,
        genre: true,
        decade:true,
        popularity: true,
        mood: true,
        track: true
    })
    const [playlist, setPlaylist] = useState([])

    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [genres, setGenres] = useState([])
    const [decades, setDecades] = useState([])
    const [popularity, setPopularity] = useState({min: 0, max: 100})
    const [mood, setMood]= useState({
        "energy": {min:0,max:1},
        "valence": {min:0,max:1},
        "danceability": {min:0,max:1},
        "acousticness": {min:0,max:1}
    })

    const addArtist = (artist) => {
        setArtists([...artists,artist])
    }

    const removeArtist = (artistId) => {
        setArtists(artists.filter(a => a.id !== artistId))
    }

    const addTrack = (track) => {
        setTracks([...tracks,track])
    }

    const removeTrack = (trackId) => {
        setTracks(tracks.filter(t => t.id != trackId))
    }

    const addTrackToPlaylist = (track) => {

        const exists = playlist.some(t => (t.id === track.id))

        if (!exists) {
            setPlaylist([...playlist,track])
        }

    }

    const removePlaylistTrack = (trackId) => {
        setPlaylist(playlist.filter(t => t.id != trackId))
    }

    const createPlaylist = async () => {
        setPlaylist([])
        const preferences = {
            tracks: activeWidgets.track ? tracks : null,
            artists: activeWidgets.artist ? artists : null,
            genres: activeWidgets.genre ? genres : null,
            decades: activeWidgets.decade ? decades : null,
            popularity: activeWidgets.popularity ? popularity : null,
            mood: activeWidgets.mood ? mood : null
        }
        const generatedPlaylist = await generatePlaylist(preferences)
        setPlaylist(generatedPlaylist)
    }

    const savePlaylist = async  (name,description) => {
        if (!name) return

        const token = getAccessToken()

        const create_res = await fetch("https://api.spotify.com/v1/me/playlists", {
            method:"POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                public: true
            })
        })

        const data = await create_res.json()
        const uris = playlist.map(t => t.uri)

        const res = await fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uris })
        });

        const storedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]");

        const playlist_data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${data.id}`)
        storedPlaylists.push(playlist_data)
        localStorage.setItem("playlists", JSON.stringify(storedPlaylists));

    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414]">
            <h1 className="text-2xl font-bold text-white text-center my-2 p-4 w-full rounded-2xl">Generador de Playlists</h1>
            <div className="flex w-full justify-center gap-8 mb-4">
            <div>
                <h2 className="text-white font-bold mb-2 text-center">Widgets de Búsqueda</h2>
                <div className="flex gap-2 flex-wrap justify-center">
                {['artist', 'track', 'genre'].map((key) => (
                    <button
                    key={key}
                    onClick={() =>
                        setActiveWidgets({
                        ...activeWidgets,
                        [key]: !activeWidgets[key],
                        })
                    }
                    className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                        activeWidgets[key]
                        ? "bg-[#1ed760] text-black hover:bg-[#1db954]"
                        : "bg-[#212121] text-white hover:bg-[#212121]/10"
                    }`}
                    >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
                </div>
            </div>

            <div>
                <h2 className="text-white font-bold mb-2 text-center">Filtros</h2>
                <div className="flex gap-2 flex-wrap justify-center">
                {['decade', 'popularity', 'mood'].map((key) => (
                    <button
                    key={key}
                    onClick={() =>
                        setActiveWidgets({
                        ...activeWidgets,
                        [key]: !activeWidgets[key],
                        })
                    }
                    className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                        activeWidgets[key]
                        ? "bg-[#1ed760] text-black hover:bg-[#1db954]"
                        : "bg-[#212121] text-white hover:bg-[#212121]/10"
                    }`}
                    >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
                </div>
            </div>
            </div>


            {activeWidgets.artist && 
            <div className="flex flex-col items-center w-full bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <ArtistWidget selectedItems={artists} onSelect={addArtist}/>
                <h2 className="text-xl font-bold text-white">Artistas Seleccionados: </h2>
                <ArtistList artists={artists} onSelect={null} onDelete={removeArtist}/>
            </div>}
            {activeWidgets.genre &&
            <div className="flex flex-col items-center w-full  bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <GenreWidget selectedItems={genres} onSelect={setGenres}/>
            </div>}

            {activeWidgets.decade && 
            <div className="flex flex-col items-center w-full bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <DecadeWidget selectedItems={decades} onSelect={setDecades}/>
            </div>}
            {activeWidgets.popularity &&
            <div className="flex flex-col items-center w-full  bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <PopularityWidget selectedItems={popularity} onSelect={setPopularity}/>
            </div>}
            {activeWidgets.mood &&
            <div className="flex flex-col items-center w-full  bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <MoodWidget selectedItems={mood} onSelect={setMood}/>
            </div>}
            { activeWidgets.track && 
            <div className="flex flex-col items-center w-full  bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                <TrackWidget selectedItems={tracks} onSelect={addTrack}/>
                <h2 className="text-xl font-bold text-white">Canciones Seleccionadas: </h2>
                <SongList songs={tracks} onSelect={null} onDelete={removeTrack}/>
            </div>}

            <div className="flex w-full justify-center">
            <button 
                onClick={createPlaylist}
                className="my-4 px-6 py-3 bg-[#1ed760] text-black font-bold rounded-2xl hover:bg-[#1db954] transition-colors shadow-lg"
                >
                    Generar Playlist
                </button>
            </div>

            <div className="w-full mb-4">
                <h1 className="text-2xl font-bold text-white text-center my-2 p-4 w-full rounded-2xl">Playlist</h1>

                {playlist.length === 0 ? (
                    <p className="text-white text-center">Playlist vacía</p>
                ) : (
                    <>
                        <DraggableSongList songs={playlist} setSongs={setPlaylist} onDelete={removePlaylistTrack} onSelect={null}/>
                        <div className="flex flex-col items-center w-full bg-green-900 rounded-2xl my-2 p-4 border border-[#1ed760]">
                            <h1 className="text-2xl font-bold text-white text-center">Añadir mas canciones</h1>
                            <TrackWidget selectedItems={playlist} onSelect={addTrackToPlaylist}/>
                        </div>
                        <SubmitForm onSearch={savePlaylist}/>
                    </>
                )}
            </div>

        </div>
    )

}