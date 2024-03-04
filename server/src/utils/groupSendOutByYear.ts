import { ApplierType } from '../models/applier/applier.mongo';

enum ITEM_CODE {
  green = '544965',
  gold = '544990',
  violet = '544995',
}

type ResultObj = { [key: string]: { year: number; [key: string]: number } };

function groupSendOutByYear(data: ApplierType[]) {
  const sendOutObj = data.reduce((result, item) => {
    const { dmNumber, itemCode } = item;

    const key = dmNumber.slice(0, 4);
    const year = Number('25' + key.slice(2, 4)) - 543;

    if (!result[key]) {
      result[key] = {
        year,
        [544965]: 0,
        [544990]: 0,
        [544995]: 0,
      };
    }

    if (itemCode.indexOf(ITEM_CODE.green) !== -1)
      result[key][ITEM_CODE.green] += 1;
    if (itemCode.indexOf(ITEM_CODE.gold) !== -1)
      result[key][ITEM_CODE.gold] += 1;
    if (itemCode.indexOf(ITEM_CODE.violet) !== -1)
      result[key][ITEM_CODE.violet] += 1;

    return result;
  }, {} as ResultObj);

  return Object.values(sendOutObj);
}
export default groupSendOutByYear;
