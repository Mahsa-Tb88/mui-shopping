import { ThemeProvider } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import { CssBaseline } from "@mui/material";

export default function App() {
  const theme = useSelector((state) => state.app.theme);
  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      App
      <Outlet />
    </ThemeProvider>
  );
}
