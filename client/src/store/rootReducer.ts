import { combineReducers } from '@reduxjs/toolkit';
import addApplierSlice from './addApplier/addApplierSlice';

export const rootReducer = combineReducers({
  applierToAddDB: addApplierSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
