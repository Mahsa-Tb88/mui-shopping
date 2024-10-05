import { createTheme } from "@mui/material";
import common from "./common";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f6f6f8",
    },
  },
  borderColor: "#ccc",
  border: "1px solid #ccc",
  ...common,
});

export default lightTheme;
