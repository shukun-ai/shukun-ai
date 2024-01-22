export const extractDifference = (
  obj1: ObjectWithKeyValues | undefined,
  obj2: ObjectWithKeyValues
): ObjectWithKeyValues => {
  if (!obj1) {
    return obj2;
  }

  const difference: ObjectWithKeyValues = {};

  for (const key in obj2) {
    if (
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      obj1[key] !== obj2[key]
    ) {
      difference[key] = obj2[key];
    }
  }

  return difference;
};

type ObjectWithKeyValues = { [key: string]: unknown };
