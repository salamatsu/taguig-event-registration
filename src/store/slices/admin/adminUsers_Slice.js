import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const adminUsers_Slice = createSlice({
  name: "adminUsers_Slice",
  initialState: {
    isLoading: false,
    list: [],
    isLoading_addAdminUser: false,
    isLoading_updateAdminUser: false,
    isLoading_changeAdminUserPassword: false,
  },
  reducers: {
    getAdminUsers(state) {
      state.isLoading = true;
    },
    getAdminUsers_Success(state, { payload }) {
      state.isLoading = false;
      state.list = payload;
    },
    getAdminUsers_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading = false;
    },

    addAdminUser(state) {
      state.isLoading_addAdminUser = true;
    },
    addAdminUser_Success(state, { payload }) {
      message.success(payload.message);
      state.isLoading_addAdminUser = false;
    },
    addAdminUser_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_addAdminUser = false;
    },

    updateAdminUser(state) {
      state.isLoading_updateAdminUser = true;
    },
    updateAdminUser_Success(state, { payload }) {
      message.success(payload.message);
      state.isLoading_updateAdminUser = false;
    },
    updateAdminUser_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_updateAdminUser = false;
    },

    changeAdminUserPassword(state) {
      state.isLoading_changeAdminUserPassword = true;
    },
    changeAdminUserPassword_Success(state, { payload }) {
      message.success(payload.message);
      state.isLoading_changeAdminUserPassword = false;
    },
    changeAdminUserPassword_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_changeAdminUserPassword = false;
    },
  },
});

export const {
  getAdminUsers,
  getAdminUsers_Success,
  getAdminUsers_Error,
  addAdminUser,
  addAdminUser_Success,
  addAdminUser_Error,
  updateAdminUser,
  updateAdminUser_Success,
  updateAdminUser_Error,
  changeAdminUserPassword,
  changeAdminUserPassword_Success,
  changeAdminUserPassword_Error,
} = adminUsers_Slice.actions;
