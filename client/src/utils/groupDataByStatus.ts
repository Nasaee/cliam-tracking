type GroupDataByName = {
  name: string;
  totalAmount: number;
};

const groupDataByStatus = (data: object) => {
  const groupedArray: GroupDataByName[] = [];
  for (const key in data) {
    if (key === 'name' || key === 'totalAmount') continue;
    const groupedObject = {
      name: '',
      totalAmount: 0,
    };
    groupedObject.name = key;
    groupedObject.totalAmount = data[key as keyof typeof data];
    groupedArray.push(groupedObject);
  }

  return groupedArray;
};

export default groupDataByStatus;
