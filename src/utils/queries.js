import { useQueries } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 4000;

export function useInitilize() {
  return useQueries({
    querykey: ["initialize"],
    queryfn: () => axios.get("/misc/initialize"),
  });
}
