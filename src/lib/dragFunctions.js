import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

// DRAG + DROP HOOKS
export function useDragDropTrack(track, idx, moveTrack) {
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: "track",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = idx;
      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverRect.top;

      // Evita múltiples swaps: solo mover si el mouse cruzó la mitad
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Mueve la canción
      moveTrack(dragIndex, hoverIndex);

      // Actualiza índice del item arrastrado para que no se vuelva a disparar
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "track",
    item: { id: track.id, index: idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Conecta drag y drop al mismo ref
  drag(drop(ref));

  return { ref, isDragging, isOver };
}
