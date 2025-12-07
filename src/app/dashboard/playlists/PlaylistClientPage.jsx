"use client"
import PlaylistGrid from "@/components/PlaylistGrid"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PlaylistClientPage() {

    const pathname = usePathname()
    const [playlists, setPlaylists] = useState([])
    const router = useRouter()

    useEffect(() => {
        const stored = localStorage.getItem('playlists')
        const stored_playlists = JSON.parse(stored) || []

        setPlaylists(stored_playlists)
    },[pathname])

    const handleSelect = (playlist) => {
        router.push(`/dashboard/playlists/${playlist.id}`)
    }

    return (
        <div>
            <PlaylistGrid playlists={playlists} onSelect={handleSelect}/>
        </div>
    )

}