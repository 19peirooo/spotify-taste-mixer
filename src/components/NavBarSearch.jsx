"use client"
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBarSearch() {

    const [open, setOpen] = useState(false)

    const linkstyle = "flex-1 bg-[#191414] h-full flex justify-center items-center text-white hover:bg-[#1DB954]"
    const mobilelinkstyle = "w-full text-center py-2 text-white hover:bg-[#1DB954] rounded";


    return (
        <nav className="bg-[#191414] h-16 flex relative items-center justify-center px-4">
            <ul className="hidden md:flex w-full h-full ">
                <li className="h-full flex-1"><Link href="/dashboard/search" className={linkstyle}>Generador de Playlists</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/artist-search" className={linkstyle}>Busqueda De Artistas</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/decade-search" className={linkstyle}>Busqueda Por Decada</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/genre-search" className={linkstyle}>Busqueda Por Genero</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/mood-search" className={linkstyle}>Busqueda Por Ánimo</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/popularity-search" className={linkstyle}>Busqueda Por Popularidad</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search/track-search" className={linkstyle}>Busqueda Por Cancion</Link></li>
            </ul>

            <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
                {open ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>

            {open && 
            <ul className="absolute top-16 left-0 w-full bg-[#191414] flex flex-col space-y-1 p-2 md:hidden z-50">
                <li onClick={setOpen(false)}><Link href="/dashboard/search" className={mobilelinkstyle}>Generador de Playlists</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/artist-search" className={mobilelinkstyle}>Busqueda De Artistas</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/decade-search" className={mobilelinkstyle}>Busqueda Por Decada</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/genre-search" className={mobilelinkstyle}>Busqueda Por Genero</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/mood-search" className={mobilelinkstyle}>Busqueda Por Ánimo</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/popularity-search" className={mobilelinkstyle}>Busqueda Por Popularidad</Link></li>
                <li onClick={setOpen(false)}><Link href="/dashboard/search/track-search" className={mobilelinkstyle}>Busqueda Por Cancion</Link></li>
            </ul>}
        </nav>
    )
}