import { Box, Stack, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../pages/Admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminDrawer from "../pages/Admin/AdminDrawer";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import { useIsAdmin } from "../utils/customHooks";

export default function AdminLayout() {
  const isMobile = useSelector((state) => state.app.isMobile);
  const isAdmin = useIsAdmin();
  if (!isAdmin) {
    return;
  }

  return (
    <Stack>
      <AdminNavbar />
      <Stack direction="row" spacing={3}>
        {isMobile ? <AdminDrawer /> : <AdminSidebar />}
        <Container
          sx={{ py: { xs: 2, sm: 3 }, textAlign: "center" }}
          flexGrow={1}
        >
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  );
}
