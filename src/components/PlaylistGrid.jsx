import Playlist from "./Playlist";

export default function PlaylistGrid({ playlists, onSelect }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
      {playlists.map(p => (
        <li key={p.id} onClick={() => onSelect(p)}>
          <Playlist playlist={p} />
        </li>
      ))}
    </ul>
  )
}
