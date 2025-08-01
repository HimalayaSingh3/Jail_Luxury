"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TextAreaSkeleton({maxWidth="20vw"}) {
  return (
    <Box sx={{ maxWidth: maxWidth }}>
     <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
    </Box>
  );
}