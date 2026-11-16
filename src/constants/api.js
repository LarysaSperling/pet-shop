// Backend URL comes from the VITE_API_URL environment variable (see .env.example).
// If it is not set, the deployed backend on Render is used.
export const API_URL =
  import.meta.env.VITE_API_URL || "https://pet-shop-api-3od3.onrender.com";

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  ORDER: "/order",
  SALE: "/sale",
};
