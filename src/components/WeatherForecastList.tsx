import { memo, useCallback } from "react";

import { appSlice } from "../redux/slices/app";

import { useAction, useReduxState, useTime } from "../utils/hooks";

type WeatherForecastListProps = {
   days: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

type WeatherForecastListItemProps = {
   dayName: string;
   date: string;
   weatherIcon: string;
   forecast?: string;
   minTemperature?: number | string;
   maxTemperature?: number | string;
   onClick?: (onClickValue?: number) => void;
   onClickValue?: number;
};

const WeatherForecastListItem = memo(function WeatherForecastListItem({
   dayName,
   date,
   weatherIcon,
   forecast,
   minTemperature,
   maxTemperature,
   onClick,
   onClickValue,
}: WeatherForecastListItemProps) {
   const onClickItem = useCallback(
      () => onClick?.(onClickValue),
      [onClick, onClickValue],
   );

   return (
      <div className="weatherForecastListItem" onClick={onClickItem}>
         <div className="date">
            <h4>{dayName}</h4>
            <p>{date}</p>
         </div>
         <div className="weather">
            <div className="weatherImage">
               <img src={weatherIcon} alt="Weather icon" />
            </div>
            <p>{forecast}</p>
         </div>
         <div className="temperature">
            {maxTemperature}°<span>/{minTemperature}°</span>
         </div>
      </div>
   );
});

function WeatherForecastList({ days }: WeatherForecastListProps) {
   const time = useTime();

   const forecast = useReduxState((state) => state.app.forecast);

   const setSelectedDay = useAction(appSlice.actions.setSelectedDay);

   return (
      <div className="weatherForecastList">
         <div className="weatherForecastListContent">
            {forecast
               ?.slice(1, days + 1)
               .map(({ icon, description, temperature }, index) => {
                  const itemDayIndex = index + 1;

                  return (
                     <WeatherForecastListItem
                        dayName={time.now(itemDayIndex, true).dayName}
                        date={`${time.now(itemDayIndex).date} ${
                           time.now(itemDayIndex, true).monthName
                        }`}
                        weatherIcon={`http://openweathermap.org/img/wn/${icon}@4x.png`}
                        forecast={description}
                        minTemperature={temperature.min ?? "--"}
                        maxTemperature={temperature.max ?? "--"}
                        onClick={setSelectedDay}
                        onClickValue={itemDayIndex}
                        key={index}
                     />
                  );
               })}
         </div>
      </div>
   );
}

export default memo(WeatherForecastList);
