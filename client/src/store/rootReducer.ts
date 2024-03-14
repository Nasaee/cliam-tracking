import { combineReducers } from '@reduxjs/toolkit';
import addApplierSlice from './addApplier/addApplierSlice';
import addAppllierSlice from './addOtherProducts/addOtherProducts';
import userSlice from './user/userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  applierToAddDB: addApplierSlice,
  otherProductsToAddDB: addAppllierSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
