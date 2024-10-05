import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 4000;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code == "ECONNABORTED" || error.code == "ERR_NETWORK") {
      error.message = "Error Connection";
    }
    return Promise.reject(error);
  }
);

// export function useInitilize() {
//   return useQuery({
//     querykey: ["initialize"],
//     queryfn: () => axios.get("/misc/initialize"),
//   });
// }

export function useInitialize() {
  return useQuery({
    queryKey: ["initialize"],
    queryFn: () => axios.get("/misc/initialize"),
  });
}
