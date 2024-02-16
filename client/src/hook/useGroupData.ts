const useGroupData = (data: object) => {
  const groupedArray: Record<number | string, number | string>[] = [];

  for (const key in data) {
    const groupedObject: Record<number | string, number | string> = {};
    groupedObject[key] = data[key as keyof typeof data];
    groupedArray.push(groupedObject);
  }

  return groupedArray;
};

export default useGroupData;
