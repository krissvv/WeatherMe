import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./rootReducer";
import { rootSaga } from "../saga/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
   reducer: rootReducer,
   middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
