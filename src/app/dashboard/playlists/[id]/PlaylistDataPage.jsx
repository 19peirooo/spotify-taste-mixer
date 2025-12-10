"use client"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlaylistTrackList from "@/components/PlaylistTrackList";
import { getAccessToken } from "@/lib/auth";


export default function PlaylistDataPage({ id }) {

    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tracks,setTracks] = useState([])
    const [displayedTracks, setDisplayedTracks] = useState([])
    const [displayIdx, setDisplayIdx] = useState(0)
    const router = useRouter()

    const handleNext = () => {
        const newDisplayIdx = displayIdx + 50

        if (newDisplayIdx < tracks.length) {
            setDisplayIdx(newDisplayIdx)
            const newTracks = tracks.slice(newDisplayIdx,newDisplayIdx+50)
            console.log(newTracks)
            setDisplayedTracks(newTracks)
        }
    }

    const handlePrev = () => {
        let newDisplayIdx = displayIdx - 50
        if (newDisplayIdx <= 0) {
            newDisplayIdx = 0
        }

        const newTracks = tracks.slice(newDisplayIdx,newDisplayIdx+50)
        setDisplayedTracks(newTracks)
        setDisplayIdx(newDisplayIdx)
    }

    useEffect(() => {
        async function load() {
            try {
                const data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${id}`);
                setPlaylist(data)

                let allTracks = []
                let offset = 0

                while (offset < data.tracks.total) {
                    const data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=100&offset=${offset}`)
                    const track_data = data?.items || []
                    const track_list = track_data.map(t => t.track).filter(t => t !== null)
                    allTracks = [...allTracks,...track_list]
                    offset += 100
                }
                setTracks(allTracks)
                setDisplayedTracks(allTracks.slice(0,50))
                setDisplayIdx(0)
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const handleTrackClick = (track) => {
        router.push(`/dashboard/tracks/${track.id}`)
    }

    const deleteTrack = async (track) => {
        const token = getAccessToken()

        const response = await fetch( `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tracks: [{ uri: track.uri }]
                })
            }
        )

        if (response.ok) {
            setTracks(tracks.filter(t => t.id !== track.id))
            setDisplayedTracks(displayedTracks.filter(t => t.id !== track.id))
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-xl font-bold mt-2">Cargando Playlist</p>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col gap-8 p-6 bg-[#191414]">
            <button
                onClick={() => router.back()}
                className="absolute top-4 right-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
            >
                ← Volver
            </button>
            <div className="flex items-center gap-6">
                <Image
                    src={playlist?.images[0]?.url || "/blank_pfp.webp"}
                    alt={playlist?.name || "Playlist"}
                    width={playlist?.images[0]?.width || 60}
                    height={playlist?.images[0]?.height || 60}
                    className="h-48 w-48 object-cover rounded-md"
                ></Image>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
                    </div>
                    <p>{playlist.description}</p>
                    <p>Numero Canciones: {playlist.tracks.total}</p>
                </div>
                
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">Canciones: </h1>
                <div className="flex justify-between mb-4">
                    <button
                        onClick={handlePrev}
                        disabled={displayIdx === 0}
                        className={`px-4 py-2 rounded-md ${displayIdx === 0 ? "bg-gray-700" : "bg-green-600 hover:bg-green-500"}`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={displayIdx + 50 >= tracks.length}
                        className={`px-4 py-2 rounded-md ${(displayIdx + 50 >= playlist.tracks.total) ? "bg-gray-700" : "bg-green-600 hover:bg-green-500"}`}
                    >
                        Siguiente
                    </button>
                </div>
                <PlaylistTrackList songs={displayedTracks} onSelect={handleTrackClick} onDelete={deleteTrack} />
            </div>
        </div>
    )

}