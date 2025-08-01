"use client";

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext({
  themeMode: "light",
  toggleTheme: () => {},
});

export function ThemeProviderWrapper({ initialTheme = "light", children }) {
  const [themeMode, setThemeMode] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || initialTheme || "light";
    setThemeMode(savedTheme);
    setMounted(true);
  }, [initialTheme]);

  useEffect(() => {
    if (mounted) {
      Cookies.set("theme", themeMode, { expires: 365 });
      document.documentElement.setAttribute("data-theme", themeMode);
    }
  }, [themeMode, mounted]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);