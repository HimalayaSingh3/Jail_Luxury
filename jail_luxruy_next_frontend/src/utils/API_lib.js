// app/actions/wishlist-actions.js
"use server";
import { cookies } from "next/headers";
// Helper to get server-side API URL
const getApiUrl = (path) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

// Helper to validate and refresh tokens
const validateAndRefreshTokens = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const lastUpdate = parseInt(
    cookieStore.get("lastTokenUpdate")?.value || Date.now()
  );

  // If no tokens are found, throw an error
  if (!accessToken || !refreshToken) {
    throw new Error("Unauthorized - No tokens found");
  }

  // Check if token needs refresh (15 minute interval)
  if (Date.now() - lastUpdate >= 15 * 60 * 1000) {
    try {
      // Attempt token refresh
      const refreshResponse = await fetch(getApiUrl("/auth/refresh"), {
        method: "GET",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh token");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      // Update tokens in cookies
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60, // 15 minutes
      });
      cookieStore.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      cookieStore.set("lastTokenUpdate", Date.now().toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      throw new Error("Session expired. Please login again.");
    }
  }

  return accessToken;
};

// Generic API handler for server actions
const serverApiRequest = async (path, method = "GET", body = null) => {
  try {
    // Validate and refresh tokens before making the request
    const accessToken = await validateAndRefreshTokens();

    const response = await fetch(getApiUrl(path), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    console.log("generic response",await response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Server API Error:", error.message);
    throw error;
  }
};

// Wishlist Actions
export const addOrEditWishlist = async (productDetailsId, productId) => {
  "use server";
  return serverApiRequest("/api/wishlist/addOrEditWishlist", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    },
  });
};

export const deleteFromUserWishlist = async (productDetailsId, productId) => {
  "use server";
  return serverApiRequest("/api/wishlist/deleteFromUserWishlist", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    },
  });
};

export const fetchUserWishlist = async () => {
  "use server";
  return serverApiRequest("/api/wishlist/fetchUserWishlist", "POST");
};

// Cart Actions
export const addToCart = async (productDetailsId, productId, quantity) => {
  "use server";
  return serverApiRequest("/api/cart/addOrEditCart", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
      quantity: quantity,
    },
  });
};

export const fetchUserCart = async () => {
  "use server";
  return serverApiRequest("/api/cart/fetchUserCart", "POST");
};

export const deleteFromUserCart = async (productId, productDetailsId) => {
  "use server";
  console.log("deleteFromUserCart");
  return serverApiRequest("/api/cart/deleteFromUserCart", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    },
  });
};

// User Address Actions
export const addOrEditUserAddress = async ({
  addressId,
  addressLine1,
  addressLine2,
  state,
  country,
  pincode,
  defaultAddress,
  addressName,
  deliverTo,
  phoneNumber
}) => {
  "use server";
  return serverApiRequest("/api/users/addOrEditUserAddress", "POST", {
    payloadObj: {
      addressId,
      addressLine1,
      addressLine2,
      state,
      country,
      pincode,
      defaultAddress,
      addressName,
      deliverTo,
      phoneNumber
    },
  });
};

export const getUserAddresses = async () => {
  "use server";
  console.log("initaite chooseAddress")
  return serverApiRequest("/api/users/getUserAddresses", "POST");
};

export const deleteUserAddress = async ({ addressId }) => {
  "use server";
  console.log("deleteFromUserCart");
  return serverApiRequest("/api/users/deleteUserAddress", "POST", {
    payloadObj: {
      addressId,
    },
  });
};

export const updateUserData = async ({
  phone = null,
  first_name = null,
  last_name = null,
}) => {
  "use server";
  console.log("updateUserData",phone,first_name,last_name);
  return serverApiRequest("/api/users/updateUserData", "POST", {
    payloadObj: {
      phone,
      first_name,
      last_name,
    },
  });
};

export const checkout = async ({
  name,amount
 }) => {
   "use server";
   console.log("checkout",name,amount);
    return await  serverApiRequest("/api/payments/checkout", "POST", {
     payloadObj: {
       currency:"INR",
       name,
       amount
     },
   });
 };

 export const paymentVerification = async (
  obj
) => {
   "use server";
   console.log("paymentVerification",obj);

   const data = await serverApiRequest("/api/payments/verification", "POST", {
    payloadObj: {
      ...obj
    },
  });
  console.log("paymentVerification data",data)
   return data
 };

export const logout = async () => {
  "use server";
  
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // 1. Invalidate tokens on backend
    await fetch(getApiUrl("/logout"), {
      method: "POST",
      headers: { Cookie: `refreshToken=${refreshToken}` },
    });

    // 2. Delete cookies properly
    cookieStore.delete("successData");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    // 3. Return success status
    return { success: true };
    
  } catch (error) {
    console.error("Logout failed:", error);
    return { success: false };
  }
};