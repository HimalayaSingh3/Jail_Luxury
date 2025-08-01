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
import { navigationConfig } from "@/app/configs/navigationConfig";
import ProfileBtn from "./buttons/profileBtn";
import TruncatedText from "./wrappers/TruncatedText";
import ThemeToggle from "./themeToggle";
import { useTheme } from "@emotion/react";
import useDebounce from "@/utils/customHooks/useDebounce";
import { AppContext } from "@/context/applicationContext";
import CategoryDropdown from "@/components/catogeryComponent/CategoryDropdown";
import SearchComponent from "./searchComponent";

// Styled Components
const StyledButton = styled("span")(({ theme }) => ({
  textTransform: "none",
  margin: "1vh",
  color: theme.custom.primaryButtonFontColor,
  fontSize: theme.typography.pxToRem(15),
  minWidth: theme.typography.pxToRem(80),
  maxWidth: theme.typography.pxToRem(300),
  cursor: "pointer",
}));

const StyledIcon = styled("span")(({ theme }) => ({
  margin: "1vh",
  color: theme.typography.color,
  fontSize: theme.typography.pxToRem(15),
  maxWidth: theme.typography.pxToRem(50),
  cursor: "pointer",
}));

const HomeLogoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  cursor: "pointer",
  "& img": {
    maxWidth: theme.typography.pxToRem(250),
    maxHeight: theme.typography.pxToRem(35),
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.typography.pxToRem(200),
      maxHeight: theme.typography.pxToRem(30),
    },
  },
}));

const MobileNav = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.typography.pxToRem(300),
    padding: theme.spacing(2),
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.navbac.main,
  borderBottom: 1,
  borderColor: "divider",
}));

const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 2,
  alignItems: "center",
}));

export default function Navbar({ carouselImages, userData }) {
  const theme = useTheme();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCategoryItems, setUser } = useContext(AppContext);

  // 👇 Switch to hamburger when screen is less than "md" breakpoint
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setCategoryItems(carouselImages);
    setUser(userData);
  }, [carouselImages?.length, userData]);

  useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  const toggleMobileNav = () => setMobileOpen((prev) => !prev);

  const handleSearch = useDebounce((query) => {
    if (query.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(query)}`;
      router.push(searchPath);
    }
  }, 500);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(searchQuery)}`;
      router.push(searchPath);
    }
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {isMobile && (
            <StyledIcon onClick={toggleMobileNav}>
              <MenuIcon />
            </StyledIcon>
          )}

          {!isMobile && (
            <NavLinksContainer>
              <CategoryDropdown />
              <StyledButton onClick={() => router.push("/about")}>
                About Us
              </StyledButton>
              <StyledButton onClick={() => router.push("/contact")}>
                Contact Us
              </StyledButton>
            </NavLinksContainer>
          )}

          <HomeLogoWrapper onClick={() => router.push("/")}>
            <img
              src={
                theme.palette.mode === "light"
                  ? "/webps/homePageLogoLight.webp"
                  : "/webps/homePageLogoDark.webp"
              }
              alt="Logo"
            />
          </HomeLogoWrapper>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <StyledIcon onClick={() => setIsSearchOpen(!isSearchOpen)}>
                {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
              </StyledIcon>
              {!isMobile && (
                <>
                  <StyledIcon onClick={() => router.push("/wishlist")}>
                    <Favorite />
                  </StyledIcon>
                  <StyledIcon onClick={() => router.push("/cart")}>
                    <ShoppingCart />
                  </StyledIcon>
                </>
              )}
            </Box>

            {!isMobile && (
              <>
                <ProfileBtn
                  text={
                    userData?.name ? (
                      <TruncatedText maxWidth="9vw">
                        {userData.name}
                      </TruncatedText>
                    ) : (
                      <TruncatedText maxWidth="9vw">Profile</TruncatedText>
                    )
                  }
                  loggedInId={userData?.id}
                />
                <ThemeToggle />
              </>
            )}
          </Box>
        </Toolbar>

        {isSearchOpen && (
          <SearchComponent
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </StyledAppBar>

      {/* Hamburger Drawer for Mobile */}
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
          }}
        >
          <CategoryDropdown />
          {navigationConfig.map(
            (item) =>
              item?.render === true && (
                <StyledButton
                  key={item.path}
                  onClick={() => {
                    toggleMobileNav();
                    router.push(item.path);
                  }}
                >
                  {item.text}
                </StyledButton>
              )
          )}
          <ThemeToggle />
          {isMobile &&
            (userData?.id ? (
              <StyledButton onClick={() => router.push("/userContact")}>
                Profile
              </StyledButton>
            ) : (
              <StyledButton onClick={() => router.push("/login-signup")}>
                Login / Signup
              </StyledButton>
            ))}
        </Box>
      </MobileNav>
    </>
  );
}
