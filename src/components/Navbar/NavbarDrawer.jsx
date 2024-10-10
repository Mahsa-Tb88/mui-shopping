import {
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import MyList from "../Customized/MyList";
import { Home, Info, Shop } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NavbarDrawer({ open, closeHandler }) {
  return (
    <Drawer open={open} onClose={closeHandler}>
      <MyList sx={{ width: 240 , p:0}}>
        <ListItemButton
          LinkComponent={Link}
          to="/"
          onClick={closeHandler}
          divider
          
        >
          <ListItemIcon>
            <Home />
            <ListItemText primary="Home" />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton
          LinkComponent={Link}
          to="shop"
          onClick={closeHandler}
          divider
        >
          <ListItemIcon>
            <Shop />
            <ListItemText primary="Shop" />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton LinkComponent={Link} to="about" onClick={closeHandler}>
          <ListItemIcon>
            <Info />
            <ListItemText primary="About" />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Drawer>
  );
}
