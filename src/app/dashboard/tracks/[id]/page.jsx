import TrackPreviewPage from "./TrackPreviewPage";

export async function generateMetadata({ params }) {
  const id = await params;

  return {
    title: `Track - ${id.id}`, 
    description: `Página para ver el preview de cancion con id ${id.id}`, 
  };
}

export default async function TrackPage({ params }) {
    const id = await params
    return (
        <TrackPreviewPage id={id.id}/>
    )

}