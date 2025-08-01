import axios from "axios";
import { cookies } from "next/headers";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Ensure cookies are included in requests
});


export async function makePostAPIcall (url,payload){
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
    try {
        const response =  await apiClient.post(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
          ...payload,
        });
        return response;
      } catch (error) {
        return error;
      }
}

export async function makeGetAPIcall (url){
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  console.log("makegetapicall accessToken",accessToken)
  try {
      const response =  await apiClient.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      return error;
    }
}


const API = axios.create({ baseURL:process.env.NEXT_PUBLIC_API_URL,withCredentials: true });
export const googleLogin = () => API.get("/auth/google");
export const refreshToken = () => API.get("/auth/refresh");
