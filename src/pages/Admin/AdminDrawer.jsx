import { Drawer, Fab, Menu, Stack } from "@mui/material";
import React, { useState } from "react";
import AdminLinkSidebar from "./AdminLinkSidebar";

export default function AdminDrawer() {
  const [show, setShow] = useState(true);
  return (
    <Stack>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20 }}
        onClick={() => setShow(true)}
      >
        <Menu />
      </Fab>
      <Drawer open={show} anchor="bottom" onClose={() => setShow(false)}>
        <AdminLinkSidebar onClose={() => setShow(false)} />
      </Drawer>
    </Stack>
  );
}
