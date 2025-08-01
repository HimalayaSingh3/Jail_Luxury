"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Slider,
  Button,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GenericBtns from "../buttons/GenericBtns";
import FilterSizeComponent from "./generics/filterSizeComponent";
import FilterColorComponent from "./generics/filterColorComponent";
import { hover } from "framer-motion";
import { transform } from "lodash";
const FilterWrapperComponent = styled(Box)(({ theme }) => ({
minWidth: theme.typography.pxToRem(300),
  maxWidth: theme.typography.pxToRem(300),
  borderRight: `2px solid ${theme.palette.secondary.main}`,
  overflow: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0, // Ensures it sticks at the top
  backgroundColor: "theme.custom?.cardBg", // Ensures visibility over content
  zIndex: 1000, // Keeps it above other elements
  overflow: "visible",
  [theme.breakpoints.down("md")]: {
    minWidth: "40vw",
    maxWidth: "90vw",
    minHeight: "80vh",
    maxHeight: "80vh",
    padding: theme.spacing(1),
  },
  borderRadius:"1vh",
  borderTop: `solid ${theme.typography.pxToRem(1)} ${
    theme.palette.secondary.main
  }`,
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(4),
  borderBottom: `solid ${theme.typography.pxToRem(1)} ${
    theme.palette.secondary.main
  }`,
  
}));

const FilterContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  padding: theme.spacing(1),

  "&::-webkit-scrollbar": { width: theme.typography.pxToRem(6) },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: theme.typography.pxToRem(10),
  },
  "&::-webkit-scrollbar-thumb:hover": { background: "rgba(0, 0, 0, 0.5)" },
}));

const FilterFooter = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  borderTop: `solid ${theme.typography.pxToRem(1)} ${
    theme.palette.secondary.main
  }`,
  
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  color:theme.custom.primaryButtonFontColor,
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: theme.typography.pxToRem(16),
  
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  
}));

function FilterWrapper({
  onApplyFilters,
  onClearFilters,
  selectedFilters,
  setSelectedFilters,
  sizeFilterArr,
  allColors,
}) {
  const theme = useTheme();

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleRadioChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handlePriceChange = (_, newValue) => {
    console.log("handlePriceChange", _);
    setSelectedFilters((prev) => ({ ...prev, price: newValue }));
  };

  return (
    <FilterWrapperComponent>
      {/* ✅ Fixed Header */}
      <FilterHeader>
        <FilterTitle>Filters</FilterTitle>
        <GenericBtns
  type="secondary"
  btnText="Clear Filters"
  executableFunction={() => onClearFilters()}
  minWidth="5vw"
  disableHover
/>

      </FilterHeader>

      {/* ✅ Scrollable Filters Section */}

      {/* Gender Filter (Radio Buttons) */}
      <FilterSection>
        <FilterTitle>Gender</FilterTitle>
        <RadioGroup
          value={selectedFilters?.gender}
          onChange={(e) => handleRadioChange("gender", e.target.value)}
        >
          {["MEN", "WOMEN"].map((gender) => (
            <FormControlLabel
              key={gender}
              value={gender}
              control={
                <Radio
                  sx={{
                    color: theme.custom.primaryButtonFontColor,
                    "&.Mui-checked": {
                      color: theme.custom.primaryButtonFontColor,
                    },
                  }}
                />
              }
              sx={{
                color: theme.custom.primaryButtonFontColor
              }}
              label={gender}
            />
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Size Filter (Checkbox - Multiple Selections) */}
      
      {sizeFilterArr?.data?.length >0 ? <FilterSection>
        <FilterContent>
          <FilterSizeComponent
            sizeArr={sizeFilterArr}
            sizeLoading={false}
            selectedFilters={selectedFilters}
            handleCheckboxChange={handleCheckboxChange}
          />
        </FilterContent>
      </FilterSection>:null}

      <FilterSection>
        <FilterContent>
          <FilterColorComponent
            colorArr={allColors}
            colorLoading={false}
            selectedFilters={selectedFilters}
            handleCheckboxChange={handleCheckboxChange}
          />
        </FilterContent>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection>
        <FilterTitle>Price</FilterTitle>
        <Slider
          value={selectedFilters?.price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          sx={{
            variant:"contained",
            maxWidth: "90%",
          }}
        />
        <Typography sx={{  color:theme.custom.primaryButtonFontColor}}>
          ₹{selectedFilters?.price[0]} - ₹{selectedFilters?.price[1]}
        </Typography>
      </FilterSection>

      {/* ✅ Fixed Footer */}
      <FilterFooter>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onApplyFilters(selectedFilters)}
        >
          Apply Filters
        </Button>
      </FilterFooter>
    </FilterWrapperComponent>
  );
}

export default FilterWrapper;
