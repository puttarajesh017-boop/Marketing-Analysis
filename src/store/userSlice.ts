import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'viewer';

export type UserState = {
  role: UserRole;
};

const initialState: UserState = {
  role: 'admin',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole(state: UserState, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;
export default userSlice.reducer;
