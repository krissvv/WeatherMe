import axios from "axios";

export function getAPIRequest(url: string, params: Record<string, string | number>) {
   return axios.get(url, {
      params: {
         ...params,
         appid: process.env.REACT_APP_OPEN_WEATHER_KEY ?? "undefined",
      },
   });
}
