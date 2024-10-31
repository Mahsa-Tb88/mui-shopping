import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import UserForm from "./UserForm";

export default function AddUser() {
  return (
    <Stack sx={{ textAlign: "left" }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add User
      </Typography>
      <Divider sx={{ my: 1 }} />
      <UserForm type="new" />
    </Stack>
  );
}
