import PlaylistGenerator from "./PlaylistGenerator"

export const metadata = {
    title: "Buscar",
    description: "Busqueda de canciones, artistas, etc."
}

export default function SearchPage() {

    return (
        <div>
            <PlaylistGenerator/>
        </div>
    )

}