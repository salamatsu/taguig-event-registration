import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./admin/authSlice";

const authPersistAdmin = {
  key: "authAdmin",
  version: 1,
  storage,
  whiteList: ["currentUser", "token"],
  blackList: ["isLoading"],
};

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(authPersistAdmin, authSlice.reducer),
});

export default rootReducer;
