import axios from "axios";
import { TENANT_ID } from "./client";

const productsClient = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

/**
 * GET /tenants/{tenantId}/products (una página)
 * El backend pagina con `lastKey` (DynamoDB), no con offset numérico.
 *
 * @param {{limit?: number, lastKey?: object}} params
 */
async function getProductsPage({ limit = 50, lastKey } = {}) {
  const params = { limit };
  if (lastKey) params.lastKey = JSON.stringify(lastKey);

  const { data } = await productsClient.get(`/tenants/${TENANT_ID}/products`, {
    params,
  });
  return data; // { products, lastKey }
}

/**
 * Trae el catálogo COMPLETO recorriendo todas las páginas de DynamoDB.
 * El contrato de la API pagina de 10 en 10 por defecto, así que si no
 * recorremos lastKey nunca veríamos más de una página de productos.
 *
 * Límite de seguridad de 10 vueltas para no quedar en loop si el backend
 * devuelve un lastKey inconsistente.
 */
export async function getProducts() {
  let all = [];
  let lastKey;
  let guard = 0;

  do {
    const page = await getProductsPage({ limit: 50, lastKey });
    all = all.concat(page.products || []);
    lastKey = page.lastKey || null;
    guard += 1;
  } while (lastKey && guard < 10);

  return all;
}
