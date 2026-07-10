import { apiClient, TENANT_ID } from "./client";

/**
 * POST /tenants/{tenantId}/orders
 * Requiere JWT (lo inyecta el interceptor de client.js automáticamente)
 */
export async function createOrder({ customerName, items, totalAmount, source = "WEB" }) {
  const { data } = await apiClient.post(`/tenants/${TENANT_ID}/orders`, {
    customerName,
    items: items.map(({ name, qty, price }) => ({
      name,
      quantity: qty,  // el openapi.yml espera "quantity", no "qty"
      price,
    })),
    totalAmount,
    source,
  });
  return data;
}

/**
 * GET /tenants/{tenantId}/orders/{id}
 * Público, no requiere JWT
 */
export async function getOrder(orderId) {
  const { data } = await apiClient.get(`/tenants/${TENANT_ID}/orders/${orderId}`);
  return data;
}

/**
 * GET /tenants/{tenantId}/users/me/orders
 * Requiere JWT — devuelve { current: [...], history: [...] }
 */
export async function getMyOrders() {
  const { data } = await apiClient.get(`/tenants/${TENANT_ID}/users/me/orders`);
  return data;
}