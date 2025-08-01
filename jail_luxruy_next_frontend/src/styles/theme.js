import { createTheme } from "@mui/material/styles";
import { Sanchez, Roboto, Poppins } from "next/font/google";

// Load Google Fonts
const sanchez = Sanchez({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Define Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#573C2C" },
    secondary: { main: "#ded4c0" },
    ascentColor: { main: "#dacecc" },
    background: { default: "#faf9f6", paper: "#dbd5cd" },
    navbac: { main: "#ece8dd" },
  },
  custom: {
    btnBgColor: "#dbd5cd",
    primaryButtonFontColor: "#363230",
    secondaryButtonFontColor: "#ffffff",
    btnBorder: "#363230",
    cardBg: "#e8e8e5",
    banner: "#foede4",
  },
  typography: {
    fontFamily: sanchez.style.fontFamily, // ✅ First Font (Sanchez)
    color: "#121212",
  },
  typography2: {
    fontFamily: roboto.style.fontFamily, // ✅ Second Font (Roboto)
    color: "#121212",
  },
  typography3: {
    fontFamily: poppins.style.fontFamily, // ✅ Third Font (Poppins)
    color: "#121212",
  },
  cardHover: { main: "#dacecc" },
});

// Define Dark Theme
export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: "dark",
    primary: { main: "#573C2C" },
    ascentColor: { main: "#2d2121" },
    secondary: { main: "#CCB878" },
    background: { default: "#121212", paper: "#1b1a1a" },
    navbac: { main: "#000000" },
  },
  custom: {
    btnBgColor: "#363230",
    primaryButtonFontColor: "#dbd5cd",
    secondaryButtonFontColor: "#ffffff",
    btnBorder: "black",
    cardBg: "#232323",
    banner: "#oeoeoe",
  },
  typography: {
    fontFamily: sanchez.style.fontFamily, // ✅ First Font (Sanchez)
    color: "#faf9f6",
  },
  typography2: {
    fontFamily: roboto.style.fontFamily, // ✅ Second Font (Roboto)
    color: "#faf9f6",
  },
  typography3: {
    fontFamily: poppins.style.fontFamily, // ✅ Third Font (Poppins)
    color: "#faf9f6",
  },
  cardHover: { main: "#2d2121" },
});
