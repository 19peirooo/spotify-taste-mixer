import Link from "next/link";

export default function NavBar() {

    return (
        <nav>
            <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/search">Search</Link></li>
                <li><Link href="/dashboard/playlists">My Playlists</Link></li>
            </ul>
        </nav>
    )
}