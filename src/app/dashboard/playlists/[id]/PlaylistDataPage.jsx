"use client"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TopTracksList from "@/components/TopTracksList";
import PlaylistTrackList from "@/components/PlaylistTrackList";


export default function PlaylistDataPage({ id }) {

    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        async function load() {
            try {
                const data = await spotifyRequest(`https://api.spotify.com/v1/playlists/${id}`);
                console.log(data)
                setPlaylist(data)
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    if (loading) return <p>Cargando playlist…</p>;

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
                    src={playlist.images[0]?.url || "/blank_pfp.webp"}
                    alt={playlist.name}
                    width={playlist.images[0]?.width || 60}
                    height={playlist.images[0]?.height || 60}
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
                <PlaylistTrackList songs={playlist.tracks.items} onSelect={null} />
            </div>
        </div>
    )

}