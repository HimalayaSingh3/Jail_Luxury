"use client";
import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import GenericBtns from "../buttons/GenericBtns";
import FilterListIcon from "@mui/icons-material/FilterList";

const SortFilterWrapper = styled("div")(({ theme }) => ({
  minWidth: "100%",
  minHeight:theme.typography.pxToRem(20),
  padding: "1rem",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "sticky",
  top: 0, // Ensures it sticks at the top
  backgroundColor: theme.palette.background.default, // Ensures visibility over content
  zIndex: 1000, // Keeps it above other elements
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Optional: adds slight shadow to differentiate from content
  border:"none",
  boxShadow:"none"
}));


function SortFilterComponent({ setShowFilters, showFilters,setSortDetail,handleSortChange ,sortBy,setSortBy,sortConfigArr=[]}) {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detects mobile view
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // ✅ Detects tablet view

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value,dbValue,dbSortBy) => {
    setSortDetail({sortBy:dbValue,sortOrder:dbSortBy})

    handleSortChange(value,dbValue,dbSortBy)
    console.log("handleClose",dbValue,dbSortBy)
    setAnchorEl(null);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <SortFilterWrapper>
      {ismobile && (
        <GenericBtns
          type="primary"
          btnText={<FilterListIcon />}
          executableFunction={handleFilterClick}
          minWidth="3vw"
          
        />
      )}
      <GenericBtns
        type="secondary"
        btnText={sortBy}
        executableFunction={handleClick}
        minWidth="10vw"
        sx={{ backgroundColor: theme.custom?.cardBg || "#ffffff" }} 
        
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          sx: {
            width: ismobile ? "100vw" : isTablet ? "36.5vw" : "10vw", // ✅ Responsive Width
            padding: "1vh",
            
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {sortConfigArr.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => handleClose(item.value , item?.dbValue , item?.dbSort)}
            sx={{
              fontSize: theme.typography.pxToRem(
                ismobile ? 12 : isTablet ? 12 : 14,
              ), // ✅ Adjust font size dynamically
              color: theme?.custom.primaryButtonFontColor,
              padding: ismobile ? "0.5vh" : "1vh", // ✅ Adjust padding dynamically
              "&:hover": {
              backgroundColor: theme.palette.ascentColor.main,
            },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </SortFilterWrapper>
  );
}

export default SortFilterComponent;
