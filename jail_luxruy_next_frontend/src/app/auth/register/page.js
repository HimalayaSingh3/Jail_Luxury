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

export default function RegisterComponent() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <Box sx={{ height: "110vh", display: "flex", alignItems: "center" }}>
      <Paper
        elevation={12}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: 384, md: 448 },
          background: "linear-gradient(45deg, #154063ff 30%, #1976D2 90%)",
          backdropFilter: "blur(5px)",
          display: "flex",
          margin: "auto",
        }}
      >
        <Box id="register-form">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            fontWeight={700}
            sx={{ color: "#1a237e", mb: 1, letterSpacing: "0.05em" }}
          >
            Create an Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Get started for free
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
              color: "red",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "grey.50",
                borderColor: "grey.400",
                boxShadow: 2,
              },
            }}
          >
            Sign up with Google
          </Button>

          {/* Divider */}
          <Divider sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              or sign up with
            </Typography>
          </Divider>

          <Box component="form">
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              id="name"
              name="name"
              required
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <TextField
              fullWidth
              label="Email address"
              type="email"
              id="email_register"
              name="email_register"
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
              id="password_register"
              name="password_register"
              required
              variant="outlined"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
            <GradientButton type="submit" fullWidth size="large">
              Sign Up
            </GradientButton>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Already have an account?
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
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
