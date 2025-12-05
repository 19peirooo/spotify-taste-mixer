import SongSearched from "./SongSearched";

export default function SongSearchList ({ songs, onSelect }) {

    return (
        <ul className="w-full mt-2 flex flex-col gap-2">
            {songs.map(s => <li key={s.id} onClick={() => onSelect(s)} className="bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954] mt-2">
                <SongSearched data={s}/></li>)}
        </ul>
    )

}