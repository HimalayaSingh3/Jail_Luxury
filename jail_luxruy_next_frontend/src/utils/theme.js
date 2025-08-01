import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#573C2C",
    },
    secondary: {
      main: "#ded4c0",
    },
    ascentColor: {
      main: "#A020F0",
    },
    background: {
      default: "#f3ece3",
      secondary:"#312d2b",
      paper: "#ffffff",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#dbd5cd",
    primaryButtonFontColor: "#363230",
    btnBorder:"#363230",
    cardBg:"#E4E2E0"
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// ✅ Correct way to add custom properties
export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#573C2C",
    },
    ascentColor: {
      main: "#AA336A",
    },
    secondary: {
      main: "#CCB878",
    },
    background: {
      default: "#312d2b",
      secondary:"#f3ece3",
      paper: "#1d1d1d",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#363230",
    primaryButtonFontColor: "#dbd5cd",
    btnBorder:"black" ,// profile btn border
    cardBg:"#747272"
  },
});
