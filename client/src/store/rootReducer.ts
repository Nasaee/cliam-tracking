import { combineReducers } from '@reduxjs/toolkit';
import addApplierSlice from './addApplier/addApplierSlice';
import userSlice from './user/userSlice';

export const rootReducer = combineReducers({
  applierToAddDB: addApplierSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
