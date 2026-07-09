import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Icon from "../ui/Icon";

export default function Navbar() {
  const { totalQty, totalAmount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSearchOpen(false);
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : "/");
    setQuery("");
  }

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Lockup de logo en texto (los assets del logo real tienen derechos de marca) */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className="font-display text-2xl font-extrabold text-forest-700 tracking-tight uppercase">
            Papa Johns
          </span>
          <span className="text-[10px] text-discount font-bold tracking-wide">
            Mejores Ingredientes. Mejor Pizza.
          </span>
        </Link>

        {/* Nav central con iconos */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900 uppercase">
            <Icon name="pizza" className="w-5 h-5" /> Menú
          </Link>
          <Link to="/#promociones" className="flex items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900 uppercase">
            <Icon name="percent" className="w-5 h-5" /> Promos Exclusivas
          </Link>
          <Link to="/#locales" className="flex items-center gap-2 text-sm font-bold text-forest-700 hover:text-forest-900 uppercase">
            <Icon name="store" className="w-5 h-5" /> Locales
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Buscar productos"
            className="text-forest-700 hover:text-forest-900"
          >
            <Icon name="search" className="w-5 h-5" />
          </button>
        </div>

        {/* Cluster derecho: WhatsApp, teléfono, sesión, carrito */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          <a
            href="https://wa.me/51016060000"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-2 text-forest-700"
          >
            <Icon name="whatsapp" className="w-6 h-6" />
            <span className="text-[11px] leading-tight font-semibold">
              Pide por<br />WHATSAPP
            </span>
          </a>
          <span className="hidden xl:flex items-center gap-2 text-forest-700">
            <Icon name="phone" className="w-5 h-5" />
            <span className="text-[11px] leading-tight font-semibold">
              Llámanos<br />016060000
            </span>
          </span>

          {user ? (
            <button
              type="button"
              onClick={logout}
              title="Cerrar sesión"
              className="hidden sm:flex items-center gap-2 text-forest-700 hover:text-forest-900"
            >
              <Icon name="user" className="w-5 h-5" />
              <span className="text-[11px] leading-tight font-semibold text-left">
                Hola, {user.name.split(" ")[0]}<br />CERRAR SESIÓN
              </span>
            </button>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-2 text-forest-700 hover:text-forest-900">
              <Icon name="user" className="w-5 h-5" />
              <span className="text-[11px] leading-tight font-semibold text-left">
                Hola,<br />INICIAR SESIÓN
              </span>
            </Link>
          )}

          <Link
            to="/checkout"
            className="relative inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-forest-700 text-sm font-bold px-4 py-2 rounded-full transition-colors"
          >
            <Icon name="cart" className="w-5 h-5" />
            <span>S/ {totalAmount.toFixed(2)}</span>
            {totalQty > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-forest-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                aria-label={`${totalQty} productos en el carrito`}
              >
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca tu pizza, combo o bebida…"
            className="w-full rounded-full border-2 border-forest-700 px-5 py-2.5 text-sm outline-none"
          />
        </form>
      )}
    </nav>
  );
}
