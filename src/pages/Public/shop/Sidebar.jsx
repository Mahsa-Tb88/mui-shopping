import { Divider, Paper, Typography } from "@mui/material";
import React from "react";
import ShopFilter from "./ShopFilter";

export default function Sidebar() {
  return (
    <Paper sx={{ position: "sticky" ,mt:10,p:1.5}}>
      <Typography variant="h6">Filter</Typography>
      <Divider sx={{mt:1 ,mb:2}} />
      <ShopFilter />
    </Paper>
  );
}
