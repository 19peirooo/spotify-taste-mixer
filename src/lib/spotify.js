import { getAccessToken,refreshAccessToken } from "./auth";

export async function generatePlaylist(preferences) {
  const { tracks ,artists, genres, decades, popularity, mood } = preferences;

  let allTracks = []

  // 1. Obtener top tracks de artistas seleccionados
  if (artists) {
    for (const artist of artists) {
      const data = await spotifyRequest(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=ES`)
      const top_tracks = data.tracks || []
      allTracks = [...allTracks,...top_tracks]
    }
  }
  
  // 2. Buscar por géneros
  if (genres) { 
    if (genres.length >= 3 && genres.length <= 5) {
      for (const genre of genres) {
        const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`)
        const track_data = data?.tracks?.items || []
        allTracks = [...allTracks, ...track_data]
      } 
    } else {
      return -1
    }
  }
  
  //6. Filtrar por estado de animo
  if (mood) {
    const mood_genres = []
    if (mood.energy.min >= 0.6 && mood.danceability.min >= 0.7 && mood.valence.min >= 0.4) {
      mood_genres.push("reggaeton")
    }
    if (mood.energy.min >= 0.4 && mood.energy.max <= 0.8 && mood.valence.min >= 0.5) {
      mood_genres.push("pop")
    }
    if (mood.energy.min >= 0.7 && mood.danceability.min >= 0.6) {
      mood_genres.push("edm")
    }
    if (mood.energy.max <= 0.6 && mood.valence.max <= 0.6) {
      mood_genres.push("indie")
    }
    if (mood.energy.max <= 0.6 && mood.valence.max <= 0.6) {
      mood_genres.push("acoustic")
    }

    for (const genre of mood_genres) {
      const data = await spotifyRequest(`https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`)
      const track_data = data?.tracks?.items || []
      allTracks = [...allTracks, ...track_data]
    } 
  }
  
  // 3. Filtrar por década
  if (decades && decades.length > 0) {
    allTracks = allTracks.filter(track => {
      const year = new Date(track.album.release_date).getFullYear();
      return decades.some(decade => {
        const decadeStart = parseInt(decade);
        return year >= decadeStart && year < decadeStart + 10;
      });
    });
  }

  // 4. Filtrar por popularidad
  if (popularity) {
    const min = popularity.min
    const max = popularity.max
    allTracks = allTracks.filter(
      track => track.popularity >= min && track.popularity <= max
    );
  }
  console.log(allTracks)

  //5. Eliminar Duplicados
  allTracks= Array.from(
    new Map(allTracks.map(t => [t.id, t])).values()
  )



  //7. Añadir canciones del track widget
  let playlist = allTracks.slice(0,50)
  if (tracks) {
    playlist = [...playlist,...tracks]
  }
  return playlist;
}

export async function spotifyRequest(url) {
  let token = getAccessToken();
  
  if (!token) {
    // Intentar refrescar token
    token = await refreshAccessToken();
    if (!token) {
      // Redirigir a login
      window.location.href = '/';
      return;
    }
  }

  let response = await fetch(url, {
    headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
  });

  if (response.status === 401) {
    // Token expirado, refrescar
    token = await refreshAccessToken();
    // Reintentar petición

    if (!token) {
      window.location.href = "/";
      return;
    }

    response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}