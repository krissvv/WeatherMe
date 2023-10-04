import { useEffect } from "react";

import { weatherSlice } from "./redux/slices/weather";

import { appSlice } from "./redux/slices/app";

import { useAction, useLocation, useReduxState } from "./utils/hooks";

import TopBar from "./components/TopBar";
import WeatherMainDayCard from "./components/WeatherMainDayCard";
import WeatherForecastList from "./components/WeatherForecastList";
import WeatherDayDetails from "./components/WeatherDayDetails";

function App() {
   const location = useLocation();

   const currentLocationName = useReduxState(
      (state) => state.weather.currentLocation?.name,
   );

   const setSelectedUnit = useAction(appSlice.actions.setUnit);
   const loadCurrentLocationForecast = useAction(
      weatherSlice.actions.loadCurrentLocationForecast,
   );

   useEffect(() => {
      setSelectedUnit((localStorage.getItem("unit") as Unit) ?? "metric");
      loadCurrentLocationForecast();
   }, []); // eslint-disable-line

   return (
      <>
         <TopBar
            location={
               location === undefined
                  ? "Loading..."
                  : location
                  ? currentLocationName ?? `${location.lat}, ${location.lon}`
                  : currentLocationName ?? `Location denied`
            }
         />
         <WeatherMainDayCard />
         <WeatherForecastList days={5} />
         <WeatherDayDetails />
      </>
   );
}

export default App;
