import { all, fork } from "redux-saga/effects";
import authSaga from "../admin/authSaga";
import eventSaga from "../admin/eventSaga";
import adminUsers_Saga from "../admin/admin_userSaga";
export default function* adminSagas() {
  yield all([fork(authSaga)]);
  yield all([fork(eventSaga)]);
  yield all([fork(adminUsers_Saga)]);
}
