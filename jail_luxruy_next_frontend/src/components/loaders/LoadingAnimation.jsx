"use client";
import React from "react";
import { styled } from "@mui/material/styles";

// Styled components using MUI's styled utility
const Card = styled("div")(({ theme }) => ({
  "--bg-color": theme.palette.background.default,
  backgroundColor: "var(--bg-color)",
  padding: "1rem 2rem",
  borderRadius: "1.25rem",
  minWidth: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Loader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.custom.primaryButtonFontColor,
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,
  fontSize: "25px",
  boxSizing: "content-box",
  height: "40px",
  padding: "10px",
  borderRadius: "8px",
}));

const Words = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  height: "40px", // Match the height of the loader
  marginLeft: "10px", // Add spacing between "loading" text and words
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    )`,
    zIndex: 20,
  },
}));

const Word = styled("span")(({ theme }) => ({
  display: "block",
  height: "100%",
  paddingLeft: "6px",
  color: theme.palette.ascentColor.main,
  animation: "spin_4991 3s infinite",
  zIndex: 30, // Added z-index to appear above gradient
  "@keyframes spin_4991": {
    "10%": {
      transform: "translateY(-102%)",
    },
    "25%": {
      transform: "translateY(-100%)",
    },
    "35%": {
      transform: "translateY(-202%)",
    },
    "50%": {
      transform: "translateY(-200%)",
    },
    "60%": {
      transform: "translateY(-302%)",
    },
    "75%": {
      transform: "translateY(-300%)",
    },
    "85%": {
      transform: "translateY(-402%)",
    },
    "100%": {
      transform: "translateY(-400%)",
    },
  },
}));

export default function LoadingAnimation() {
  return (
    <Card>
      <Loader>
        <>loading</>
        <Words>
          <Word>Premium</Word>
          <Word>Quality</Word>
          <Word>Premium</Word>
        </Words>
      </Loader>
    </Card>
  );
}
