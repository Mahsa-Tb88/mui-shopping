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
    } else if (error?.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export function useInitialize() {
  return useQuery({
    queryKey: ["initialize"],
    queryFn: () => axios.get("/misc/initialize"),
  });
}

export function useProducts(page, q, category, limit, order, sort) {
  return useQuery({
    queryKey: ["products", page, limit, q, category, sort, order],
    queryFn: () =>
      axios.get("/products", {
        params: { page, limit, q, category, sort, order },
      }),
  });
}
export function useProductById(id) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get("/products/" + id),
  });
}

export function useBlogs(page, limit) {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => axios.get("/blogs", { params: { page, limit } }),
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/users"),
  });
}
