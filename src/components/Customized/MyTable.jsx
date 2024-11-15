import { Table } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MyTable(props) {
  const theme = useSelector((state) => state.app.theme);
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;
  
  return (
    <Table
      sx={{
        ...sx,
        "& th": {
          color: "white",
          textAlign: "center",
          fontSize: 16,
          bgcolor: theme == "dark" ? "#333" : "black",
          borderLeft: theme === "dark" ? "1px solid #555" : "1px solid #444",
        },
        "& th:not(:first-of-type)": {},
        "& tr:nth-of-type(2n)": {
          bgcolor: theme === "dark" ? "#222" : "#f5f5f7",
        },
        "& tr:nth-of-type(2n+1)": {
          bgcolor: theme === "dark" ? "#111" : "white",
        },
        "& td": {
          textAlign: "center",
          fontSize: 16,
          border: theme === "dark" ? "1px solid #444" : "1px solid #ccc",
        },
        "& td:(:first-of-type)": {
        },
      }}
      {...ps}
    >
      {props.children}
    </Table>
  );
}
