import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoading: false,
    currentUser: null,
    token: null,
  },
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginSuccess(state, { payload }) {
      state.currentUser = payload.data.data;
      state.token = payload.data.token;
      state.isLoading = false;
    },
    loginError(state, { payload }) {
      message.warning(payload.message);
      state.isLoading = false;
    },
    logout(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.token = null;
      location.reload();
    },
  },
});

export const { login, loginSuccess, loginError, logout } = authSlice.actions;
