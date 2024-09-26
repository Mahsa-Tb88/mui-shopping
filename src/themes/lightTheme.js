import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  borderColor: "#ccc",
  border: "1px solid #ccc",
  ...common,
});

export default lightTheme;
