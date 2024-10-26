import React from "react";
import { useSelector } from "react-redux";
import { useIsLoggednIn } from "../../utils/customHooks";
import { Container, Grid2 } from "@mui/material";
import PanelDrawer from "../../components/PanelDrawer";
import PanelSidebar from "../../components/PanelSidebar";
import { Outlet } from "react-router-dom";

export default function Panel() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = useIsLoggednIn();
  const isMobile = useSelector((state) => state.app.isMobile);
  if (!isLoggedIn) {
    return;
  }
  return (
    <Container fixed sx={{ mt: 3 }}>
      <Grid2 container spacing={3}>
        {isMobile ? (
          <PanelDrawer />
        ) : (
          <Grid2 size={{ md: 3, lg: 4 }}>
            <PanelSidebar />
          </Grid2>
        )}
        <Grid2 size={{ sx: 12, md: 9, lg: 8 }}>
          <Outlet />
        </Grid2>
      </Grid2>
    </Container>
  );
}
