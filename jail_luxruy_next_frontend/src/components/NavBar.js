import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Card,
  Drawer,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Favorite,
  Close as CloseIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { navigationConfig } from "@/app/configs/navigationConfig";
import ProfileBtn from "./buttons/profileBtn";
import TruncatedText from "./wrappers/TruncatedText";
import ThemeToggle from "./themeToggle";
import { useTheme } from "@emotion/react";
import useDebounce from "@/utils/customHooks/useDebounce";
import { AppContext } from "@/context/applicationContext";
import CategoryDropdown from "@/components/catogeryComponent/CategoryDropdown"; // Import the CategoryDropdown component
import SearchComponent from "./searchComponent";

// ✅ Styled Components
const StyledButton = styled("span")(({ theme }) => ({
  textTransform: "none",
  margin: "1vh",
  // fontSize: theme.typography.pxToRem(16),
  color: theme.custom.primaryButtonFontColor,
  fontSize: theme.typography.pxToRem(15),
  minWidth: theme.typography.pxToRem(80),
  maxWidth: theme.typography.pxToRem(300),
  cursor: "pointer",
}));

const StyledIcon = styled("span")(({ theme }) => ({
  textTransform: "none",
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

  useEffect(() => {
    console.log("userData", userData);
    setCategoryItems(carouselImages);
    setUser(userData);
  }, [carouselImages?.length, userData]);

  const useDeviceType = () => {
    const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
    const isIpadPro = useMediaQuery(
      "(min-width: 1024px) and (max-width: 1366px) and (orientation: portrait), (min-width: 1366px) and (max-width: 1024px) and (orientation: landscape)"
    );

    if (isIpadPro) {
      return "touch";
    }

    return isTouchDevice ? "touch" : "pc";
  };

  const deviceType = useDeviceType();

  const toggleMobileNav = () => setMobileOpen((prev) => !prev);

  useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  const handleSearch = useDebounce((query) => {
    if (query.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(query)}`;
      console.log("Navigating to:", searchPath);
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
      console.log("Navigating to:", searchPath);
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
          {/* Show mobile menu button for touch devices (including iPad Pro) */}
          {/* Show mobile menu button for touch devices (including iPad Pro) */}
          {deviceType === "touch" && (
            <StyledIcon
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileNav}
            >
              <MenuIcon />
            </StyledIcon>
          )}

          {/* Show desktop navigation for non-touch devices */}
          {deviceType === "pc" && (
            <NavLinksContainer>
              <CategoryDropdown />
              <StyledButton
                sx={{ textAlign: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/about");
                }}
              >
                About Us
              </StyledButton>
              <StyledButton
                sx={{ textAlign: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/contact");
                }}
              >
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
              alt="Jail Logo"
              priority
            />
          </HomeLogoWrapper>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <StyledIcon
                color="inherit"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="search"
              >
                {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
              </StyledIcon>
              {deviceType === "pc" && (
                <>
                  <StyledIcon
                    color="inherit"
                    onClick={() => router.push("/wishlist")}
                    aria-label="wishlist"
                  >
                    <Favorite />
                  </StyledIcon>
                  <StyledIcon
                    color="inherit"
                    onClick={() => router.push("/cart")}
                    aria-label="cart"
                  >
                    <ShoppingCart />
                  </StyledIcon>
                </>
              )}
            </Box>

            {deviceType === "pc" && (
              <>
                <ProfileBtn
                  text={
                    userData?.name ? (
                      <TruncatedText maxWidth="9vw">
                        {userData.name}
                      </TruncatedText>
                    ) : (
                      <TruncatedText maxWidth="9vw">{"Profile"}</TruncatedText>
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

      {/* Mobile Navigation Drawer */}
      <MobileNav anchor="left" open={mobileOpen} onClose={toggleMobileNav}>
        <IconButton onClick={toggleMobileNav} sx={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 2,
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
          {deviceType === "touch" &&
            (userData?.id ? (
              <StyledButton
                onClick={() => {
                  toggleMobileNav();
                  router.push("/userContact");
                }}
              >
                Profile
              </StyledButton>
            ) : (
              <StyledButton
                onClick={() => {
                  toggleMobileNav();
                  router.push("/login-signup");
                }}
              >
                Login / Signup
              </StyledButton>
            ))}
        </Box>
      </MobileNav>
    </>
  );
}
