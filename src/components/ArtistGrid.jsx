import Image from "next/image"

export default function ArtistGrid({artists, onSelect}) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artists.map(artist => (
                <div key={artist.id} className="flex flex-col items-center" onClick={()=> onSelect(artist.id)}>
                    <Image
                        src={artist.images[0]?.url || "/blank_pfp.webp"}
                        alt={artist.name}
                        width={artist.images[0]?.width || 60}
                        height={artist.images[0]?.height || 60}
                        className="w-24 h-24 rounded-full object-cover"
                    ></Image>
                    <p className="mt-2 text-center">{artist.name}</p>
                </div>
            ))}
        </div>
    )

}