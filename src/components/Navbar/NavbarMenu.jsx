import {
  AdminPanelSettings,
  Dashboard,
  GroupAdd,
  Login,
  Logout,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarMenu({ open, handleClose, anchorEl }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <Menu
      open={open}
      onClick={handleClose}
      anchorEl={anchorEl}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List>
        {isLoggedIn ? (
          <ListItem divider disablePadding>
            <ListItemButton LinkComponent={Link} to="/panel" sx={{ px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Panel" />
            </ListItemButton>
            {isAdmin && (
              <ListItemButton LinkComponent={Link} to="/admin" sx={{ px: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
              </ListItemButton>
            )}
            <ListItemButton LinkComponent={Link} to="/logout" sx={{ px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem >
            <ListItemButton LinkComponent={Link} to="/login" sx={{ px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Sing In" />
            </ListItemButton>

            <ListItemButton
              LinkComponent={Link}
              to="/Register"
              sx={{ px: 1.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Menu>
  );
}