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
  Input
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';


const CategoryManager = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/48/electronics-1867151_960_720.jpg' },
    { id: 2, name: 'Books', imageUrl: 'https://cdn.pixabay.com/photo/2017/01/18/16/06/books-1990425_960_720.jpg' },
    { id: 3, name: 'Clothing', imageUrl: 'https://cdn.pixabay.com/photo/2016/09/22/10/44/clothing-1686884_960_720.jpg' },
  ]);

  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setCategoryImage(null);
      setPreviewImage(null);
    }
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();

    if (categoryName.trim() === '') {
      return;
    }

    if (editingCategoryId) {
      setCategories(categories.map(cat => 
        cat.id === editingCategoryId
          ? { ...cat, name: categoryName, imageUrl: previewImage || cat.imageUrl }
          : cat
      ));
      setEditingCategoryId(null);
    } else {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      const newCategory = { id: newId, name: categoryName, imageUrl: previewImage || '' };
      setCategories([...categories, newCategory]);
    }
    
    setCategoryName('');
    setCategoryImage(null);
    setPreviewImage(null);
  };
  
  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setPreviewImage(category.imageUrl);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {editingCategoryId ? 'Update Category' : 'Add New Category'}
        </Typography>

        <Box component="form" onSubmit={handleSaveCategory} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ flexGrow: 1 }}
            >
              Upload Image
              <Input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {previewImage && (
              <Avatar
                src={previewImage}
                alt="Category Preview"
                variant="rounded"
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
              />
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={editingCategoryId ? <EditIcon /> : <AddIcon />}
          >
            {editingCategoryId ? 'Update Category' : 'Add Category'}
          </Button>
        </Box>

        <Typography variant="h6" component="h3" gutterBottom>
          All Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              divider
              sx={{ '&:last-child': { borderBottom: 'none' } }}
            >
              <ListItemAvatar>
                {category.imageUrl && (
                  <Avatar
                    src={category.imageUrl}
                    alt={category.name}
                    variant="rounded"
                    sx={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText primary={category.name} sx={{ ml: 2 }} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEditCategory(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteCategory(category.id)} sx={{ ml: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default CategoryManager;
