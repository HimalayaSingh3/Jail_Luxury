// Sidebar.jsx
"use client";
import React from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArticleIcon from "@mui/icons-material/Article";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";

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

const Sidebar = ({ open, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  const filteredMenuItems = menuItems.filter(item => {
    if (item.displayOn === 'all') return true;
    if (item.displayOn === 'mobile' && isMobileOrTablet) return true;
    if (item.displayOn === 'desktop' && !isMobileOrTablet) return true;
    return false;
  });

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        bgcolor: "#fff",
        height: "100vh",
        borderRight: isMobileOrTablet ? 'none' : "1px solid #e0e0e0",
        py: 2,
        overflowY: 'auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {/* Replace with your logo */}
        <img src="\webps\homePageLogoLight.webp" alt="LavaBiz Logo" style={{ width: 120 }} />
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {filteredMenuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.text}
              onClick={() => {
                router.push(item.path);
                if (isMobileOrTablet) {
                  onClose();
                }
              }}
              sx={{
                mx: 1,
                my: 1,
                borderRadius: 2,
                bgcolor: isActive ? "#1e293b" : "#fff",
                color: isActive ? "#fff" : "#1e293b",
                "&:hover": {
                  bgcolor: "#6b7280",
                  color: "#fff",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#fff" : "#1e293b",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ span: { fontWeight: isActive ? "600" : "400" } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
         <ListItemButton sx={{ mx: 1, mb: 1, borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 36, color: '#1e293b' }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
         </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobileOrTablet ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        drawerContent
      )}
    </>
  );
};

export default Sidebar;