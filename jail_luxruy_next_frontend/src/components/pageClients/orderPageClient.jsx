"use client"
import { styled } from '@mui/material';
import React from 'react'
const PageHeaderComp = styled("div")(({ theme }) => ({
  whiteSpace:"noWrap",
  backgroundColor: theme.custom.banner,
  color: theme.custom.primaryButtonFontColor,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  fontSize: theme.typography.pxToRem(40),
  fontFamily: "aboreto",
  
}));
function OrderPageClient() {
  return (
    <div>
       <PageHeaderComp>ORDERS</PageHeaderComp>
      <h1>coming soon</h1>
      
      </div>
  )
}

export default OrderPageClient