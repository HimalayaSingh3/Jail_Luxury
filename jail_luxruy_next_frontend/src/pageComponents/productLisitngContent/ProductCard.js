"use client"
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="subtitle1" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;