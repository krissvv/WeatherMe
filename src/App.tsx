import { useEffect } from "react";

import { appSlice } from "./redux/slices/app";

import { useAction, useLocation, useReduxState } from "./utils/hooks";

import TopBar from "./components/TopBar";
import MainTodayWeatherCard from "./components/MainTodayWeatherCard";
import WeatherForecastList from "./components/WeatherForecastList";

function App() {
   const location = useLocation();

   const currentLocationName = useReduxState((state) => state.app.currentLocation?.name);

   const loadCurrentLocationForecast = useAction(
      appSlice.actions.loadCurrentLocationForecast,
   );

   useEffect(() => {
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
         <MainTodayWeatherCard />
         <WeatherForecastList days={4} />
      </>
   );
}

export default App;
