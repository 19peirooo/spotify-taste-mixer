"use client"
import SearchForm from "../SearchForm"
import { useState } from "react"
import SongSearchList from "../SongSearchList"

import { spotifyRequest } from "@/lib/spotify"
import GenreList from "../GenreList"

export default function GenreWidget({ onSelect, selectedItems }) {

    const [songs, setSongs] = useState([])
    const [genres, setGenres] = useState([])
    const availableGenres = [ 'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music' ]
    
    const handleSearch = (query) => {
        if (!query) {
            return
        }
        
        const formatted_genre = query.toLowerCase().replace(/\s+/g,"-")
        const valid_query = availableGenres.some(g => g === formatted_genre) && !genres.some(g => g === formatted_genre)
        if (valid_query && genres.length < 5) {
            setGenres([...genres,formatted_genre])
        }
    }

    const deleteGenre = (genre) => {
        setGenres(genres.filter(g => g !== genre))
    }

    const findSongs = async () => {
        setSongs([])
        if (genres.length < 3 || genres.length > 5) return;

        let allTracks = []

        for (const genre of genres) {
            const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=5`)
            const track_data = data?.tracks?.items || []
            allTracks = [...allTracks, ...track_data]
        }
        setSongs(allTracks)
    }

    return (
        <div className="flex flex-col items-center w-full bg-[#191414] my-2 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-white text-center">Buscar generos</h2>
            <SearchForm onSearch={handleSearch}></SearchForm>
            <GenreList genres={genres} onSelect={deleteGenre}/>
            <button className="mt-4 px-4 py-2 bg-[#1DB954] text-black font-semibold rounded-xl 
                           hover:bg-[#1ed760] transition cursor-pointer shadow-md" onClick={findSongs}>Buscar Canciones</button>
            <h2 className="text-xl font-bold text-white mt-2">Canciones Encontradas: </h2>
            <SongSearchList songs={songs} onSelect={onSelect}/>
            
        </div>  
    )

}