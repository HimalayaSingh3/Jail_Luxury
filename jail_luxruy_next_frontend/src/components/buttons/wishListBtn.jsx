"use client";

import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GenericBtns from "./GenericBtns";
import { useRouter } from "next/navigation";
import { addOrEditWishlist, useWishlistApi } from "@/utils/API_lib";
import { AppContext } from "@/context/applicationContext";

// Styled Animated Icon Wrapper
const AnimatedIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  transition: "opacity 0.3s ease-in-out",
  minWidth: theme.typography.pxToRem(20),
  maxWidth: theme.typography.pxToRem(20),

  "& .active": {
    display: "none",
    color: "#f52121",
  },

  "& .inactive": {
    color: "#f52121",
  },

  "&.checked .active": {
    display: "inline-block",
    animation: "wiggle 0.5s ease-in-out",
  },

  "&.checked .inactive": {
    display: "none",
  },

  "@keyframes wiggle": {
    "0%, 100%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(-10deg)" },
    "50%": { transform: "rotate(10deg)" },
    "75%": { transform: "rotate(-10deg)" },
  },
}));

// WishList Button Component
function WishListButton({ item }) {
  const [isChecked, setIsChecked] = useState(item?.product_data?.isWishlisted);
  const [openDialog, setOpenDialog] = useState(false); // Control login dialog
  const router = useRouter(); // Next.js Router
  const { user } = useContext(AppContext);

  // Wishlist Toggle with Authentication Check
  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user?.id) {
      setIsChecked((prev) => !prev);
      await addOrEditWishlist(item?.product_detail_id, item?.product_id);
    } else {
      // Open login confirmation dialog
      setOpenDialog(true);
    }
  };

  // Handle Dialog Actions
  const handleCloseDialog = (e) => {
    e.preventDefault()
    e.stopPropagation(); // Stop event propagation
    setOpenDialog(false);
  };

  const handleAgreeToLogin = (e) => {
    e.preventDefault()
    e.stopPropagation(); // Stop event propagation
    setOpenDialog(false);
    router.push("/login-signup"); // Redirect to login in Next.js
  };

  return (
    <>
      <GenericBtns
        btnText={
          <AnimatedIcon className={isChecked ? "checked" : ""}>
            <FavoriteBorderIcon className="inactive" fontSize="medium" />
            <FavoriteIcon className="active" fontSize="medium" />
          </AnimatedIcon>
        }
        executableFunction={handleWishlistToggle}
        minWidth="5vh"
      />

      {/* Login Dialog */}
{/* Login Dialog */}
<Dialog 
  open={openDialog} 
  onClose={handleCloseDialog}
  // Add these props to stop propagation at the dialog level
  onClick={(e) => e.stopPropagation()}
  onKeyDown={(e) => e.stopPropagation()}
>
  <DialogTitle>Login Required</DialogTitle>
  <DialogContent onClick={(e) => e.stopPropagation()}>
    <Typography>You need to be logged in to add items to your wishlist.</Typography>
  </DialogContent>
  <DialogActions onClick={(e) => e.stopPropagation()}>
    <Button onClick={(e) => handleCloseDialog(e)} color="secondary">
      Cancel
    </Button>
    <Button onClick={(e) => handleAgreeToLogin(e)} color="primary" variant="contained">
      Login
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}

export default WishListButton;