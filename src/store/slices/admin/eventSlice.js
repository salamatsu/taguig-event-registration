import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
    isLoading_getEvents: false,
    list_getEvents: [],

    isLoading_searchTraceUser: false,
    traceUser: null,

    isLoading_getAttendees: false,
    list_getAttendees: [],

    isLoading_addAttendee: false,
    isLoading_updateAttendeeInfo: false,
  },
  reducers: {
    getEvents(state) {
      state.isLoading_getEvents = true;
    },
    getEvents_Success(state, { payload }) {
      state.list_getEvents = payload;
      state.isLoading_getEvents = false;
    },
    getEvents_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_getEvents = false;
    },

    searchTraceUser(state) {
      state.isLoading_searchTraceUser = true;
    },
    searchTraceUser_Success(state, { payload }) {
      state.traceUser = payload;
      state.isLoading_searchTraceUser = false;
    },
    searchTraceUser_Error(state, { payload }) {
      message.warning(payload.message);
      state.isLoading_searchTraceUser = false;
    },
    searchTraceUser_Clear(state) {
      state.traceUser = null;

    },

    getAttendees(state) {
      state.isLoading_getAttendees = true;
    },
    getAttendees_Success(state, { payload}) {
      state.list_getAttendees = payload;
      state.isLoading_getAttendees = false;
    },
    getAttendees_Error(state, { payload }) {
      state.isLoading_getAttendees = false;
      message.warning(payload.message);
    },

    addAttendee(state) {
      state.isLoading_addAttendee = true;
    },
    addAttendee_Success(state, { payload }) {
      state.isLoading_addAttendee = false;
      message.success(payload.message);
    },
    addAttendee_Error(state, { payload }) {
      state.isLoading_addAttendee = false;
      message.warning(payload.message);
    },

    updateAttendeeInfo(state) {
      state.isLoading_updateAttendeeInfo = true;
    },
    updateAttendeeInfo_Success(state, { payload}) {
      state.isLoading_updateAttendeeInfo = false;
      message.success(payload.message);
    },
    updateAttendeeInfo_Error(state, { payload }) {
      state.isLoading_updateAttendeeInfo = false;
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
  addAttendee,
  addAttendee_Success,
addAttendee_Error,
  updateAttendeeInfo,
  updateAttendeeInfo_Success,
updateAttendeeInfo_Error
} = eventSlice.actions;
