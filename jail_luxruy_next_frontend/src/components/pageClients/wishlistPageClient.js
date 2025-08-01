"use client";
import React, { useEffect, useState, useCallback } from 'react';
import GridWrapper from '../wrappers/GridWrapper';
import { fetchUserWishlist } from '@/utils/API_lib';
import TruckLoader from '../loaders/truckLoader';
import ThreeDotLoader from '../loaders/threeDotLoader';
import {  styled } from "@mui/material";

const PageHeaderComp = styled("div")(({ theme, isMobileOrTablet }) => ({
  width: "100%",
  backgroundColor: theme.custom.banner,
  color: theme.custom.primaryButtonFontColor,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  fontSize: theme.typography.pxToRem(60),
  fontFamily: "aboreto",
  
}));

function WishListPageClient({ itemsArr }) {
  const [wishlistData, setWishlistData] = useState(itemsArr || []); // Initialize with itemsArr if provided
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // Memoize the fetchData function to avoid unnecessary re-creations
  const fetchData = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const data = await fetchUserWishlist(); // Pass accessToken if required
      setWishlistData(data);
      console.log("WishListPageClient: Data fetched successfully", data);
    } catch (error) {
      console.error("WishListPageClient: Error fetching wishlist data", error);
      // Optionally, set an error state here to display a user-friendly message
    } finally {
      setWishlistLoading(false); // Ensure wishlistLoading is set to false regardless of success or failure
    }
  }, []); // Only recreate fetchData if accessToken changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Run effect only when fetchData changes
  
  return (
    <div style={{ display: "flex",alignItems:"center", justifyContent: "center", flexDirection:"column" }}>
         <PageHeaderComp>WISHLIST</PageHeaderComp>
      <div  style={{ display: "flex",alignItems:"center", justifyContent: "center",maxWidth: "80vw", flexDirection:"column"}}>
   
      {wishlistLoading ? (
        <ThreeDotLoader />
      ) : (
        <GridWrapper
          type="Wishlist"
          itemsArr={wishlistData}
          setWishlistData={setWishlistData}
          setWishlistLoading={setWishlistLoading}
        />
      )}
      </div>
    </div>
  );
}

export default WishListPageClient;