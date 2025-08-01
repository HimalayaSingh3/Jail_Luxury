"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import removeWhiteSpaceFromMiddle from "@/utils/attachProperNavName";
import TruncatedText from "@/components/wrappers/TruncatedText";

// ✅ Wrapper for the entire circle and text
const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "column",
  
  height:"25vh",
  width:"50vw",
}));

// Text under the circle
const CircleText = styled(Typography)(({ theme }) => ({
  padding: "1vh",
  
}));

// Circle container to hold the image
const CircleContainer = styled(Box)(({ theme, radius = "13vh" }) => ({
  
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%", // Makes it circular
  width: radius,
  height: radius,
  minWidth: radius,
  minHeight: radius,
  overflow: "hidden", // Ensures no overflow outside the circle
  textDecoration: "none",
  marginLeft: "2vw",
  marginRight: "2vw",
  backgroundColor: "black", // Optional: Set a background color
  position: "relative", // For positioning the spinner
  transition: "all 0.3s ease-in-out", // Smooth transition effect
  "&:hover": {
    transform: "scale(1.1)", // Grows slightly on hover
    boxShadow: `0 0 1vw ${theme.palette.secondary.main}`, // Adds a smooth shadow
  },
  [theme.breakpoints.down("sm")]: {
    width: "5vh",
    height:"5vh",
  },
}));

// Image styling to ensure it perfectly covers the circle
const Image = styled('img')(({ theme }) => ({
  width: "100%", // Fill the circle container
  height: "100%", // Fill the circle container
  objectFit: "cover", // Ensure the image covers the area
  display: "block", // Ensures no inline space for images
}));

// Spinner container
const Spinner = styled(Box)(({ theme, radius = "13vh" }) => ({
  position: "absolute",
  width: radius,
  height: radius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function CircleComponent({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // ✅ Load image safely when `data` updates
  useEffect(() => {
    if (data?.catagory_logo) {
      setImageSrc(data.catagory_logo);
    }
  }, [data?.catagory_logo]);

  const handleImageLoad = () => setIsLoaded(true);

  if (!data) return null; // ✅ Prevents errors if `data` is undefined

  return (
    <CircleWrapper>
      {/* ✅ Next.js Link Wrapping (Added prefetch={false}) */}
      <Link href={`/products/${removeWhiteSpaceFromMiddle(data?.catagory_name)}`} passHref prefetch={false}>
        <CircleContainer radius="90px">
          {/* ✅ Spinner Shown Until Image Loads */}
          {!isLoaded && (
            <Spinner radius="12.5vh">
              <CircularProgress size={40} />
            </Spinner>
          )}
          {/* ✅ Image Fade-in Effect (Now Handles Refresh Properly) */}
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={data?.catagory_name + " Image "}
              onLoad={handleImageLoad}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          ) : (
            <Typography sx={{ opacity: 0.5 }}>{data?.catagory_name + " Image "}</Typography>
          )}
        </CircleContainer>
      </Link>

      {/* ✅ Category Name */}
      <TruncatedText maxWidth={"60%"}>{data?.catagory_name}</TruncatedText>
    </CircleWrapper>
  );
}

export default CircleComponent;
