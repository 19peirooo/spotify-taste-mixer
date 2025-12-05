import Image from "next/image"

export default function Song( {data} ) {

    return (
        <>
            <Image
                src={data.album.images[0].url}
                alt={data.name}
                width={60}
                height={60}
                className="h-16 w-16 rounded"
            />

            <div className="flex-1 font-medium text-center">
                <p className="font-medium">{data.name}</p>
                <p className="text-gray-400 text-sm">{data.album.name}</p>
                <p className="text-gray-300 text-sm">
                    {data.artists.map(a => a.name).join(", ")}
                </p>
            </div>
        </>
    )

}