"use client";

import PropTypes from "prop-types";
import { Card, Box, Fade, Slide, useMediaQuery, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WishListButton from "../buttons/wishListBtn.jsx";
import CartBtn from "../buttons/cartBtn.jsx";
import DeleteBtn from "../buttons/deleteBtn.jsx";
import TruncatedText from "./TruncatedText.jsx";

// ── Custom Hook: useDeviceType ─────────────────────────────────────────
const pixelToRem = (px, base = 16) => `${px / base}rem`;

const useDeviceType = () => {
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  return isTouchDevice ? "touch" : "pc";
};

// ── Styled Components ──────────────────────────────────────────────────

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "deviceType" && prop !== "isProduct",
})(({ theme, deviceType, isProduct }) => ({
  margin: "1rem", // Use rem for consistent spacing
  width: "27rem", // Base width
  height: "32.5rem", // Base height
  maxWidth: "100%", // Ensure it doesn't overflow on small screens
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.custom?.cardBg || "#ffffff", // Fallback color
  borderRadius: "1.5rem", // Slightly rounded corners
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  willChange: "transform, box-shadow, opacity",
  ...(!isProduct && {
    backgroundColor:"",
  }),
  ...(isProduct && deviceType === "pc" &&  {
    
    "&:hover": {
      border:"none",
      transform: "scale(1.02)", // Slight scale-up on hover
      boxShadow: theme.shadows[6], // Use theme shadow for consistency
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
      "& .product-image": {
        transform: "scale(1.15)", // Scale up the image on card hover
      },
      ...(deviceType === "pc" && {
        
        "& .hover-content": {
          opacity: 1,
          transform: "translateY(0)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
        },
        "& .product-info": {
          opacity: 0,
        },
      }),
    },
  }),
  // For touch devices, make the hover content always visible
  ...(deviceType === "touch" && isProduct && {
    "& .hover-content": {
      opacity: 1,
      transform: "translateY(0)",
    },
  }),
  // Media queries for responsiveness
  [theme.breakpoints.down('xl')]: {
    width: "25rem", // Base width
    height: "18rem",
  },
  [theme.breakpoints.down('lg')]: {
    width: "18rem",
    height: "26.1rem",
  },
  [theme.breakpoints.down('md')]: {
    width: "19rem",
    height: "25.4rem",
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    height: "16.5rem",
    margin: "0.5rem 0",
  },
}));

const CardActionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "1rem 0",
  width: "100%", // Full width for better alignment
  padding: "0 1rem", 
  height:"1.6rem",
  // Add padding for spacing
}));

const ProductImage = styled("img")(({ theme }) => ({
  marginTop:"4%",
  width: "90%", // Full width to maintain responsiveness
  height: "26.7rem", // Fixed height for consistency
  objectFit: "cover", // Ensure the image covers the area without distortion
  borderRadius: "1rem 1rem 0 0", // Rounded corners only at the top
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
 

  [theme.breakpoints.down('xl')]: {
    height: "16rem",
  },
  [theme.breakpoints.down('lg')]: {
    height: "19rem",
  },
  [theme.breakpoints.down('md')]: {
    height: "19rem",
  },
  [theme.breakpoints.down('sm')]: {
    height: "11rem",
  },
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  padding:"0.5rem 0 0.5rem 0",
  opacity: 1, // Always visible
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
  display: "flex",
  
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "90%", // Full width for better alignment
  "& .product-name": {
    fontSize: "1rem", // Base font size
    fontWeight:"bold",
    
    color: theme.palette.text.primary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.1rem", // Smaller font size for large screens
      
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem", // Smaller font size for medium screens
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem", // Smaller font size for small screens
    },
  },
  "& .product-price": {
    fontSize: "1.1rem", // Base font size
    fontWeight:"bold",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "1rem", // Smaller font size for large screens
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem", // Smaller font size for medium screens
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem", // Smaller font size for small screens
    },
  },
}));

const HoverContent = styled(Box)(({ theme }) => ({
  position: "absolute", // Use absolute positioning to overlay on the card
  bottom: "0",
  width: "100%", // Ensure it spans the full width of the card
  color: theme.typography.color,
  opacity: 0, // Hidden by default on PC
  transform: "translateY(100%)", // Moved down by default on PC
  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Smooth transitions
  display: "flex",
  flexDirection: "row", // Ensure horizontal layout
  justifyContent: "space-between", // Space out items evenly
  alignItems: "center", // Vertically center items
  backgroundColor: theme.cardHover.main, // Semi-transparent background
  borderRadius: "0 0 1rem 1rem", // Rounded corners at the bottom
  padding: "0 0 0 1.3rem", // Consistent padding (left and right)
  height: "3.5rem", // Default height for larger screens

  
  [theme.breakpoints.down("xl")]: {
    height: "3.2rem", 
    padding: "0 0 0 0.4rem", 
  },
  [theme.breakpoints.down("lg")]: {
    height: "3rem", 
    padding: "0 0 0 1.2rem", 
  },
  [theme.breakpoints.down("md")]: {
    height: "2.6rem", 
    padding: "0 0 0 0.7rem", 
  },
  [theme.breakpoints.down("sm")]: {
    height: "2rem", 
    padding: "0 0 0 0.5rem", 
  },
}));
// ── Main Component ───────────────────────────────────────────────────
const StyledCardWrapper = React.memo(
  ({ type, item, accessToken, setWishlistData, setWishlistLoading }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);
    const deviceType = useDeviceType();

    useEffect(() => {
      setShow(true);
      router.prefetch("/item");
      return () => setShow(false);
    }, [router]);

    const mainImgUrl =
      item?.product_data?.gallery?.images?.[0] || "/placeholder.jpg";

    return (
      <Slide direction="up" in={show} mountOnEnter unmountOnExit key={item?.product_id + item?.product_detail_id + Date.now()}>
        <StyledCard
          deviceType={deviceType}
          isProduct={type === "Product"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(
              `/item/${item?.product_name}?pid=${item?.product_id}&pdid=${item?.product_detail_id}`
            );
          }}
        >
          <Fade in={show} timeout={500}>
            <ProductImage className="product-image" src={mainImgUrl} alt="Product Image" />
          </Fade>

          <ProductInfo className="product-info">
            <TruncatedText maxWidth="90%" variant="body1" className="product-name">
              {item?.product_name || "No Name"}
            </TruncatedText>
            <TruncatedText maxWidth="50%" variant="body1" className="product-price">
              ₹{item?.product_data?.price || "N/A"}
            </TruncatedText>
          </ProductInfo>

          {type === "Product" ? (
            <HoverContent className="hover-content">
              <Typography className="viewProduct" sx={{ whiteSpace: "nowrap"}}>
                View Product
              </Typography>
              <WishListButton item={item}  />
            </HoverContent>
          ) : (
            // For non-product types, show Cart and Delete buttons.
            <CardActionsContainer>
              <CartBtn
                item={item}
                setWishlistData={setWishlistData}
                setWishlistLoading={setWishlistLoading}
              />
              <DeleteBtn
                item={item}
                setWishlistData={setWishlistData}
                setWishlistLoading={setWishlistLoading}
              />
            </CardActionsContainer>
          )}
        </StyledCard>
      </Slide>
    );
  }
);

StyledCardWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object,
};

export default StyledCardWrapper;