import { Refresh } from "@mui/icons-material";
import { Alert, AlertTitle, Button } from "@mui/material";

import React from "react";

export default function LoadingError({
  message,
  handleAction = null,
  actionText = "Try again",
  actionIcon = <Refresh />,
}) {
  return (
    <Alert
      severity="error"
      sx={{
        maxWidth: 500,
        minWidth: 320,
        mx: "auto",
        flexDirection: "column",
        py: 2,
        alignItems: "center",
        textAlign: "center",
      }}
      icon={false}
    >
      <AlertTitle textAlign="center" variant="h6" color="error">
        {message}
      </AlertTitle>
      {handleAction && (
        <Button
          endIcon={actionIcon}
          onClick={handleAction}
          sx={{ mt: 2, mx: "auto" }}
          variant="contained"
          size="large"
        >
          {actionText}
        </Button>
      )}
    </Alert>
  );
}
