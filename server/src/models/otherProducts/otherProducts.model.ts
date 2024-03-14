import { promises } from 'dns';
import { OtherProductsType } from '../../shares/types';
import OtherProducts from './otherProducts.mongo';

export async function addProductDB(newItemsArray: OtherProductsType[]) {
  try {
    const newItems = await Promise.all(
      newItemsArray.map(async (newItem) => {
        const item: OtherProductsType = {
          dmNumber: newItem.dmNumber,
          itemCode: newItem.itemCode,
          quantity: newItem.quantity,
          serialNumber: newItem.serialNumber || '',
          proformaInv: newItem.proformaInv || '',
          additionInfo: newItem.additionInfo || '',
          rpa: newItem.rpa || '',
          getDifSerial: newItem.getDifSerial || '',
          receiveDocs: newItem.receiveDocs || '',
          received: newItem.received || false,
          repairable: newItem.repairable || false,
        };
        const newProduct = await OtherProducts.create(item);
        newProduct.save();
        return newItem;
      })
    );
    return newItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
