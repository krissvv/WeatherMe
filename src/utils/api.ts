import axios from "axios";

export function getAPIRequest(url: string, params: Record<string, string | number>) {
   return axios.get(url, {
      params: {
         ...params,
         appid: "e2e28b1afeef6701c57c2d269329f53d",
      },
   });
}
