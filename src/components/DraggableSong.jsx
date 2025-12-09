import { dragTrack,dropTrack } from "@/lib/dragFunctions"
import Song from "./Song";

export default function DraggableSong({ data, idx, moveTrack, onFavourite, onDelete }) {

    const { isDragging, dragRef } = dragTrack(data, idx, moveTrack);
    const { isOver, dropRef } = dropTrack(idx, moveTrack);

    return (
        <li
            ref={(el) => dragRef(dropRef(el))}
            onClick={() => onSelect(data)}
            className={`bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954] mt-2 w-full transition
                ${isDragging ? "opacity-50" : ""}
                ${isOver ? "border border-green-500" : ""}
            `}
            style={{ cursor: "grab" }}
            >
            <Song data={data} onFavourite={onFavourite} onDelete={onDelete} />
        </li>
    )

}