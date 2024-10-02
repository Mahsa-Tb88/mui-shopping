import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 4000;

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
