"use client"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TopTracksList from "@/components/TopTracksList";


export default function ArtistDataPage({ id }) {

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        async function load() {
            try {
                const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}`);
                const top_tracks = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`)
                data.top_tracks = top_tracks.tracks
                setArtist(data);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    if (loading) return <p>Cargando artista…</p>;

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
                    src={artist.images[0]?.url || "/blank_pfp.webp"}
                    alt={artist.name}
                    width={artist.images[0]?.width || 60}
                    height={artist.images[0]?.height || 60}
                    className="h-48 w-48 object-cover rounded-md"
                ></Image>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                    <p>Seguidores: {artist.followers?.total || 0}</p>
                    <p>Popularidad: {artist.popularity}</p>
                    <p>Generos: {artist.genres.join(", ") || "N/A"}</p>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">Mejores Canciones: </h1>
                <TopTracksList songs={artist.top_tracks} onSelect={null} onFavourite={null}/>
            </div>
        </div>
    )

}