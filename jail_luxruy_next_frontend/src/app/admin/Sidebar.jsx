'use client';
import React from 'react';
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
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Inventory2 as Inventory2Icon,
  Category as CategoryIcon,
  Analytics as AnalyticsIcon,
  Article as ArticleIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Settings as SettingsIcon,
  Logout,
} from '@mui/icons-material';

import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard', displayOn: 'all' },
  { text: 'Users', icon: <GroupIcon />, path: '/admin/users', displayOn: 'all' },
  { text: 'Orders', icon: <Inventory2Icon />, path: '/admin/orders', displayOn: 'all' },
  { text: 'AllProducts', icon: <CategoryIcon />, path: '/admin/AllProducts', displayOn: 'all' },
  { text: 'Post', icon: <AnalyticsIcon />, path: '/admin/post', displayOn: 'all' },
  { text: 'Mobile Settings', icon: <SettingsIcon />, path: '/admin/settings', displayOn: 'mobile' },
];

const Sidebar = ({ open, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredMenuItems = menuItems.filter(item => {
    if (item.displayOn === 'all') return true;
    if (item.displayOn === 'mobile' && isMobile) return true;
    if (item.displayOn === 'desktop' && !isMobile) return true;
    return false;
  });

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff',
        overflowY: 'auto',
        py: 2,
        boxSizing: 'border-box',
      }}
    >
      {/* LOGO */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <img
          src="/webps/homePageLogoLight.webp"
          alt="LavaBiz Logo"
          style={{ width: 120, height: 'auto' }}
        />
      </Box>

      {/* MENU */}
      <List sx={{ flexGrow: 1 }}>
        {filteredMenuItems.map(item => {
          const isActive = pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.text}
              onClick={() => {
                router.push(item.path);
                if (isMobile) onClose();
              }}
              sx={{
                mx: 1,
                my: 1,
                borderRadius: 2,
                bgcolor: isActive ? '#1e293b' : '#fff',
                color: isActive ? '#fff' : '#1e293b',
                '&:hover': {
                  bgcolor: '#6b7280',
                  color: '#fff',
                  '& .MuiListItemIcon-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#fff' : '#1e293b',
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  span: { fontWeight: isActive ? '600' : '400' },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* LOGOUT */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItemButton
          onClick={() => {
            // Implement logout logic
            if (isMobile) onClose();
          }}
          sx={{ mx: 1, mb: 1, borderRadius: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#1e293b' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          aria-label="Navigation drawer"
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
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
