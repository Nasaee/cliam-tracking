import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OtherProductsType } from '../../../../server/src/shares/types';
import toast from 'react-hot-toast';

export type AddOtherProductsType = Omit<
  OtherProductsType,
  '_id' | 'getDifSerial' | 'receiveDocs' | 'received' | 'repairable'
>;

const initialState: AddOtherProductsType[] = [];

const addOtherProducts = createSlice({
  name: 'addOtherProducts',
  initialState,
  reducers: {
    addOterProduct: (state, action: PayloadAction<AddOtherProductsType>) => {
      const { dmNumber, itemCode, quantity, proformaInv } = action.payload;

      if (!dmNumber || !itemCode || !quantity || !proformaInv) {
        toast.error('DM, Item, Quantity, Proforma Inv. cannot be empty');
        return;
      }

      state.push(action.payload);
    },
    deleteOtherProductItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(
        (item) => item.serialNumber === action.payload.id
      );
      state.splice(index, 1);
    },
    editOtherProductItem: (
      state,
      action: PayloadAction<AddOtherProductsType>
    ) => {
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

export const {
  addOterProduct,
  deleteOtherProductItem,
  editOtherProductItem,
  reset,
} = addOtherProducts.actions;
export default addOtherProducts.reducer;
