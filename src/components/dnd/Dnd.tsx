import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function Builder() {
  const [sections, setSections] = useState([
    { id: "1", name: "Hero Section" },
    { id: "2", name: "Features Section" },
    { id: "3", name: "Testimonials" },
  ]);

  function handleDrag(result) {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSections(items);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="builder">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((s, index) => (
              <Draggable key={s.id} draggableId={s.id} index={index}>
                {provided => (
                  <div
                    className="p-4 mb-2 bg-gray-800 text-white rounded"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {s.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
