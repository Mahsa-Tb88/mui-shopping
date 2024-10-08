import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyIconButton from "../Customized/MyIconButton";
import { Link, NavLink } from "react-router-dom";
import { appActions } from "../../store/slices/appSlice";

export default function Navbar() {
  const isMobile = useSelector((state) => state.app.isMobile);
  const theme = useSelector((state) => state.app.theme);
  const cart = useSelector((state) => state.cart);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();

  function handleThemeChange() {
    if (theme == "dark") {
      dispatch(appActions.setTheme("light"));
    } else {
      dispatch(appActions.setTheme("dark"));
    }
  }

  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: 2, bgcolor: "var(--pallete-background-paper)" }}
    >
      <Container fixed disableGutters>
        <Toolbar>
          {isMobile ? (
            <Box flexGrow={1}>
              <MyIconButton onClick={() => setOpenDrawer(true)}>
                <Menu />
              </MyIconButton>
            </Box>
          ) : (
            <Stack
              sx={{ py: 2, "& .active": { color: "info.light" } }}
              flexGrow={1}
              direction="row"
              spacing={3}
            >
              <Button variant="text" LinkComponent={NavLink} to="/">
                Home
              </Button>
              <Button variant="text" LinkComponent={NavLink} to="/shop">
                Products
              </Button>
              <Button variant="text" LinkComponent={NavLink} to="/about">
                About
              </Button>
            </Stack>
          )}
          <Stack direction="row" spacing={3}>
            <MyIconButton onClick={() => setOpenMenu(!openMenu)}>
              <Person />
            </MyIconButton>
            <MyIconButton onClick={handleThemeChange}>
              {theme == "light" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: "yellow" }} />
              )}
            </MyIconButton>
            <Badge
              badgeContent={cart.itemsCount()}
              invisible={cart.itemsCount == 0}
              color="secondary"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              overlap="circular"
            >
              <MyIconButton LinkComponent={Link} to="/cart">
                <ShoppingCart />
              </MyIconButton>
            </Badge>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
