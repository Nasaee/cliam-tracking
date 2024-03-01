import mongoose from 'mongoose';

export type ApplierType = {
  _id: string;
  dmNumber: string;
  itemCode:
    | '544965'
    | '544965A'
    | '544965AF'
    | '544965D'
    | '544990'
    | '544990A'
    | '544990AF'
    | '544990D'
    | '544995'
    | '544995A'
    | '544995AF'
    | '544995D';
  serialNumber: string;
  getDifSerial: string;
  proformaInv: string;
  receiveDocs: string;
  received: boolean;
  repairable: boolean | undefined;
  additionInfo: string;
  lastEditor: string;
  rpa: string;
};

const applierSchema = new mongoose.Schema<ApplierType>({
  dmNumber: {
    type: String,
    required: true,
  },
  itemCode: { type: String, required: true },
  serialNumber: { type: String, required: true },
  getDifSerial: { type: String },
  proformaInv: { type: String },
  receiveDocs: { type: String },
  received: { type: Boolean, default: false },
  repairable: { type: Boolean || undefined, default: undefined },
  additionInfo: { type: String },
  lastEditor: { type: String },
  rpa: { type: String },
});

applierSchema.pre('save', async function (next) {
  if (this.isModified('receiveDocs')) {
    this.received = true;
  }
  next();
});

const Applier = mongoose.model<ApplierType>('Applier', applierSchema);

export default Applier;
