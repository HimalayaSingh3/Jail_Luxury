"use client";
import React, { useState, forwardRef, useContext } from "react";
import NextLink from "next/link";
import {
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  styled
} from "@mui/material";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";
import ChevronUpIcon from "@mui/icons-material/ExpandLess";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LuggageIcon from "@mui/icons-material/Luggage";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import StoreIcon from "@mui/icons-material/Store";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { AppContext } from "@/context/applicationContext";


const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <NextLink ref={ref} href={href} {...other} />;
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "8px 12px",
  borderRadius: "6px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  color: theme.custom.primaryButtonFontColor
}));

const MenuContainer = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: theme.typography.pxToRem(10),
    minWidth: theme.typography.pxToRem(200),
    maxWidth: theme.typography.pxToRem(260),
    padding: theme.typography.pxToRem(8),
    borderRadius: theme.typography.pxToRem(8),
    backgroundColor: theme.palette.background.paper,
    color: theme.custom.primaryButtonFontColor,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "100%",
    zIndex: theme.zIndex.modal
  },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: `${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(16)}`,
  borderRadius: theme.typography.pxToRem(7),
  gap: theme.typography.pxToRem(12),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.ascentColor.main,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  margin: 0,
  width: "100%"
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: "auto",
  padding: 0,
  "& .MuiAccordionSummary-content": {
    margin: 0
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.custom.primaryButtonFontColor
  }
}));

const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1)
}));

const iconMap = {
  bags: <ShoppingBagIcon sx={{ fontSize: "24px" }} />,
  belts: <WorkOutlineIcon sx={{ fontSize: "24px" }} />,
  duffle_bags: <BusinessCenterIcon sx={{ fontSize: "24px" }} />,
  wallets: <HandshakeIcon sx={{ fontSize: "24px" }} />,
  jackets: <CheckroomIcon sx={{ fontSize: "24px" }} />,
  gloves: <StoreIcon sx={{ fontSize: "24px" }} />,
  shoes: <LuggageIcon sx={{ fontSize: "24px" }} />,
  trolley: <AccountBalanceWalletIcon sx={{ fontSize: "24px" }} />,
};

const CategoryDropdown = () => {
  const { categoryItems } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const isTouchDevice = useMediaQuery('(pointer: coarse)');

  const handleOpen = (event) => {
    if (!isTouchDevice) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setExpanded(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isTouchDevice ? (
        <StyledAccordion expanded={expanded} onChange={handleAccordionToggle}>
          <StyledAccordionSummary
            expandIcon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />} 
            aria-controls="categories-content"
          >
            <StyledButton>
              Categories
            </StyledButton>
          </StyledAccordionSummary>

          <AccordionDetailsStyled>
            {categoryItems?.map((category, index) => {
              const icon = iconMap[category.category_mapping] || <ShoppingBagIcon sx={{ fontSize: "24px" }} />;
              return (
                <MenuItemStyled
                  key={index}
                  component={LinkBehavior}
                  href={`/products/${category?.category_mapping}`}
                  onClick={handleClose}
                >
                  {icon}
                  <Typography variant="body2">{category?.catagory_name}</Typography>
                </MenuItemStyled>
              );
            })}
          </AccordionDetailsStyled>
        </StyledAccordion>
      ) : (
        <>
          <StyledButton onClick={handleOpen}>
            Categories
            {anchorEl ? <ChevronUpIcon sx={{ ml: 0 }} /> : <ChevronDownIcon sx={{ ml: 0 }} />} {/* Toggle between up and down arrow */}
          </StyledButton>

          <MenuContainer
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {categoryItems?.map((category, index) => {
              const icon = iconMap[category.category_mapping] || <ShoppingBagIcon sx={{ fontSize: "24px" }} />;
              return (
                <MenuItemStyled
                  key={index}
                  onClick={handleClose}
                  component={LinkBehavior}
                  href={`/products/${category?.category_mapping}`}
                >
                  {icon}
                  <Typography variant="body2">{category?.catagory_name}</Typography>
                </MenuItemStyled>
              );
            })}
          </MenuContainer>
        </>
      )}
    </Box>
  );
};

export default CategoryDropdown;