import ArtistDataPage from "@/components/ArtistDataPage";

export async function generateMetadata({ params }) {
  const id = await params;

  return {
    title: `Artista - ${id.id}`, 
    description: `Página de artista con id ${id.id}`, 
  };
}

export default async function ArtistPage({ params }) {
    const id = await params
    return (
        <ArtistDataPage id={id.id}/>
    )

}