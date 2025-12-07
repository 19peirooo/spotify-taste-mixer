
export default function DecadeList({ decades, onSelect, selectedDecades }) {

    return (
        <ul className="flex gap-2 flex-wrap justify-center">
            {decades.map(d => <button key={d} onClick={() => onSelect(d)}
                className={`px-4 py-2 rounded-xl font-bold transition-colors ${selectedDecades.some(b => b === d) 
                    ? "bg-[#1ed760] text-black "
                    : "bg-[#212121] text-white "}`}
                >{d}s</button>)}
        </ul>
    )

}