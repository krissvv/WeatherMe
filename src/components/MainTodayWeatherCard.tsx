import { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faTint, faWind } from "@fortawesome/free-solid-svg-icons";

import { appSlice } from "../redux/slices/app";

import { useAction, useReduxState } from "../utils/hooks";

function MainTodayWeatherCard() {
   const selectedDay = useReduxState((state) => state.app.selectedDay);
   const forecast = useReduxState((state) => state.app.forecast);

   const setSelectedDay = useAction(appSlice.actions.setSelectedDay);

   const selectedDayCurrentTemperature = forecast
      ? forecast[selectedDay ?? 0]?.temperature.current
      : "--";

   const selectedDayWeatherIconURl = `http://openweathermap.org/img/wn/${
      forecast ? forecast[selectedDay ?? 0]?.icon : "01d"
   }@4x.png`;

   const selectedDayDescription = forecast
      ? forecast[selectedDay ?? 0]?.description
      : "--";

   const selectedDayHumidity = forecast ? forecast[selectedDay ?? 0]?.humidity : "--";

   const selectedDayClouds = forecast ? forecast[selectedDay ?? 0]?.clouds : "--";

   const selectedDayWindSpeed = forecast ? forecast[selectedDay ?? 0]?.windSpeed : "--";

   const onClickStatsHolder = useCallback(() => {
      if (selectedDay === undefined) setSelectedDay(0);
   }, [selectedDay, setSelectedDay]);

   return (
      <div
         className={`MainTodayWeatherCard${selectedDay === undefined ? " closed" : ""}`}
      >
         <div className="mainInfoBox">
            <h1 className="mainInfoBoxText">{selectedDayCurrentTemperature}</h1>
            <h1 className="mainInfoBoxTextShadow">{selectedDayCurrentTemperature}</h1>
            <div className="mainInfoBoxDetails">
               <div className="mainInfoBoxDetailsImage">
                  <img src={selectedDayWeatherIconURl} alt="Weather icon" />
               </div>
               <div className="mainInfoBoxDetailsDescription">
                  <p>{selectedDayDescription}</p>
               </div>
            </div>
         </div>
         <div className="statsHolder" onClick={onClickStatsHolder}>
            <div className="statsHolderDetails">
               <div className="statsHolderDetailsImage">
                  <img
                     src={`http://openweathermap.org/img/wn/${
                        forecast ? forecast[0].icon : "01d"
                     }@4x.png`}
                     alt="Weather icon"
                  />
               </div>
               <div className="statsHolderDetailsContent">
                  <p className="day">Today</p>
                  <div className="minMaxTemperatures">
                     <h1 className="max">
                        {forecast ? forecast[0].temperature.max : "--"}°
                     </h1>
                     <h1 className="min">
                        /{forecast ? forecast[0].temperature.min : "--"}°
                     </h1>
                  </div>
                  <p className="forecast">{forecast ? forecast[0].description : "--"}</p>
               </div>
            </div>
            <div className="stats">
               <div className="statsItem">
                  <FontAwesomeIcon icon={faTint} />
                  {selectedDayHumidity}%<span>Humidity</span>
               </div>
               <div className="statsItem">
                  <FontAwesomeIcon icon={faCloud} />
                  {selectedDayClouds} %<span>Cloudiness</span>
               </div>
               <div className="statsItem">
                  <FontAwesomeIcon icon={faWind} />
                  {selectedDayWindSpeed} km/h
                  <span>Wind speed</span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default memo(MainTodayWeatherCard);
