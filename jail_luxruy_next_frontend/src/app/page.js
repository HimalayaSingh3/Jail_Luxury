// app/page.js or app/page.jsx

import ImageCarousel from "@/components/ImageCarousel";
import { Box } from "@mui/material";
import CategoryCarousel from "@/pageComponents/homePageContent/catagoryComponentContainer/CatagoryComponent";
import ReviewComponent from "@/components/reviewComponent/ReviewComponent";
import BestSellerComponent from "@/pageComponents/homePageContent/bestSellerContainer/bestSellerComponent";
import LocalVideoPlayer from "@/pageComponents/homePageContent/videoPlayers/LocalVideoPlayer";

export const runtime = "edge"; // ✅ Optional: for Edge runtime if supported

export default async function HomePage() {
  return (
    <Box sx={{ width: "100%", minHeight: "100%", bgcolor: "background.default" }}>
      {/* ✅ Image Carousel at the top */}
      <ImageCarousel />

      {/* ✅ Page Content Below the Carousel */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 5,
          px: 2,
        }}
      >
        {/* You can add more content here if needed */}
      </Box>

      {/* ✅ Category Carousel */}
      <CategoryCarousel />

      {/* ✅ Best Sellers */}
      <Box>
        <BestSellerComponent />
      </Box>

      {/* ✅ Video Promo Section */}
      <Box>
        <LocalVideoPlayer videoSrc="JailLuxuryPromovid.mp4" />
      </Box>

      {/* ✅ Optional: Reviews section (uncomment if needed) */}
      {/* <ReviewComponent /> */}
    </Box>
  );
}
