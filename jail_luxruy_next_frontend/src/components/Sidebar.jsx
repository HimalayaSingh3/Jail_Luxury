//============For Admin Panel=========/
"use client";
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Users", icon: <GroupIcon />, path: "/admin/users" },
  { text: "Orders", icon: <Inventory2Icon />, path: "/admin/orders" },
  { text: "Products", icon: <CategoryIcon />, path: "/admin/products" },
  { text: "Analysis", icon: <AnalyticsIcon />, path: "/admin/analysis" },
  { text: "Blogs", icon: <ArticleIcon />, path: "/admin/blogs" },
  { text: "Tickets", icon: <ConfirmationNumberIcon />, path: "/admin/tickets" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#fff",
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        py: 2,
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              selected={isActive}
              onClick={() => router.push(item.path)}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,
                bgcolor: isActive ? "#1e293b" : "#f5f5f5",
                color: isActive ? "#fff" : "#333",
                "&:hover": {
                  bgcolor: isActive ? "#1e293b" : "#e0e0e0",
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fff" : "#666" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
