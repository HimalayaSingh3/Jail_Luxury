'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', author: '', image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';

    try {
      await fetch(url, {
        method,
        body: formData,
      });
      setForm({ title: '', content: '', author: '', image: null });
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setForm({ ...blog, image: null });
    setEditingId(blog.id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    textAlign: { xs: 'center', md: 'start' }  // Responsive alignment
  }}
>
  Admin Blog Manager
</Typography>


      <Grid container spacing={4}>
        {/* Blog Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              {editingId ? 'Edit Blog' : 'Create New Blog'}
            </Typography>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="Author"
              fullWidth
              margin="normal"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              {form.image ? 'Image Selected' : 'Upload Image'}
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={6}
              margin="normal"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {editingId ? 'Update Blog' : 'Create Blog'}
            </Button>
          </Paper>
        </Grid>

        {/* Blog Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} key={blog.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                    boxShadow: 5,
                  }}
                >
                  {blog.image && (
                    <CardMedia
                      component="img"
                      image={blog.image}
                      alt={blog.title}
                      height="140"
                      sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      by {blog.author}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {blog.content?.slice(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                    <IconButton
                      onClick={() => handleEdit(blog)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(blog.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
