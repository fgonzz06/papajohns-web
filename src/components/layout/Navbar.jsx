import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-crust-950/95 backdrop-blur-sm border-b border-crust-800">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl text-dough-50 tracking-tight flex items-center gap-2"
        >
          <span aria-hidden="true">🍕</span>
          <span>
            Papa<span className="text-sauce-600">John's</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hidden sm:inline text-sm font-medium text-dough-100/80 hover:text-cheese-400 transition-colors"
          >
            Menú
          </Link>
          <Link
            to="/seguimiento"
            className="hidden sm:inline text-sm font-medium text-dough-100/80 hover:text-cheese-400 transition-colors"
          >
            Seguir pedido
          </Link>

          <Link
            to="/checkout"
            className="relative inline-flex items-center gap-2 bg-sauce-600 hover:bg-sauce-700 text-dough-50 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <span aria-hidden="true">🛒</span>
            <span>Carrito</span>
            {totalQty > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-cheese-400 text-crust-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                aria-label={`${totalQty} productos en el carrito`}
              >
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
