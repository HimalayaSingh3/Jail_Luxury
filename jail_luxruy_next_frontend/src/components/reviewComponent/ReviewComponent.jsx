"use client"
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, useTheme,styled } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

// Styled MUI Components
const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  backgroundColor: "black",
  gap: "15px",
  padding: "20px",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  whiteSpace: "nowrap",
  width: "80vw",
  marginLeft: "10vw",
  marginRight: "10vw",
  scrollBehavior: "smooth",
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
    padding: "10px",
    width: "90vw", // Adjust width for smaller screens
    marginLeft: "5vw", // Adjust margin for smaller screens
    marginRight: "5vw", // Adjust margin for smaller screens
  },
}));

const ReviewCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.custom.cardBg,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.custom.btnBorder}`,
  borderRadius: "12px",
  padding: "16px",
  minWidth: "200px",
  maxWidth: "200px",
  width: "100%",
  height: "auto",
  scrollSnapAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    minWidth: "150px", // Adjust min-width for smaller screens
    maxWidth: "150px", // Adjust max-width for smaller screens
    padding: "12px",
  },
}));

const ProfileCircle = styled(Box)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: `2px solid ${theme.custom.btnBorder}`,
  marginBottom: "8px",
}));

const StarRating = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "2px",
  color: "#FFD700",
});

const ReviewText = styled(Typography)(({ theme }) => ({
  marginTop: "10px",
  fontSize: "12px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  marginTop: "10px",
  fontSize: "10px",
  color: "#888",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "9px",
  },
}));

const SingleReviewCard = ({ name, rating, review, date }) => {
  return (
    <ReviewCard>
      <Box display="flex" alignItems="center" gap="12px">
        <ProfileCircle />
        <Typography variant="subtitle1">{name}</Typography>
      </Box>
      <StarRating>
        {Array.from({ length: rating }, (_, i) => (
          <StarIcon key={i} fontSize="small" />
        ))}
      </StarRating>
      <ReviewText>{review}</ReviewText>
      <DateText>Posted on {date}</DateText>
    </ReviewCard>
  );
};

const ReviewComponent = () => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollSpeed = 1; // Speed of scrolling (pixels per frame)

  // Smooth automatic scrolling with seamless loop
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;

    const scroll = () => {
      if (scrollContainer && !isScrolling) {
        // Increment scroll position
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position to create a seamless loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0; // Reset to start
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start scrolling
    animationFrameId = requestAnimationFrame(scroll);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling]);

  // Pause automatic scrolling on user interaction
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let timeoutId;

    const handleScroll = () => {
      setIsScrolling(true); // Pause automatic scrolling
      clearTimeout(timeoutId); // Clear previous timeout

      // Resume automatic scrolling after a delay
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // 1 second delay
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const reviews = Array(10).fill({
    name: "Srinjoy Betal",
    rating: 5,
    review:
      "This leather wallet is a true quality piece - the leather feels soft, and the stitching is impeccable...",
    date: "Jan 19, 2025",
  });

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {reviews.map((review, index) => (
        <SingleReviewCard key={index} {...review} />
      ))}
      {/* Add duplicate cards for seamless looping */}
      {reviews.map((review, index) => (
        <SingleReviewCard key={`duplicate-${index}`} {...review} />
      ))}
    </ScrollContainer>
  );
};

export default ReviewComponent;