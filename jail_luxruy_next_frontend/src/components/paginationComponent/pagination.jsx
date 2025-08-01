"use client";

import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Card, TextField, styled, useTheme, useMediaQuery } from "@mui/material";

// ✅ Styled Pagination Container (Neumorphic UI)
const StyledPaginationContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  margin: theme.spacing(2),
  flexDirection: "row",
  borderRadius: "50px",
  background: theme.palette.mode === "dark" ? "#252525" : "#f0f0f0",
  boxShadow: theme.palette.mode === "dark"
    ? "15px 15px 30px #1a1a1a, -15px -15px 30px #3a3a3a"
    : "20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff",
  transition: "all 0.3s ease-in-out",
  border: "none",

  "&:hover": {
    boxShadow: theme.palette.mode === "dark"
      ? "5px 5px 15px #121212, -5px -5px 15px #3d3d3d"
      : "10px 10px 30px #d1d1d1, -10px -10px 30px #ffffff",
  },

  // ✅ Mobile Responsive Styles
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    width: "100%",
  },
}));

// ✅ Styled Input Box for Page Number
const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: "3rem",
  maxWidth: "4rem",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold",
  background: theme.palette.mode === "dark" ? "#252525" : "#f5f5f5",
  boxShadow: theme.palette.mode === "dark"
    ? "inset 4px 4px 8px #1a1a1a, inset -4px -4px 8px #3d3d3d"
    : "inset 6px 6px 12px #dcdcdc, inset -6px -6px 12px #ffffff",
  border: "none",
  outline: "none",

  "& input": {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
    color: theme.palette.mode === "dark" ? "#ddd" : "#333",
  },
  "&:hover, &:focus": {
    boxShadow: theme.palette.mode === "dark"
      ? "inset 2px 2px 6px #121212, inset -2px -2px 6px #3d3d3d"
      : "inset 4px 4px 8px #bcbcbc, inset -4px -4px 8px #ffffff",
  },
}));

// ✅ Styled Pagination with Smooth Interactions
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "0.6rem",
    transition: "all 0.3s ease-in-out",
    background: "transparent",
    boxShadow: "none",
    color: theme.palette.text.primary,

    "&:hover": {
      background: theme.palette.primary.main,
      color: "#fff",
      transform: "scale(1.1)",
    },

    "&.Mui-selected": {
      background: theme.palette.primary.main,
      color: "#fff",
      transform: "scale(1.1)",
      boxShadow: "none",
    },
  },

  // ✅ Adjust for Small Screens
  [theme.breakpoints.down("sm")]: {
    "& .MuiPaginationItem-root": {
      fontSize: "0.8rem",
      padding: "0.3rem",
    },
  },
}));

export default function PaginationComponent({ page, setPage, count = 10 }) {
  const [inputValue, setInputValue] = useState(page);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setInputValue(page); // Sync input with current page
  }, [page]);

  // ✅ Handle Page Change from Click
  const handleChange = (event, value) => {
    setPage(value);
    setInputValue(value);
  };

  // ✅ Validate and Update Input
  const handleInputChange = (event) => {
    event.preventDefault();
    let value = event.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    setInputValue(value);
  };

  // ✅ Change Page Only on Enter Key Press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let newPage = Math.min(Math.max(parseInt(inputValue, 10) || 1, 1), count);
      setPage(newPage);
      setInputValue(newPage);
    }
  };

  return (
    <StyledPaginationContainer>
      <Stack
        spacing={isMobile ? 1 : 2}
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        width="100%"
      >
        {/* ✅ Page Input Box */}
        <StyledTextField
          variant="standard"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            disableUnderline: true,
          }}
        />

        {/* ✅ Pagination Component */}
        <StyledPagination
          count={count}
          page={Number(page) || 1}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          siblingCount={isMobile ? 0 : 1}
          boundaryCount={1}
        />
      </Stack>
    </StyledPaginationContainer>
  );
}
