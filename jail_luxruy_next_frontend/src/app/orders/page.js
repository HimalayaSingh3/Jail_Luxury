export const runtime = 'edge';
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import OrderPageClient from "@/components/pageClients/orderPageClient";
import { Suspense } from "react";

export default async function OrdersPage() {
  return (
    <div>

      <Suspense fallback={<LoadingAnimation />}>
        <OrderPageClient />
      </Suspense>
    </div>
  );
}