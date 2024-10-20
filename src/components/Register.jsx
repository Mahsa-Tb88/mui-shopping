import React from "react";
import { useRegister } from "../utils/mutation";
import { useForm } from "react-hook-form";
import { useRedirectIfLoggedIn } from "../utils/customHooks";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { mutate, isPending, error, data } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirm: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(data) {
    mutate(data, {
      onSuccess() {
        setTimeout(() => navigate("/login"), 2000);
      },
    });
  }

  const isLoggedIn = useRedirectIfLoggedIn();
  if (isLoggedIn) {
    return;
  }

  return <div>Register</div>;
}
