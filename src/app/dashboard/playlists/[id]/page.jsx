import PlaylistDataPage from "./PlaylistDataPage";

export async function generateMetadata({ params }) {
  const id = await params;

  return {
    title: `Playlist - ${id.id}`, 
    description: `Página de playlist con id ${id.id}`, 
  };
}

export default async function PlaylistSpecificPage({ params }) {
    const id = await params
    return (
        <PlaylistDataPage id={id.id}/>
    )

}