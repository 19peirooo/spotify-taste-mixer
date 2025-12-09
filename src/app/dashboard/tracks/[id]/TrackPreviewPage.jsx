"use client"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isFavouriteTrack, toggleFavouriteTrack } from "@/lib/favourites";
import { FaHeart } from "react-icons/fa";
import AudioPlayer from "@/components/AudioPlayer";

export default function TrackPreviewPage({ id }) {

    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favourite,setFavourite] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function load() {
            setLoading(true)
            try {
                const data = await spotifyRequest(`https://api.spotify.com/v1/tracks/${id}`)
                console.log(data)
                setTrack(data)
                setFavourite(isFavouriteTrack(data))

            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id]);

    const handleFavourite = (e) => {
        e.stopPropagation()
        toggleFavouriteTrack(track)
        setFavourite(isFavouriteTrack(track))
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-xl font-bold mt-2">Cargando Preview</p>
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
                    src={track?.album?.images[0]?.url || "/blank_pfp.webp"}
                    alt={track.name}
                    width={track.album.images[0]?.width || 60}
                    height={track.album.images[0]?.height || 60}
                    className="h-48 w-48 object-cover rounded-md"
                ></Image>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold mb-2">{track.name}</h1>
                        <FaHeart
                            className={`cursor-pointer ${favourite ? "text-red-500" : ""}`}
                            onClick={handleFavourite}
                        />
                    </div>
                    <p className="text-gray-400 text-sm">{track.album.name}</p>
                    <p className="text-lg text-gray-300">{track.artists.map(a => a.name).join(", ")}</p>
                </div>
            </div>
            {track.preview_url ? 
                <AudioPlayer url={track.preview_url}/>:
                <div className="flex flex-col items-center gap-4">
                    <p className="text-2xl font-bold text-center text-gray-300">Preview No Disponible</p>
                    <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                    >
                        Abrir en Spotify
                    </a>
                </div>
            }
        </div>
    )
}