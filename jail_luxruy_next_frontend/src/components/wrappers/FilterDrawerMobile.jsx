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
  Drawer,
  useTheme,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GenericBtns from "../buttons/GenericBtns";
import FilterSizeComponent from "./generics/filterSizeComponent";
import FilterColorComponent from "./generics/filterColorComponent";
import CloseIcon from "@mui/icons-material/Close";

// ✅ Drawer Wrapper
const FilterWrapperComponent = styled(Box)(({ theme }) => ({
  width: "80vw",
  maxWidth: theme.typography.pxToRem(350),
  height: "100vh",
  overflow: "auto",
  padding: theme.spacing(2),
  borderLeft: `solid ${theme.typography.pxToRem(2)} ${theme.palette.primary.main}`,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("md")]: {
    width: "90vw",
    maxWidth: "90vw",
  },
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(2),
  borderBottom: `solid ${theme.typography.pxToRem(1)} ${theme.palette.secondary.main}`,
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
  borderTop: `solid ${theme.typography.pxToRem(1)} ${theme.palette.secondary.main}`,
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: theme.typography.pxToRem(16),
  color:theme.custom.primaryButtonFontColor
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const FilterDrawerMobile = ({ onApplyFilters, onClearFilters, selectedFilters, setSelectedFilters ,setShowFilters ,showFilters , sizeFilterArr,allColors}) => {
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
    setSelectedFilters((prev) => ({ ...prev, price: newValue }));
  };


  return (
    <>
      {/* Button to Open Drawer */}

      {/* Drawer Component */}
      <Drawer anchor="left" open={showFilters} onClose={() => setShowFilters(false)}>
        <FilterWrapperComponent>
          {/* ✅ Header */}
          <FilterHeader>
            <FilterTitle>Filters</FilterTitle>
            <IconButton onClick={() => setShowFilters(false)} sx={{  color:theme.custom.primaryButtonFontColor}}>
              <CloseIcon />
            </IconButton>
          </FilterHeader>

          {/* ✅ Scrollable Content */}
          <FilterContent>
            {/* Gender Filter (Radio Buttons) */}
            <FilterSection>
              <FilterTitle>Gender</FilterTitle>
              <RadioGroup
                value={selectedFilters?.gender}
                onChange={(e) => handleRadioChange("gender", e.target.value)}
                sx={{  color:theme.custom.primaryButtonFontColor}}
              >
                {["MEN", "WOMEN"].map((gender) => (
                  <FormControlLabel
                    key={gender}
                    value={gender}
                    control={
                      <Radio
                        sx={{
                       color:theme.custom.primaryButtonFontColor,
                          "&.Mui-checked": {
                            color: theme.palette.ascentColor.main,
                          },
                        }}
                      />
                    }
                    label={gender}
                  />
                ))}
              </RadioGroup>
            </FilterSection>

            {/* Size Filter (Checkbox - Multiple Selections) */}
            {sizeFilterArr?.data?.length >0 ? <FilterSection>
              <FilterSizeComponent
                sizeArr={sizeFilterArr}
                sizeLoading={false}
                selectedFilters={selectedFilters}
                handleCheckboxChange={handleCheckboxChange}
              />
            </FilterSection> : null}

            {/* Color Filter */}
            <FilterSection>
              <FilterColorComponent
                colorArr={allColors}
                colorLoading={false}
                selectedFilters={selectedFilters}
                handleCheckboxChange={handleCheckboxChange}
              />
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
                  color: theme.palette.ascentColor.main,
                  maxWidth: "90%",
                }}
              />
              <Typography sx={{  color:theme.custom.primaryButtonFontColor}}>
                ₹{selectedFilters?.price[0]} - ₹{selectedFilters?.price[1]}
              </Typography>
            </FilterSection>
          </FilterContent>

          {/* ✅ Footer */}
          <FilterFooter>
            <GenericBtns
              type="secondary"
              btnText="Clear Filters"
              executableFunction={onClearFilters}
              fullWidth
              minWidth={"100%"}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={(e) => {
                e.preventDefault()
                onApplyFilters(selectedFilters);
                setShowFilters(false);
              }}
            >
              Apply Filters
            </Button>
          </FilterFooter>
        </FilterWrapperComponent>
      </Drawer>
    </>
  );
};

export default FilterDrawerMobile;
