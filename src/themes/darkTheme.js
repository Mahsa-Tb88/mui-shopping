import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  borderColor: "#444",
  border: "1px solid #444",
  ...common,
});

export default darkTheme;
