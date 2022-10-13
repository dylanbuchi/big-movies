import { createSlice } from '@reduxjs/toolkit';
import { User } from '../interfaces/users';
export const userAuthenticationSlice = createSlice({
  name: 'userAuthentication',
  initialState: {
    isAuthenticated: false,
    sessionId: '',
    user: {} as User,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id') ?? '';
      state.user = action.payload;

      localStorage.setItem('userAccountId', action.payload.id);
    },
  },
});

export const { setUser } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
