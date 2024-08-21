import { createTheme } from "@mui/material";

export const myCustomMuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      light: "#000000",
      main: "#000000",
    },
  },
});
