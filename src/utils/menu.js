/**
 * Catálogo de productos.
 * No hay endpoint de menú en el API_CONTRACT.md todavía, así que esto
 * vive como data local. El "name" de cada item es el que se envía
 * tal cual al backend dentro de items[] al crear un pedido.
 */
export const MENU = [
  {
    category: "Pizzas",
    items: [
      {
        id: "pizza-pepperoni",
        name: "Pizza Pepperoni Familiar",
        description: "Pepperoni en cada bocado, borde dorado y mucho queso.",
        price: 35.9,
        emoji: "🍕",
      },
      {
        id: "pizza-hawaiana",
        name: "Pizza Hawaiana Familiar",
        description: "Jamón, piña y queso mozzarella derretido.",
        price: 33.9,
        emoji: "🍕",
      },
      {
        id: "pizza-suprema",
        name: "Pizza Suprema Familiar",
        description: "Pepperoni, salchicha, pimientos, cebolla y aceitunas.",
        price: 38.9,
        emoji: "🍕",
      },
      {
        id: "pizza-margherita",
        name: "Pizza Margherita Mediana",
        description: "Tomate, albahaca fresca y mozzarella.",
        price: 28.9,
        emoji: "🍕",
      },
    ],
  },
  {
    category: "Acompañamientos",
    items: [
      {
        id: "papas-papa",
        name: "Papa Bites",
        description: "Bocaditos de papa crocante con dip a elección.",
        price: 14.9,
        emoji: "🍟",
      },
      {
        id: "pan-ajo",
        name: "Pan al Ajo con Queso",
        description: "Pan recién horneado, ajo y mucho queso gratinado.",
        price: 12.9,
        emoji: "🥖",
      },
      {
        id: "alitas-bbq",
        name: "Alitas BBQ x8",
        description: "Alitas bañadas en salsa BBQ ahumada.",
        price: 22.9,
        emoji: "🍗",
      },
    ],
  },
  {
    category: "Bebidas",
    items: [
      {
        id: "coca-cola-1.5",
        name: "Gaseosa Coca Cola 1.5L",
        description: "Bien helada, para acompañar la pizza.",
        price: 8.0,
        emoji: "🥤",
      },
      {
        id: "inca-kola-1.5",
        name: "Inca Kola 1.5L",
        description: "El sabor de Perú, bien fría.",
        price: 8.0,
        emoji: "🥤",
      },
    ],
  },
];
