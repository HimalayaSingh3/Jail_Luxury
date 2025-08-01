"use server"; // Ensure this runs on the client

import { StyledEngineProvider } from "@mui/material";


import LayoutClientPage from "@/components/pageClients/layoutClientPage";
import { cache } from "react";
import { cookies } from "next/headers";
// Wrapper to dynamically update the background color based on theme

async  function  getSuccessData() {
  const cookieStore = await cookies();
  const successData = cookieStore.get("successData");
  console.log("getSuccessData",successData)
  return successData?.value ? JSON?.parse(successData?.value || {}) : null;
}

const getCarouselImages = cache(async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/items/getAllCategories", {
      cache: "force-cache", // ✅ Statically caches the API response (No re-fetch on every request)
      next: { revalidate: 3600 }, // ✅ Refreshes API data every 1 hour (3600 seconds)
    });

    if (!res.ok) throw new Error("Failed to fetch images");
    return await res.json(); // Returns the JSON data
  } catch (error) {
    console.error("Error fetching images:", error);
    return { data: [] }; // Return empty array if API fails
  }
});

export default async function RootLayout({ children }) {
  const carouselImages = await getCarouselImages(); 
  const userData = await getSuccessData();
  return (
    <StyledEngineProvider injectFirst>
      <LayoutClientPage children={children} carouselImages={carouselImages} userData={userData?.user}/>
    </StyledEngineProvider>
  );
}
