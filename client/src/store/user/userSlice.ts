import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserType = {
  userId: string | null;
  username: string | null;
  role: 'admin' | 'editor' | 'user' | 'pending' | null;
};

const initialState: UserType = {
  userId: null,
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.username = action.payload.username;
    },
    resetUser: (state) => {
      state.userId = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { setCurrentUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
