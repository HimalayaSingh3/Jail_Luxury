"use client"
import { Box, styled } from '@mui/material';
import React from 'react';


const SearchBox = styled(Box)(({ theme }) => ({
    padding: 2,
    borderTop: 1,
    borderColor: "divider",
    [theme.breakpoints.down("sm")]: {},
  }));

const StyledInput = styled("input")(({ theme }) => ({
    width: "100%",
    height: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: `0.5vh solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    outline: "none",
    color:theme?.custom?.primaryButtonFontColor
  }));

function SearchComponent({searchQuery,handleSearchChange,handleSearchSubmit}) {
  return (
 <SearchBox>
            <StyledInput
              type="text"
              placeholder="S E A R C H"
              value={searchQuery || ""}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </SearchBox>
  );
}

export default SearchComponent;
