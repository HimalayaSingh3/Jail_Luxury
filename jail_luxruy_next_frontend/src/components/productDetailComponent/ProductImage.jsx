"use client"
import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, useMediaQuery , styled, useTheme} from "@mui/material";


const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  position: "relative",
  "@media (min-width: 900px)": {
    alignItems: "flex-start",
  },
});

const MainImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
});

const StyledMainImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  backgroundColor: theme.palette.secondary.main,
  cursor: "zoom-in",
  [theme.breakpoints.up("sm")]: {
    height: "400px",
  },
}));

const StyledThumbnailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  width: "100%",
  overflowX: "auto", // Enable horizontal scrolling
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: `${theme.palette.primary.main} transparent`, // For Firefox
  "&::-webkit-scrollbar": {
    height: "8px", // Scrollbar height
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main, // Scrollbar thumb color
    borderRadius: "4px", // Scrollbar thumb border radius
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[300], // Scrollbar track color
  },
  // Add hover effect for better visibility
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.dark, // Darker thumb on hover
  },
}));

const ThumbnailWrapper = styled(Box)({
  position: "relative",
  flexShrink: 0, // Prevent thumbnails from shrinking
});

const StyledThumbnail = styled("img")(({ theme, active }) => ({
  width: "64px",
  height: "64px",
  objectFit: "cover",
  borderRadius: "4px",
  cursor: "pointer",
  border: active ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
  transition: "border 0.2s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const ZoomContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "105%",
  width: theme.typography.pxToRem(560),
  height: theme.typography.pxToRem(430),
  overflow: "hidden",
  borderRadius: "8px",
  display: "none",
  backgroundRepeat: "no-repeat",
  backgroundSize: "300% 300%",
  backgroundColor: theme.custom.cardBg,
  zIndex: 1000,
  transition: "ease-in-out 0.3s !important",
}));

const CursorOverlay = styled(Box)(({ theme }) => ({
  position: "fixed", // Use fixed to ensure it follows the cursor correctly
  width: "100px", // Diameter of the circle
  height: "100px", // Diameter of the circle
  borderRadius: "",
  border: `2px dashed ${theme.palette.ascentColor.main}`,
  pointerEvents: "none",
  transform: "translate(-50%, -50%)", // Center the circle on the cursor
  overflow: "hidden",
  display: "none",
  zIndex: 1001,
  "& img": {
    position: "absolute",
    width: "300%", // Adjust based on zoom level
    height: "300%", // Adjust based on zoom level
    objectFit: "cover",
    transform: "translate(-50%, -50%)", // Center the image in the circle
  },
}));

const Spinner = ({ size = "40px" }) => (
  <CircularProgress
    size={size}
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);

const ProductImage = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const mainImageRef = useRef(null);
  const zoomContainerRef = useRef(null);
  const cursorOverlayRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const currentImageRef = useRef(selectedImage);

  // Use useMediaQuery to detect mobile view
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    currentImageRef.current = hoveredImage || selectedImage;
  }, [hoveredImage, selectedImage]);

  useEffect(() => {
    const mainImage = mainImageRef.current;
    if (!mainImage || isTablet) return; // Disable zooming on mobile

    const handleMouseMove = (e) => {
      if (!mainImageRef.current || !zoomContainerRef.current || !cursorOverlayRef.current) return;

      const { left, top, width, height } = mainImage.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      // Update zoom container
      const zoomContainer = zoomContainerRef.current;
      zoomContainer.style.display = "block";
      zoomContainer.style.backgroundImage = `url(${currentImageRef.current})`;
      zoomContainer.style.backgroundPosition = `${x}% ${y}%`;

      // Update cursor overlay
      const cursorOverlay = cursorOverlayRef.current;
      cursorOverlay.style.display = "block";
      cursorOverlay.style.left = `${e.clientX}px`;
      cursorOverlay.style.top = `${e.clientY}px`;

      // Calculate the offset for the image inside the circle
      const circleRadius = 50; // Half of the circle's diameter (100px)
      const offsetX = (e.clientX - left - circleRadius) / width * 100;
      const offsetY = (e.clientY - top - circleRadius) / height * 100;

      cursorOverlay.innerHTML = `
        <img 
          style="left: ${-offsetX}%; top: ${-offsetY}%; width: 300%; height: 300%;" 
        />
      `;
    };

    const handleMouseLeave = () => {
      if (zoomContainerRef.current) {
        zoomContainerRef.current.style.display = "none";
      }
      if (cursorOverlayRef.current) {
        cursorOverlayRef.current.style.display = "none";
      }
    };

    mainImage.addEventListener("mousemove", handleMouseMove, { passive: true });
    mainImage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mainImage.removeEventListener("mousemove", handleMouseMove);
      mainImage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTablet]); // Add isTablet as a dependency

  useEffect(() => {
    if (zoomContainerRef.current) {
      zoomContainerRef.current.style.backgroundImage = `url(${currentImageRef.current})`;
    }
  }, [hoveredImage, selectedImage]);

  const currentImage = hoveredImage || selectedImage;

  return (
    <StyledContainer>
      <MainImageContainer>
        <StyledMainImage
          ref={mainImageRef}
          src={currentImage}
          alt="Product Image"
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [currentImage]: true }))}
          onError={() => setLoadedImages((prev) => ({ ...prev, [currentImage]: true }))}
          style={{ cursor: isTablet ? "default" : "zoom-in" }} // Disable zoom cursor on mobile
        />
        {!loadedImages[currentImage] && <Spinner />}
      </MainImageContainer>

      {!isTablet && ( // Only render zoom components if not in mobile view
        <>
          <ZoomContainer ref={zoomContainerRef} />
          <CursorOverlay ref={cursorOverlayRef} />
        </>
      )}

      <StyledThumbnailContainer ref={thumbnailContainerRef}>
        {images?.map((image, index) => (
          <ThumbnailWrapper key={`Thumbnail-${index}`}>
            <StyledThumbnail
              src={image}
              alt={`Thumbnail ${index + 1}`}
              active={image === selectedImage ? 1 : 0}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => !isTablet && setHoveredImage(image)} // Disable hover on mobile
              onMouseLeave={() => !isTablet && setHoveredImage(null)} // Disable hover on mobile
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [image]: true }))}
              onError={() => setLoadedImages((prev) => ({ ...prev, [image]: true }))}
            />
            {!loadedImages[image] && <Spinner size="24px" />}
          </ThumbnailWrapper>
        ))}
      </StyledThumbnailContainer>
    </StyledContainer>
  );
};

export default React.memo(ProductImage);