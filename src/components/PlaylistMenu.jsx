"use client"

import { getAccessToken } from "@/lib/auth"
import PlaylistGrid from "./PlaylistGrid"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState, useRef } from "react"

export default function PlaylistMenu({ track, onClose, isOpen }) {

    const menuRef = useRef(null)
    const [playlists,setPlaylists] = useState([])

    const loadPlaylists = async () => {
        const stored = localStorage.getItem('playlists')
        const stored_playlists = JSON.parse(stored) || []

        setPlaylists(stored_playlists)
    }

    useEffect(()=>{
        if (isOpen) {
            loadPlaylists()
        }
    },[isOpen])

    const addTrackToPlaylist = async (playlist) => {

        const token = getAccessToken()
        let allTracks = []
        let offset = 0

        const playlist_data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${playlist.id}`);

        while (offset < playlist_data.tracks.total) {
            const data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?limit=100&offset=${offset}`)
            const track_data = data?.items || []
            const track_list = track_data.map(t => t.track).filter(t => t !== null)
            allTracks = [...allTracks,...track_list]
            offset += 100
        }

        const exists = allTracks.some(t => t.id === track.id)
        if (!exists) {
            const response = await fetch( `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uris: [track.uri] })
            })
        }
        onClose()

        
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 ">
            <div ref={menuRef} className="bg-[#191414] p-4 rounded-xl w-[80%] relative">
                
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-white text-xl font-bold mb-3">
                    Guardar "{track.name}" en:
                </h2>

                <PlaylistGrid playlists={playlists} onSelect={addTrackToPlaylist}/>
            </div>
        </div>
    )

}