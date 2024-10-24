import React from "react";
import { useLogin } from "../../utils/mutation";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid2,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import { useRedirectIfLoggedIn } from "../../utils/customHooks";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    mutate(data, {
      onSuccess(data) {
        const profile = data.data.body.user;
        dispatch(userActions.setProfile(profile));
        dispatch(userActions.setIsLoggedIn(true));
        dispatch(userActions.setIsAdmin(profile.role == "admin"));
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
          <Typography variant="h4" sx={{ mt: 6, mb: 3, textAlign: "center" }}>
            Sign In
          </Typography>
          <Paper
            sx={{ p: 3 }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={3}>
              {isPending ? (
                <Alert severity="info" sx={{ display: "block" }} icon={false}>
                  <LinearProgress color="primary" sx={{ my: 1 }} />
                </Alert>
              ) : error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : (
                <Alert severity="info">Enter your username and password</Alert>
              )}
              <TextField
                label="username"
                {...register("username", {
                  required: "Enter username",
                })}
                variant="filled"
                error={errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                label="password"
                {...register("password", { required: "Enter password" })}
                variant="filled"
                error={errors.password}
                helperText={errors.password?.message}
              />
              <FormControlLabel
                control={<Checkbox {...register("remember")} defaultChecked />}
                label="Remember me"
                sx={{ userSelect: "none" }}
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
                Sign In
              </LoadingButton>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
