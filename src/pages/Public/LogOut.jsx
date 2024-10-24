import React, { useEffect } from "react";
import { useLogout } from "../../utils/mutation";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack, Typography } from "@mui/material";

export default function LogOut() {
  const { mutate } = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    mutate(data, {
      onSuccess() {
        dispatch(userActions.setLogout());
        navigate("/");
      },
    });
  }, []);
  return (
    <Stack
      sx={{ minHeight: "70vh", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress size={60} color="secondary" />
      <Typography variant="h5" mt={3}>
        Loging out...
      </Typography>
    </Stack>
  );
}
