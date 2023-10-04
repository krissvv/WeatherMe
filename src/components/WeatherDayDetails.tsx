import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useReduxState, useTime } from "../utils/hooks";

function WeatherDayDetails() {
   const time = useTime();

   const selectedDay = useReduxState((state) => state.weather.selectedDay);
   const forecast = useReduxState((state) => state.weather.forecast);

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

         <div className="hourlyList">
            {forecast[selectedDay ?? 0].hourly?.map(
               ({ icon, temperature, time: hourTime }) => (
                  <div className="hourlyListItem" key={hourTime}>
                     <div className="hourlyListItemContent">
                        <p>{time.time(hourTime).time}</p>
                        <div className="weatherImage">
                           <img
                              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                              alt="Weather icon"
                           />
                        </div>
                        <p>{temperature}°</p>
                     </div>
                  </div>
               ),
            )}
         </div>
      </div>
   );
}

export default memo(WeatherDayDetails);
