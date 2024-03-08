import { GroupDataByReceiveStatus } from '../../../server/src/shares/types';

type GroupedResult = {
  [key: string]: {
    [name: string]: {
      name: string;
      totalAmount: number;
    };
  };
};

const groupDataByItem = (data: GroupDataByReceiveStatus[]) => {
  const result: GroupedResult = {
    '544965': {
      unreceive: {
        name: 'unreceive',
        totalAmount: 0,
      },
      repaired: {
        name: 'repaired',
        totalAmount: 0,
      },
      broken: {
        name: 'broken',
        totalAmount: 0,
      },
    },
    '544990': {
      unreceive: {
        name: 'unreceive',
        totalAmount: 0,
      },
      repaired: {
        name: 'repaired',
        totalAmount: 0,
      },
      broken: {
        name: 'broken',
        totalAmount: 0,
      },
    },
    '544995': {
      unreceive: {
        name: 'unreceive',
        totalAmount: 0,
      },
      repaired: {
        name: 'repaired',
        totalAmount: 0,
      },
      broken: {
        name: 'broken',
        totalAmount: 0,
      },
    },
  };

  data.forEach((item) => {
    const name = item.name.toLowerCase();

    for (const key in item) {
      if (key === 'name' || key === 'totalAmount') continue;

      const itemValue = item[key as keyof typeof item] as number;
      if (!result[key][name].totalAmount) {
        result[key][name].totalAmount = 0;
      }
      result[key][name].totalAmount += itemValue;
    }
  });

  return result;
};

export default groupDataByItem;
