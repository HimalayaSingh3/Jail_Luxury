import React from 'react';
import { Button, useTheme, useMediaQuery, styled } from '@mui/material';

function GenericBtns({ type, btnText, defaultText = "default", executableFunction, minWidth = "10vw" , disabled=false}) {
  const theme = useTheme();

  // ✅ Adjust Button Size for Different Screens
  const buttonMinWidth = minWidth;

  const renderButtonByType = () => {
    switch (type) {
      case 'primary':
        return (
          <StyledButton variant="contained" color="primary" onClick={executableFunction} minwidth={buttonMinWidth} disabled={disabled}>
            {btnText}
          </StyledButton>
        );
      case 'secondary':
        return (
          <StyledButton variant="outlined" color="secondary" sx={{ backgroundColor: theme.custom?.cardBg || "#ffffff" }}  onClick={executableFunction} minwidth={buttonMinWidth} disabled={disabled}>
            {btnText} 
          </StyledButton>
        );
      case 'error':
        return (
          <StyledButton variant="text" color="error" onClick={executableFunction} minwidth={buttonMinWidth} disabled={disabled}>
            {btnText}
          </StyledButton>
        );
      default:
        return (
          <StyledButton variant="text" color="primary" onClick={executableFunction} minwidth={buttonMinWidth} disabled={disabled}>
            {btnText || defaultText}
          </StyledButton>
        );
    }
  };

  return <>{renderButtonByType()}</>;
}

export default GenericBtns;

// Styled Components

const StyledButton = styled(Button)(({ theme, minwidth , borderRadius = 10}) => ({
  padding: theme.spacing(1.5, 3),
  minWidth: minwidth, // ✅ Dynamic width based on breakpoints
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'none', // ✅ Disable uppercase transformation
  borderRadius: theme.typography.pxToRem(borderRadius),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  padding:"1vh",
  color:theme.custom.primaryButtonFontColor,


  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color:theme.custom.secondaryButtonFontColor,
  },

  '&.MuiButton-outlined': {
    borderColor:theme.palette.primary.main,
    color:theme.custom.primaryButtonFontColor,
  },

  '&.MuiButton-text': {
    color: theme.palette.error.main,
    boxShadow: 'none', 
  },

  // ✅ Tablet View Adjustments
  [theme.breakpoints.down("md")]: {
    // minWidth: minwidth, // ✅ Adjust width for tablets
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(1, 2),
    maxHeight:theme.typography.pxToRem(40)
  },

  // ✅ Mobile View Adjustments
  [theme.breakpoints.down("sm")]: {
    // minWidth: minwidth, // ✅ Full width for mobile
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(1),
    maxHeight:theme.typography.pxToRem(30)
  },
}));