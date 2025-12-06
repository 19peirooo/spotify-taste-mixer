import PlaylistGenerator from "@/components/PlaylistGenerator"
import ArtistWidget from "@/components/widgets/ArtistWidget"

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