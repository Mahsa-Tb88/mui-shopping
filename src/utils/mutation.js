import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useRegister() {
  return useMutation({
    mutationFn: (data) => axios.post("/auth/register", data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data) => axios.post("/auth/login", data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => axios.post("/auth/logout"),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data) => axios.put("/users/" + data.id, data),
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id) => axios.delete("/products/" + id),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id) => axios.delete("/categories/" + id),
  });
}

export function useDeleteBlog() {
  return useMutation({
    mutationFn: (id) => axios.delete("/blogs/" + id),
  });
}
export function useDeleteUser() {
  return useMutation({
    mutationFn: (id) => axios.delete("/users/" + id),
  });
}
export function useCreateUser() {
  return useMutation({
    mutationFn: (data) => axios.post("/users", data),
  });
}
export function useUpdateUser() {
  return useMutation({
    mutationFn: (data) => axios.put("/users/" + data.id, data),
  });
}
