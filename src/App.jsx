import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Initializer from "./layouts/Initializer";
import { appActions } from "./store/slices/appSlice";
import { cartActions } from "./store/slices/cartSlice";

export default function App() {
  const theme = useSelector((state) => state.app.theme);
  const initialized = useSelector((state) => state.app.initialized);
  const isMobile = useMediaQuery("(max-width:899px)");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appActions.setIsMobile(isMobile));
  }, [isMobile]);

  useEffect(() => {
    const theme = localStorage.theme;
    if (theme) {
      dispatch(appActions.setTheme(theme));
    }
    const cartItems = JSON.parse(localStorage.cartItems || "[]");
    dispatch(cartActions.setItems(cartItems));

    window.addEventListener("storage", (e) => {
      if (e.key === "cartItems") {
        const newItems = JSON.parse(e.newValue);
        dispatch(cartActions.setItems(newItems));
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      {initialized ? <Outlet /> : <Initializer />}
    </ThemeProvider>
  );
}
