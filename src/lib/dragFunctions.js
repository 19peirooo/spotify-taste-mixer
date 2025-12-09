import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

// Elemento arrastrable (solo arrastra)
export function dragTrack(track, idx) {

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "track",
        item: { id: track.id, index: idx },   // <- CORREGIDO
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [idx, track.id]);

    return { isDragging, dragRef };
}

// Zona receptora (permite soltar)
export function dropTrack(idx, moveTrack) {

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "track",
        hover: (item) => {

            // Evita mover si es el mismo índice
            if (item.index === idx) return;

            // Llama a la función que ordena la lista
            moveTrack(item.index, idx);  

            // Actualiza el índice del elemento que arrastras
            item.index = idx;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [idx, moveTrack]);

    return { isOver, dropRef };
}
