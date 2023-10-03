import { all, fork } from "redux-saga/effects";

import userSaga from "./app";

export function* rootSaga() {
   yield all([fork(userSaga)]);
}
