import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ced1", // Dark cyan (aqua-like)
    },
    secondary: {
      main: "#20b2aa", // Light sea green (aqua-like)
    },
    background: {
      default: "#e0ffff", // Light aqua background
    },
    text: {
      primary: "#006666", // Dark aqua text color
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
