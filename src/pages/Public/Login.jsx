import React from "react";
import { useLogin } from "../../utils/mutation";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Login() {
  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  async function onSubmit(data) {
    
  }

  return <Stack></Stack>;
}
