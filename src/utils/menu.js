/**
 * Catálogo de RESPALDO (fallback).
 *
 * El catálogo real viene del backend (products API), que escrapea
 * papajohns.com.pe. Esta lista solo se usa si esa llamada falla —por
 * ejemplo si las credenciales del AWS Academy Learner Lab expiraron
 * durante una demo— para que la web nunca se quede en blanco.
 *
 * Mismo shape que devuelve la API real (productId, name, price,
 * imageUrl, category) para poder reusar los mismos componentes.
 */
export const FALLBACK_PRODUCTS = [
  {
    productId: "FB-P001",
    name: "Pizza Pepperoni Familiar",
    description: "Pepperoni en cada bocado, borde dorado y mucho queso.",
    category: "Pizzas",
    price: 35.9,
    imageUrl: null,
  },
  {
    productId: "FB-P002",
    name: "Pizza Hawaiana Familiar",
    description: "Jamón, piña y queso mozzarella derretido.",
    category: "Pizzas",
    price: 33.9,
    imageUrl: null,
  },
  {
    productId: "FB-P003",
    name: "Pizza Suprema Familiar",
    description: "Pepperoni, salchicha, pimientos, cebolla y aceitunas.",
    category: "Pizzas",
    price: 38.9,
    imageUrl: null,
  },
  {
    productId: "FB-P004",
    name: "Pizza Margherita Mediana",
    description: "Tomate, albahaca fresca y mozzarella.",
    category: "Pizzas",
    price: 28.9,
    imageUrl: null,
  },
  {
    productId: "FB-P005",
    name: "Combo Duo Familiar",
    description: "2 pizzas familiares + gaseosa 1.5L.",
    category: "Combos",
    price: 59.9,
    imageUrl: null,
  },
  {
    productId: "FB-P006",
    name: "Papa Bites",
    description: "Bocaditos de papa crocante con dip a elección.",
    category: "Acompañamientos",
    price: 14.9,
    imageUrl: null,
  },
  {
    productId: "FB-P007",
    name: "Pan al Ajo con Queso",
    description: "Pan recién horneado, ajo y mucho queso gratinado.",
    category: "Acompañamientos",
    price: 12.9,
    imageUrl: null,
  },
  {
    productId: "FB-P008",
    name: "Alitas BBQ x8",
    description: "Alitas bañadas en salsa BBQ ahumada.",
    category: "Acompañamientos",
    price: 22.9,
    imageUrl: null,
  },
  {
    productId: "FB-P009",
    name: "Gaseosa Coca Cola 1.5L",
    description: "Bien helada, para acompañar la pizza.",
    category: "Bebidas",
    price: 8.0,
    imageUrl: null,
  },
  {
    productId: "FB-P010",
    name: "Inca Kola 1.5L",
    description: "El sabor de Perú, bien fría.",
    category: "Bebidas",
    price: 8.0,
    imageUrl: null,
  },
];
