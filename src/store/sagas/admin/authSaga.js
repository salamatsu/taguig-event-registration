import { put, call, takeLatest } from "redux-saga/effects";
import * as authSlice from "../../slices/admin/authSlice";
import { login_api } from "../../api/admin/authApi";

function* login_Request({ payload }) {
  const { loginError, loginSuccess } = authSlice;
  try {
    const result = yield call(login_api, payload.body);
    yield put(loginSuccess(result));
    yield payload.successCb();
  } catch (error) {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 400 ||
      error.response?.status === 404
    ) {
      yield put(
        loginError({
          title: "Login Failed",
          message: error.response?.data.message,
        })
      );
    } else {
      yield put(
        loginError({
          title: "Login Failed",
          message: "Please contact support.",
        })
      );
    }
  }
}

export default function* authSaga() {
  yield takeLatest(authSlice.login.type, login_Request);
}
