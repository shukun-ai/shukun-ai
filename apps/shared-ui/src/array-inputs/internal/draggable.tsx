import { Box } from '@mantine/core';
import { ConnectDragSource, useDrag } from 'react-dnd';

import { DroppableItem } from './types';

export type DraggableProps<T> = {
  dragType: string;
  item: T;
  index: number;
  renderItem: (
    itemValue: T,
    itemChange: (itemValue: T) => void,
    itemRemove: () => void,
    options: {
      drag: ConnectDragSource;
      index: number;
    },
  ) => JSX.Element;
  onUpdate: (newItemValue: T) => void;
  onRemove: () => void;
};

export const Draggable = <T,>({
  dragType,
  item,
  index,
  renderItem,
  onUpdate,
  onRemove,
}: DraggableProps<T>) => {
  const [, drag, preview] = useDrag<DroppableItem>(() => ({
    type: dragType,
    item: { sourceIndex: index },
  }));

  return (
    <Box ref={preview}>
      {renderItem(
        item,
        (newValue) => {
          onUpdate(newValue);
        },
        () => {
          onRemove();
        },
        {
          drag,
          index,
        },
      )}
    </Box>
  );
};
