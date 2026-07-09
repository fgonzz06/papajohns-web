import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatters";
import { useFavorites } from "../../context/FavoritesContext";
import Icon from "../ui/Icon";

/**
 * Tarjeta de producto: la tarjeta entera navega al detalle
 * (/producto/:id); el "+" agrega rápido con opciones por defecto y el
 * corazón guarda el favorito (persistido en localStorage).
 */
export default function ProductCard({ product, onQuickAdd }) {
  const { isFav, toggleFav } = useFavorites();
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-black/10 hover:shadow-lg transition-shadow flex flex-col">
      <Link
        to={`/producto/${product.productId}`}
        className="relative bg-mist-100 aspect-square overflow-hidden flex items-center justify-center"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <span className={`text-5xl ${product.imageUrl ? "hidden" : ""}`} aria-hidden="true">
          🍕
        </span>
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-discount text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPct}%
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => toggleFav(product.productId)}
        aria-label={isFav(product.productId) ? "Quitar de favoritos" : "Agregar a favoritos"}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow transition-colors ${
          isFav(product.productId) ? "text-discount" : "text-forest-700"
        }`}
      >
        <Icon name="heart" className="w-4 h-4" filled={isFav(product.productId)} />
      </button>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link to={`/producto/${product.productId}`}>
          <h3 className="font-display text-base font-bold text-ink-950 leading-snug line-clamp-2 hover:text-forest-700">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-gray-500 leading-snug line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-ink-950">
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span className="font-mono text-xs text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            aria-label={`Agregar ${product.name} al pedido`}
            className="w-9 h-9 rounded-full bg-lime-400 hover:bg-lime-500 text-forest-700 text-xl font-bold flex items-center justify-center transition-colors shrink-0"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
