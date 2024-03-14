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
  repairable: 'fixed' | 'broken' | 'pending';
  additionInfo: string;
  lastEditor: string;
  rpa: string;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'user' | 'pending';
};

export type GroupDataByReceiveStatus = {
  name: string;
  '544965': number;
  '544990': number;
  '544995': number;
  totalAmount: number;
};

export type OtherProductsType = {
  _id?: string;
  dmNumber: string;
  itemCode: string;
  quantity: number;
  serialNumber: string;
  getDifSerial: string;
  proformaInv: string;
  receiveDocs: string;
  received: boolean;
  repairable: 'fixed' | 'broken' | 'pending';
  additionInfo: string;
  rpa: string;
};
