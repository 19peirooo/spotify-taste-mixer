import Link from "next/link";

export default function NavBar() {

    const linkstyle = "flex-1 bg-[#191414] h-full flex justify-center items-center text-white hover:bg-[#1DB954]"

    return (
        <nav className="bg-[#191414] h-16 flex items-center justify-center ">
            <ul className="w-full flex h-full">
                <li className="h-full flex-1"><Link href="/dashboard" className={linkstyle}>Dashboard</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/search" className={linkstyle}>Search</Link></li>
                <li className="h-full flex-1"><Link href="/dashboard/playlists" className={linkstyle}>My Playlists</Link></li>
            </ul>
        </nav>
    )
}