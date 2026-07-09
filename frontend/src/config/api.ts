// Central API base URL — configured via VITE_API_BASE_URL env var or defaults to relative path in production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined 
  ? import.meta.env.VITE_API_BASE_URL 
  : (import.meta.env.PROD ? "" : "http://localhost:3000");
