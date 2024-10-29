import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";

export default function Toast({ status, message }) {
  if (status === "pending") {
    return (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="info"
          icon={<CircularProgress size={24} sx={{ color: "grey.300" }} />}
          sx={{ px: 3, minWidth: 320 }}
          variant="filled"
        >
          <Typography>{message}</Typography>
        </Alert>
      </Snackbar>
    );
  } else if (status === "success") {
    return (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ px: 3, minWidth: 320 }}
        >
          <Typography>{message}</Typography>
        </Alert>
      </Snackbar>
    );
  } else if (status === "fail") {
    return (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled" sx={{ px: 3, minWidth: 320 }}>
          <Typography>{message}</Typography>
        </Alert>
      </Snackbar>
    );
  }
}
