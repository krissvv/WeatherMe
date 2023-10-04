import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AppSliceStateT = {
   unit: Unit;
};

const initialState: AppSliceStateT = {
   unit: "metric",
};

export const appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {
      setUnit: (state, action: PayloadAction<AppSliceStateT["unit"]>) => {
         state.unit = action.payload;
         localStorage.setItem("unit", action.payload);
      },
   },
});
