"use client"
import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google"; // MUI Google Icon
import { login } from "@/actions/auth";

// ✅ Root Container (Full-Screen Gradient Background)
const RootContainer = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  minWidth:"95vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
  padding: theme.spacing(2), // Padding for smaller screens
}));

// ✅ Styled Card (Login Box)
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "420px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[8],
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)", // Subtle hover effect
  },
}));

// ✅ Google Button (Responsive & Animated)
const GoogleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  width: "100%", // Ensures full width on smaller screens
  backgroundColor: "#4285F4",
  color: "#fff",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#357ae8",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "#ddd",
    color: "#777",
    cursor: "not-allowed",
  },
}));

const LoginSignupPage = () => {
   // Using login function from useAuth
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await login(); // Calls login function from useAuth
      setDialogMessage("Redirecting to Login");
    } catch (error) {
      console.error("Google Login Error:", error);
      setDialogMessage("Login Failed. Please try again.");
    }
    setDialogOpen(true);
    setLoading(false);
  };

  return (
    <RootContainer>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome! 👜
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in with Google to continue
          </Typography>

          {/* Google Login Button */}
          <GoogleButton onClick={handleGoogleLogin} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : <><GoogleIcon /> Sign in with Google</>}
          </GoogleButton>
        </CardContent>
      </StyledCard>

      {/* ✅ MUI Dialog (Replaces alert) */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogMessage.includes("Failed") ? "❌ Error" : "LOGIN"}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => 
           {  e.preventDefault();
             e.stopPropagation();
            setDialogOpen(false)}} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </RootContainer>
  );
};

export default LoginSignupPage;
