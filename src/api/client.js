import axios from "axios";

/**
 * Config base de la API.
 * - VITE_API_BASE_URL y VITE_TENANT_ID se definen en tu archivo .env
 *   (mira .env.example para el formato).
 * - El tenantId representa la sucursal (ej: SURCO-01, MIRAFLORES-02)
 *   y se inyecta en cada ruta según el API_CONTRACT.md.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TENANT_ID = import.meta.env.VITE_TENANT_ID || "SURCO-01";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor simple para loguear errores de red en desarrollo
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error("[API error]", error?.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export { TENANT_ID };
