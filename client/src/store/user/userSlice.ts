import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
  userId: string | null;
  role: 'admin' | 'editor' | 'user' | 'pending' | null;
};

const initialState: UserState = {
  userId: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
