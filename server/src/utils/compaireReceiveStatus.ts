import { ApplierType } from '../models/applier/applier.mongo';
import { ITEM_CODE } from './config';

export type GroupDataByReceiveStatus = {
  name: string;
  '544965': number;
  '544990': number;
  '544995': number;
  totalAmount: number;
};

const groupDataByReceiveStatus = (
  data: ApplierType[]
): GroupDataByReceiveStatus[] => {
  const dataCompare = {
    unreceiveable: {
      name: 'Unreceive',
      totalAmount: 0,
      [ITEM_CODE.green]: 0,
      [ITEM_CODE.gold]: 0,
      [ITEM_CODE.violet]: 0,
    },
    receiveableAndRepaired: {
      name: 'Repaired',
      totalAmount: 0,
      [ITEM_CODE.green]: 0,
      [ITEM_CODE.gold]: 0,
      [ITEM_CODE.violet]: 0,
    },
    receiveableAndBroken: {
      name: 'Broken',
      totalAmount: 0,
      [ITEM_CODE.green]: 0,
      [ITEM_CODE.gold]: 0,
      [ITEM_CODE.violet]: 0,
    },
  };

  type ItemCode = string;
  type ObjectToUpdate = keyof typeof dataCompare;

  function increaseItemAmount(itemCode: ItemCode, objToUpdate: ObjectToUpdate) {
    itemCode.indexOf(ITEM_CODE.green) !== -1 &&
      dataCompare[objToUpdate][ITEM_CODE.green]++;

    itemCode.indexOf(ITEM_CODE.gold) !== -1 &&
      dataCompare[objToUpdate][ITEM_CODE.gold]++;

    itemCode.indexOf(ITEM_CODE.violet) !== -1 &&
      dataCompare[objToUpdate][ITEM_CODE.violet]++;
  }

  data.forEach((item: ApplierType) => {
    const { itemCode, receiveDocs, repairable } = item;

    if (!receiveDocs) {
      dataCompare.unreceiveable.totalAmount += 1;
      increaseItemAmount(itemCode, 'unreceiveable');
    }

    if (receiveDocs && repairable === 'fixed') {
      dataCompare.receiveableAndRepaired.totalAmount += 1;
      increaseItemAmount(itemCode, 'receiveableAndRepaired');
    }

    if (receiveDocs && repairable === 'broken') {
      dataCompare.receiveableAndBroken.totalAmount += 1;
      increaseItemAmount(itemCode, 'receiveableAndBroken');
    }
  });
  return Object.values(dataCompare);
};

export default groupDataByReceiveStatus;
