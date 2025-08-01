import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Define protected and grey list routes
const protectedRoutes = [
  "/userContact",
  "/orders",
  "/wishlist",
  "/cart",
  "/payment",
  "/profile",
];
const greyList = ["/products", "/item", "/"];

const apiClient = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Ensure cookies are included in requests
});

/**
 * Validates the current access token. If it fails, attempts to refresh the token.
 *
 * @param {string} accessToken - The current access token.
 * @param {string} refreshToken - The current refresh token.
 * @param {object} request - The Next.js request object.
 * @param {boolean} redirectOnFailure - Determines if a redirect to login should occur on failure.
 *
 * @returns {NextResponse | null} Returns a NextResponse if cookies are updated or a redirect is needed;
 *                                otherwise, returns null.
 */
export async function validateAndRefresh({ accessToken, refreshToken, request, redirectOnFailure }) {
  try {
    console.log("Validating access token...");
    const verifyResponse = await apiClient.get("/success", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (verifyResponse.status !== 200) {
      throw new Error("Unauthorized");
    }

    // Store the /success route data in a cookie
    const successData = verifyResponse.data;
    const response = NextResponse.next();

    console.log("successData", successData);
    response.cookies.set("successData", JSON.stringify(successData), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return response;
  } catch (error) {
    console.error("Access token validation failed:", error);
    console.log("Attempting refresh...");
    try {
      const refreshResponse = await apiClient.get("/auth/refresh", {
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });
      console.log("Refresh response:", refreshResponse.data);

      const newAccessToken = refreshResponse.data.accessToken;
      const newRefreshToken = refreshResponse.data.refreshToken;

      if (!newAccessToken || !newRefreshToken) {
        throw new Error("Invalid refresh response");
      }

      console.log("Updated tokens:", newAccessToken, newRefreshToken);

      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      return response;
    } catch (refreshError) {
      console.error("Refresh token failed:", refreshError);

      // Delete all cookies if refresh fails
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("successData");

      if (redirectOnFailure) {
        return NextResponse.redirect(new URL("/login-signup", request.url));
      }
    }
  }
  return null;
}

export async function middleware(request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  const { pathname } = request.nextUrl;

  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);

  // Determine if the current route is protected or part of the grey list.
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isGreyRoute = greyList.some((route) =>
    pathname.startsWith(route)
  );

  // Protected routes: require valid tokens
  if (isProtectedRoute) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login-signup", request.url));
    }
    const result = await validateAndRefresh({
      accessToken,
      refreshToken,
      request,
      redirectOnFailure: true,
    });
    if (result) return result;
  }

  // Grey list routes: tokens are optional; if provided, try to validate them.
  if (isGreyRoute) {
    if (!accessToken && !refreshToken) {
      console.log("No access or refresh token found for greyList");
    } else {
      const result = await validateAndRefresh({
        accessToken,
        refreshToken,
        request,
        redirectOnFailure: false,
      });
      if (result) return result;
    }
  }

  return NextResponse.next();
}

// Configure paths for middleware
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};