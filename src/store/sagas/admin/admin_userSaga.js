import { put, call, takeLatest } from "redux-saga/effects";
import * as adminUsers_Slice from "../../slices/admin/adminUsers_Slice";
import { 
  getAdminUsers_api,
  addAdminUser_api,
  updateAdminUser_api,
  changeAdminUserPassword_api } from "../../api/admin/adminUsers_api";

function* getAdminUsers_Request() {
  const { getAdminUsers_Error, getAdminUsers_Success } = adminUsers_Slice;
  try {
    const { data } = yield call(getAdminUsers_api);
    yield put(getAdminUsers_Success(data));
  } catch (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.status === 400 ||
      error?.response?.status === 404
    ) {
      yield put(getAdminUsers_Error({ message: error?.response?.data.message }));
    } else {
      yield put(
        getAdminUsers_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* addAdminUser_Request({ payload }) {
  const { getAdminUsers, addAdminUser_Error, addAdminUser_Success } = adminUsers_Slice;
  try {
    const { data } = yield call(addAdminUser_api, payload.body);
    yield put(addAdminUser_Success(data));
    yield call(payload.callback);
    yield put(getAdminUsers());
  } catch (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.status === 400 ||
      error?.response?.status === 404
    ) {
      yield put(addAdminUser_Error({ message: error?.response?.data.message }));
    } else {
      yield put(
        addAdminUser_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* updateAdminUser_Request({ payload }) {
  const { getAdminUsers, updateAdminUser_Error, updateAdminUser_Success } = adminUsers_Slice;
  try {
    const { data } = yield call(updateAdminUser_api, payload.body);
    yield put(updateAdminUser_Success(data));
    yield call(payload.callback);
    yield put(getAdminUsers());
  } catch (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.status === 400 ||
      error?.response?.status === 404
    ) {
      yield put(updateAdminUser_Error({ message: error?.response?.data?.message }));
    } else {
      yield put(
        updateAdminUser_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

function* changeAdminUserPassword_Request({ payload }) {
  const { changeAdminUserPassword_Error, changeAdminUserPassword_Success } = adminUsers_Slice;
  try {
    const { data } = yield call(changeAdminUserPassword_api, payload.body);
    yield put(changeAdminUserPassword_Success(data));
    yield call(payload.callback);
  } catch (error) {
    const { status, data } = error.response;
    if (status === 401 || status === 403 || status === 400 || status === 404) {
      yield put(changeAdminUserPassword_Error({ message: data.message }));
    } else {
      yield put(
        changeAdminUserPassword_Error({
          title: "Request Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

export default function* adminUsers_Saga() {
  yield takeLatest(adminUsers_Slice.getAdminUsers.type, getAdminUsers_Request);
  yield takeLatest(adminUsers_Slice.addAdminUser.type, addAdminUser_Request);
  yield takeLatest(adminUsers_Slice.updateAdminUser.type, updateAdminUser_Request);
  yield takeLatest(
    adminUsers_Slice.changeAdminUserPassword.type,
    changeAdminUserPassword_Request
  );
}
