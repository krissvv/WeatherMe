import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useReduxState, useTime } from "../utils/hooks";

function WeatherDayDetails() {
   const time = useTime();

   const selectedDay = useReduxState((state) => state.app.selectedDay);
   const forecast = useReduxState((state) => state.app.forecast);

   if (!forecast) return null;

   return (
      <div className="weatherDayDetails">
         <p className="summary">{forecast[selectedDay ?? 0].summary}</p>

         <div className="sunTime">
            <div>
               <FontAwesomeIcon icon={faSun} className="sun" />
               {time.time(forecast[selectedDay ?? 0].sunrise).time}
            </div>
            <div>
               <FontAwesomeIcon icon={faMoon} className="moon" />
               {time.time(forecast[selectedDay ?? 0].sunset).time}
            </div>
         </div>
      </div>
   );
}

export default memo(WeatherDayDetails);
