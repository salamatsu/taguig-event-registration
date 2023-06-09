import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./admin/authSlice";
import { eventSlice } from "./admin/eventSlice";

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
});

export default rootReducer;
