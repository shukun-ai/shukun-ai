import { Box, Button } from '@mantine/core';

import { Fragment, useId } from 'react';

import { ConnectDragSource } from 'react-dnd';

import { Draggable } from './internal/draggable';
import { Droppable } from './internal/droppable';
import { ArrowHandler } from './sub/arrow-handler';

export type ArrayInputProps<T> = {
  value: T[];
  onCreate: () => void;
  onUpdate: (sourceIndex: number, newValue: T) => void;
  onMove: (sourceIndex: number, targetIndex: number) => void;
  onRemove: (sourceIndex: number) => void;
  renderItem: (
    itemValue: T,
    itemChange: (itemValue: T) => void,
    itemRemove: () => void,
    options: {
      drag: ConnectDragSource;
      index: number;
    },
  ) => JSX.Element;
  disabled?: boolean;
};

export const ArrayInputs = <T,>({
  value,
  onUpdate,
  onMove,
  onRemove,
  onCreate,
  renderItem,
  disabled,
}: ArrayInputProps<T>) => {
  const dragDropId = useId();

  return (
    <Box>
      <Box>
        {value.map((item, index) => (
          <Fragment key={index}>
            <Draggable
              dragType={`DRAG_DROP_${dragDropId}`}
              item={item}
              index={index}
              renderItem={renderItem}
              onUpdate={(newItemValue) => onUpdate(index, newItemValue)}
              onRemove={() => onRemove(index)}
            />
            <Droppable
              dropType={`DRAG_DROP_${dragDropId}`}
              targetIndex={index}
              onMove={onMove}
            />
          </Fragment>
        ))}
      </Box>
      <Box>
        <Button onClick={() => onCreate()} disabled={disabled}>
          新增
        </Button>
      </Box>
    </Box>
  );
};

ArrayInputs.ArrowHandler = ArrowHandler;
