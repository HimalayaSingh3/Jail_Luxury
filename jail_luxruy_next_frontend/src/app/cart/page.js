export const runtime = 'edge';
import CartPageClient from "@/components/pageClients/cartPageClient";
export default async function CartPage() {
  // Pass the fetched data and error to the client component
  return (
    <CartPageClient
    />
  );
}