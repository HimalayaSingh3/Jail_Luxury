"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  Container,
  useMediaQuery,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const authService = {
  isAuthenticated: () => {
    return localStorage.getItem("isLoggedIn") === "true";
  },
  getUserRole: () => {
    return localStorage.getItem("userRole") || "guest";
  },
  login: (username, password) => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      return true;
    }
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("userRole", "guest");
    return false;
  },
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
  },
};

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard", displayOn: 'all' },
  { text: "Users", icon: <GroupIcon />, path: "/admin/users", displayOn: 'all' },
  { text: "Orders", icon: <Inventory2Icon />, path: "/admin/orders", displayOn: 'all' },
  { text: "AllProducts", icon: <CategoryIcon />, path: "/admin/AllProducts", displayOn: 'all' },
  { text: "Analysis", icon: <AnalyticsIcon />, path: "/admin/analysis", displayOn: 'desktop' },
  { text: "Blogs", icon: <ArticleIcon />, path: "/admin/blogs", displayOn: 'desktop' },
  { text: "Tickets", icon: <ConfirmationNumberIcon />, path: "/admin/tickets", displayOn: 'all' },
  { text: "Mobile Settings", icon: <SettingsIcon />, path: "/admin/settings", displayOn: 'mobile' },
];

const AdminSidebar = ({ onClose }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.displayOn === "all") return true;
    if (item.displayOn === "mobile" && isMobileOrTablet) return true;
    if (item.displayOn === "desktop" && !isMobileOrTablet) return true;
    return false;
  });

  return (
    <Paper
      sx={{
        width: 250,
        height: "100vh",
        p: 2,
        bgcolor: "#fff",
        borderRight: isMobileOrTablet ? "none" : "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ color: "primary.main" }}>Admin Panel</Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              router.push(item.path);
              if (onClose) onClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <ListItemButton onClick={() => {
        authService.logout();
        window.location.reload();
      }}>
        <ListItemIcon><LogoutIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Paper>
  );
};

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isAuthenticated();
      const role = authService.getUserRole();
      setIsAuthenticated(loggedIn);
      setIsAdmin(loggedIn && role === "admin");
      setLoading(false);
      if (!loggedIn) router.push("/login-signup");
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading authentication...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="error.light">
        <Typography>You need to log in to access this page.</Typography>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="warning.light">
        <Typography>You do not have administrative access to view this page.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" minHeight="100vh">
      <AdminSidebar />
      <Box component="main" flex={1} p={4} bgcolor="grey.100">
        {children}
      </Box>
    </Box>
  );
};

const AdminPage = () => {
  return (
    <AdminRoute>
      <Typography variant="h4" gutterBottom>Welcome to Admin Panel</Typography>
      <Typography variant="body1" color="textSecondary">
        This content is only visible to authenticated administrators.
      </Typography>
      <Box mt={4} p={3} bgcolor="white" borderRadius={2} boxShadow={2}>
        <Typography variant="h5" gutterBottom>Dashboard Overview</Typography>
        <Typography>
          Here you can manage users, products, orders, and settings.
        </Typography>
      </Box>
    </AdminRoute>
  );
};

export default AdminPage;
