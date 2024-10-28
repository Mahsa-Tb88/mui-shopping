import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyIconButton from "../../components/Customized/MyIconButton";
import { DarkMode, Dashboard, LightMode, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { appActions } from "../../store/slices/appSlice";

export default function AdminNavbar() {
  const profile = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  function handlerTheme() {
    if (theme == "light") {
      dispatch(appActions.setTheme("dark"));
    } else {
      dispatch(appActions.setTheme("light"));
    }
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 2,
        bgcolor: "var(--palette-background-paper)",
        zIndex: 2,
      }}
    >
      <Container>
        <Toolbar>
          <Typography variant="h4">
            <Typography
              component="span"
              color="text.primary"
              sx={{ mx: 2 }}
              fontWeight={600}
            >
              Hi
            </Typography>
            <Typography color="success" component="span" fontWeight={600}>
              {profile.firstname + " " + profile.lastname}
            </Typography>
          </Typography>
          <Stack direction="row" spacing={3} ml="auto">
            <MyIconButton onClick={handlerTheme}>
              {theme == "light" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: "yellow" }} />
              )}
            </MyIconButton>
            <MyIconButton LinkComponent={Link} to="/logout">
              <Logout />
            </MyIconButton>
            <MyIconButton LinkComponent={Link} to="/">
              <Dashboard />
            </MyIconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
