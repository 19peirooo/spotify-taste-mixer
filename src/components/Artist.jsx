import { MdDelete } from "react-icons/md";
import Image from "next/image";

export default function Artist ({data, onDelete}) {

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(data.id)
    }

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
            <MdDelete className="cursor-pointer" onClick={handleDelete}/>
        </>
    )

}