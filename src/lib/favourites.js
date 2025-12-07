
export function toggleFavouriteTrack (track) {
    const favorites = JSON.parse(localStorage.getItem('favourite_tracks') || '[]')
    const isFavorite = favorites.find(f => f.id === track.id)

    if (isFavorite) {
        const updated = favorites.filter(f => f.id !== track.id)
        localStorage.setItem('favourite_tracks', JSON.stringify(updated))
    } else {
        favorites.push(track)
        localStorage.setItem('favourite_tracks', JSON.stringify(favorites))
    }
}

export function toggleFavouriteArtist (artist) {
    const favorites = JSON.parse(localStorage.getItem('favourite_artists') || '[]')
    const isFavorite = favorites.find(f => f.id === artist.id)

    if (isFavorite) {
        const updated = favorites.filter(f => f.id !== artist.id)
        localStorage.setItem('favourite_artists', JSON.stringify(updated))
    } else {
        favorites.push(artist)
        localStorage.setItem('favourite_artists', JSON.stringify(favorites))
    }
}

export function isFavouriteTrack (track) {
    const favorites = JSON.parse(localStorage.getItem('favourite_tracks') || '[]')
    return favorites.find(f => f.id === track.id)
}

export function isFavouriteArtist (artist) {
    const favorites = JSON.parse(localStorage.getItem('favourite_artists') || '[]')
    return favorites.find(f => f.id === artist.id)
}