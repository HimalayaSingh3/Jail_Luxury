"use client";
import React, { useEffect, useRef } from "react";
import { Typography, Card, Container } from "@mui/material";
import { styled } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Reusable Styled Components
const Section = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // Default to row layout
  alignItems: "center", // Vertically center items
  justifyContent: "space-between",
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  opacity: 0, // Start hidden for animation
  transform: "translateY(50px)",
  overflow: "hidden",
  color: theme.typography.color,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column", // Switch to column layout below lg
    alignItems: "center", // Center items in column layout
    textAlign: "center", // Center text in column layout
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2), // Smaller padding on small screens
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  color: theme.typography.color,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem", // Responsive font size
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  textAlign: "center",
  color: theme.typography.color,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem", // Responsive font size
  },
}));

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingBottom: 4 }}>
      <Title>
        Welcome <br /> To Jail Luxury, where heritage meets innovation!
      </Title>
      <Subtitle>
      Founded in 1972 by Shri Ramani Mohan Singh in the heart of Banka, Bihar, Jail Luxury began as a humble leather shop on Jail Road, a name that quickly became synonymous with quality craftsmanship. What started as a small family venture has grown into a global brand, celebrated for its exquisite leather products that blend traditional craftsmanship with contemporary design.
      At Jail Luxury, every product is a testament to our rich legacy and commitment to excellence. From handbags to jackets, wallets to accessories, our collections are crafted with precision and passion, ensuring that each piece carries the unmistakable mark of luxury.      </Subtitle>

      {/* ✅ Hard-coded Sections */}
      <Section ref={(el) => (sectionsRef.current[0] = el)}>
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1, minWidth: "200px" }}>
          Our Journey
        </Typography>
        <Typography sx={{ flex: 2 }}>
        The story of Jail Luxury is one of resilience and renewal. After the passing of our founder in 1984, the brand was shepherded by his third son, Mr. Rajesh Ranjan Singh, who expanded the business across Bhagalpur, Patna, and Kolkata. The brand’s influence grew, and Jail became a dominant name in the leather industry.
However, the global financial crisis of 2008 posed an immense challenge, leading to the closure of our stores and pushing the brand into obscurity. But the spirit of Jail was far from extinguished.
In 2016, Aditya Kumar, the nephew of Mr. Rajesh Ranjan Singh, took the reins, breathing new life into the brand. With a modern vision and a commitment to the family legacy, he revitalized Jail Luxury, transforming it into a private limited company in 2023.
Today, our headquarters in Kolkata, West Bengal, serves as the heart of our global operations, with a presence in the USA, France, Germany, Russia, and Canada.        </Typography>
      </Section>

      <Section
  ref={(el) => (sectionsRef.current[1] = el)}
  sx={{
    flexDirection: { xs: "column", lg: "row" }, // Default to row on lg and above
    alignItems: { xs: "center", lg: "flex-start" }, // Align items to the start on lg and above
  }}
>
  <Typography
    variant="h5"
    fontWeight="bold"
    sx={{
      flex: 1,
      minWidth: "200px",
      textAlign: { xs: "center", lg: "right" },
      order: { xs: 1, lg: 2 },
      alignSelf: { xs: "center", lg: "center" }, // Title comes second on lg and above
    }}
  >
    Our Philosophy
  </Typography>
  <Typography
    sx={{
      flex: 2,
      textAlign: { xs: "center", lg: "right" },
      order: { xs: 2, lg: 1 }, // Content comes first on lg and above
    }}
  >
At Jail Luxury, we believe that true luxury lies in the details. Our products are crafted with care, using the finest materials sourced from around the world. We are proud to operate state-of-the-art manufacturing facilities in Kolkata and Kanpur, where our skilled artisans bring our designs to life.
Our collaborations with renowned designers from Seattle and Paris have allowed us to push the boundaries of leather craftsmanship, creating unique and luxurious products that resonate with modern sensibilities while honouring our rich heritage.  </Typography>
</Section>

      <Section ref={(el) => (sectionsRef.current[2] = el)}>
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1, minWidth: "200px" }}>
          Our Products
        </Typography>
        <Typography sx={{ flex: 2 }}>
          We offer a wide range of leather goods, including:
          <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
            <li>Handbags</li>
            <li>Briefcases</li>
            <li>Laptop Bags</li>
            <li>Travel Bags</li>
            <li>Wallets</li>
            <li>Accessories</li>
            <li>Belts</li>
            <li>Jackets</li>
            <li>Footwear</li>
          </ul>
        </Typography>
      </Section>

      <Section ref={(el) => (sectionsRef.current[3] = el)} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ minWidth: "200px", textAlign: "center" }}>
          Why Jail?
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
        The name “Jail” is more than just a brand; it’s a nod to our roots. The original shop was located on Jail Road in Banka, and the name was born out of the simplicity of directions—“Jail Road, Jail Road.” Today, it stands as a symbol of our journey, from a small shop in Bihar to a luxury brand that resonates with customers around the world.        </Typography>
      </Section>

      <Section ref={(el) => (sectionsRef.current[4] = el)} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ minWidth: "200px", textAlign: "center" }}>
          Join Us on Our Journey
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
        As we continue to expand and innovate, we invite you to be part of our journey. Explore our collections, discover the story behind each piece, and experience the unparalleled luxury that only Jail can offer.        </Typography>
      </Section>
    </Container>
  );
};

export default About;