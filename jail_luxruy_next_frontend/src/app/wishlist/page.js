export const runtime = 'edge';
import WishListPageClient from "@/components/pageClients/wishlistPageClient";
import { cookies } from "next/headers";

export default async function WishlistPage() {
  // Get the access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;


  // Pass the fetched data and error to the client component
  return (
    <WishListPageClient
      accessToken={accessToken}
    />
  );
}