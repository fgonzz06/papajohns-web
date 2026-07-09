import { createContext, useContext, useEffect, useState } from "react";

/** Favoritos persistidos en localStorage (ids de producto). */
const FavoritesContext = createContext(null);
const FAVS_KEY = "pj_favorites";

export function FavoritesProvider({ children }) {
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    try {
      setFavIds(JSON.parse(localStorage.getItem(FAVS_KEY)) ?? []);
    } catch {
      setFavIds([]);
    }
  }, []);

  function toggleFav(productId) {
    setFavIds((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      return next;
    });
  }

  const isFav = (productId) => favIds.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favIds, toggleFav, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  return ctx;
}
