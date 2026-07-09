import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

/**
 * Carrito con soporte de opciones por línea (sabor, masa, extras).
 * Dos líneas del mismo producto con opciones distintas se guardan por
 * separado; el identificador de línea es productId + firma de opciones.
 */
function buildLineId(productId, options) {
  if (!options || Object.keys(options).length === 0) return String(productId);
  const sig = Object.entries(options)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}:${Array.isArray(v) ? v.join("+") : v}`)
    .sort()
    .join("|");
  return `${productId}__${sig}`;
}

export function CartProvider({ children }) {
  // [{ lineId, id, name, price, qty, options?, optionsLabel? }]
  const [items, setItems] = useState([]);

  /**
   * @param product  { id, name, price }
   * @param config   { qty?, options?, optionsLabel?, unitSurcharge? }
   */
  function addItem(product, config = {}) {
    const { qty = 1, options = null, optionsLabel = "", unitSurcharge = 0 } = config;
    const lineId = buildLineId(product.id, options);
    const unitPrice = product.price + unitSurcharge;

    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          name: product.name,
          price: unitPrice,
          qty,
          options,
          optionsLabel,
        },
      ];
    });
  }

  function increment(lineId) {
    setItems((prev) =>
      prev.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i))
    );
  }

  function decrement(lineId) {
    setItems((prev) =>
      prev
        .map((i) => (i.lineId === lineId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(lineId) {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalAmount = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const totalQty = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = {
    items,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalAmount,
    totalQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
