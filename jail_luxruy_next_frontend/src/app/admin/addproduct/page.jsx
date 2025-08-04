"use client";
import React, { useState, useContext } from 'react'; // Import useContext
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { AppContext } from "@/context/applicationContext"; // Import AppContext

// Styled component for the TextareaAutosize to apply MUI styling conventions
const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  lineHeight: theme.typography.body1.lineHeight,
  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none',
  },
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export default function AddNewProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Consume categoryItems from AppContext
  const { categoryItems } = useContext(AppContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend API
    console.log("Submitting product data:", {
      productName,
      description,
      price,
      stock,
      category,
      imageFile: imageFile ? imageFile.name : null,
    });
    setSnackbarMessage('Product added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
  };

  const handleCancel = () => {
    setSnackbarMessage('Form cancelled.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
    // Optionally navigate back or reset form
    // setProductName('');
    // setDescription('');
    // setPrice('');
    // setStock('');
    // setCategory('');
    // setImageFile(null);
    // setImagePreview(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: '12px',
          maxWidth: { xs: '100%', sm: 600, md: 800 },
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* Map over categoryItems from context */}
                  {categoryItems && categoryItems.map((cat) => (
                    <MenuItem key={cat.category_mapping} value={cat.category_mapping}>
                      {cat.catagory_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: '#555', mb: 1 }}>
                Product Description
              </Typography>
              <StyledTextarea
                minRows={5}
                placeholder="Enter product description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                inputProps={{ min: "0", step: "0.01" }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                inputProps={{ min: "0" }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{
                border: '2px dashed #a0c4ff',
                backgroundColor: '#e9f5ff',
                borderRadius: '12px',
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px',
              }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadFileIcon />}
                    sx={{
                      textTransform: 'none',
                      mb: 1,
                      backgroundColor: '#6c757d',
                      '&:hover': {
                        backgroundColor: '#5a6268',
                      },
                      borderRadius: '8px',
                    }}
                  >
                    Upload Product Image
                  </Button>
                </label>
                {imageFile && (
                  <Typography variant="body2" color="text.primary" sx={{ mt: 1, fontWeight: 'medium' }}>
                    Selected file: {imageFile.name}
                  </Typography>
                )}
                {imagePreview && (
                  <Box sx={{ mt: 2, border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={imagePreview} alt="Product Preview" style={{ maxWidth: '100%', maxHeight: '150px', display: 'block' }} />
                  </Box>
                )}
                {!imageFile && (
                  <FormHelperText sx={{ mt: 1, color: '#666' }}>
                    Drag & drop your image here, or click to browse. Max file size 5MB.
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                  borderColor: '#dc3545',
                  color: '#dc3545',
                  '&:hover': {
                    backgroundColor: alpha('#dc3545', 0.05),
                    borderColor: '#dc3545',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#218838',
                  },
                }}
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
