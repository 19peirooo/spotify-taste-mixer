
export default function DecadeList({ decades, onSelect, selectedDecades }) {

    return (
        <ul>
            {decades.map(d => <button key={d} onClick={() => onSelect(d)}
                className={`text-white px-4 py-2 m-1 rounded ${selectedDecades.some(b => b === d) ? 'bg-[#212121]':'bg-[#1DB954]'}`}
                >{d}s</button>)}
        </ul>
    )

}