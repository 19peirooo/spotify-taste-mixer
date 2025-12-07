import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { isFavouriteArtist } from "@/lib/favourites";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Artist ({data, onDelete, onFavourite}) {

    const [favourite,setFavourite] = useState(isFavouriteArtist(data))

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(data.id)
    }

    const handleFavourite = (e) => {
        e.stopPropagation()
        onFavourite(data)
        setFavourite(isFavouriteArtist(data))
    }

    return (
        <>  
            <Image
                src={data.image?.url || "/blank_pfp.webp"}
                alt={data.name}
                width={data.image?.width || 60}
                height={data.image?.height || 60}
                className="h-16 w-16 object-cover rounded-md"
            ></Image>
            <p className="flex-1 font-medium text-center">{data.name}</p>
            <div className="ml-auto flex flex-row items-center gap-3">
                <FaHeart className={`cursor-pointer ${favourite ? "text-red-500":""}`} onClick={handleFavourite}/>
                <MdDelete className="cursor-pointer" onClick={handleDelete}/>
            </div>
        </>
    )

}