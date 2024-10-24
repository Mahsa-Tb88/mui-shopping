import React from "react";
import { useRegister } from "../../utils/mutation";
import { useForm } from "react-hook-form";
import { useRedirectIfLoggedIn } from "../../utils/customHooks";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  Container,
  Grid2,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

  return (
    <Container maxWidth="sm">
      <Grid2 container>
        <Grid2 size={12}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ mt: 6, mb: 2 }}
            fontWeight={600}
          >
            Register
          </Typography>
          <Paper
            sx={{ p: { xs: 2, sm: 3 } ,mb:5}}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Stack spacing={3}>
              {isPending ? (
                <Alert severity="info" sx={{ display: "block" }} icon={false}>
                  <LinearProgress color="primary" sx={{ my: 1 }} />
                </Alert>
              ) : error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : data ? (
                <Alert severity="success">{data.data.message}</Alert>
              ) : (
                <Alert severity="info" sx={{ fontWeight: "medium" }}>
                  Fill out the form
                </Alert>
              )}
              <TextField
                {...register("firstname", {
                  required: "enter firstname",
                  minLength: {
                    value: 2,
                    message: "firstname should be 2 characters at least!",
                  },
                })}
                label="Firstname"
                variant="filled"
                error={errors.firstname}
                helperText={errors.firstname?.message}
              />
              <TextField
                {...register("lastname", {
                  required: "enter lastname",
                  minLength: {
                    value: 2,
                    message: "lastname should be 2 characters at least!",
                  },
                })}
                label="Lastname"
                variant="filled"
                error={errors.lastname}
                helperText={errors.lastname?.message}
              />
              <TextField
                {...register("username", {
                  required: "enter username",
                  minLength: {
                    value: 2,
                    message: "usename should be 3 characters at least!",
                  },
                })}
                label="Username"
                variant="filled"
                error={errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                {...register("password", {
                  required: "enter password",
                  minLength: {
                    value: 2,
                    message: "password should be 4 characters at least!",
                  },
                })}
                label="Password"
                variant="filled"
                error={errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                {...register("confirm", {
                  required: "enter password again",
                  validate(value) {
                    if (watch("password") !== value) {
                      return "  password is not the same confirm password";
                    }
                  },
                })}
                label="Confirm"
                variant="filled"
                error={errors.confirm}
                helperText={errors.confirm?.message}
              />

              <LoadingButton
                type="submit"
                loading={isPending}
                loadingIndicator=<CircularProgress
                  size={30}
                  sx={{ color: "grey.500" }}
                />
                variant="contained"
                size="large"
                sx={{ width: 140, alignSelf: "center", fontSize: 18 }}
              >
                Sign up
              </LoadingButton>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
