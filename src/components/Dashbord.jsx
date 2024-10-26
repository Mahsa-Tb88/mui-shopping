import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Dashbord() {
  document.title = "Dashboard";
  return (
    <Stack textAlign="center" mt={6}>
      <Typography component="h2" fontSize={{ xs: 24, sm: 32 }} fontWeight={500} my={3}>
        Welcome to the Dashboard
      </Typography>
      <Typography>You can use right menu for editing your profile</Typography>
    </Stack>
  );
}
