import Image from "next/image";

export default function ArtistSearched ({data}) {

    return (
        <>  
            <Image
                src={data.image?.url || "/blank_pfp.webp"}
                alt={data.name}
                width={data.image?.width || 60}
                height={data.image?.height || 60}
                className="h-16 w-16 object-cover rounded-md"
            ></Image>
            <p className="flex-1 font-medium text-center">{data.name}</p>
        </>
    )

}