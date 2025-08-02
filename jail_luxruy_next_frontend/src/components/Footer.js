"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography, Grid, IconButton, Button } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Pinterest as PinterestIcon,
} from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: "2vh",
  backgroundColor: theme.palette.navbac.main,
  color: theme.custom.primaryButtonFontColor,
  padding: "2rem 2rem 3rem",
}));

const FooterLink = styled(Box)(({ theme }) => ({
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const SocialIcons = styled(IconButton)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1.5),
}));

const Footer = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <FooterContainer>
      <Grid
        container
        sx={{
          display: { xs: "flex", md: "flex" },
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: { xs: "start", md: "start" }, 
          mt: 1,
        }}
      >
        {/* main */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            borderRight: { md: "1px solid black" }, 
            p: { md: 1 }, 
            mb: { xs: 2, md: 0 },
          }}
        >
          <img
            src="/jailLogo.webp"
            alt="logo"
            style={{
              maxWidth: "200px",
              background: "black",
              padding: "3px",
              borderRadius: "10px",
              marginBottom: "14px",
            }}
          />
          {[
            "Jail is a luxury e-commerce store",
            "which sells premium leather",
            "products",
            "Mobile: +91-8585858586",
            "Email: support@jail.luxury",
          ].map((line, index) => (
            <Typography key={index} variant="body2">
              {line}
            </Typography>
          ))}
        </Grid>

        {/* HELP */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            borderRight: { md: "1px solid gray" },
            p: { md: 1 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              borderRadius: "11px",
              cursor: "default",
              fontWeight: "bolder",
              mb: "14px",
              fontSize: "18px",
              bgcolor: "white",
              color: "black",
            }}
          >
            Help
          </Button>
          <FooterLink onClick={() => handleNavigation("/termcondition")}>
            Terms and Conditions
          </FooterLink>
          <FooterLink onClick={() => handleNavigation("/privacypolicy")}>
            Privacy Policy
          </FooterLink>
          <FooterLink onClick={() => handleNavigation("/returnrefund")}>
            Returns and Refunds Policy
          </FooterLink>
          <FooterLink onClick={() => handleNavigation("/shippingpolicy")}>
            Shipping Policy
          </FooterLink>
          <FooterLink onClick={() => handleNavigation("/cancellationpolicy")}>
            Cancellation Policy
          </FooterLink>
        </Grid>

        {/* COMPANY */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            borderRight: { md: "1px solid gray" },
            p: { md: 1 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              borderRadius: "11px",
              cursor: "default",
              fontWeight: "bolder",
              mb: "14px",
              fontSize: "18px",
              bgcolor: "white",
              color: "black",
            }}
          >
            Company
          </Button>
          <FooterLink onClick={() => handleNavigation("/about")}>
            About Us
          </FooterLink>
          <FooterLink onClick={() => handleNavigation("/contact")}>
            Contact Us
          </FooterLink>
        </Grid>

        {/* SHOP PRODUCTS */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            borderRight: { md: "1px solid gray" },
            p: { md: 1 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              borderRadius: "11px",
              cursor: "default",
              fontWeight: "bolder",
              mb: "14px",
              fontSize: "18px",
              bgcolor: "white",
              color: "black",
            }}
          >
            SHOP PRODUCTS
          </Button>
          {[
            "Bags",
            "Belts",
            "Duffle Bags",
            "Gloves",
            "Jackets",
            "Shoes",
            "Trolley",
            "Wallets",
          ].map((item) => (
            <FooterLink
              key={item}
              onClick={() =>
                handleNavigation(`/products/${item.toLowerCase().replace(/ /g, "_")}`)
              }
            >
              {item}
            </FooterLink>
          ))}
        </Grid>

        {/* SOCIAL MEDIA */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            borderRight: { md: "1px solid gray" },
            p: { md: 1 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              borderRadius: "11px",
              cursor: "default",
              fontWeight: "bolder",
              mb: "14px",
              fontSize: "18px",
              bgcolor: "white",
              color: "black",
            }}
          >
            SOCIAL MEDIA
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <SocialIcons onClick={() => handleNavigation("https://www.facebook.com/jail.luxury")}>
              <FacebookIcon style={{ color: "#1877F2" }} />
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation("https://www.instagram.com/jail.luxury")}>
              <InstagramIcon style={{ color: "#E4405F" }} />
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation("https://x.com/jailluxury")}>
              <TwitterIcon style={{ color: "#1DA1F2" }} />
            </SocialIcons>
            <SocialIcons
              onClick={() => handleNavigation("https://www.linkedin.com/company/jail-luxury/")}
            >
              <LinkedInIcon style={{ color: "#0A66C2" }} />
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation("https://pin.it/35X2dFOen")}>
              <PinterestIcon style={{ color: "#BD081C" }} />
            </SocialIcons>
          </Box>
        </Grid>

        {/* LOCATION */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "center",
            p: { md: 1 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              borderRadius: "11px",
              cursor: "default",
              fontWeight: "bolder",
              mb: "14px",
              fontSize: "18px",
              bgcolor: "white",
              color: "black",
            }}
          >
            LOCATION
          </Button>
          {[
            "3633 Prabhash Complex",
            "Mukundopur Bhagwanpur – 24",
            "South Pargana",
            "Kolkata 700150",
            "India",
          ].map((line, index) => (
            <Typography key={index} variant="body2">
              {line}
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* COPYRIGHT */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color={theme.palette.text.secondary.main}>
          Copyright © 2025 Jail Luxury. All rights reserved.
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary.main}>
          Designed and Developed by{" "}
          <a
            href="https://sandstechnologysolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sands Technology Solution
          </a>
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
