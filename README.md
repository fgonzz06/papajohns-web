# 🍕 papajohns-web

Web cliente para hacer pedidos de Papa John's, conectada al backend serverless descrito en `API_CONTRACT.md`.

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **React Router** para navegación
- **Axios** para consumir la API

## Estructura

```
src/
  api/          → cliente axios (client.js) y funciones de la API (orders.js)
  components/
    layout/     → Navbar, Footer
    order/      → MenuItemCard, CartSummary, OrderTracker
    ui/         → Button
  context/      → CartContext (carrito global con useContext)
  pages/        → MenuPage, CheckoutPage, TrackOrderPage
  utils/        → menu.js (catálogo), formatters.js
```

## Configuración

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia el archivo de entorno y completa tu URL real del API Gateway:
   ```bash
   cp .env.example .env
   ```
3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Flujo de la app

1. **Menú (`/`)**: el cliente agrega productos al carrito.
2. **Checkout (`/checkout`)**: confirma su nombre y envía el pedido con `POST /tenants/{tenantId}/orders`.
3. **Seguimiento (`/seguimiento/:orderId`)**: consulta `GET /tenants/{tenantId}/orders/{orderId}` cada 8 segundos y muestra el avance por las 5 etapas (Recepción → Cocina → Empaque → Despacho → Entregado).

## Notas

- El menú de productos es data estática (`src/utils/menu.js`) porque el contrato de API no define un endpoint de catálogo todavía.
- El `tenantId` (sucursal) se configura en `.env` vía `VITE_TENANT_ID`.
