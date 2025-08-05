"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container, // Container is not used in the final structure, but kept in imports
  Grid,
  Typography,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Badge,
  TextField,
} from "@mui/material";
import Link from "next/link";
import NotificationsIcon from '@mui/icons-material/Notifications';

const uploadedImages = [
  { id: 1, url: "https://placehold.co/400x250/A78BFA/ffffff?text=Image+1", title: "Product Image 1" },
  { id: 2, url: "", title: "Product Image 2" },
  { id: 3, url: "", title: "Product Image 3" },
  { id: 4, url: "", title: "Product Image 4" },
  { id: 5, url: "", title: "Product Image 5" },
];

export default function AdminView() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [notificationCount, setNotificationCount] = useState(4);

  const handleDeleteImage = (id) => {
    console.log(`Attempting to delete image ID: ${id}`);
    setSnackbarMessage(`Image ID ${id} deleted successfully (simulated).`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked!");
    setNotificationCount(0);
    setSnackbarMessage('Notifications viewed.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          ml: { xs: 0, md: '272px' }, 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          width: { xs: '100%', md: 'calc(100% - 272px)' }, 
        }}
      >
        {/* Header Section with Search and Notification */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: { xs: 2, md: 3 } }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
            Admin Panel - Image Management
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {/* Search input - simplified */}
            <TextField
              variant="outlined"
              size="small"
              placeholder="Quick search"
              sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            {/* Notification Bell with Badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationClick}
              sx={{ p: 1, borderRadius: '50%', backgroundColor: 'white', boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Badge badgeContent={notificationCount} color="error" overlap="circular">
                <NotificationsIcon sx={{ fontSize: '24px', color: '#666' }} />
              </Badge>
            </IconButton>
          </Box>
        </Box>


        {/* Add Image Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Link href="/admin/addPost" passHref legacyBehavior>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                backgroundColor: '#4A00B8',
                '&:hover': {
                  backgroundColor: '#3A008F',
                },
                boxShadow: '0 4px 10px rgba(74, 0, 184, 0.2)',
              }}
            >
              Add New Image
            </Button>
          </Link>
        </Box>

        {/* All Uploaded Images Grid */}
        <Typography variant="h6" fontWeight="medium" gutterBottom sx={{ mb: 2, color: '#555' }}>
          All Images
        </Typography>
        <Grid container spacing={3}>
          {uploadedImages.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.url}
                  alt={item.title}
                  sx={{ borderRadius: '8px 8px 0 0', objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Uploaded on: {new Date().toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteImage(item.id)}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(220, 53, 69, 0.08)',
                      },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
