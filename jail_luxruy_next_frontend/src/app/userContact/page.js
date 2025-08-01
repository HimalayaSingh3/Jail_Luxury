export const runtime = 'edge';
import UserProfileAddressClient from "@/components/pageClients/userProfileAddressClient";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const refreshToken = cookieStore.get("refreshToken")?.value || null;


  return (
   <UserProfileAddressClient/>
  );
}
