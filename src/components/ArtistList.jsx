import Artist from "./Artist";

export default function ArtistList({ artists, onSelect, onDelete }) {

    return (
        <>
            <ul className="w-full mt-2 flex flex-col gap-2">
                {artists.map(a => <li key={a.id} className="bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954]" 
                    onClick={() => onSelect?.(a.id)}>
                    <Artist data={a} onDelete={onDelete}/></li>)}
            </ul>
        </>
    )
}