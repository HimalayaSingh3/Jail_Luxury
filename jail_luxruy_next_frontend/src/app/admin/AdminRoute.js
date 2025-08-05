"use client";
import React from "react";
import Sidebar from "@/app/admin/Sidebar";
import { Box } from "@mui/material";

const AdminRoute = ({ children }) => {
  return (
    <Box>
      <Box component="main" sx={{ flex: 1, width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminRoute;
