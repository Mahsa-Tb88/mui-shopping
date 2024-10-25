import { Paper } from "@mui/material";
import React from "react";
import PanelLink from "./PanelLink";

export default function PanelSidebar() {
  return (
    <Paper sx={{ minHeight: 500 }}>
      <PanelLink />
    </Paper>
  );
}
