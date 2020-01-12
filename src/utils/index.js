export const updateObjectImmutable = (oldObj, newValues) => ({
  ...oldObj,
  ...newValues
});
