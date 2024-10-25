import { Drawer, Fab, Stack } from "@mui/material";
import React, { useState } from "react";
import PanelLink from "./PanelLink";
import { Menu } from "@mui/icons-material";

export default function PanelDrawer() {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <Stack>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20 }}
        onClick={() => setShow(true)}
      >
        <Menu />
      </Fab>
      <Drawer
        open={show}
        anchor="right"
        onClose={() => setShow(false)}
        PaperProps={{ sx: { width: 260 } }}
      >
        <PanelLink />
      </Drawer>
    </Stack>
  );
}
