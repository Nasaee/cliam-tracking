import OtherProducts from './otherProducts.mongo';
import { OtherProductsType } from '../../shares/types';

export async function saveOtherProducts(newItemsArray: OtherProductsType[]) {
  try {
    await Promise.all(
      newItemsArray.map(async (newItem) => {
        await OtherProducts.updateOne(
          {
            dmNumber: newItem.dmNumber,
            itemCode: newItem.itemCode,
          },
          newItem,
          { upsert: true }
        );
      })
    );
  } catch (error) {
    throw error;
  }
}

export async function findOtherProductById(id: string) {
  return await OtherProducts.findOne({ _id: id });
}

export async function getAllOtherProductDB() {
  return await OtherProducts.find({}, { __v: 0 }).sort({ dmNumber: -1 });
}

export async function deleteOtherProductById(id: string) {
  return await OtherProducts.deleteOne({ _id: id });
}

export async function updateOtherProductItem(item: OtherProductsType) {
  const updatedData = { ...item };
  if (updatedData.receiveDocs) {
    updatedData.received = true;
  } else {
    updatedData.received = false;
  }
  return await OtherProducts.findOneAndUpdate({ _id: item._id }, updatedData, {
    new: true,
  });
}
