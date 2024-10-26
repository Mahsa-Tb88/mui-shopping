import React from "react";
import { useUpdateProfile } from "../utils/mutation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Paper, Stack, TextField } from "@mui/material";

export default function Profile() {
  document.title = "Profile";
  const profile = useSelector((state) => state.user.profile);
  const { mutate, data, isPending, error } = useUpdateProfile();
  console.log(profile);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: profile.firstname,
      lastname: profile.lastname,
      username: profile.username,
      password: profile.password,
      confirm: profile.confirm,
    },
  });
  return (
    <Paper sx={{ p: 3 }}>
      <Stack>
        <TextField
          label="Firstname"
          {...register("firstname", {
            required: "Please enter firstname",
            minLength: { value: 2, message: "At least 2 charchters" },
          })}
          error={errors.firstname}
          helperText={errors.firstname?.message}
        />
      </Stack>
    </Paper>
  );
}
