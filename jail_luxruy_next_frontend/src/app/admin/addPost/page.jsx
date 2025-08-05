"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ImageUploadOnly() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const data = new FormData();
    data.append("image", image);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const result = await res.json();
      setUploadedUrl(result.imageUrl); // assuming API returns { imageUrl: "..." }
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 8 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Upload Image
      </Typography>

      <Box component="form" onSubmit={handleUpload} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
              >
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>

              {preview && (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Upload Image
            </Button>
          </Grid>

          {uploadedUrl && (
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                variant="outlined"
                value={uploadedUrl}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
