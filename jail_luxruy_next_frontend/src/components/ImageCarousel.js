"use client";

import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import useDebounce from "@/utils/customHooks/useDebounce";
import removeWhiteSpaceFromMiddle from "@/utils/attachProperNavName";
import { AppContext } from "@/context/applicationContext";

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  minHeight: "50vh", // Default height for mobile
  maxHeight: "70vh", // Prevents overflow on large screens
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.up("sm")]: {
    minHeight: "60vh", // Taller height for tablets and desktops
  },

  [theme.breakpoints.up("md")]: {
    minHeight: "70vh", // Taller height for larger screens
  },
}));

const ImageWrapper = styled(Box)(({ active }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: active ? 1 : 0,
  transition: "opacity 1s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: active ? "pointer" : "default",
  zIndex: active ? 10 : 1,
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Default to cover for larger screens
  maxWidth: "100vw",
  maxHeight: "100vh",

  [theme.breakpoints.down("sm")]: {
    objectFit: "contain", // Prevents cropping on mobile
  },
}));

const DotsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "20px", // Adjusted for smaller screens
  width: "100%",
  zIndex: 100,

  [theme.breakpoints.down("sm")]: {
    bottom: "10px", // Moves dots up on mobile
  },
}));

const Dot = styled("div")(({ theme, active }) => ({
  width: active ? "14px" : "10px",
  height: active ? "14px" : "10px",
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  cursor: "pointer",
  transition: "background-color 0.3s ease, width 0.3s ease, height 0.3s ease",
  margin: "0 5px",

  [theme.breakpoints.down("sm")]: {
    width: active ? "10px" : "8px",
    height: active ? "10px" : "8px",
    margin: "0 3px",
  },
}));

export default function ImageCarousel({ }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const { categoryItems} = useContext(AppContext);


  const autoSlide = useDebounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categoryItems.length);
  }, 5000);

  useEffect(() => {
    if (!categoryItems || categoryItems.length === 0) return;
    autoSlide();
  }, [currentIndex, autoSlide]);

  if (!categoryItems || categoryItems.length === 0) {
    return <Box sx={{ textAlign: "center", mt: 5 }}>No categoryItems available</Box>;
  }

  return (
    <CarouselContainer>
      {categoryItems.map((image, index) => (
        <ImageWrapper
          key={image.id || index}
          active={index === currentIndex}
          onClick={() =>
            index === currentIndex &&
            router.push(`/products/${removeWhiteSpaceFromMiddle(image?.catagory_name)}`)
          }
        >
          <Image src={image.catagory_img} alt={image.alt || "Product Image"} />
        </ImageWrapper>
      ))}

      <DotsWrapper>
        {categoryItems.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </DotsWrapper>
    </CarouselContainer>
  );
}