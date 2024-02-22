import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// type ApplierGreen = '544965' | '544965A' | '544965AF' | '544965D';
// type ApplierGold = '544990' | '544990A' | '544990AF' | '544990D';
// type ApplierViolet = '544995' | '544995A' | '544995AF' | '544995D';

export type ItemData = {
  dmNumber: string;
  itemCode: string;
  serialNumber: string;
  proformaInv: string;
  additionInfo: string;
};

const initialState: ItemData[] = [];

const addAppllierSlice = createSlice({
  name: 'addApplier',
  initialState,
  reducers: {
    addApplierItem: (state, action: PayloadAction<ItemData>) => {
      const item = action.payload;
      if (!item.dmNumber || !item.itemCode || !item.serialNumber) {
        toast.error('DM, Item, Serial Number cannot be empty');
        return;
      }
      state.push(action.payload);
    },

    deleteApplierItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(
        (item) => item.serialNumber === action.payload.id
      );
      state.splice(index, 1);
    },

    editApplierItem: (state, action: PayloadAction<ItemData>) => {
      const index = state.findIndex(
        (state) => state.serialNumber === action.payload.serialNumber
      );

      state[index] = action.payload;
    },
  },
});

export const { addApplierItem, deleteApplierItem, editApplierItem } =
  addAppllierSlice.actions;

export default addAppllierSlice.reducer;
