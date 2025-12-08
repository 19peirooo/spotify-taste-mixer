import { toggleFavouriteTrack } from "@/lib/favourites";
import TopTrack from "./TopTrack";

export default function PlaylistTrackList ({ songs, onSelect }) {

    return (
        <ul className="w-full mt-2 flex flex-col gap-2">
            {songs.map((s,i) => <li key={i} onClick={onSelect} className="bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954] mt-2">
                <TopTrack data={s} onFavourite={toggleFavouriteTrack}/></li>)}
        </ul>
    )

}