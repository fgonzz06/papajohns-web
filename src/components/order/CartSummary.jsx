import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { items, increment, decrement, removeItem, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-mist-100 rounded-2xl">
        <p className="text-4xl mb-3" aria-hidden="true">
          🍕
        </p>
        <p className="font-display text-lg text-ink-950">Tu carrito está vacío</p>
        <p className="text-sm text-ink-950/60 mt-1">
          Agrega algo del menú para armar tu pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-mist-100 rounded-2xl p-5 sm:p-6">
      <ul className="divide-y divide-black/10">
        {items.map((item) => (
          <li key={item.lineId} className="py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ink-950 truncate">{item.name}</p>
              {item.optionsLabel && (
                <p className="text-xs text-forest-700 truncate">{item.optionsLabel}</p>
              )}
              <p className="text-sm text-ink-950/50 font-mono">
                {formatCurrency(item.price)} c/u
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-full px-1">
              <button
                onClick={() => decrement(item.lineId)}
                aria-label={`Quitar una unidad de ${item.name}`}
                className="w-8 h-8 rounded-full hover:bg-mist-100 text-ink-950 font-bold transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center font-mono text-sm">{item.qty}</span>
              <button
                onClick={() => increment(item.lineId)}
                aria-label={`Agregar una unidad de ${item.name}`}
                className="w-8 h-8 rounded-full hover:bg-mist-100 text-ink-950 font-bold transition-colors"
              >
                +
              </button>
            </div>

            <span className="font-mono text-sm text-ink-950 w-20 text-right">
              {formatCurrency(item.price * item.qty)}
            </span>

            <button
              onClick={() => removeItem(item.lineId)}
              aria-label={`Quitar ${item.name} del carrito`}
              className="text-ink-950/40 hover:text-discount transition-colors"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-black/10 pt-4 mt-2 flex items-center justify-between">
        <span className="font-display text-lg text-ink-950">Total</span>
        <span className="font-mono text-xl font-bold text-forest-700">
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  );
}
