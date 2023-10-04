import { combineReducers } from "redux";

import { appSlice } from "./slices/app";
import { weatherSlice } from "./slices/weather";

export const rootReducer = combineReducers({
   app: appSlice.reducer,
   weather: weatherSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
