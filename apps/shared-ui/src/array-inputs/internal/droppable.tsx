import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import {
  ACTIVE_DROPPABLE_HEIGHT,
  DroppableItem,
  INACTIVE_DROPPABLE_HEIGHT,
} from './types';

export type DroppableProps = {
  dropType: string;
  targetIndex: number;
  onMove: (sourceIndex: number, targetIndex: number) => void;
};

export const Droppable = ({
  dropType,
  targetIndex,
  onMove,
}: DroppableProps) => {
  const [{ isOver, canDrop }, drop] = useDrop<
    DroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: dropType,
    canDrop: (item) => {
      return item.sourceIndex !== targetIndex;
    },
    drop: (item) => {
      onMove(item.sourceIndex, targetIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const theme = useMantineTheme();

  const style = useMemo(() => {
    if (isOver && canDrop) {
      return {
        flex: 1,
        height: ACTIVE_DROPPABLE_HEIGHT,
        borderRadius: theme.defaultRadius,
        background: theme.colors.blue[8],
      };
    }
    if (canDrop) {
      return { flex: 1, height: INACTIVE_DROPPABLE_HEIGHT };
    }
    return {
      flex: 1,
      height: INACTIVE_DROPPABLE_HEIGHT,
    };
  }, [canDrop, isOver, theme]);

  return (
    <div style={{ display: 'flex' }} ref={drop}>
      <div style={style}></div>
    </div>
  );
};
