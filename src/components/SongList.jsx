import Song from "./Song";

export default function SongList ({ songs, onSelect }) {

    return (
        <ul>
            {songs.map(s => <li key={s.id} onClick={onSelect} className="bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954]">
                <Song data={s}/></li>)}
        </ul>
    )

}