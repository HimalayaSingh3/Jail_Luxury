export const runtime = 'edge';
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from "react";

// Separate data fetching components
async function ItemsPageContent({ params, searchParams }) {
  const waitedParams = await params;
  const waitedSearchParams = await searchParams;
  const category = waitedParams?.category || "default-category";
  const page = parseInt(waitedSearchParams?.page) || 1;
  const color = waitedSearchParams?.color || "";
  const size = waitedSearchParams?.size || "";
  const gender = waitedSearchParams?.gender || "";
  const sortOrder = waitedSearchParams?.sortOrder || "";
  const price = waitedSearchParams?.price || ""
  const sortConfigArr = [
    { label: "None", value: "Sort By" },
    { label: "Price: Low to High", value: "Price: Low to High" , dbValue:"product_price_local" , dbSort : "ASC" },
    { label: "Price: High to Low", value: "Price: High to Low" , dbValue:"product_price_local" , dbSort : "DESC" },
  ]

  const sortConfig = sortConfigArr.find((item)=>item?.dbValue==waitedSearchParams?.sortBy && item?.dbSort == waitedSearchParams?.sortOrder)
  const sortBy = sortConfig?.value
  console.log("searchParams", page, color, size, gender, "params", category);
  // Fetch data in parallel where possible
  const [ItemsData, allSizesPerCategory, allColors] = await Promise.all([
    fetchItemsFromAPI(category, page, color, size,price, gender,sortBy,sortOrder),
    fetchSizeFilterByCategoryName(category),
    fetchAllColors(),
  ]);

  const initialFilters = {
    gender: waitedSearchParams.gender || "",
    size: waitedSearchParams.size
      ? waitedSearchParams.size.split(",").map(Number)
      : [],
    color: waitedSearchParams.color
      ? waitedSearchParams.color.split(",").map(Number)
      : [],
    price: waitedSearchParams.price
      ? waitedSearchParams.price.split(",").map(Number)
      : [0, 10000],
  };


  return (
    <>
     
      <ItemsPageClient
        ItemsData={ItemsData}
        initialFilters={initialFilters}
        initialPage={page}
        category={category}
        sizeFilterArr={allSizesPerCategory}
        allColors={allColors}
        initialSortBy={sortBy}
        initialSortOrder={sortOrder}
        sortConfigArr={sortConfigArr}
      />
    </>
  );
}

export default async function ItemsPage({ params, searchParams }) {
  const waitedSearchParams = await searchParams;
  const page = parseInt(waitedSearchParams?.page) || 1;
  return (
    <Suspense key={page} fallback={<LoadingAnimation />}>
      <ItemsPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// Move data fetching functions here
async function fetchItemsFromAPI(category, page, colors, sizes,price, gender,sortBy,sortOrder) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/findProductsByCategoryName?categoryName=${category}&colorFilter=${colors}&sizeFilter=${sizes}&gender=${gender}&sortBy=${sortBy}&sortOrder=${sortOrder}&price=${price}&limit=12&page=${page}`;
  console.log("apiUrl for fetchItemsFromAPI", apiUrl);
  const response = await makeGetAPIcall(apiUrl);
  return { loading: false, data: response?.data || [] };
}

async function fetchAllColors() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/filters/getAllColors`;
  const response = await makeGetAPIcall(apiUrl);
  return response.data || [];
}

async function fetchSizeFilterByCategoryName(categoryName) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/filters/getSizeFilterByCatagory`;
  const payload = { categoryName };
  const response = await makePostAPIcall(apiUrl, payload);
  return response?.data || [];
}
