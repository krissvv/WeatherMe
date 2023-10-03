import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AppSliceStateT = {
   currentLocation?: {
      lat: number;
      lon: number;
      name?: string;
   };
   forecast?: {
      icon: string;
      temperature: {
         min: number;
         current: number;
         max: number;
         feelsLike: number;
      };
      description: string;
      humidity: number;
      pressure: number;
      clouds: number;
      windSpeed: number;
      sunrise: number;
      sunset: number;
   }[];
   /** 0 = today */
   selectedDay?: number;
};

const initialState: AppSliceStateT = {};

export const appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {
      loadCurrentLocationForecast: () => {},
      setCurrentLocation: (
         state,
         action: PayloadAction<AppSliceStateT["currentLocation"]>,
      ) => {
         state.currentLocation = action.payload;
      },
      setCurrentLocationName: (state, action: PayloadAction<string | undefined>) => {
         (state.currentLocation = state.currentLocation || {
            lat: 0,
            lon: 0,
         }).name = action.payload;
      },
      setCurrentLocationForecast: (
         state,
         action: PayloadAction<AppSliceStateT["forecast"]>,
      ) => {
         state.forecast = action.payload;
      },
      setSelectedDay: (state, action: PayloadAction<AppSliceStateT["selectedDay"]>) => {
         state.selectedDay = action.payload;
      },
   },
});
