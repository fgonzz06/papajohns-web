# 🍕 papajohns-web

Web cliente para hacer pedidos de Papa John's, conectada al backend serverless
descrito en `API_CONTRACT.md`. Estilo visual calcado del sitio oficial
(papajohns.com.pe): barra roja, navegación por categorías, checkout con
entrega/pago simulados.

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **React Router** para navegación
- **Axios** para consumir la API

## Estructura

```
src/
  api/          → cliente axios (client.js), orders.js, products.js
  components/
    layout/     → Navbar (2 niveles), Footer
    order/      → ProductCard, CartSummary, OrderTracker
    ui/         → Button
  context/      → CartContext (carrito global con useContext)
  pages/        → MenuPage, CheckoutPage, TrackOrderPage
  utils/        → categorize.js (categorías inferidas), menu.js (catálogo
                   de respaldo), formatters.js
```

## Configuración

1. Instala dependencias:
   ```bash
   npm install
   ```
2. El archivo `.env` ya viene con los endpoints reales desplegados
   (Order Service + Product Service). Si cambian, actualízalos ahí:
   ```
   VITE_API_BASE_URL=...          # Order Service
   VITE_PRODUCTS_API_BASE_URL=... # Product Service
   VITE_TENANT_ID=SURCO-01
   ```
3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Flujo de la app

1. **Menú (`/`)**: trae el catálogo real desde el Product Service (paginando
   todo DynamoDB, no solo la primera página de 10) y lo agrupa por categoría
   inferida del nombre del producto (Pizzas, Combos, Bebidas...). Si el
   backend no responde, cae a un catálogo local (`utils/menu.js`) para que
   la demo nunca se quede en blanco.
2. **Checkout (`/checkout`)**: pide nombre, tipo de entrega (Delivery /
   Recojo en tienda), dirección si aplica y método de pago — todo simulado,
   con aviso explícito de que no hay cobro real. Envía el pedido con
   `POST /tenants/{tenantId}/orders`.
3. **Seguimiento (`/seguimiento/:orderId`)**: consulta
   `GET /tenants/{tenantId}/orders/{orderId}` cada 8 segundos y muestra el
   avance por las 5 etapas (Recepción → Cocina → Empaque → Despacho →
   Entregado).

## Notas

- `deliveryType`, `address` y `paymentMethod` se envían como campos extra en
  el `POST` de creación de pedido (no forman parte del contrato mínimo, pero
  DynamoDB los guarda sin problema y quedan disponibles para el dashboard de
  trabajadores/resumen).
- Esta web NO consume el servicio de Operaciones (dashboard trabajadores) ni
  el mock de OCI/Rappi — esos alimentan otras dos apps del proyecto.
