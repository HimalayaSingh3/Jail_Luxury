"use client";
import React from "react";
import Sidebar from "@/app/admin/Sidebar";
import { Box } from "@mui/material";

const AdminRoute = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      
      <Box component="main" sx={{ flex: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminRoute;
