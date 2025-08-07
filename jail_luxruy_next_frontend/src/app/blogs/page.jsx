"use client";

import React from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Paper,
  Stack,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BarChartIcon from "@mui/icons-material/BarChart";

// Sample data for the cards, now with categories
const sampleCards = [
  {
    type: "product",
    category: "Belt",
    content: {
      image: "https://via.placeholder.com/300x180?text=Belt+Image",
      title: "Leather Belt",
      description: "Stylish and durable leather belt.",
    },
  },
  {
    type: "product",
    category: "Duffel Bag",
    content: {
      image: "https://via.placeholder.com/300x180?text=Duffel+Bag+Image",
      title: "Travel Duffel Bag",
      description: "Spacious duffel bag perfect for travel.",
    },
  },
  {
    type: "product",
    category: "Leather bag",
    content: {
      image: "https://via.placeholder.com/300x180?text=Gym+Bag+Image",
      title: "Sports Gym Bag",
      description: "Multifunctional gym bag with shoe compartment.",
    },
  },
  {
    type: "image",
    category: "General",
    content: {
      image: "/sample2.jpg",
      caption: "Sunshine after the storm.",
      source: "make-a-git.io",
      profile: "/images/profile2.jpg",
      profileName: "Ryan Charrin",
    },
  },
];

// Reusable Card Container Component
const CardContainer = ({ children, isImageCard = false }) => (
  <Paper
    elevation={isImageCard ? 0 : 2}
    sx={{
      p: isImageCard ? 0 : 2,
      borderRadius: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: isImageCard ? 0 : 2,
      overflow: "hidden",
    }}
  >
    {children}
  </Paper>
);



// Image Card Component
const ImageCard = ({ content }) => (
  <CardContainer isImageCard={true}>
    <CardMedia
      component="img"
      image={content.image}
      alt="Blog image"
      sx={{ height: 250, objectFit: "cover" }}
    />
    <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
      <Typography variant="body2">{content.caption}</Typography>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
        <Avatar
          src={content.profile}
          alt={content.profileName}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption" color="text.secondary">
          {content.profileName}
        </Typography>
      </Stack>
    </CardContent>
  </CardContainer>
);

// Product Card Component
const ProductCard = ({ content }) => (
  <Card sx={{ height: "100%" }}>
    <CardMedia
      component="img"
      image={content.image}
      alt={content.title}
      sx={{ height: 180, objectFit: "cover" }}
    />
    <CardContent>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {content.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content.description}
      </Typography>
    </CardContent>
  </Card>
);



const BlogCards = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Belt");
  const router = useRouter(); // Initialize router

  const categories = [
    "Belt",
    "Duffel Bag",
    "Leather bag",
  ];

  const filteredCards = sampleCards.filter(
    (card) => selectedCategory === "All" || card.category === selectedCategory
  );

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };
  
  // New function to handle navigation
  const handleCardClick = () => {
    router.push("/blogdetails");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable categories"
        >
          {categories.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={2}>
        {filteredCards.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              onClick={handleCardClick} // Add onClick handler here
              sx={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
            >
              {(() => {
                switch (item.type) {
                  case "product":
                    return <ProductCard content={item.content} />;
                  case "image":
                    return <ImageCard content={item.content} />;
                  default:
                    return null;
                }
              })()}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogCards;