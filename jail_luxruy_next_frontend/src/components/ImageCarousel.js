"use client";
import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/056ba1dae8c9f4a1.jpg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/28ce80d034b9c679.jpg?q=80",
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/d8baef8bd2d25575.jpeg?q=80",
];

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Slider {...settings}>
        {images.map((url, index) => (
          <Box
            key={index}
            component="img"
            src={url}
            alt={`Slide ${index}`}
            sx={{
              width: "100%",
              height: { xs: "180px", sm: "250px", md: "350px" },
              objectFit: "cover",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
}
