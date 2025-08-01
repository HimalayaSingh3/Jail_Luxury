"use client";
import React from "react";
import { Card, Typography } from "@mui/material";
import Link from 'next/link';
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const BestSellerComp = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow:"visible",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: theme.typography.pxToRem(600),
  margin: "2vw",
  borderRadius: "10px",
  background: "transparent", 
  boxShadow:"none",
  textAlign: "center",
 
  [theme.breakpoints.down("sm")]: {
    width: "95vw", // Makes it bigger on mobile
    maxWidth: "none",
  },
}));

const StyledImg = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  height: "auto",
  objectFit: "cover",
  
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto", // Ensures proper scaling on mobile
  },
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color:theme.custom.primaryButtonFontColor
}));

function BestSellerCard({ title, imgSrc ,dbMapping }) {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BestSellerComp>
      <Link href={`/bestsellers?gender=${dbMapping}`} passHref style={{ textDecoration: "none", color: "inherit" }}>
        <StyledText
          variant={ismobile ? "h5" : "h6"} // Bigger text on mobile
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          {title}
        </StyledText>
        <StyledImg src={imgSrc}/>
      </Link>
    </BestSellerComp>
  );
}

export default BestSellerCard;