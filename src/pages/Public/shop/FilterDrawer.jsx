import { FilterAlt } from "@mui/icons-material";
import { Divider, Drawer, Fab, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ShopFilter from "./ShopFilter";

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <Stack>
      <Fab
        color="info"
        sx={{ position: "fixed", bottom: 20 }}
        onClick={() => setOpen(true)}
      >
        <FilterAlt />
      </Fab>
      <Drawer
        open={open}
        anchor="bottom"
        PaperProps={{ sx: { p: 4,pb:7 } }}
        onClose={() => setOpen(false)}
      >
        <Typography variant="h6">Filter</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <ShopFilter />
      </Drawer>
    </Stack>
  );
}
