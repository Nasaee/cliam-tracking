import mongoose from 'mongoose';
import { ApplierType } from '../../shares/types';

const applierSchema = new mongoose.Schema<ApplierType>({
  dmNumber: { type: String, required: true },
  itemCode: { type: String, required: true },
  serialNumber: { type: String, required: true },
  getDifSerial: { type: String },
  proformaInv: { type: String, required: true },
  receiveDocs: { type: String },
  received: { type: Boolean, default: false },
  repairable: { type: String, default: 'pending' },
  additionInfo: { type: String },
  lastEditor: { type: String },
  rpa: { type: String },
});

const Applier = mongoose.model<ApplierType>('Applier', applierSchema);

export default Applier;
