import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'viewer';

export type UserState = {
  role: UserRole;
};

function getInitialRole(): UserRole {
  try {
    const saved = localStorage.getItem('userRole');
    if (saved === 'admin' || saved === 'viewer') return saved;
  } catch {
    return 'admin';
  }
  return 'admin';
}

const initialState: UserState = {
  role: getInitialRole(),
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
