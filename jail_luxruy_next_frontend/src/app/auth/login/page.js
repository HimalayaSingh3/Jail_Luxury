"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
  border: 0,
  borderRadius: 12,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 10px 4px rgba(33, 203, 243, .3)",
    background: "linear-gradient(45deg, #2196F3 30%, #1976D2 90%)",
  },
  textTransform: "none",
  fontSize: "1rem",
}));

export default function LoginComponent() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/register");
  };
  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Paper
        elevation={12}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: 384, md: 448 },
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          display: "flex",
          margin: "auto",
        }}
      >
        <Box id="login-form">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            fontWeight={700}
            sx={{ color: "#1a237e", mb: 1, letterSpacing: "0.05em" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Sign in to continue your journey
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              py: 1.5,
              borderRadius: "12px",
              borderColor: "grey.300",
              textTransform: "none",
              color: "blue",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "grey.50",
                borderColor: "grey.400",
                boxShadow: 2,
              },
            }}
          >
            Sign in with Google
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              or continue with
            </Typography>
          </Divider>

          <Box component="form">
            <TextField
              fullWidth
              label="Email address"
              type="email"
              id="email"
              name="email"
              required
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="password"
              required
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <GradientButton type="submit" fullWidth size="large">
              Sign In
            </GradientButton>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Don't have an account?
            <Link
              component="span"
              onClick={handleClick}
              sx={{
                cursor: "pointer",
                ml: 0.5,
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
