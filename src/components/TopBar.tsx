import { memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { appSlice } from "../redux/slices/app";

import { useAction, useReduxState, useTime } from "../utils/hooks";

type TopBarProps = {
   location: string;
};

function TopBar({ location }: TopBarProps) {
   const time = useTime();

   const selectedDay = useReduxState((state) => state.app.selectedDay);

   const setSelectedDay = useAction(appSlice.actions.setSelectedDay);

   const onClickBackButton = useCallback(
      () => setSelectedDay(undefined),
      [setSelectedDay],
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
               <p>
                  {time.now(selectedDay).dayName}, {time.now(selectedDay).date}{" "}
                  {time.now(selectedDay).monthName}
               </p>
            </div>
         </div>
         <div className="underTopBar"></div>
      </>
   );
}

export default memo(TopBar);
