import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginAction, LogoutAction, UserType } from '../types/AuthTypes';

let initialState: {
  user: null | UserType;
  isAuthenticated: boolean;
  isAdmin: boolean;
} = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginAction>) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.isAdmin = action.payload.user.role === 'admin';
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
