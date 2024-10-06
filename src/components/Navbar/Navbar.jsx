import { AppBar } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: 2, bgcolor: "var(--pallete-background-paper)" }}
    ></AppBar>
  );
}
