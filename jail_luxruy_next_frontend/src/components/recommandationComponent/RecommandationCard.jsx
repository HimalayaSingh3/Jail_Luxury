import React, { useState, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Card,
  Typography,
  Box,
  Modal,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ✅ Flip Card Container
const FlipCardContainer = styled(Box)(({ theme }) => ({
  minWidth: theme.typography.pxToRem(180),
  minHeight: theme.typography.pxToRem(240),
  perspective: theme.typography.pxToRem(1000),
  fontFamily: "sans-serif",
  cursor: "pointer",
  margin:"1vh",
}));

// ✅ Flip Card Inner Wrapper
const FlipCardInner = styled(Box)(({ theme , ismobile }) => ({
  position: "relative",
  width: "90%",
  height: "90%",
  textAlign: "center",
  transition: "transform 0.8s",
  transformStyle: "preserve-3d",
 
  "&:hover": {
    transform:  ismobile ? "":"rotateY(180deg)",
  },
}));

// ✅ Front & Back Faces of Flip Card
const FlipCardFace = styled(Card)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  boxShadow: "0vh 0vh 0vh 0.5vh rgba(0,0,0,0.2)",
  borderRadius: "1rem",
  backfaceVisibility: "hidden",
  transition: "border 0.1s ease-in-out", // ✅ Smooth hover effect
  "&:hover": {
    border: `0.5vh solid ${theme.custom?.btnBorder || theme.palette.primary.main}`, // ✅ Ensure theme value exists
  },
}));



const FlipCardFront = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor:theme.custom.cardBg
}));


const FlipCardBack = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor:theme.custom.cardBg,
  color: theme.custom.primaryButtonFontColor,
  transform: "rotateY(180deg)",
}));

// ✅ Scrollable Container
const ScrollableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  padding: theme.spacing(1, 0),
  width: "100%",
  flexWrap: "nowrap",
  cursor: "grab",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
  },
}));

// ✅ Modal Content
const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(3),
}));

const products = [
  {
    id: 1,
    name: "Luxury Watch",
    price: "$299.99",
    imageUrl: "https://i0.wp.com/jail.luxury/wp-content/uploads/2024/09/5555.png",
  },
  {
    id: 2,
    name: "Premium Sneakers",
    price: "$149.99",
    imageUrl: "https://via.placeholder.com/190",
  },
];

function RecommendationCard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollContainerRef = useRef(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
       You might also like these products .
      </Typography>

      {/* 🔹 Scrollable Product List */}
      <ScrollableContainer ref={scrollContainerRef}>
        {products.map((product) => (
          <FlipCardContainer key={product.id} onClick={() => setSelectedProduct(product)}>
            <FlipCardInner ismobile={isTablet}>
              {/* ✅ Front Side of Card */}
              <FlipCardFront>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "60%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="subtitle2">{product.price}</Typography>
              </FlipCardFront>

              {/* ✅ Back Side of Card */}
              <FlipCardBack>
                <Typography variant="h6">View More</Typography>
                <Typography variant="body2" sx={{ padding: "0 8px" }}>
                  Click to learn more about this product.
                </Typography>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCardContainer>
        ))}
      </ScrollableContainer>

      {/* 🔹 Product Details Modal */}
      {selectedProduct && (
        <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
          <ModalContent>
            <IconButton
              onClick={() => setSelectedProduct(null)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }}
            />
            <Typography variant="h5" gutterBottom>
              {selectedProduct.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {selectedProduct.price}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button variant="contained" fullWidth>
                Buy Now
              </Button>
              <Button variant="outlined" fullWidth>
                Add to Cart
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default RecommendationCard;
