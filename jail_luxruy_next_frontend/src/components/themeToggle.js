"use client";
import { useThemeContext } from "../context/themeContext";
import { styled } from "@mui/material/styles";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const ThemeSwitchWrapper = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  direction: "rtl",
  margin: "1vh",
});

const HiddenCheckbox = styled("input")({
  display: "none",
});

const SwitchLabel = styled("label")(({ theme }) => ({
  fontSize: "2rem",
  height: "1em",
  width: "2.5em",
  borderRadius: "0.25em",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.mode === "dark" ? "#3a3a3a" : "#cecece",
  position: "relative",
  transition: "background-color 0.3s ease",
  "&:active": {
    transform: "scale(0.85)",
    transition: "transform 0.2s",
  },
}));

const SwitchSlider = styled("div")(({ theme }) => ({
  width: "0.8em",
  height: "0.8em",
  borderRadius: "50%",
  position: "absolute",
  top: "0.1em",
  left: theme.palette.mode === "dark" ? "1.6em" : "0.1em",
  backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#f2f2f2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.5s cubic-bezier(1, 0.33, 0.11, 1.34)",
}));

const IconWrapper = styled("span")({
  width: "1em",
  height: "1em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  transition: "opacity 0.3s ease",
});

export default function ThemeToggle() {
  const { toggleTheme, themeMode } = useThemeContext();

  // Ensure themeMode is properly initialized
  if (typeof themeMode === "undefined") {
    return null; // Render nothing until themeMode is initialized
  }

  return (
    <ThemeSwitchWrapper>
      <HiddenCheckbox
        type="checkbox"
        id="theme-checkbox"
        onChange={toggleTheme}
        checked={themeMode === "dark"}
      />
      <SwitchLabel htmlFor="theme-checkbox">
        <SwitchSlider>
          <IconWrapper>
            {themeMode === "dark" ? (
              <NightsStayIcon sx={{ color: "white" }} />
            ) : (
              <WbSunnyRoundedIcon sx={{ color: "black" }} />
            )}
          </IconWrapper>
        </SwitchSlider>
      </SwitchLabel>
    </ThemeSwitchWrapper>
  );
}