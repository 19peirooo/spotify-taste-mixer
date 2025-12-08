"use client"
import Image from "next/image"
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { isFavouriteTrack } from "@/lib/favourites";
import { useEffect, useState } from "react";

export default function Song( {data, onFavourite, onDelete } ) {

    const [favourite,setFavourite] = useState(isFavouriteTrack(data))

    useEffect(() => {
        if (data) {
            setFavourite(isFavouriteTrack(data));
        }
    }, [data]);

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(data.id)
    }

    const handleFavourite = (e) => {
        e.stopPropagation()
        onFavourite(data)
        setFavourite(isFavouriteTrack(data))
    }

    return (
        <>
            <Image
                src={data.album.images[0].url}
                alt={data.name}
                width={60}
                height={60}
                className="h-16 w-16 rounded"
            />

            <div className="flex-1 font-medium text-center">
                <p className="font-medium">{data.name}</p>
                <p className="text-gray-400 text-sm">{data.album.name}</p>
                <p className="text-gray-300 text-sm">
                    {data.artists.map(a => a.name).join(", ")}
                </p>
            </div>

            <div className="ml-auto flex flex-row items-center gap-3">
                <FaHeart className={`cursor-pointer ${favourite ? "text-red-500":""}`} onClick={handleFavourite}/>
                <MdDelete className="cursor-pointer" onClick={handleDelete}/>
            </div>
        </>
    )

}