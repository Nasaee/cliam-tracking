import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export type ItemData = {
  dmNumber: string;
  itemCode: string;
  serialNumber: string;
  proformaInv: string;
  rpa: string;
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

    reset: () => {
      return initialState;
    },
  },
});

export const { addApplierItem, deleteApplierItem, editApplierItem, reset } =
  addAppllierSlice.actions;

export default addAppllierSlice.reducer;
