"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";

const dummyDescription = `
Contrary to popular belief, Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC,
making it over 2000 years old...`.repeat(5);

const BlogdetailsCard = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "90%",
          md: "80%",
        },
        mx: "auto",
        my: 2,
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        px: {
          xs: 0,
          sm: 2,
          md: 6,
        },
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <IconButton size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* More Like This Chip */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <Chip
          icon={<OpenInNewIcon />}
          label="More like this"
          size="small"
          clickable
          sx={{ bgcolor: "#fff", fontWeight: 500 }}
        />
      </Box>

      {/* Image */}
      <Box>
        <img
          src="/him.jpg"
          alt="jacket"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            maxHeight: "350px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Views */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <VisibilityIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            13.2k
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Clear sky expected by tomorrow — best day to go out with family and
          friends. Max: 26°C, Min: 16°C.
        </Typography>

        {/* Description */}
        <Paper
          variant="outlined"
          sx={{
            height: isMobileOrTablet ? "calc(100dvh - 400px)" : 200,
            overflowY: "auto",
            p: 1.5,
            borderRadius: 2,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            whiteSpace="pre-line"
          >
            {dummyDescription}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default BlogdetailsCard;
