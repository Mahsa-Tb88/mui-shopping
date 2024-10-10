import { Box, List } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MyList(props) {
  const theme = useSelector((state) => state.app.theme);
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;
  return (
    <List
      sx={{
        ...sx,
        "& .active": { bgcolor: theme == "dark" ? "#246" : "#cef" },
        "& .MuiListItemButton-root:hover": {
          bgcolor: theme == "dark" ? "#335" : "#eef",
        },
      }}
      {...ps}
    >
      {props.children}
    </List>
  );
}
