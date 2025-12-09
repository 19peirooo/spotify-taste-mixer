"use client"

import ArtistGrid from "@/components/ArtistGrid"
import TrackGrid from "@/components/TrackGrid"
import { spotifyRequest } from "@/lib/spotify"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardClientPage() {

    const [loading,setLoading] = useState(false)
    const [loadingType, setLoadingType] = useState("")
    const [tracks, setTracks] = useState([])
    const [artists,setArtists] = useState([])
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {

        async function loadTopArtists() {
            const stored = localStorage.getItem("favourite_artists")
            const existing = stored ? JSON.parse(stored) : []

            const data = await spotifyRequest("https://api.spotify.com/v1/me/top/artists")
            const fetched_artists = data.items || []

            const top_artists = [...existing,...fetched_artists]

            const unique = top_artists.reduce((acc, artist) => {
                if (!acc.some(a => a.id === artist.id)) {
                    acc.push(artist);
                }
                return acc;
            }, []);
            localStorage.setItem("favourite_artists",JSON.stringify(unique))
            setArtists(unique.slice(-10))
        }

        async function loadTopTracks() {
            const stored = localStorage.getItem("favourite_tracks")
            const existing = stored ? JSON.parse(stored) : []

            const data = await spotifyRequest("https://api.spotify.com/v1/me/top/tracks")
            const fetched_tracks = data.items || []

            const top_tracks = [...existing,...fetched_tracks]

            const unique = top_tracks.reduce((acc, track) => {
                if (!acc.some(t => t.id === track.id)) {
                    acc.push(track);
                }
                return acc;
            }, []);
            localStorage.setItem("favourite_tracks",JSON.stringify(unique))
            setTracks(unique.slice(-10))
        }

        async function loadPlaylists() {
            const stored = localStorage.getItem("playlists")
            const existing = stored ? JSON.parse(stored) : []

            const data = await spotifyRequest("https://api.spotify.com/v1/me/playlists")
            const fetched_playlists = data.items || []

            const playlists = [...existing,...fetched_playlists]

            const unique = playlists.reduce((acc, playlist) => {
                if (!acc.some(p => p.id === playlist.id)) {
                    acc.push(playlist);
                }
                return acc;
            }, []);
            console.log(unique)
            localStorage.setItem("playlists",JSON.stringify(unique))
        }

        setLoading(true)
        try {
            setLoadingType("Artistas Favoritos")
            loadTopArtists()
            setLoadingType("Canciones Favoritas")
            loadTopTracks()
            setLoadingType("Playlists")
            loadPlaylists()
        } finally {
            setLoading(false)
        }

    },[pathname])

    const handleArtist = (id) => {
        router.push(`/dashboard/artists/${id}`)
    }

    const handleTracks = (id) => {
        router.push(`/dashboard/tracks/${id}`)
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-xl font-bold mt-2">Cargando {loadingType}</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Artistas Favoritos</h2>
                <ArtistGrid artists={artists} onSelect={handleArtist}/>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Canciones Favoritas</h2>
                <TrackGrid tracks={tracks} onSelect={handleTracks}/>
            </div>
        </div>
    )

}