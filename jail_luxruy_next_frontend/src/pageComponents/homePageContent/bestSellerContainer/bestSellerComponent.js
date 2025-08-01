"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const PRODUCTS = {
  MEN: [
    {
      title: "Leather Bag",
      price: "₹12,500",
      image: "/image7.png",
      colors: ["#a7622d", "#1b1b1b", "#2f3a1e"],
    },
    {
      title: "Steamer Carryon",
      price: "₹4,000",
      image: "/image5.png",
      colors: ["#8c3f24", "#e8e4cd", "#d2d17b"],
    },
  ],
  WOMEN: [
    {
      title: "Women Jacket",
      price: "₹1,999",
      image: "/image4.png",
      colors: ["#000", "#b4766c", "#c2c2c2"],
    },
    {
      title: "Premium Wallets",
      price: "₹1,800",
      image: "/image6.png",
      colors: ["#7c2a2a", "#efe4d3", "#9ab58e"],
    },
  ],
};

const BAG_CATEGORIES = [
  {
    title: "DUFFLE",
    subtitle: "BAGS",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolor quibusdam cumque.",
    image: "/image8.png",
    imageAlt: "Duffle Bag",
    imageMaxWidth: "410px",
    textAlignment: "left",
    lineJustify: "flex-start",
  },
  {
    title: "SLING",
    subtitle: "BAGS",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus aspernatur id eum repudiandae obcaecati cum asperiores.",
    image: "/image7.png",
    imageAlt: "Sling Bag",
    imageMaxWidth: "443px",
    textAlignment: "left",
    lineJustify: "flex-end",
  },
  {
    title: "WALLETS",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolor quibusdam cumque.",
    image: "/image6.png",
    imageAlt: "Premium wallets",
    imageMaxWidth: "410px",
    textAlignment: "left",
    lineJustify: "flex-start",
  },
  {
    title: "TROLLEY",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus aspernatur id eum repudiandae obcaecati cum asperiores.",
    image: "/image5.png",
    imageAlt: "Trolley",
    imageMaxWidth: "443px",
    textAlignment: "left",
    lineJustify: "flex-end",
  },
  {
    title: "JACKETS",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolor quibusdam cumque.",
    image: "/image4.png",
    imageAlt: "Jackets",
    imageMaxWidth: "410px",
    textAlignment: "left",
    lineJustify: "flex-start",
  },
  {
    title: "GLOVES",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus aspernatur id eum repudiandae obcaecati cum asperiores.",
    image: "/image3.png",
    imageAlt: "Gloves",
    imageMaxWidth: "443px",
    textAlignment: "left",
    lineJustify: "flex-end",
  },
  {
    title: "SHOES",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dolor quibusdam cumque.",
    image: "/image2.png",
    imageAlt: "Shoes",
    imageMaxWidth: "410px",
    textAlignment: "left",
    lineJustify: "flex-start",
  },
  {
    title: "BELTS",
    subtitle: "",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus aspernatur id eum repudiandae obcaecati cum asperiores.",
    image: "/image1.png",
    imageAlt: "Belts",
    imageMaxWidth: "443px",
    textAlignment: "left",
    lineJustify: "flex-end",
  },
];

const BestSellerContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4, 2),
  maxWidth: "1400px",
  margin: "auto",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
}));

const ProductCard = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
});

const ProductImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const ColorDot = styled("span")((props) => ({
  width: 14,
  height: 14,
  borderRadius: "50%",
  backgroundColor: props.color,
  display: "inline-block",
  margin: "0 4px",
  border: "1px solid #999",
}));

const BagCategorySection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", py: 5 }}>
      {BAG_CATEGORIES.map((category, index) => (
        <Grid container spacing={4} alignItems="center" mb={6} key={index}>
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: index % 2 === 0 ? 1 : 2 }}
          >
            <Box display="flex" justifyContent="center">
              <img
                src={category.image}
                alt={category.imageAlt}
                style={{
                  width: "100%",
                  maxWidth: category.imageMaxWidth,
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 2, md: index % 2 === 0 ? 2 : 1 }}
          >
            <Typography
              mx={isTablet ? 2 : 1}
              variant={isMobile ? "h4" : "h1"}
              align="center"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "900",
              }}
            >
              {category.title}
              <br />
              {category.subtitle}
            </Typography>

            {!isMobile && (
              <Typography
                mt={2}
                mx={1}
                color="text.secondary"
                textAlign={category.textAlignment}
              >
                {category.description}
              </Typography>
            )}

            <Box
              mt={8}
              display="flex"
              justifyContent={isMobile ? "center" : category.lineJustify}
            >
              {!isMobile && (
                <Box
                  sx={{
                    width: "78px",
                    height: "2px",
                    backgroundColor: "black",
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      ))}

      <Box mt={0} px={0.1} my={-4}>
        <img
          src="/fashionCouple.png"
          alt="Fashion Couple"
          style={{
            width: "100%",
            maxWidth: "1307px",
            height: "633px",
            borderRadius: "1px",
          }}
        />
      </Box>
    </Box>
  );
};

function BestSellerComponentContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState("MEN");
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    setVisibleIndex(0);
  };

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % PRODUCTS[selectedTab].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, selectedTab]);

  const displayedProducts = isMobile
    ? [PRODUCTS[selectedTab][visibleIndex]]
    : PRODUCTS[selectedTab];

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <BestSellerContainer>
        <Typography variant="h6" gutterBottom fontWeight="1000">
          OUR BEST SELLER
        </Typography>

        <Box
          sx={{
            padding: 1,
            mb: -1.5,
            border: "3px solid wheat",
            borderRadius: "1px",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered={!isMobile}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{ mb: 3 }}
          >
            <StyledTab label="MEN" value="MEN" />
            <StyledTab label="WOMEN" value="WOMEN" />
          </Tabs>

          <Grid container spacing={4} justifyContent="center">
            {displayedProducts.map((product, index) => (
              <Grid key={index} item xs={12} sm={6} md={5}>
                <ProductCard>
                  <ProductImage src={product.image} alt={product.title} />
                  <Box
                    px={2}
                    py={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      MRP {product.price}
                    </Typography>
                    <Box mt={1} display="flex" justifyContent="center">
                      {product.colors.map((color, i) => (
                        <ColorDot key={i} color={color} />
                      ))}
                    </Box>
                  </Box>
                </ProductCard>
              </Grid>
            ))}
          </Grid>

          <Box mt={1} mb={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
                px: 1.5,
                py: 1.2,
                fontWeight: 500,
              }}
            >
              EXPLORE BEST SELLERS
            </Button>
          </Box>
        </Box>
      </BestSellerContainer>

      <BagCategorySection />
    </Box>
  );
}

export default function BestSellerComponent() {
  return <BestSellerComponentContent />;
}
