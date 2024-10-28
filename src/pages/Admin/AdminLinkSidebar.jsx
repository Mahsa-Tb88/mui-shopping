import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import MyList from "../../components/Customized/MyList";

export default function AdminLinkSidebar({ onClose = () => {} }) {
  return (
    <MyList width="260">
      <ListItem divider disablePadding>
        <ListItemButton LinkComponent={NavLink} to="products" onClick={onClose}>
          <ListItemText primary="Products" />
        </ListItemButton>
      </ListItem>
      <ListItem divider disablePadding>
        <ListItemButton
          LinkComponent={NavLink}
          to="categories"
          onClick={onClose}
        >
          <ListItemText primary="categories" />
        </ListItemButton>
      </ListItem>
      <ListItem divider disablePadding>
        <ListItemButton LinkComponent={NavLink} to="blogs" onClick={onClose}>
          <ListItemText primary="Blogs" />
        </ListItemButton>
      </ListItem>
      <ListItem divider disablePadding>
        <ListItemButton LinkComponent={NavLink} to="users" onClick={onClose}>
          <ListItemText primary="Users" />
        </ListItemButton>
      </ListItem>
    </MyList>
  );
}
