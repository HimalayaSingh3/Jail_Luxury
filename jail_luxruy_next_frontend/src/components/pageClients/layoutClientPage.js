"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "../ErrorBoundary";
import { ThemeProviderWrapper, useThemeContext } from "@/context/themeContext";
import Footer from "../Footer";
import Navbar from "../NavBar";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { AppContextProvider } from "@/context/applicationContext";

function ThemeBackgroundWrapper({ children }) {
  const { themeMode } = useThemeContext();

  return (
    <div
      style={{
        backgroundColor: themeMode === "dark" ? "#121212" : "#ffffff",
        minHeight: "100vh",
        minWidth: "100vw",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

function LayoutClientPage({ children, carouselImages, userData }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
  <ErrorBoundary>
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <CssBaseline />
          <ThemeBackgroundWrapper>
            <AppContextProvider>
              {!isAdminRoute && (
                <Navbar
                  carouselImages={carouselImages?.data}
                  userData={userData}
                />
              )}
              {children}
              {!isAdminRoute &&
                pathname !== "/blogs" &&
                pathname !== "/news" &&
                pathname !== "/blogdetails" && <Footer />}
            </AppContextProvider>
          </ThemeBackgroundWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  </ErrorBoundary>
);

}

export default LayoutClientPage;
