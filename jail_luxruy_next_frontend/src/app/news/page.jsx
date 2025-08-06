'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CssBaseline,
  CircularProgress,
} from '@mui/material';

// --- News API configuration ---
const NEWS_API_KEY = 'c9ef6c98beb5418ab73bf26d378478b5';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2/top-headlines';

const categories = [
  'General',
  'Business',
  'Technology',
  'Sports',
  'Science',
  'Health',
  'Entertainment',
];

// --- Unused components ---
function WeatherCard() { return null; }
function HourlyForecastCard() { return null; }
function GraphCard() { return null; }
function AdCard() { return null; }

const NewsCard = ({ article }) => {
  const formattedDate = article.publishedAt
    ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(article.publishedAt))
    : 'Date and time not available';

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="140"
          image={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 1, flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.2 }}>
            {article.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {formattedDate}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
};

// --- Main Page Component with API Fetching and Category Filter ---
export default function NewsDashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async (category) => {
    setLoading(true);
    setError(null);
    const categoryQuery = category.toLowerCase() === 'general' ? '' : `&category=${category.toLowerCase()}`;

    try {
      const response = await fetch(`${NEWS_API_BASE_URL}?country=us${categoryQuery}&apiKey=${NEWS_API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'ok') {
        setArticles(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          Error fetching news: {error}
        </Typography>
      </Container>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">No news articles found for this category.</Typography>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {/* Category Header with Buttons */}
        <Box sx={{ mb: 4, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Grid container wrap="nowrap" spacing={2}>
            {categories.map((cat, index) => (
              <Grid item key={index}>
                <Button
                  variant={selectedCategory === cat ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{ textTransform: 'capitalize', whiteSpace: 'nowrap' }}
                >
                  {cat}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Dynamic section header */}
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          {selectedCategory} News
        </Typography>

        {/* Dynamic news grid */}
        <Grid container spacing={2}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}