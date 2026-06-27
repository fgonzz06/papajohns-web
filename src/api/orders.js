import { apiClient, TENANT_ID } from "./client";

/**
 * Crea un nuevo pedido.
 * POST /tenants/{tenantId}/orders
 *
 * @param {Object} order
 * @param {string} order.customerName
 * @param {Array<{name: string, qty: number, price: number}>} order.items
 * @param {number} order.totalAmount
 * @param {"WEB"|"RAPPI"} [order.source]
 * @returns {Promise<{message: string, orderId: string, status: string}>}
 */
export async function createOrder({ customerName, items, totalAmount, source = "WEB" }) {
  const { data } = await apiClient.post(`/tenants/${TENANT_ID}/orders`, {
    customerName,
    items,
    totalAmount,
    source,
  });
  return data;
}

/**
 * Consulta el detalle completo de un pedido, incluyendo sus etapas.
 * GET /tenants/{tenantId}/orders/{orderId}
 *
 * @param {string} orderId
 * @returns {Promise<Object>} Pedido completo con stages (RECEPCION, COCINA, EMPAQUE, DESPACHO, ENTREGADO)
 */
export async function getOrder(orderId) {
  const { data } = await apiClient.get(`/tenants/${TENANT_ID}/orders/${orderId}`);
  return data;
}
