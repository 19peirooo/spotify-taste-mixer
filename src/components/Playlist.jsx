import Image from "next/image"

export default function Playlist({ playlist }) {
  return (
    <div className="relative group w-full aspect-square rounded-md overflow-hidden">
      <Image
        src={playlist.images[0]?.url || "/blank.webp"}
        alt={playlist.name}
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-center text-sm px-2">{playlist.name}</span>
      </div>
    </div>
  )
}
