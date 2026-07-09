import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { groupByCategory } from "../utils/categorize";
import ProductCard from "../components/order/ProductCard";
import CategoryCarousel from "../components/order/CategoryCarousel";
import HeroCarousel from "../components/order/HeroCarousel";

export default function MenuPage() {
  const { products, isLoading, usingFallback } = useProducts();
  const { addItem } = useCart();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  function handleQuickAdd(product) {
    addItem({ id: product.productId, name: product.name, price: product.price });
  }

  function scrollToCategory(category) {
    document
      .getElementById(`cat-${category}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filtered = query
    ? products.filter((p) =>
        `${p.name} ${p.description || ""}`.toLowerCase().includes(query)
      )
    : products;

  const grouped = groupByCategory(filtered);

  return (
    <div>
      {!query && <HeroCarousel />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {isLoading && (
          <p className="text-center text-ink-950/50 py-24 text-lg">Cargando menú…</p>
        )}

        {!isLoading && usingFallback && (
          <p className="text-center text-sm text-forest-700 bg-mist-100 rounded-xl py-3 mb-8 font-medium">
            Mostrando catálogo local — no pudimos conectarnos al backend en este momento.
          </p>
        )}

        {!isLoading && query && (
          <p className="text-sm text-ink-950/60 mb-6">
            Resultados para “{query}” ({filtered.length})
          </p>
        )}

        {!isLoading && !query && grouped.length > 0 && (
          <div className="mb-6">
            <CategoryCarousel groups={grouped} onSelect={scrollToCategory} />
          </div>
        )}

        {!isLoading && !query && (
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-950 text-center uppercase tracking-tight mb-10">
            Papa Johns Pizza
          </h1>
        )}
      </div>

      <main id="promociones" className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 scroll-mt-24">
        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-ink-950/50 py-16">
            No encontramos productos que coincidan con tu búsqueda.
          </p>
        )}

        {!isLoading &&
          grouped.map(([category, items]) => (
            <section key={category} id={`cat-${category}`} className="mb-14 scroll-mt-24">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-950 mb-6 uppercase">
                {category === "Promociones" ? "Promos Imperdibles" : category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {items.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            </section>
          ))}
      </main>
    </div>
  );
}
