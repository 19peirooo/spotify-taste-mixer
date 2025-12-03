import Link from "next/link";

export default function NavBarSearch() {

    const linkstyle = "flex-1 bg-[#191414] h-full flex justify-center items-center text-white hover:bg-[#1DB954]"

    return (
        <nav className="bg-[#191414] h-16 flex items-center justify-center ">
            <ul className="w-full flex h-full">
                <li className="h-full flex-1"><Link href="/dashboard/search" className={linkstyle}>Generador de Playlists</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/artist-search" className={linkstyle}>Busqueda Por Artista</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/decade-search" className={linkstyle}>Busqueda Por Decada</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/genre-search" className={linkstyle}>Busqueda Por Genero</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/mood-search" className={linkstyle}>Busqueda Por Ánimo</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/popularity-search" className={linkstyle}>Busqueda Por Popularidad</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/track-search" className={linkstyle}>Busqueda Por Cancion</Link></li>
            </ul>
        </nav>
    )
}