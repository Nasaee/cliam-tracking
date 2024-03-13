import { OtherProductsType } from '../../shares/types';
import OtherProducts from './otherProducts.mongo';

export function addProductDB(product: OtherProductsType) {
  const newProduct = new OtherProducts(product);
  newProduct.save();
  return newProduct;
}
