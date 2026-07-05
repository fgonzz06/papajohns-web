import axios from "axios";
import { TENANT_ID } from "./client";

const productsClient = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

/**
 * GET /tenants/{tenantId}/products
 * Trae el catálogo de productos del backend.
 */
export async function getProducts() {
  const { data } = await productsClient.get(`/tenants/${TENANT_ID}/products`);
  return data;
}