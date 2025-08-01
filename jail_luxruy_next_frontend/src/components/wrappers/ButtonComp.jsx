"use client";
import { Button, styled } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

// ✅ Wrapper Component
const ButtonWrapper = ({ children, variant = "contained", color = "primary", onClick, disabled = false, ...props }) => {
  const theme = useTheme(); // ✅ Use MUI Theme

  // ✅ Styled Button Component
  const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
    width: "100%",
    fontSize: theme.typography.pxToRem(16), // Default font size
    minHeight: theme.typography.pxToRem(40),
    maxHeight: theme.typography.pxToRem(45),
    minWidth: theme.typography.pxToRem(50),
    maxWidth: theme.typography.pxToRem(50),
  
    [theme.breakpoints.down("lg")]: {
      fontSize: theme.typography.pxToRem(14),
      minWidth: theme.typography.pxToRem(30),
      maxWidth: theme.typography.pxToRem(40),
      minHeight: theme.typography.pxToRem(25),
      maxHeight: theme.typography.pxToRem(30),
      padding: theme.spacing(2),
    },
  }));

  return (
    <StyledButton variant={variant} color={color} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default ButtonWrapper;