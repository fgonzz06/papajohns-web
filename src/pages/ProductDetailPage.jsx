import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { categorize } from "../utils/categorize";
import {
  FLAVOR_GROUPS,
  DOUGH_OPTIONS,
  EXTRA_OPTIONS,
  isCustomizable,
} from "../utils/productOptions";
import { formatCurrency } from "../utils/formatters";
import Icon from "../components/ui/Icon";

/** Acordeón de opciones con radios, estilo del sitio real. */
function OptionAccordion({ title, required, count, selectedCount, open, onToggle, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-ink-950">{title}</h3>
        {required && <span className="text-sm text-discount">(Obligatorio)</span>}
      </div>
      <div className="rounded-2xl border border-black/10 bg-white">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <span className="text-sm text-ink-950/80">Selecciona {count} opción</span>
          <span className="flex items-center gap-3">
            <span className="text-xs border border-black/20 rounded-full px-3 py-1 bg-mist-100">
              Selección {selectedCount}/{count}
            </span>
            <Icon name={open ? "chevronUp" : "chevronDown"} className="w-4 h-4" />
          </span>
        </button>
        {open && <div className="px-4 pb-4">{children}</div>}
      </div>
    </div>
  );
}

function RadioRow({ label, surcharge = 0, checked, onSelect }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 mb-2 cursor-pointer hover:border-forest-700 transition-colors">
      <span className="text-lg" aria-hidden="true">🍕</span>
      <span className="flex-1 text-sm font-medium text-ink-950">{label}</span>
      {surcharge > 0 && (
        <span className="text-xs font-bold text-forest-700">+S/{surcharge.toFixed(2)}</span>
      )}
      <input
        type="radio"
        checked={checked}
        onChange={onSelect}
        className="w-4 h-4 accent-forest-700"
      />
    </label>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getById, isLoading } = useProducts();
  const { addItem } = useCart();
  const { isFav, toggleFav } = useFavorites();

  const product = getById(productId);
  const category = product ? categorize(product) : null;
  const customizable = product ? isCustomizable(product, category) : false;

  const [flavor, setFlavor] = useState(null);
  const [dough, setDough] = useState(null);
  const [extra, setExtra] = useState(null);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState("flavor");

  const surcharge = useMemo(() => {
    const d = DOUGH_OPTIONS.find((o) => o.id === dough)?.surcharge ?? 0;
    const e = EXTRA_OPTIONS.find((o) => o.id === extra)?.surcharge ?? 0;
    return d + e;
  }, [dough, extra]);

  if (isLoading) {
    return <p className="text-center py-24 text-ink-950/50">Cargando producto…</p>;
  }

  if (!product) {
    return (
      <main className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="text-lg text-ink-950 mb-4">No encontramos ese producto.</p>
        <Link to="/" className="text-forest-700 font-bold underline">
          Volver al menú
        </Link>
      </main>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;
  const canAdd = !customizable || (flavor && dough);
  const unitPrice = product.price + surcharge;

  function handleAdd() {
    if (!canAdd) return;
    const doughOpt = DOUGH_OPTIONS.find((o) => o.id === dough);
    const extraOpt = EXTRA_OPTIONS.find((o) => o.id === extra);
    const optionsLabel = customizable
      ? [flavor, doughOpt?.label, extraOpt && extraOpt.id !== "sin-extra" ? extraOpt.label : null]
          .filter(Boolean)
          .join(" · ")
      : "";
    addItem(
      { id: product.productId, name: product.name, price: product.price },
      {
        qty,
        unitSurcharge: surcharge,
        options: customizable ? { flavor, dough, extra } : null,
        optionsLabel,
      }
    );
    navigate("/checkout");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-950/60 mb-6">
        <Link to="/" className="hover:text-forest-700">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-ink-950 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Columna izquierda: imagen + info */}
        <div>
          <div className="relative bg-mist-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-6">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <span className="text-8xl" aria-hidden="true">🍕</span>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              {hasDiscount && (
                <span className="inline-block bg-discount text-white text-xs font-bold px-2 py-1 rounded mb-2">
                  -{discountPct}%
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 uppercase">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-ink-950/70 mt-3">{product.description}</p>
              )}
              <p className="mt-4">
                <span className="font-mono text-2xl font-bold text-ink-950">
                  {formatCurrency(product.price)}
                </span>
                {hasDiscount && (
                  <span className="font-mono text-sm text-gray-500 line-through ml-3">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleFav(product.productId)}
              aria-label="Favorito"
              className={`w-10 h-10 rounded-full border border-black/10 flex items-center justify-center shrink-0 ${
                isFav(product.productId) ? "text-discount" : "text-forest-700"
              }`}
            >
              <Icon name="heart" className="w-5 h-5" filled={isFav(product.productId)} />
            </button>
          </div>

          <div className="border-t border-black/10 mt-6 pt-5 space-y-4 text-sm">
            <p>
              <span className="font-bold">Envío:</span>{" "}
              <span className="text-ink-950/70">Elige una sucursal (simulado)</span>
            </p>
            <div>
              <p className="font-bold mb-2">Retiros disponibles:</p>
              <div className="flex gap-8 text-ink-950/80">
                <span className="flex items-center gap-2">
                  <Icon name="pin" className="w-4 h-4" /> Retiro en local
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="bike" className="w-4 h-4" /> Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: personalización */}
        <div>
          {customizable ? (
            <>
              {/* Stepper 1-2-3 */}
              <div className="flex items-center justify-between mb-8 px-2">
                {["1. SIGNATURE", "2. PIZZA", "3. EXTRAS"].map((step, i) => {
                  const done =
                    (i === 0 && flavor) || (i === 1 && dough) || (i === 2 && extra);
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full border-2 ${
                          done ? "bg-forest-700 border-forest-700" : "border-ink-950/40 bg-white"
                        }`}
                      />
                      <span className="text-xs font-bold text-ink-950/70">{step}</span>
                    </div>
                  );
                })}
              </div>

              <OptionAccordion
                title="Elige el sabor de tu pizza"
                required
                count={1}
                selectedCount={flavor ? 1 : 0}
                open={openSection === "flavor"}
                onToggle={() => setOpenSection(openSection === "flavor" ? "" : "flavor")}
              >
                {FLAVOR_GROUPS.map((g) => (
                  <div key={g.group} className="mb-3">
                    <p className="font-bold text-sm text-ink-950 mb-2">{g.group}</p>
                    {g.flavors.map((f) => (
                      <RadioRow
                        key={f}
                        label={f}
                        checked={flavor === f}
                        onSelect={() => {
                          setFlavor(f);
                          setOpenSection("dough");
                        }}
                      />
                    ))}
                  </div>
                ))}
              </OptionAccordion>

              <OptionAccordion
                title="Elige el tipo de masa"
                required
                count={1}
                selectedCount={dough ? 1 : 0}
                open={openSection === "dough"}
                onToggle={() => setOpenSection(openSection === "dough" ? "" : "dough")}
              >
                {DOUGH_OPTIONS.map((o) => (
                  <RadioRow
                    key={o.id}
                    label={o.label}
                    surcharge={o.surcharge}
                    checked={dough === o.id}
                    onSelect={() => {
                      setDough(o.id);
                      setOpenSection("extras");
                    }}
                  />
                ))}
              </OptionAccordion>

              <OptionAccordion
                title="Selecciona tus extras"
                count={1}
                selectedCount={extra ? 1 : 0}
                open={openSection === "extras"}
                onToggle={() => setOpenSection(openSection === "extras" ? "" : "extras")}
              >
                {EXTRA_OPTIONS.map((o) => (
                  <RadioRow
                    key={o.id}
                    label={o.label}
                    surcharge={o.surcharge}
                    checked={extra === o.id}
                    onSelect={() => setExtra(o.id)}
                  />
                ))}
              </OptionAccordion>
            </>
          ) : (
            <div className="rounded-2xl bg-mist-100 p-6 text-sm text-ink-950/70">
              Este producto no requiere personalización. Agrégalo directamente a tu
              pedido con el botón de abajo.
            </div>
          )}
        </div>
      </div>

      {/* Barra inferior fija: producto + cantidad + agregar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
            {product.imageUrl && (
              <img src={product.imageUrl} alt="" className="w-12 h-12 object-contain rounded bg-mist-100" />
            )}
            <div className="min-w-0">
              <p className="font-bold text-sm text-ink-950 truncate">{product.name}</p>
              <p className="font-mono text-sm">
                <span className="font-bold">{formatCurrency(unitPrice)}</span>
                {hasDiscount && (
                  <span className="text-gray-500 line-through text-xs ml-2">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Disminuir cantidad"
              className="w-9 h-9 rounded-full border border-black/15 font-bold hover:bg-mist-100"
            >
              −
            </button>
            <span className="w-8 text-center font-mono">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Aumentar cantidad"
              className="w-9 h-9 rounded-full border border-black/15 font-bold hover:bg-mist-100"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className={`flex-1 sm:flex-none sm:min-w-72 rounded-full font-bold py-3.5 px-8 transition-colors ${
              canAdd
                ? "bg-lime-400 hover:bg-lime-500 text-forest-700"
                : "bg-lime-200 text-forest-700/50 cursor-not-allowed"
            }`}
          >
            AGREGAR AL PEDIDO
          </button>
        </div>
      </div>
    </main>
  );
}
