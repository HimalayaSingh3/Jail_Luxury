"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";

const uploadedImages = [
  { id: 1, url: "/uploads/image1.jpg", title: "Image 1" },
  { id: 2, url: "/uploads/image2.jpg", title: "Image 2" },
  { id: 3, url: "/uploads/image3.jpg", title: "Image 3" },
];

export default function AdminView() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Panel
      </Typography>

      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Uploaded Images Slider
        </Typography>
        <ImageList
          sx={{
            flexWrap: "nowrap",
            transform: "translateZ(0)",
          }}
          cols={2.5}
          gap={12}
        >
          {uploadedImages.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                style={{
                  borderRadius: 12,
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Link
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2 }}
          href= "/admin/addPost"
        >
          Add Image
        </Link>
      </Box>

      <Grid container spacing={4}>
        {uploadedImages.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={item.url}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  onClick={() => alert(`Delete image ID: ${item.id}`)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
