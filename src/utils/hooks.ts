import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action, ActionCreator } from "redux";

import { RootState } from "../redux/rootReducer";

export function useTime() {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   const monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];

   const daysOfWeekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

   return {
      now(daysShift = 0, shortened?: boolean) {
         const date = new Date();
         date.setDate(date.getDate() + daysShift);

         return {
            monthName: (shortened ? monthsShort : months)[date.getMonth()],
            date: date.getDate(),
            dayName: (shortened ? daysOfWeekShort : daysOfWeek)[date.getDay()],
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds(),
         };
      },
   };
}

export function useReduxState<T>(
   selector: (state: RootState) => T,
   comparator?: (a: T, b: T) => boolean,
): T {
   return useSelector<RootState, T>(selector, comparator);
}

export function useAction<T extends ActionCreator<Action>>(actionCreator: T): T {
   const dispatch = useDispatch();

   const ref = useRef<T | null>(null);

   if (ref.current === null) {
      ref.current = function wrappedActionCreator(...args: Parameters<T>) {
         return dispatch(actionCreator(...args));
      } as T;
   }

   return ref.current;
}

export function useLocation() {
   const [position, setPosition] = useState<GeolocationPosition>();
   const [error, setError] = useState<GeolocationPositionError>();

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(setPosition, setError);
   }, []);

   if (error) return false;
   if (position)
      return {
         lat: position?.coords.latitude ?? 0,
         lon: position?.coords.longitude ?? 0,
      };
}

export function useWeatherIcon() {}
