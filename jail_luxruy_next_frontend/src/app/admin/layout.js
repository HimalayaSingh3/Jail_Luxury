"use client";

import React from "react";
import AdminRoute from "./AdminRoute"; 
import Sidebar from "./Sidebar"; // Adjust path if needed
import { Box } from "@mui/material";

const AdminLayout = ({ children }) => {
  return (
   <Box sx={{
    display:"flex"
   }}>
    <Sidebar />
  <AdminRoute>{children}</AdminRoute>
  </Box>
)
  ;
};

export default AdminLayout;
