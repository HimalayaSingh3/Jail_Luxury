export const runtime = 'edge';
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ProductPageClient from "@/components/pageClients/productPageClient";
import { makeGetAPIcall } from "@/utils/API_vendor";
import { Suspense } from "react";

// Function to fetch product data with cache disabled
async function fetchProductFromAPI(productName, pid, pdid) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products/findProductsById?productName=${productName}&pid=${pid}&pdid=${pdid}`;
  const response = await makeGetAPIcall(apiUrl, { cache: 'no-store' }); // Disable caching
  return response?.data || {};
}

// Product Detail Page Component
async function ProductDetailPage({ params, searchParams }) {
  // Access parameters directly without await
  const pid = searchParams?.pid;
  const pdid = searchParams?.pdid;
  const productName = params?.["item-name"];

  const data = await fetchProductFromAPI(productName, pid, pdid);
  const success = data.status;

  if (!success) {
    return <div>Failed to load product details.</div>;
  }

  return <ProductPageClient data={data.responseData} />;
}

// Main Product Page Component
export default async function ProductPage({ params, searchParams }) {
  const s= await searchParams;
  const p= await params;
  const key = `${p["item-name"]}-${s.pid}-${s.pdid}`;

  return (
    <Suspense key={key} fallback={<LoadingAnimation />}>
      <ProductDetailPage params={p} searchParams={s} />
    </Suspense>
  );
}