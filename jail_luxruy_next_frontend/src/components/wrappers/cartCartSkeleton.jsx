"use client";
import { Skeleton, Stack, styled } from '@mui/material'
import React from 'react'


const SkeletonWrapper = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: theme.spacing(2),
    boxShadow: theme.shadows[4],
    borderRadius: theme.typography.pxToRem(10),
    transition: "transform 0.3s ease-in-out",
    minWidth: theme.typography.pxToRem(1000),
    maxWidth: theme.typography.pxToRem(1000),
    minHeight: theme.typography.pxToRem(110),
    maxHeight: theme.typography.pxToRem(120),
    "&:hover": {
      transform: "scale(1.1)",
    }
}));

function CartCartSkeleton({ cardNum }) {
    return (
      <>
        {Array.from({ length: cardNum }).map((_, index) => (
          <SkeletonWrapper spacing={3} key={index}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20%" }} />
            <Skeleton variant="circular" width={30} height={40} />
            <Skeleton variant="rectangular" width="50%" height={60} />
            <Skeleton variant="rounded" width="50%" height={60} />
          </SkeletonWrapper>
        ))}
      </>
    );
  }
  
  export default CartCartSkeleton;
  