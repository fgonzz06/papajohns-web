import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/order/ProductCard";

export default function FavoritesPage() {
  const { products, isLoading } = useProducts();
  const { favIds } = useFavorites();
  const { addItem } = useCart();

  const favProducts = products.filter((p) => favIds.includes(p.productId));

  function handleQuickAdd(product) {
    addItem({ id: product.productId, name: product.name, price: product.price });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-950 uppercase mb-8">
        Mis Favoritos
      </h1>

      {isLoading && <p className="text-ink-950/50">Cargando…</p>}

      {!isLoading && favProducts.length === 0 && (
        <div className="text-center py-16 bg-mist-100 rounded-2xl">
          <p className="text-4xl mb-3" aria-hidden="true">♡</p>
          <p className="text-ink-950 font-bold mb-1">Aún no tienes favoritos</p>
          <p className="text-sm text-ink-950/60 mb-6">
            Toca el corazón de cualquier producto para guardarlo aquí.
          </p>
          <Link to="/" className="text-forest-700 font-bold underline">
            Ir al menú
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {favProducts.map((p) => (
          <ProductCard key={p.productId} product={p} onQuickAdd={handleQuickAdd} />
        ))}
      </div>
    </main>
  );
}
