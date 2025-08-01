"use client"

import React, { useEffect, useState } from 'react'
import GridWrapper from '../wrappers/GridWrapper';
import { styled } from '@mui/material';
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
function BestSellerPageClient({ItemsData}) {
    const [itemsArr, setItemsArr] = useState(ItemsData?.data);
      const [gridLoading, setGridLoading] = useState(false);

        useEffect(() => {
          setGridLoading(ItemsData?.loading);
        }, [ItemsData?.loading]);
  return (
    <div style={{ display:"flex", flexDirection:"column"}}> 
        <PageHeaderComp>BEST SELLERS</PageHeaderComp>
        {gridLoading ? (
        <div style={{minHeight:"70%", display:"flex",justifyContent:"center",alignItems:"center"}}>  <ThreeDotLoader/></div>
      
      ) : (
        <div style={{Width:"80vw",margin:"0 10vw 0 10vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
           <GridWrapper
          itemsArr={itemsArr}
          type="Product"
          loading={ItemsData?.loading}
        />
        </div>
       
      )}</div>
  )
}

export default BestSellerPageClient