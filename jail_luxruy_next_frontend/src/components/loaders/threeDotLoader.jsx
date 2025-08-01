import React from 'react';
import { styled, keyframes } from "@mui/material";

// Define the keyframes for the animation
const circleAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled component for the loader container
const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Styled component for the circles
const Circle = styled('div')(({ theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: '0 10px',
  backgroundColor: theme.palette.primary.main, // Use theme primary color
  animation: `${circleAnimation} 1s ease-in-out infinite`,
}));

// Loader component
const ThreeDotLoader = () => {
  return (
    <LoaderContainer>
      <Circle style={{ animationDelay: '0s' }} />
      <Circle style={{ animationDelay: '0.2s' }} />
      <Circle style={{ animationDelay: '0.4s' }} />
    </LoaderContainer>
  );
};

export default ThreeDotLoader;