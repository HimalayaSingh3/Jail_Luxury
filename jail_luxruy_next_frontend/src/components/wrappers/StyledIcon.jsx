"use client"
import React from 'react';
import { styled } from '@mui/material/styles';

// Define the styled component
const StyledIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  color: theme.custom.primaryButtonFontColor, // Use the secondary color from the theme
  '&:hover': {
    color: theme.palette.ascentColor.main, // Primary color on hover
  },
  transition: 'color 0.3s ease',
}));

// Functional component
function StyledIcon({ icon: Icon }) {
  return (
    <StyledIconContainer>
      <Icon />
    </StyledIconContainer>
  );
}

export default StyledIcon;