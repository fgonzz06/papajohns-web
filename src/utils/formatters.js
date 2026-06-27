/**
 * Formatea un número como moneda en soles peruanos.
 * @param {number} amount
 * @returns {string} ej: "S/ 35.90"
 */
export function formatCurrency(amount) {
  return `S/ ${Number(amount).toFixed(2)}`;
}
