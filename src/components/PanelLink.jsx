import React from "react";
import MyList from "./Customized/MyList";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Dashboard, Logout, PersonPin } from "@mui/icons-material";

export default function PanelLink({ handleClose = () => {} }) {
  return (
    <MyList>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={NavLink}
          to="/panel"
          end
          onClick={handleClose}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={NavLink}
          to="/panel/profile"
          onClick={handleClose}
        >
          <ListItemIcon>
            <PersonPin />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={NavLink}
          to="/logout"
          onClick={handleClose}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </MyList>
  );
}
