import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./admin/authSlice";
import { eventSlice } from "./admin/eventSlice";
import { adminUsers_Slice } from "./admin/adminUsers_Slice";

const authPersistAdmin = {
  key: "authAdmin",
  version: 1,
  storage,
  whiteList: ["currentUser", "token"],
  blackList: ["isLoading"],
};

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(authPersistAdmin, authSlice.reducer),
  [eventSlice.name]: eventSlice.reducer,
  [adminUsers_Slice.name]: adminUsers_Slice.reducer,
});

export default rootReducer;
