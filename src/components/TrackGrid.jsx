

export default function TrackGrid ({tracks, onSelect}) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tracks.map(track => (
                <div key={track.id} className="flex flex-col items-center" onClick={()=>onSelect(track.id)}>
                    <img src={track.album?.images?.[0]?.url} alt={track.name} className="w-24 h-24 object-cover" />
                    <p className="mt-2 text-center">{track.name}</p>
                    <p className="text-sm text-gray-500 text-center">{track.artists.map(a => a.name).join(", ")}</p>
                </div>
            ))}
        </div>
    )

}