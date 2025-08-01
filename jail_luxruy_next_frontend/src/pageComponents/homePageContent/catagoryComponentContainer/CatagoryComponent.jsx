"use client";
import React, { useContext, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleComponent from "./CircleComponent";
import { AppContext } from "@/context/applicationContext";

// ✅ Styled Components
const CardContainer = styled(Box)(({ theme, mode }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "100%",
  },
}));

const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "85vw",
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    gap: theme.spacing(2),
  },
  minHeight: "35vh",
  scrollBehavior: "smooth",
}));

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.typography.color,
  fontFamily: theme.typography3?.fontFamily || "sans-serif",
}));

export default function CategoryCarousel({ mode = "light" }) {
  const { categoryItems } = useContext(AppContext);
  const totalCards = categoryItems?.length || 0;
  const scrollRef = useRef(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <CardContainer mode={mode}>
      <StyledText
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        SHOP BY CATEGORIES
      </StyledText>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {totalCards > 0 && (
          <IconButton onClick={scrollLeft} sx={{ mr: "1vh" }}>
            <ArrowBackIosIcon />
          </IconButton>
        )}

        {totalCards > 0 ? (
          <CircleWrapper ref={scrollRef}>
            {categoryItems?.map((item, index) => (
              <CircleComponent key={item.category_id || index} data={item} />
            ))}
          </CircleWrapper>
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No Categories Available
          </Typography>
        )}

        {totalCards > 0 && (
          <IconButton onClick={scrollRight} sx={{ ml: "1vh" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>

     <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    },
    justifyContent: "center",
    justifyItems: "center",
    gap: 4,
    width: "100%",
    mt: 4,
  }}
>
  {[
    {
      title: "Travel Essentials",
      img: "/travel.jpg", // ✅ Make sure these images are in your public folder
    },
    {
      title: "Hydro Collection",
      img: "/hydro.png",
    },
    {
      title: "New Arrival",
      img: "/new.png",
    },
  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: 460, sm: 400, md: 445 },
        width: { xs: 350, md: 382 },
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "start",
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "18px", sm: "20px" },
          fontWeight: 600,
          color: "white",
          mb: 1,
        }}
      >
        {item.title}
      </Typography>
      <Button
        variant="contained"
        sx={{
          height: 33,
          borderRadius: "0px",
          width: 178.75,
          fontSize: "13.75px",
          bgcolor: "white",
          color: "black",
          "&:hover": {
            bgcolor: "grey.300",
          },
        }}
      >
        View Collection
      </Button>
    </Box>
  ))}
</Box>

    <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(2, 1fr)",
    },
    justifyContent: "center",
    justifyItems: "center",
    gap: 4,
    width: "100%",
    mt: 4,
  }}
>
  {[
    {
      title: "FOR HIM",
      img: "/him.jpg", // ✅ Corrected path
    },
    {
      title: "FOR HER",
      img: "/her.jpg", // ✅ Corrected path
    },
  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: 320, sm: 400, md: 563 },
        width: { xs: 380, md: 625 },
        padding: {xs:0, md:2},
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "flex-center",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position:"relative",
          top:{xs:"150px", md:"250px"},
          fontSize: { xs: "18px", sm: "30px" },
          fontWeight: 600,
          color: "white",
          mb: 2,
        }}
      >
        {item.title}
      </Typography>
    </Box>
  ))}
</Box>

    </CardContainer>
  );
}
