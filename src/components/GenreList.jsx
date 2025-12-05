

export default function GenreList({genres, onSelect}) {

    return (
        <ul className="w-full mt-2 flex gap-2">
            {genres.map(g => <li key={g} onClick={() => onSelect(g)} className="cursor-pointer px-3 py-1 bg-[#1DB954] text-white border border-black 
            rounded-full text-sm hover:bg-[#1DB954]/20 transition">
                {g}</li>)}
        </ul>
    )

}