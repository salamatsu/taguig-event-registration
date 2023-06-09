import { all, fork } from "redux-saga/effects";
import authSaga from "../admin/authSaga";
import eventSaga from "../admin/eventSaga";
export default function* adminSagas() {
  yield all([fork(authSaga)]);
  yield all([fork(eventSaga)]);
}
