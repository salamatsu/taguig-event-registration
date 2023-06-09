import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
    isLoading_getEvents: false,
    list_getEvents: [],

    isLoading_searchTraceUser: false,
    list_searchTraceUser: [],

    isLoading_getAttendees: false,
    list_getAttendees: [],
  },
  reducers: {
    getEvents(state) {
      state.isLoading_getEvents = true;
    },
    getEvents_Success(state, { payload: { data } }) {
      state.list_getEvents = data;
      state.isLoading_getEvents = false;
    },
    getEvents_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_getEvents = false;
    },

    searchTraceUser(state) {
      state.isLoading_searchTraceUser = true;
    },
    searchTraceUser_Success(state, { payload: { data } }) {
      state.list_searchTraceUser = data;
      state.isLoading_searchTraceUser = false;
    },
    searchTraceUser_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_searchTraceUser = false;
    },

    getAttendees(state) {
      state.isLoading_getAttendees = true;
    },
    getAttendees_Success(state, { payload: { data } }) {
      state.list_getAttendees = data;
      state.isLoading_getAttendees = false;
    },
    getAttendees_Error(state, { payload }) {
      state.isLoading_getAttendees = false;
      message.warning(payload.message);
    },
  },
});

export const {
  getEvents,
  getEvents_Success,
  getEvents_Error,
  searchTraceUser,
  searchTraceUser_Success,
  searchTraceUser_Error,
  getAttendees,
  getAttendees_Success,
  getAttendees_Error,
} = eventSlice.actions;
