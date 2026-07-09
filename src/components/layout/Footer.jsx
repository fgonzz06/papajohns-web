import Icon from "../ui/Icon";

const PRODUCT_LINKS = [
  "Promociones",
  "Pizzas",
  "Combos",
  "Promos Signature",
  "Big Combos",
  "Acompañamientos",
];

const HELP_LINKS = [
  "Conócenos",
  "Comprobante Electrónico",
  "Políticas de Datos Personales",
  "Términos y Condiciones",
  "Derecho de ARCO",
  "Política de cookies",
];

/** Footer blanco con columnas, como el sitio real. */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl font-extrabold text-forest-700 uppercase leading-none">
            Papa Johns
          </p>
          <p className="text-[10px] text-discount font-bold mb-5">
            Mejores Ingredientes. Mejor Pizza.
          </p>
          <p className="font-bold text-sm text-ink-950 mb-3">Síguenos en</p>
          <div className="flex gap-3 text-ink-950/70">
            {["f", "▶", "𝕏", "◎"].map((s, i) => (
              <span
                key={i}
                className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-sm"
                aria-hidden="true"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-ink-950 mb-3">Nuestros Productos</h3>
          <ul className="space-y-2 text-sm text-ink-950/70">
            {PRODUCT_LINKS.map((link) => (
              <li key={link} className="hover:text-forest-700 cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm text-ink-950 mb-3">Ayuda</h3>
          <ul className="space-y-2 text-sm text-ink-950/70">
            {HELP_LINKS.map((link) => (
              <li key={link} className="hover:text-forest-700 cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm text-ink-950 mb-3">Métodos de Pago (simulado)</h3>
          <div className="flex flex-wrap gap-2">
            {["VISA", "MC", "AMEX", "DINERS"].map((m) => (
              <span
                key={m}
                className="border border-black/20 rounded px-2.5 py-1.5 text-[10px] font-bold text-ink-950/70"
              >
                {m}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-sm text-ink-950 mt-6 mb-2">Libro de Reclamaciones</h3>
          <span className="inline-flex items-center gap-2 text-xs text-ink-950/60">
            <Icon name="store" className="w-5 h-5" /> Demo académica
          </span>
        </div>
      </div>

      <div className="border-t border-black/10 py-5 text-center text-xs text-ink-950/50 px-4">
        © {new Date().getFullYear()} Proyecto Final CS2032 (UTEC) — Sistema de Gestión de
        Pedidos con referencia a Papa John's. Sin fines comerciales; no afiliado a Papa
        John's International. Ningún pedido genera un cobro real.
      </div>
    </footer>
  );
}
