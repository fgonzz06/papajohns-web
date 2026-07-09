/**
 * El servicio de productos escrapea la página de promociones de Papa John's
 * y no siempre guarda un campo `category` explícito. Para poder mostrar
 * pestañas de categoría como en el sitio real (Pizzas, Combos, Bebidas...)
 * inferimos la categoría a partir del nombre/descr. del producto.
 *
 * Si el backend YA trae `category`, se respeta ese valor tal cual.
 */
const RULES = [
  { category: "Bebidas", keywords: ["gaseosa", "bebida", "coca cola", "inca kola", "cifrut", "agua"] },
  { category: "Postres", keywords: ["postre", "brownie", "cheesecake", "dulce"] },
  { category: "Combos", keywords: ["combo", "duo", "trio", "familiar +"] },
  { category: "Big Combos", keywords: ["big combo", "super familiar"] },
  { category: "Acompañamientos", keywords: ["papa bites", "pan al ajo", "alitas", "rolls", "palitos de queso", "breadstick"] },
  { category: "Pizzas", keywords: ["pizza"] },
];

export function categorize(product) {
  if (product.category) return product.category;

  const haystack = `${product.name || ""} ${product.description || ""}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.category;
    }
  }
  return "Promociones";
}

/**
 * Orden fijo en el que deben aparecer las pestañas de categoría,
 * calcado del menú del sitio oficial.
 */
export const CATEGORY_ORDER = [
  "Promociones",
  "Pizzas",
  "Combos",
  "Big Combos",
  "Acompañamientos",
  "Bebidas",
  "Postres",
];

export function groupByCategory(products) {
  const groups = new Map();
  for (const product of products) {
    const cat = categorize(product);
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(product);
  }
  // Ordena las categorías según CATEGORY_ORDER; deja al final las que no matchean
  return [...groups.entries()].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a[0]);
    const ib = CATEGORY_ORDER.indexOf(b[0]);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}
