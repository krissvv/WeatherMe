import { all, fork } from "redux-saga/effects";

import appSaga from "./app";
import weatherSaga from "./weather";

export function* rootSaga() {
   yield all([fork(appSaga), fork(weatherSaga)]);
}
