import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import mockData from '../../mock-data';
import toast from 'react-hot-toast';

// type ApplierGreen = '544965' | '544965A' | '544965AF' | '544965D';
// type ApplierGold = '544990' | '544990A' | '544990AF' | '544990D';
// type ApplierViolet = '544995' | '544995A' | '544995AF' | '544995D';

type AddApplierItem = {
  dmNumber: string;
  itemCode: string;
  serialNumber: string;
  proformaInv: string;
  additionInfo: string;
};

const initialState: AddApplierItem[] = [...mockData];

const addAppllierSlice = createSlice({
  name: 'addApplier',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddApplierItem>) => {
      const item = action.payload;
      if (!item.dmNumber || !item.itemCode || !item.serialNumber) {
        toast.error('DM, Item, Serial Number cannot be empty');
        return;
      }
      state.push(action.payload);
    },
  },
});

export const { addItem } = addAppllierSlice.actions;

export default addAppllierSlice.reducer;
