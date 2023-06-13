import { put, call, takeLatest } from "redux-saga/effects";
import * as eventSlice from "../../slices/admin/eventSlice";
import {
  getEvents_api,
  addAttendee_api,
  getAttendees_api,
  searchTraceUser_api,
  updateAttendeeInfo_api,
  searchTraceUsers_api,
} from "../../api/admin/eventApi";

function* getEvents_Request() {
  const { getEvents_Error, getEvents_Success } = eventSlice;
  try {
    const {data} = yield call(getEvents_api);
    yield put(getEvents_Success(data));
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        getEvents_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        getEvents_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* searchTraceUser_Request({ payload }) {
  const { searchTraceUser_Error, searchTraceUser_Success } = eventSlice;
  try {
    const {data} = yield call(searchTraceUser_api, payload.body);
    yield put(searchTraceUser_Success(data));
    yield payload.callback();
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        searchTraceUser_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        searchTraceUser_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* searchTraceUsers_Request({ payload }) {
  const { searchTraceUsers_Error, searchTraceUsers_Success } = eventSlice;
  try {
    const {data} = yield call(searchTraceUsers_api, payload.body);
    yield put(searchTraceUsers_Success(data));
    yield payload.callback(data);
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        searchTraceUsers_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        searchTraceUsers_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* getAttendees_Request({ payload }) {
  const { getAttendees_Error, getAttendees_Success } = eventSlice;
  try {
    const {data} = yield call(getAttendees_api, payload.body);
    yield put(getAttendees_Success(data));
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        getAttendees_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        getAttendees_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* addAttendee_Request({ payload }) {
  const { addAttendee_Error, addAttendee_Success } = eventSlice;
  try {
    const {data} = yield call(addAttendee_api, payload.body);
    yield put(addAttendee_Success(data));
    yield payload.callback();
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        addAttendee_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        addAttendee_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* updateAttendeeInfo_Request({ payload }) {
  const { updateAttendeeInfo_Error, updateAttendeeInfo_Success } = eventSlice;
  try {
    const {data} = yield call(updateAttendeeInfo_api, payload.body);
    yield put(updateAttendeeInfo_Success(data));
    yield payload.callback();
    yield put(eventSlice.getAttendees({body: {
      params: payload.body.eventId
    }}));

  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        updateAttendeeInfo_Error({
          title: "Request Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        updateAttendeeInfo_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

export default function* eventSaga() {
  yield takeLatest(eventSlice.getEvents.type, getEvents_Request);
  yield takeLatest(eventSlice.searchTraceUser.type, searchTraceUser_Request);
  yield takeLatest(eventSlice.searchTraceUsers.type, searchTraceUsers_Request);
  yield takeLatest(eventSlice.getAttendees.type, getAttendees_Request);
  yield takeLatest(eventSlice.addAttendee.type, addAttendee_Request);
  yield takeLatest(
    eventSlice.updateAttendeeInfo.type,
    updateAttendeeInfo_Request
  );
}
