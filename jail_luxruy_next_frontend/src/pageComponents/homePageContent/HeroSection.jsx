"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Link from "next/link";
import useDebounce from "@/utils/customHooks/useDebounce";
import ImageWrapper from "@/components/wrappers/ImageWrapper";

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  width: "100vw", // Ensure full width
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

const DotsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "20px",
  gap: "10px",
});

const Dot = styled("div")(({ theme, active }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.secondary.main,
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}));

function HeroSection({ category }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!category?.data?.length) {
    console.log("No category data found:", category);
    return <Box>No categories available</Box>;
  }

  // ✅ Ensure Images are Being Loaded Correctly
  console.log("Category Data:", category?.data);

  // Debounced auto-slider effect
  const autoSlide = useDebounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.data.length);
  }, 5000);

  useEffect(() => {
    autoSlide();
  }, [currentIndex, autoSlide]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Root>
      {category.data.map((product, index) => (
        <ImageWrapper
          key={product.category_id} // Unique key
          categoryKey={product.category_id} 
          product={product}
          index={index}
          currentIndex={currentIndex}
          to={`/product-category/${product.category_id}`} // Ensure valid Next.js route
        />
      ))}

      {/* Dots Navigation */}
      <DotsWrapper>
        {category.data.map((_, index) => (
          <Dot key={index} active={index === currentIndex} onClick={() => handleDotClick(index)} />
        ))}
      </DotsWrapper>
    </Root>
  );
}

export default HeroSection;
