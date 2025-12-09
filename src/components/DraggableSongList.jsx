import { DndProvider } from "react-dnd";
import DraggableSong from "./DraggableSong";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function DraggableSongList ({ songs, onSelect, onDelete, setSongs }) {

    const moveTrack = (from, to) => {
        const updated = [...songs];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        setSongs(updated);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <ul className="w-full mt-2 flex flex-col gap-2">
                {songs.map((s,idx) => (
                    <DraggableSong key={s.id}
                        data={s}
                        idx={idx}
                        moveTrack={moveTrack}
                        onSelect={onSelect}
                        onDelete={onDelete}    
                    />
                ))}
            </ul>
        </DndProvider>
        
    )

}