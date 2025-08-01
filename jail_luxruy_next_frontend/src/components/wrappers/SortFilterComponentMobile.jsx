"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GenericBtns from "../buttons/GenericBtns";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// Styled Components
const SortFilterWrapper = styled(Box)(({ theme }) => ({
  minWidth: "100%",
  height: "7vh",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2)
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: "100vw",
  maxWidth: "350px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(2),
}));

const SortFilterComponentMobile = ({
  setShowFilters,
  showFilters,
  setSortDetail,
  sortBy,
  setSortBy,
  handleSortChange,
  sortConfigArr=[]
}) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleSortSelection = (value, dbValue, dbSortBy) => {
    setSortDetail({ sortBy: dbValue, sortOrder: dbSortBy });
    handleSortChange(value, dbValue, dbSortBy); // Use passed prop
    setSortBy(value);
    handleCloseDrawer();
  };


  return (
    <>
      <SortFilterWrapper>
        <GenericBtns 
          type="primary" 
          btnText={<FilterListIcon />} 
          executableFunction={() => setShowFilters(!showFilters)} 
          minWidth="3vw" 
        />
        <GenericBtns 
          type="secondary" 
          btnText={sortBy} 
          executableFunction={handleOpenDrawer} 
          minWidth="10vw" 
        />
      </SortFilterWrapper>

      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
          }
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <Typography variant="h6" sx={{
              color:theme.custom.primaryButtonFontColor
            }}>Sort Options</Typography>
            <IconButton onClick={handleCloseDrawer} sx={{  color:theme.custom.primaryButtonFontColor}}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List sx={{ flexGrow: 1 }}>
            {sortConfigArr.map((item) => (
              <ListItem 
                button 
                key={item.dbValue} 
                onClick={() => handleSortSelection(item.value, item?.dbValue, item?.dbSort)}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  color:theme.custom.primaryButtonFontColor
                }}
              >
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    color: sortBy === item.value ? 'primary' : 'inherit',
                    fontWeight: sortBy === item.value ? 600 : 400
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SortFilterComponentMobile;