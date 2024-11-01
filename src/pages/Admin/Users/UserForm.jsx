import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function UserForm({ user, type, submitForm, mutation }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user ? user.username : "",
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      password: user ? user.password : "",
      role: user ? user.role : "",
    },
  });

  return (
    <Paper sx={{ px: 2, py: 4 }}>
      <Stack component="form" spacing={5} onSubmit={handleSubmit(submitForm)}>
        <TextField
          {...register("username", {
            required: "Please enter username",
            minLength: { value: 4, message: "at least 4 charcters" },
          })}
          label="username"
          error={errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          {...register("firstname", {
            required: "Please enter firstname",
            minLength: { value: 2, message: "at least 4 charcters" },
          })}
          label="Firstname"
          error={errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          {...register("lastname", {
            required: "Please enter lastname",
            minLength: { value: 2, message: "at least 4 charcters" },
          })}
          label="Lastname"
          error={errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField
          {...register("password", {
            required: "Please enter password",
            minLength: { value: 2, message: "at least 4 charcters" },
          })}
          label="Password"
          type="password"
          error={errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          select
          label="Role"
          {...register("role")}
          defaultValue={user?.role ?? "user"}
          sx={{ textAlign: "left" }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>

        <LoadingButton
          variant="contained"
          type="submit"
          loading={mutation.isPending}
          loadingIndicator={<CircularProgress size={30} color="grey.900" />}
          size="large"
          sx={{ maxWidth: 200 }}
        >
          {type == "new" ? "Add User" : "Edit User"}
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
