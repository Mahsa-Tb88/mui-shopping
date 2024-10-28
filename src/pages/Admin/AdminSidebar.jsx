import { Paper, Stack } from "@mui/material";
import React from "react";
import AdminLinkSidebar from "./AdminLinkSidebar";

export default function AdminSidebar() {
  return (
    <Paper
      sx={{
        height: "calc(100vh - 64px)",
        minWidth: 260,
       
      }}
    >
      <AdminLinkSidebar />
    </Paper>
  );
}
