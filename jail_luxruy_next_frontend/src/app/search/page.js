export const runtime = 'edge';
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from 'react'

// Separate data fetching components
async function SearchPageContent({ params, searchParams }) {

  const waitedSearchParams = await searchParams
  console.log("waitedSearchParams",waitedSearchParams)

  // Fetch data in parallel where possible
  const [ItemsData, allColors] = await Promise.all([
    fetchSearchItemsFromAPI(waitedSearchParams?.userInput,waitedSearchParams?.color,waitedSearchParams?.gender,waitedSearchParams?.sortBy,waitedSearchParams?.sortOrder,waitedSearchParams?.page,waitedSearchParams?.price),
    fetchAllColors(),
]);
const sortOrder = waitedSearchParams?.sortOrder || "";
const sortConfigArr = [
  { label: "None", value: "Sort By" },
  { label: "Price: Low to High", value: "Price: Low to High" , dbValue:"product_price_local" , dbSort : "ASC" },
  { label: "Price: High to Low", value: "Price: High to Low" , dbValue:"product_price_local" , dbSort : "DESC" },
]

const sortConfig = sortConfigArr.find((item)=>item?.dbValue==waitedSearchParams?.sortBy && item?.dbSort == waitedSearchParams?.sortOrder)
const sortBy = sortConfig?.value

  const initialFilters = {
    gender: waitedSearchParams.gender || "",
    color:  waitedSearchParams.color ? waitedSearchParams.color.split(',').map(Number) : [],
    price:  waitedSearchParams.price ? waitedSearchParams.price.split(',').map(Number) : [0, 10000]
  };

  return (
    <ItemsPageClient
      ItemsData={ItemsData}
      initialFilters={initialFilters}
      initialPage={waitedSearchParams?.page}
      category={waitedSearchParams?.category}
      allColors={allColors}
      userInput={waitedSearchParams?.userInput}
      initialSortBy={sortBy}
      initialSortOrder={sortOrder}
      sortConfigArr={sortConfigArr}
    />
  );
}

// Error boundary component (simplified example)
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    return <div>Error loading content. Please try again later.</div>;
  }
}

export default async function ItemsPage({ params, searchParams }) {
  const waitedSearchParams = await searchParams;
  const page = parseInt(waitedSearchParams?.page) || 1;
  return (
    <ErrorBoundary>
      <Suspense key={page} fallback={<LoadingAnimation />}>
        <SearchPageContent params={params} searchParams={searchParams} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Move data fetching functions here

async function fetchSearchItemsFromAPI(userInput,color,gender,sortBy,sortOrder,page=1,price) {
  console.log("fetchSearchItemsFromAPI",userInput,color,page,sortBy,sortOrder)
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/searchByNameColorCategory?userInput=${userInput}&color=${color}&gender=${gender}&sortBy=${sortBy}&sortOrder=${sortOrder}&price=${price}&limit=12&page=${page}`;
  console.log("apiUrl",apiUrl)
  const response = await makeGetAPIcall(apiUrl);
  console.log("response",response.data)
  return { loading: false, data: response?.data || [] };
}


async function fetchAllColors() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/filters/getAllColors`;
  const response = await makeGetAPIcall(apiUrl);
  return response.data || [];
}
