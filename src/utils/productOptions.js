/**
 * Opciones de personalización para productos tipo pizza/combo.
 * El backend no las modela (el scraper solo trae nombre/precio/imagen),
 * así que se definen aquí en el cliente como parte de la simulación.
 * Los nombres reflejan el menú público del restaurante de referencia.
 */

export const FLAVOR_GROUPS = [
  {
    group: "Clásicas",
    flavors: [
      "Pizza Americana Grande",
      "Pizza Pepperoni Grande",
      "Pizza Mozzarella Grande",
      "Pizza Vegetariana Grande",
    ],
  },
  {
    group: "Especialidad",
    flavors: [
      "Pizza Hawaiana Grande",
      "Pizza Española Grande",
      "Pizza Súper Margarita 6 Quesos Grande",
      "Pizza Continentalle Grande",
    ],
  },
  {
    group: "Signature",
    flavors: [
      "Pizza All The Meats Grande",
      "Pizza The Works Grande",
      "Pizza Veggie 6 Quesos Grande",
      "Pizza La Favorita Grande",
      "Pizza Hot Chicken Grande",
      "Pizza Hawaiana Chicken BBQ Grande",
      "Pizza Tocino 6 Quesos Grande",
      "Pizza Chicken BBQ Grande",
      "Pizza Crispy Chicken Grande",
    ],
  },
];

export const DOUGH_OPTIONS = [
  { id: "regular", label: "Masa Regular", surcharge: 0 },
  { id: "delgada", label: "Masa Delgada Crusty Grande", surcharge: 5 },
  { id: "parmesano", label: "Masa con Borde Parmesano", surcharge: 5 },
  { id: "queso", label: "Masa con Borde de Queso", surcharge: 10 },
  { id: "epico", label: "Masa Borde Épico", surcharge: 15 },
];

export const EXTRA_OPTIONS = [
  { id: "sin-extra", label: "Sin extras", surcharge: 0 },
  { id: "ajo", label: "Salsa de ajo adicional", surcharge: 2 },
  { id: "pepperoncini", label: "Pepperoncini adicional", surcharge: 2 },
  { id: "queso-extra", label: "Porción extra de queso", surcharge: 6 },
];

/**
 * Heurística: un producto es "personalizable" (requiere elegir sabor y
 * masa, como en el sitio real) si es pizza, combo o promoción.
 */
export function isCustomizable(product, category) {
  const cat = (category || "").toLowerCase();
  const name = (product?.name || "").toLowerCase();
  if (["bebidas", "postres", "acompañamientos"].includes(cat)) return false;
  return (
    name.includes("pizza") ||
    name.includes("combo") ||
    name.includes("dúo") ||
    name.includes("duo") ||
    name.includes("trio") ||
    cat === "promociones" ||
    cat === "pizzas" ||
    cat === "combos" ||
    cat === "big combos"
  );
}
