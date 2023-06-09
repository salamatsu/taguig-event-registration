import { all, fork } from "redux-saga/effects";
import authSaga from "../admin/authSaga";
export default function* adminSagas() {
  yield all([fork(authSaga)]);
}
