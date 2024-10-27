import React from "react";
import { useUpdateProfile } from "../utils/mutation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { userActions } from "../store/slices/userSlice";

export default function Profile() {
  document.title = "Profile";
  const profile = useSelector((state) => state.user.profile);
  const { mutate, data, isPending, error } = useUpdateProfile();
  const dispatch = useDispatch();

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
      password: "",
      confirm: "",
    },
  });
  function onSubmit(data) {
    const { firstname, lastname } = data;
    data.id = profile._id;
    mutate(data, {
      onSuccess() {
        const p = { ...profile, firstname, lastname };
        dispatch(userActions.setProfile(p));
      },
    });
  }
  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        {isPending ? (
          <Alert severity="info" sx={{ display: "block" }} icon={false}>
            <LinearProgress color="primary" sx={{ my: 1 }} />
          </Alert>
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : data ? (
          <Alert severity="success">{data.data.message}</Alert>
        ) : (
          <Alert severity="info">Enter your info</Alert>
        )}
        <TextField
          label="Firstname"
          {...register("firstname", {
            required: "Please enter firstname",
            minLength: { value: 2, message: "At least 2 charchters" },
          })}
          error={errors.firstname}
          helperText={errors.firstname?.message}
        />
        <TextField
          {...register("lastname", {
            required: "Please enter a lastname",
            minLength: { value: 2, message: "At least 2 charchters" },
          })}
          label="Lastname"
          error={errors.lastname}
          helperText={errors.lastname?.message}
        />
        <TextField disabled label="username" {...register("username")} />

        <TextField
          label="Password"
          {...register("password", {
            minLength: {
              value: 4,
              message: "at least 4 characters",
            },
          })}
          type="password"
          variant="filled"
          error={errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm"
          {...register("confirm", {
            validate(value) {
              if (watch("password") !== value) {
                return "password and confirm are not the same";
              }
            },
          })}
          type="password"
          error={errors.confirm}
          helperText={errors.confirm?.message}
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ my: 4, alignSelf: "center" }}
          loading={isPending}
          loadingIndicator={<CircularProgress />}
        >
          Upadte
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
