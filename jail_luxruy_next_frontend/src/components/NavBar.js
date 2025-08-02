"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Favorite,
  Close as CloseIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ProfileBtn from "./buttons/profileBtn";
import ThemeToggle from "./themeToggle";
import { useTheme } from "@emotion/react";
import { AppContext } from "@/context/applicationContext";
import SearchComponent from "./searchComponent";

const navItems = ["Clothing", "Travel", "Bag", "Purse", "Men", "Women"];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#fff",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavItem = styled("span")(({ theme }) => ({
  cursor: "pointer",
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 600,
  color: "#000",
  textTransform: "capitalize",
}));

const SubText = styled("div")(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  textAlign: "center",
  color: "#000",
  marginTop: 24,
  fontWeight: "600",
}));

const MobileNav = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    padding: theme.spacing(2),
  },
}));

export default function Navbar({ carouselImages, userData }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { setCategoryItems, setUser } = useContext(AppContext);

  useEffect(() => {
    setCategoryItems(carouselImages);
    setUser(userData);
  }, [carouselImages?.length, userData]);

  const toggleMobileNav = () => setMobileOpen((prev) => !prev);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(
        `/search?userInput=${encodeURIComponent(searchQuery.trim())}`
      );
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            minHeight: 64,
            px: 1,
            pt: 1,
          }}
        >
          {isMobile ? (
            <>
              {/* Mobile: Left */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton onClick={toggleMobileNav} sx={{color:"#000"}}>
                  <MenuIcon />
                </IconButton>
                <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)} sx={{color:"#000"}}>
                  {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
                </IconButton>
              </Box>

              {/* Mobile: Center Logo */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mt:0.5,
          
                }}
                onClick={() => router.push("/")}
              >
                <img
                  src="/webps/homePageLogoLight.webp"
                  alt="Logo"
                  style={{ height: 32 }}
                />
              </Box>

              {/* Mobile: Right */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton>
                  <ProfileBtn text="" loggedInId={userData?.id} />
                </IconButton>
                <IconButton onClick={() => router.push("/cart")} sx={{color:"#000"}}>
                  <ShoppingCart />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              {/* Desktop: Left Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  marginTop: 2,
                }}
                onClick={() => router.push("/")}
              >
                <img
                  src="/webps/homePageLogoLight.webp"
                  alt="Logo"
                  style={{ height: 32 }}
                />
              </Box>

              {/* Desktop: Center Nav Items */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 4 }}>
                  {navItems.map((item, i) => (
                    <NavItem key={i}>{item}</NavItem>
                  ))}
                </Box>
                <SubText>Get discount on sling bags</SubText>
              </Box>

              {/* Desktop: Right Side with "About us" on top */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {/* About us on top right */}
                <Box
                  sx={{
                    mb: 1,
                    mx: 1,
                    cursor: "pointer",
                    display: { xs: "none", md: "block" },
                  }}
                  onClick={() => router.push("/about")}
                >
                  <NavItem>About us</NavItem>
                </Box>

                {/* Icon buttons below */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    sx={{ color: "#000" }}
                    onClick={() => {
                      if (userData?.id) {
                        router.push("/auth/google"); 
                      } else {
                        router.push("/login-signup"); 
                      }
                    }}
                  >
                    <ProfileBtn
                      text={userData?.id ? "Profile" : "Login / Signup"}
                      loggedInId={userData?.id}
                    />
                  </IconButton>

                  <IconButton
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    sx={{ color: "#000" }}
                  >
                    {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
                  </IconButton>
                  <IconButton
                    onClick={() => router.push("/wishlist")}
                    sx={{ color: "#000" }}
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton
                    onClick={() => router.push("/cart")}
                    sx={{ color: "#000" }}
                  >
                    <ShoppingCart />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Search Bar */}
      {isSearchOpen && (
        <SearchComponent
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}

      {/* Mobile Drawer */}
      <MobileNav anchor="left" open={mobileOpen} onClose={toggleMobileNav}>
        <IconButton onClick={toggleMobileNav} sx={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            mt: 2,
          }}
        >
          {navItems.map((item) => (
            <NavItem key={item}>{item}</NavItem>
          ))}
          <NavItem onClick={() => router.push("/about")}>About us</NavItem>
          <ThemeToggle />
          <ProfileBtn
            text={userData?.id ? "Profile" : "Login / Signup"}
            loggedInId={userData?.id}
          />
        </Box>
      </MobileNav>
    </>
  );
}
