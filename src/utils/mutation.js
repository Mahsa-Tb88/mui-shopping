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

// export async function uploadFile(file) {
//   try {
//     const form = new FormData();
//     form.append("file", file);
//     const { data } = await axios.post("/misc/uploads", form);
//     return data;
//   } catch (e) {
//     return {
//       success: false,
//       message: e.message,
//     };
//   }
// }

export function useUploadFile() {
  return useMutation({
    mutationFn: (formData) => axios.post("/misc/uploads", formData),
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id) => axios.delete("/products/" + id),
  });
}
export function useCreateProduct() {
  return useMutation({
    mutationFn: (data) => axios.post("/products", data),
  });
}
export function useUpdateProduct() {
  return useMutation({
    mutationFn: (data) => axios.put("/products/" + data.id, data),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id) => axios.delete("/categories/" + id),
  });
}
export function useCreateCategory() {
  return useMutation({
    mutationFn: (data) => axios.post("/categories", data),
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: (data) => axios.put("/categories/" + data.id, data),
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
