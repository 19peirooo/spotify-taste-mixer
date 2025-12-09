import { useDragDropTrack } from "@/lib/dragFunctions";
import Song from "./Song";

export default function DraggableSong({ data, idx, moveTrack, onFavourite, onDelete, onSelect }) {

    const { ref, isDragging, isOver } = useDragDropTrack(data, idx, moveTrack);

    return (
        <li
            ref={ref}
            onClick={() => onSelect(data)}
            className={`bg-[#181818] text-white p-2 rounded-md h-auto flex items-center hover:bg-[#1DB954] mt-2 w-full transition
                ${isDragging ? "opacity-40 z-10" : "z-0"}
                ${isOver ? "border border-green-500" : ""}
            `}
            style={{ cursor: "grab" }}
            >
            <Song data={data} onFavourite={onFavourite} onDelete={onDelete} />
        </li>
    )

}