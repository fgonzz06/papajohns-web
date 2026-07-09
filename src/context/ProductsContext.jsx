import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { FALLBACK_PRODUCTS } from "../utils/menu";

/**
 * Catálogo compartido por toda la app (menú, detalle de producto,
 * favoritos), cargado UNA sola vez desde el Product Service.
 * Si el backend no responde, cae al catálogo local para que la demo
 * nunca se quede en blanco.
 */
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data || data.length === 0) {
          setProducts(FALLBACK_PRODUCTS);
          setUsingFallback(true);
        } else {
          setProducts(data);
        }
      })
      .catch(() => {
        setProducts(FALLBACK_PRODUCTS);
        setUsingFallback(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getById = (productId) =>
    products.find((p) => String(p.productId) === String(productId)) || null;

  return (
    <ProductsContext.Provider value={{ products, isLoading, usingFallback, getById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de <ProductsProvider>");
  return ctx;
}
