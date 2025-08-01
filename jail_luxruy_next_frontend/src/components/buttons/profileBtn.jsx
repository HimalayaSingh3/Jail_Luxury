"use client";
import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/API_lib";
import { AppContext } from "@/context/applicationContext";

// Styled button component using MUI theme
const StyledButton = styled("button")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "5vh",
  position: "relative",
  display: "inline-block",
  padding: "0vh 3vh",
  border: `0.4vh solid ${theme.palette.secondary.main}`, // Use theme primary color
  borderRadius: "0.5vh",
  textTransform: "uppercase",
  color: theme.palette.text.primary, // Use theme text color
  textDecoration: "none",
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(20),
  fontFamily:"Abyssinica SIL",
  backgroundColor: "transparent",
  cursor: "pointer",
  "&::before": {
    content: '""',
    position: "absolute",
    top: theme.typography.pxToRem(6),
    left: `-${theme.typography.pxToRem(2)}`,
    width: "calc(100% + 4px)",
    height: "calc(100% - 12px)",
    backgroundColor: theme.palette.navbac.main, // Use theme background color
    transition: "transform 0.2s ease-in-out",
    transform: "scaleY(1)",
  },
  "&:hover::before": {
    transform: "scaleY(0)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: theme.typography.pxToRem(6),
    top: `-${theme.typography.pxToRem(2)}`,
    height: "calc(100% + 4px)",
    width: "calc(100% - 12px)",
    backgroundColor: theme.palette.navbac.main, // Use theme background color
    transition: "transform 0.2s ease-in-out",
    transform: "scaleX(1)",
    transitionDelay: "0.3s",
  },
  "&:hover::after": {
    transform: "scaleX(0)",
  },
  "& span": {
    position: "relative",
    zIndex: 3,
  },
}));

const MenuContainer = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: theme.typography.pxToRem(19),
    minWidth: theme.typography.pxToRem(155),
    maxWidth: theme.typography.pxToRem(200),
    padding: theme.typography.pxToRem(8),
    borderRadius: theme.typography.pxToRem(8),
    backgroundColor: theme.palette.background.paper,
    color: theme.custom.primaryButtonFontColor,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "100%",
  },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: `${theme.typography.pxToRem(12)} ${theme.typography.pxToRem(16)}`,
  borderRadius: theme.typography.pxToRem(7),
  gap: theme.typography.pxToRem(12),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.ascentColor.main,
  },
}));

const ProfileBtn = ({ text, loggedInId }) => {
  const { setUser } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor
  const open = Boolean(anchorEl); // Check if menu is open

  // Handle button click to open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter(); // Initialize the router

  const handleProfileNavigation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/userContact"); // Programmatically navigate to the path
  };

  const handleUserLoginSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/login-signup");
  };

  const handleGoToOrders = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/orders"); // Programmatically navigate to the path
  };

  const handleGoToContactUs = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/contact");
  };

  const handleLogout = async (e) => {
    setUser({});
    await logout();
    console.log("logged out success")
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Styled Button */}
      <StyledButton onClick={handleClick}>{text}</StyledButton>

      {/* MUI Menu */}
      <MenuContainer
        anchorEl={anchorEl} // Anchor the menu to the button
        open={open} // Control menu visibility
        onClose={handleClose} // Close menu on item click or outside click
        MenuListProps={{
          "aria-labelledby": "profile-button", // Accessibility
        }}
        anchorOrigin={{
          vertical: "bottom", // Position menu below the button
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top", // Align menu with the top of the button
          horizontal: "left",
        }}
      >
        {!loggedInId || loggedInId == undefined
          ? [
              <MenuItemStyled
                key="login-signup"
                onClick={(e) => {
                  handleClose();
                  handleUserLoginSignup(e);
                }}
              >
                Login / SignUp
              </MenuItemStyled>,
            ]
          : [
              <MenuItemStyled
                key="orders"
                onClick={(e) => {
                  handleClose();
                  handleGoToOrders(e);
                }}
              >
                Orders
              </MenuItemStyled>,
              <MenuItemStyled
                key="contact-us"
                onClick={(e) => {
                  handleClose();
                  handleGoToContactUs(e);
                }}
              >
                Contact us
              </MenuItemStyled>,
              <MenuItemStyled
                key="edit-profile"
                onClick={(e) => {
                  handleClose();
                  handleProfileNavigation(e);
                }}
              >
                Edit Profile
              </MenuItemStyled>,
              <MenuItemStyled
                key="logout"
                onClick={(e) => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItemStyled>,
            ]}
      </MenuContainer>
    </>
  );
};

export default ProfileBtn;