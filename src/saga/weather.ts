import { all, call, put, select, takeLatest } from "typed-redux-saga";

import { RootState } from "../redux/rootReducer";
import { weatherSlice } from "../redux/slices/weather";

import { getAPIRequest } from "../utils/api";

function* onLoadCurrentLocationForecast() {
   yield* put(weatherSlice.actions.setCurrentLocationForecast(undefined));

   const currentLocation = yield* call(
      (): Promise<{
         lat: number;
         lon: number;
      }> =>
         new Promise((resolve) =>
            navigator.geolocation.getCurrentPosition(
               (position) =>
                  resolve({
                     lat: position.coords.latitude,
                     lon: position.coords.longitude,
                  }),
               () =>
                  resolve({
                     lat: 0,
                     lon: 0,
                  }),
            ),
         ),
   );

   const units = yield* select((state: RootState) => state.app.unit);
   const currentLocationName = yield* select(
      (state: RootState) => state.weather.currentLocation?.name,
   );

   try {
      if (!currentLocationName) {
         const currentLocationWeather = yield* call(() =>
            getAPIRequest("https://api.openweathermap.org/data/2.5/weather", {
               lat: currentLocation.lat,
               lon: currentLocation.lon,
               units,
            }),
         );

         yield* put(
            weatherSlice.actions.setCurrentLocationName(currentLocationWeather.data.name),
         );
      }

      const currentLocationWeatherOneCall = yield* call(() =>
         getAPIRequest("https://api.openweathermap.org/data/3.0/onecall", {
            lat: currentLocation.lat,
            lon: currentLocation.lon,
            units,
            exclude: "minutely,alerts",
         }),
      );

      yield* put(
         weatherSlice.actions.setCurrentLocationForecast([
            {
               icon: currentLocationWeatherOneCall.data.current.weather[0].icon,
               temperature: {
                  min: Math.round(currentLocationWeatherOneCall.data.daily[0].temp.min),
                  current: Math.round(currentLocationWeatherOneCall.data.current.temp),
                  max: Math.round(currentLocationWeatherOneCall.data.daily[0].temp.max),
                  feelsLike: Math.round(
                     currentLocationWeatherOneCall.data.current.feels_like,
                  ),
               },
               description:
                  currentLocationWeatherOneCall.data.current.weather[0].description,
               summary: currentLocationWeatherOneCall.data.daily[0].summary,
               humidity: currentLocationWeatherOneCall.data.current.humidity,
               pressure: currentLocationWeatherOneCall.data.current.pressure,
               clouds: currentLocationWeatherOneCall.data.current.clouds,
               windSpeed: currentLocationWeatherOneCall.data.current.wind_speed,
               sunrise: currentLocationWeatherOneCall.data.current.sunrise,
               sunset: currentLocationWeatherOneCall.data.current.sunset,
               hourly: currentLocationWeatherOneCall.data.hourly.map((data: any) => ({
                  icon: data.weather[0].icon,
                  temperature: data.temp,
                  time: data.dt,
               })),
            },
            ...currentLocationWeatherOneCall.data.daily.slice(1).map((data: any) => {
               return {
                  icon: data.weather[0].icon,
                  temperature: {
                     min: Math.round(data.temp.min),
                     current: Math.round(data.temp.day),
                     max: Math.round(data.temp.max),
                     feelsLike: Math.round(data.feels_like.day),
                  },
                  description: data.weather[0].description,
                  summary: data.summary,
                  humidity: data.humidity,
                  pressure: data.pressure,
                  clouds: data.clouds,
                  windSpeed: data.wind_speed,
                  sunrise: data.sunrise,
                  sunset: data.sunset,
               };
            }),
         ]),
      );
   } catch (error) {
      console.log(error);

      yield* put(weatherSlice.actions.setCurrentLocationName(undefined));
      yield* put(weatherSlice.actions.setCurrentLocationForecast(undefined));
   }
}

function* weatherSaga() {
   yield* all([
      takeLatest(
         weatherSlice.actions.loadCurrentLocationForecast,
         onLoadCurrentLocationForecast,
      ),
   ]);
}

export default weatherSaga;
