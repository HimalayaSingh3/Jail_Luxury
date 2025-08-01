"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// ✅ Styled Skeleton Wrapper to Match Card Layout
const SkeletonWrapper = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[4],
  borderRadius: theme.typography.pxToRem(10),
  transition: "transform 0.3s ease-in-out",
  minWidth: theme.typography.pxToRem(200),
  maxWidth: theme.typography.pxToRem(200),
  minHeight: theme.typography.pxToRem(330),
  maxHeight: theme.typography.pxToRem(340),
  "&:hover": {
    transform: "scale(1.1)",
  },

  // ✅ Tablet View
  [theme.breakpoints.down("lg")]: {
    minWidth: theme.typography.pxToRem(220),
    maxWidth: theme.typography.pxToRem(260),
    minHeight: theme.typography.pxToRem(350),
    maxHeight: theme.typography.pxToRem(350),
    padding: theme.spacing(1),
  },

  // ✅ Mobile View
  [theme.breakpoints.down("sm")]: {
    minWidth: theme.typography.pxToRem(150),
    maxWidth: theme.typography.pxToRem(170),
    minHeight: theme.typography.pxToRem(200),
    maxHeight: theme.typography.pxToRem(280),
    padding: theme.spacing(0.5),
  },
}));

export default function StyledCardSkeleton({ cardNum = 1 }) {
  return (
    <>
      {Array.from({ length: cardNum }).map((_, index) => (
        <SkeletonWrapper spacing={1} key={index}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width="80%" height={60} />
          <Skeleton variant="rounded" width="80%" height={60} />
        </SkeletonWrapper>
      ))}
    </>
  );
}
