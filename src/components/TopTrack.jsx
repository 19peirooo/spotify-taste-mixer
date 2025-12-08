    import { isFavouriteTrack } from "@/lib/favourites";
    import Image from "next/image"
    import { useState,useEffect } from "react";
    import { FaHeart } from "react-icons/fa";

    export default function TopTrack({ data,onFavourite }) {

        const [favourite,setFavourite] = useState(isFavouriteTrack(data))

        useEffect(() => {
            if (data) {
                setFavourite(isFavouriteTrack(data));
            }
        }, [data]);

        const handleFavourite = (e) => {
            e.stopPropagation()
            onFavourite(data)
            setFavourite(isFavouriteTrack(data))
        }

        return (
            <>
                <Image
                    src={data?.album?.images[0]?.url || "/blank_pfp.webp"}
                    alt={data?.name || "Cancion"}
                    width={60}
                    height={60}
                    className="h-16 w-16 rounded"
                />

                <div className="flex-1 font-medium text-center">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-gray-400 text-sm">{data?.album?.name || "Album Desconocido"}</p>
                    <p className="text-gray-300 text-sm">
                        {data?.artists.map(a => a.name).join(", ") || "Artistas No Disponible"}
                    </p>
                </div>

                <FaHeart className={`ml-auto cursor-pointer ${favourite ? "text-red-500":""}`} onClick={handleFavourite}/>
                
            </>
        )

    }