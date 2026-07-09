import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

const ADDRESS_KEY = "pj_address";

/**
 * Segunda barra del header: píldora verde "¡Comienza tu pedido!" con la
 * dirección elegida (persistida en localStorage) + links de Favoritos y
 * Sigue tu pedido, como en el sitio real.
 */
export default function UtilityBar() {
  const [address, setAddress] = useState(
    () => localStorage.getItem(ADDRESS_KEY) || ""
  );

  function chooseAddress() {
    const input = window.prompt(
      "Ingresa tu dirección de entrega (simulado):",
      address
    );
    if (input === null) return;
    const clean = input.trim();
    setAddress(clean);
    if (clean) localStorage.setItem(ADDRESS_KEY, clean);
    else localStorage.removeItem(ADDRESS_KEY);
  }

  return (
    <div className="bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={chooseAddress}
          className="flex items-center gap-2 bg-forest-700 hover:bg-forest-900 text-white text-xs font-semibold pl-3 pr-4 py-1.5 rounded-full transition-colors max-w-[60vw]"
        >
          <Icon name="pin" className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {address ? (
              address
            ) : (
              <>
                ¡Comienza tu pedido! <span className="underline">Elige tu dirección</span>
              </>
            )}
          </span>
        </button>

        <div className="flex items-center gap-5 text-sm text-ink-950/80">
          <Link to="/favoritos" className="hidden sm:flex items-center gap-1.5 hover:text-forest-700">
            <Icon name="heart" className="w-4 h-4" /> Mis Favoritos
          </Link>
          <Link to="/seguimiento" className="flex items-center gap-1.5 hover:text-forest-700">
            <Icon name="pin" className="w-4 h-4" /> Sigue tu pedido
          </Link>
        </div>
      </div>
    </div>
  );
}
