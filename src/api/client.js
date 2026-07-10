import axios from "axios";

const BASE_URL   = import.meta.env.VITE_API_BASE_URL;
export const TENANT_ID = import.meta.env.VITE_TENANT_ID || "SURCO-01";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Inyecta el token JWT en cada request automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("pj_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Loguea errores en desarrollo
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error("[API error]", error?.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);
