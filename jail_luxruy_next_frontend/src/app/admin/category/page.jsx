"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import CategoryForm from "@/components/CategoryForm";
// import CategoryForm from "./components/CategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Creation failed");

      toast.success(`'${data.name}' created successfully!`);
      setName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName.trim()) return toast.error("Category name is required");

    try {
      const res = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatingName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success(`'${data.name}' updated successfully!`);
      setModalVisible(false);
      setSelectedCategory(null);
      setUpdatingName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success(`'${data.name}' deleted successfully!`);
      setModalVisible(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, borderRadius: "12px" }}>
        <Typography>Loading categories...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, borderRadius: "12px" }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "lg",
        mx: "auto",
      }}
    >
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Manage Categories
        </Typography>

        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          buttonText="Add Category"
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, color: "#555" }}>
          Existing Categories
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {categories.length === 0 ? (
            <Typography>No categories found.</Typography>
          ) : (
            categories.map((category) => (
              <Grid item key={category._id}>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#F59E0B",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#D97706",
                    },
                  }}
                  onClick={() => {
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                    setModalVisible(true);
                  }}
                >
                  {category.name}
                </Button>
              </Grid>
            ))
          )}
        </Grid>

        {/* Dialog for Edit/Delete */}
        <Dialog open={modalVisible} onClose={() => setModalVisible(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: "bold", color: "#333" }}>
            {selectedCategory ? `Edit: ${selectedCategory.name}` : "Update Category"}
          </DialogTitle>
          <DialogContent dividers>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Category"
              handleDelete={handleDeleteCategory}
              isUpdateForm
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisible(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default CategoryList;
