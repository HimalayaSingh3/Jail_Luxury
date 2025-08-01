
"use client";
import { Skeleton, Stack, styled } from '@mui/material';
import React from 'react'


const SkeletonWrapper = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: theme.spacing(2),
    boxShadow: theme.shadows[4],
    borderRadius: theme.typography.pxToRem(10),
    transition: "transform 0.3s ease-in-out",
    minWidth: theme.typography.pxToRem(400),
    maxWidth: theme.typography.pxToRem(400),
    minHeight: theme.typography.pxToRem(530),
    maxHeight: theme.typography.pxToRem(540),
    "&:hover": {
      transform: "scale(1.1)",
    },
  
    // ✅ Tablet View
    [theme.breakpoints.down("lg")]: {
      minWidth: theme.typography.pxToRem(500),
      maxWidth: theme.typography.pxToRem(500),
      minHeight: theme.typography.pxToRem(750),
      maxHeight: theme.typography.pxToRem(750),
      padding: theme.spacing(1),
    },
  
    // ✅ Mobile View
    [theme.breakpoints.down("sm")]: {
      minWidth: theme.typography.pxToRem(350),
      maxWidth: theme.typography.pxToRem(350),
      minHeight: theme.typography.pxToRem(400),
      maxHeight: theme.typography.pxToRem(480),
      padding: theme.spacing(0.5),
    },
  }));

function ProductDetailsSkeleton() {
  return (
    <SkeletonWrapper spacing={1} >
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
          <Skeleton variant="circular" width={60} height={70} />
          <Skeleton variant="rectangular" width="70%" height={80} />
          <Skeleton variant="rounded" width="60%" height={80} />
        </SkeletonWrapper>
  )
}

export default ProductDetailsSkeleton