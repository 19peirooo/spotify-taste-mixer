import { toggleFavouriteTrack } from "@/lib/favourites";
import Song from "./Song";

export default function SongList ({ songs, onSelect, onDelete }) {

    return (
        <ul className="w-full mt-2 flex flex-col gap-2">
            {songs.map((s,idx) => <li key={idx} onClick={onSelect} className="bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954] mt-2 w-full">
                <Song data={s} onFavourite={toggleFavouriteTrack} onDelete={onDelete}/></li>)}
        </ul>
    )

}