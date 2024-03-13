import mongoose from 'mongoose';
import { OtherProductsType } from '../../shares/types';

const otherProductsSchema = new mongoose.Schema<OtherProductsType>({
  dmNumber: { type: String, required: true },
  itemCode: { type: String, required: true },
  quantity: { type: Number, required: true },
  serialNumber: { type: String, default: '' },
  getDifSerial: { type: String, default: '' },
  proformaInv: { type: String, required: true },
  receiveDocs: { type: String, default: '' },
  received: { type: Boolean, default: false },
  repairable: { type: String, default: 'pending' },
  additionInfo: { type: String, default: '' },
});
const OtherProducts = mongoose.model<OtherProductsType>(
  'OtherProducts',
  otherProductsSchema
);
export default OtherProducts;
