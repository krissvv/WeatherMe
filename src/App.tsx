import { useEffect } from "react";

import { appSlice } from "./redux/slices/app";

import { useAction, useLocation, useReduxState } from "./utils/hooks";

import TopBar from "./components/TopBar";
import WeatherMainDayCard from "./components/WeatherMainDayCard";
import WeatherForecastList from "./components/WeatherForecastList";
import WeatherDayDetails from "./components/WeatherDayDetails";

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
         <WeatherMainDayCard />
         <WeatherForecastList days={4} />
         <WeatherDayDetails />
      </>
   );
}

export default App;
