"use client"
import { spotifyRequest } from "@/lib/spotify"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TopTracksList from "@/components/TopTracksList";
import { isFavouriteArtist, toggleFavouriteArtist } from "@/lib/favourites";
import { FaHeart } from "react-icons/fa";
import PlaylistMenu from "@/components/PlaylistMenu";


export default function ArtistDataPage({ id }) {

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favourite,setFavourite] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function load() {
            try {
                const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}`);
                const top_tracks = await spotifyRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`)
                data.top_tracks = top_tracks.tracks
                setArtist(data);
                setFavourite(isFavouriteArtist(data))
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const handleFavourite = (e) => {
        e.stopPropagation()
        toggleFavouriteArtist(artist)
        setFavourite(isFavouriteArtist(artist))
    }

    const saveTrack = (track) => {
        setSelectedTrack(track)
        setIsOpen(true)
    }

    const handleClose = () => {
        setSelectedTrack(null)
        setIsOpen(false)
    }

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
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                        <FaHeart
                            className={`cursor-pointer ${favourite ? "text-red-500" : ""}`}
                            onClick={handleFavourite}
                        />
                    </div>
                    <p>Seguidores: {artist.followers?.total || 0}</p>
                    <p>Popularidad: {artist.popularity}</p>
                    <p>Generos: {artist.genres.join(", ") || "N/A"}</p>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">Mejores Canciones: </h1>
                <TopTracksList songs={artist.top_tracks} onSelect={saveTrack} />
                {isOpen && selectedTrack && <PlaylistMenu track={selectedTrack} onClose={handleClose} isOpen={isOpen}/>}
            </div>
        </div>
    )

}