"use client"
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const adPostsData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1620799140403-edc87623d38f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: 'https://unsplash.com/photos/a-young-man-with-a-white-shirt-is-waving-his-hand-eR3j195uN6I',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1596767512808-726d40d9d068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: 'https://unsplash.com/photos/a-man-is-standing-in-a-field-of-wheat-t9N1YQ5-U78',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a7378d382e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    redirectUrl: 'https://unsplash.com/photos/a-woman-in-a-white-dress-is-holding-a-bouquet-of-flowers-L1K-lETrjHw',
  },
];

// Placeholder for the "Ad Post Page" component using MUI
const AdPostPage = ({ url }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      p: 4,
    }}
  >
    <Paper elevation={4} sx={{ p: 4, borderRadius: 2, textAlign: 'center', maxWidth: 600 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Ad Post Content Page
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This is a placeholder page that would be loaded after a user clicks on a banner. In a real
        application, this page would show specific product details or a landing page.
      </Typography>
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          p: 2,
          borderRadius: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>
          Redirected from:
        </Typography>{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </Box>
      <Button
        variant="contained"
        onClick={() => window.history.back()}
        sx={{ mt: 3, borderRadius: 50, px: 3, py: 1 }}
      >
        Go Back to Carousel
      </Button>
    </Paper>
  </Box>
);

// The Carousel component itself using MUI
const AdPostCarousel = ({ posts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
  };

  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', color: 'text.secondary', p: 4 }}>
        No banners to display.
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 500ms ease-in-out',
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {posts.map((post, index) => (
          <Box
            key={post.id}
            sx={{ flexShrink: 0, width: '100%' }}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', `/adpost/${post.id}`);
            }}
          >
            <a href="#">
              <Box
                component="img"
                src={post.imageUrl}
                alt={`Banner Ad ${index + 1}`}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => { e.target.src = "https://placehold.co/1200x400/E5E7EB/4B5563?text=Image+Not+Found" }}
              />
            </a>
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <IconButton onClick={prevSlide} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={nextSlide} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' } }}>
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {posts.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'background-color 300ms',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Main App Component
const App = () => {
  const [adPosts, setAdPosts] = useState(adPostsData);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newRedirectUrl, setNewRedirectUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState('/');

  // Simulate routing for the ad post page
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path);
  }, []);

  const handleAddOrUpdatePost = (e) => {
    e.preventDefault();
    if (!newImageUrl || !newRedirectUrl) return;

    if (editingId) {
      setAdPosts(
        adPosts.map((post) =>
          post.id === editingId
            ? { ...post, imageUrl: newImageUrl, redirectUrl: newRedirectUrl }
            : post
        )
      );
    } else {
      const newId = adPosts.length > 0 ? Math.max(...adPosts.map((p) => p.id)) + 1 : 1;
      setAdPosts([...adPosts, { id: newId, imageUrl: newImageUrl, redirectUrl: newRedirectUrl }]);
    }
    setNewImageUrl('');
    setNewRedirectUrl('');
    setEditingId(null);
  };

  const handleEditPost = (post) => {
    setNewImageUrl(post.imageUrl);
    setNewRedirectUrl(post.redirectUrl);
    setEditingId(post.id);
  };

  const handleDeletePost = (id) => {
    setAdPosts(adPosts.filter((post) => post.id !== id));
  };
  
  if (currentPage.startsWith('/adpost/')) {
    const postId = parseInt(currentPage.split('/')[2]);
    const adPost = adPosts.find((post) => post.id === postId);
    if (adPost) {
      return <AdPostPage url={adPost.redirectUrl} />;
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Ad Post Not Found
          </Typography>
        </Box>
      );
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Banner Ad Carousel */}
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Featured Banners
          </Typography>
          <AdPostCarousel posts={adPosts} />
        </Paper>

        {/* Admin Management Section */}
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            {editingId ? 'Edit Ad Post' : 'Add New Ad Post'}
          </Typography>
          <Box component="form" onSubmit={handleAddOrUpdatePost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL here"
            />
            <TextField
              label="Redirect URL"
              variant="outlined"
              fullWidth
              value={newRedirectUrl}
              onChange={(e) => setNewRedirectUrl(e.target.value)}
              placeholder="https://example.com/product-page"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, borderRadius: 1 }}>
              {editingId ? 'Update Ad Post' : 'Add Ad Post'}
            </Button>
          </Box>
        </Paper>

        {/* Existing Ad Posts List */}
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Existing Ad Posts
          </Typography>
          <List>
            {adPosts.map((post) => (
              <ListItem key={post.id} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, my: 1, p: 1 }}>
                <ListItemAvatar>
                  <Avatar variant="square" src={post.imageUrl} sx={{ width: 56, height: 56 }} onError={(e) => { e.target.src = "https://placehold.co/56x56/E5E7EB/4B5563?text=No+Img" }} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography noWrap>{post.imageUrl}</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary" noWrap>{post.redirectUrl}</Typography>}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEditPost(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeletePost(post.id)} sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default App;
