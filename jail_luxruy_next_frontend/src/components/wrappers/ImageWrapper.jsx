"use client";

import { Card, styled } from "@mui/material";
import React from "react";
import Link from "next/link"; // ✅ Next.js Link

const ImageWrapperComp = styled(Card)(({ theme }) => ({
  position: "relative", // ✅ Change from absolute to relative
  width: "100%",
  height: "60vh", // ✅ Set fixed height instead of maxHeight
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "opacity 0.5s ease-in-out, transform 2s ease-in-out",
  opacity: 0,
  transform: "scale(1.3)",
  overflow: "hidden", // ✅ Ensures image does not overflow
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // ✅ Ensures full coverage without distortion
});

function ImageWrapper({ categoryKey, product, index, currentIndex, to }) {
  if (!product?.category_img) {
    console.error("Missing category_img for product:", product);
    return null; // Avoid rendering if image is missing
  }

  return (
    <ImageWrapperComp>
      <Link href={to} passHref>
        <Image key={categoryKey} src={product.category_img} alt={product.name} />
      </Link>
    </ImageWrapperComp>
  );
}

export default ImageWrapper;
