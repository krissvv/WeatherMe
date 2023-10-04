import { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { appSlice } from "../redux/slices/app";
import { weatherSlice } from "../redux/slices/weather";

import { useAction, useReduxState, useTime } from "../utils/hooks";

type TopBarProps = {
   location: string;
};

function TopBar({ location }: TopBarProps) {
   const time = useTime();

   const selectedUnit = useReduxState((state) => state.app.unit);
   const selectedDay = useReduxState((state) => state.weather.selectedDay);

   const setSelectedUnit = useAction(appSlice.actions.setUnit);
   const setSelectedDay = useAction(weatherSlice.actions.setSelectedDay);
   const loadCurrentLocationForecast = useAction(
      weatherSlice.actions.loadCurrentLocationForecast,
   );

   const onClickBackButton = useCallback(
      () => setSelectedDay(undefined),
      [setSelectedDay],
   );
   const onChangeUnitSelect = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
         setSelectedUnit(event.target.value as Unit);
         loadCurrentLocationForecast();
      },
      [setSelectedUnit, loadCurrentLocationForecast],
   );

   return (
      <>
         <div className={`topBar${selectedDay !== undefined ? " withSelected" : ""}`}>
            <div className="topBarBackButton" onClick={onClickBackButton}>
               <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="topBarContent">
               <h1>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
               </h1>
               <div>
                  <p>
                     {time.now(selectedDay).dayName}, {time.now(selectedDay).date}{" "}
                     {time.now(selectedDay).monthName},
                  </p>
                  <select name="unit" onChange={onChangeUnitSelect} value={selectedUnit}>
                     <option value="metric">Metric</option>
                     <option value="imperial">Imperial</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="underTopBar"></div>
      </>
   );
}

export default memo(TopBar);
