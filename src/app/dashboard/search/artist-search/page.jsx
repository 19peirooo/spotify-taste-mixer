import ArtistFinder from "@/app/dashboard/search/artist-search/ArtistFinder"

export const metadata = {
    title: "Buscar por artistas",
    description: "Busqueda de canciones, artistas, etc."
}

export default function ArtistSearchPage() {

    return (
        <ArtistFinder/>
    )
}