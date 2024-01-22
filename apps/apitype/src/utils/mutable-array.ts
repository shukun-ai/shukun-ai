export const mutableAppend = <T>(sets: T[], newValue: T): T[] => {
  sets.push(newValue);
  return sets;
};

export const mutableUpdate = <T>(
  sets: T[],
  index: number,
  newValue: T
): T[] => {
  sets.splice(index, 1, newValue);
  return sets;
};

export const mutableRemove = <T>(sets: T[], index: number): T[] => {
  sets.splice(index, 1);
  return sets;
};

export const mutableMove = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number
): T[] => {
  const startIndex = sourceIndex < 0 ? sets.length + sourceIndex : sourceIndex;

  if (startIndex >= 0 && startIndex < sets.length) {
    const endIndex = targetIndex < 0 ? sets.length + targetIndex : targetIndex;

    const [item] = sets.splice(sourceIndex, 1);
    sets.splice(endIndex, 0, item);
  }

  return sets;
};
