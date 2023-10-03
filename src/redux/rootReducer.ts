import { combineReducers } from "redux";

import { appSlice } from "./slices/app";

export const rootReducer = combineReducers({
   app: appSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
