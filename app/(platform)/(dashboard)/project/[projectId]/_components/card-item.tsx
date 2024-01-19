import React from 'react';
import { useCardModal } from '@/store/cardModalStore';
import { Draggable } from '@hello-pangea/dnd';

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role='button'
          className='truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
