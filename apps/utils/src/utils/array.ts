import {
  mutableAppend,
  mutableMove,
  mutableRemove,
  mutableUpdate,
} from './mutable-array';

export const append = <T>(sets: T[], newValue: T): T[] => {
  const cloned = [...sets];
  return mutableAppend(cloned, newValue);
};

export const update = <T>(sets: T[], index: number, newValue: T): T[] => {
  const cloned = [...sets];
  return mutableUpdate(cloned, index, newValue);
};

export const remove = <T>(sets: T[], index: number): T[] => {
  const cloned = [...sets];
  return mutableRemove(cloned, index);
};

export const move = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number
): T[] => {
  const cloned = [...sets];
  return mutableMove(cloned, sourceIndex, targetIndex);
};
