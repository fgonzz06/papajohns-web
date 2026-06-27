import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { items, increment, decrement, removeItem, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-dough-100 rounded-2xl">
        <p className="text-4xl mb-3" aria-hidden="true">
          🍕
        </p>
        <p className="font-display text-lg text-crust-950">Tu carrito está vacío</p>
        <p className="text-sm text-crust-950/60 mt-1">
          Agrega algo del menú para armar tu pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-dough-100 rounded-2xl p-5 sm:p-6">
      <ul className="divide-y divide-crust-950/10">
        {items.map((item) => (
          <li key={item.id} className="py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-crust-950 truncate">{item.name}</p>
              <p className="text-sm text-crust-950/50 font-mono">
                {formatCurrency(item.price)} c/u
              </p>
            </div>

            <div className="flex items-center gap-2 bg-dough-50 rounded-full px-1">
              <button
                onClick={() => decrement(item.id)}
                aria-label={`Quitar una unidad de ${item.name}`}
                className="w-8 h-8 rounded-full hover:bg-dough-100 text-crust-950 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center font-mono text-sm">{item.qty}</span>
              <button
                onClick={() => increment(item.id)}
                aria-label={`Agregar una unidad de ${item.name}`}
                className="w-8 h-8 rounded-full hover:bg-dough-100 text-crust-950 font-bold transition-colors"
              >
                +
              </button>
            </div>

            <span className="font-mono text-sm text-crust-950 w-20 text-right">
              {formatCurrency(item.price * item.qty)}
            </span>

            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Quitar ${item.name} del carrito`}
              className="text-crust-950/40 hover:text-sauce-600 transition-colors"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-crust-950/10 pt-4 mt-2 flex items-center justify-between">
        <span className="font-display text-lg text-crust-950">Total</span>
        <span className="font-mono text-xl font-semibold text-sauce-600">
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}
