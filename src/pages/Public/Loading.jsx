import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Alert
      color="info"
      variant="fill"
      icon="false"
      sx={{
        flexDirection: "column",
        maxWidth: "500px",
        minWidth: "300px",
        py: 5,
      }}
    >
      <AlertTitle sx={{ textAlign: "center", mb: 3, fontSize: 20 }}>
        Loading ...
      </AlertTitle>
      <LinearProgress color="warning" />
    </Alert>
  );
}
