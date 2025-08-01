"use client";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import StyledCardWrapper from "./StyledCardWrapper";
import { styled } from "@mui/material/styles";
import StyledCardSkeleton from "./StyledCardSkeleton";
import NoDataComponent from "./noDataComponent";

const GridWrapperComponent = styled("div")(({ theme }) => ({
  minWidth:"70vw",
  padding: "1rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems:"flex-start",
   // oporer border
  [theme.breakpoints.down("xl")]: {
   
    
  },

  [theme.breakpoints.down("lg")]: {
    width: "100vw",
    padding: "1rem",
    justifyContent: "center",
    
  },
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    padding: "1rem",
    justifyContent: "center",
    
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    padding: "1rem",
    justifyContent: "center",
  },
}));

function GridWrapper({ itemsArr, type,loading,setWishlistData,setWishlistLoading}) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  console.log("loading", itemsArr?.loading ,StyledCardWrapper);
  
  const data =  itemsArr 
  console.log("data",Array?.isArray(data),data,data?.length,itemsArr)
  return (
    <GridWrapperComponent>
      <Grid container spacing={2}  justifyContent="flex-start" alignItems="center" >
        {loading ? (
          // ✅ Render 8 skeleton placeholders in Grid layout
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid 
                item 
                xs={5} 
                sm={6} 
                md={4} 
                lg={3} 
                xl={3} 
                key={index} 
                style={{ display: "flex", flexGrow: 1 }} 
              >
                <StyledCardSkeleton />
              </Grid>
            ))}
          </>
        ) : data?.length > 0 ? (
          // ✅ Render actual product cards when data exists
          data?.map((item, index) => (
            <Grid 
              item 
              xs={6} sm={6} md={4} lg={3} xl={3}
              key={index} 
              style={{ display: "flex" , justifyContent:"center" , alignItems:"center", flexGrow: 1 }} 
            >
              <StyledCardWrapper type={type} item={item} setWishlistData={setWishlistData} setWishlistLoading={setWishlistLoading}/>
            </Grid>
          ))
        ) : (
          // ✅ No data available, render NoDataComponent
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <NoDataComponent />
          </Grid>
        )}
      </Grid>
    </GridWrapperComponent>
  );
}

export default GridWrapper;
