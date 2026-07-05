import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";
import Button from "../components/ui/Button";

function ProductCard({ product, onAdd }) {
  return (
    <article className="group bg-dough-100 rounded-2xl overflow-hidden border border-crust-950/5 hover:border-sauce-600/30 hover:shadow-lg transition-all flex flex-col">
      <div className="bg-white aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2 flex-1">
          <h3 className="font-display text-base font-semibold text-crust-950 leading-snug">
            {product.name}
          </h3>
          <span className="font-mono text-sm text-basil-700 font-medium whitespace-nowrap">
            {formatCurrency(product.price)}
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={() => onAdd(product)}
          className="w-full group-hover:bg-sauce-600 group-hover:text-dough-50 group-hover:border-sauce-600"
        >
          Agregar al pedido
        </Button>
      </div>
    </article>
  );
}

export default function MenuPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setErrorMsg("No pudimos cargar el menú. Intenta de nuevo."))
      .finally(() => setIsLoading(false));
  }, []);

  // addItem espera { id, name, price }, adaptamos productId → id
  function handleAdd(product) {
    addItem({
      id: product.productId,
      name: product.name,
      price: product.price,
    });
  }

  return (
    <div>
      <section className="relative bg-crust-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--color-sauce-600) 0%, transparent 35%), radial-gradient(circle at 80% 70%, var(--color-cheese-400) 0%, transparent 30%)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
          <p className="font-mono text-xs tracking-widest text-cheese-400 uppercase mb-4">
            Recién horneada para ti
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-dough-50 leading-[1.05] max-w-3xl mx-auto">
            La pizza llega más rápido cuando la pides bien
          </h1>
          <p className="text-dough-100/70 mt-5 max-w-xl mx-auto text-base sm:text-lg">
            Arma tu pedido, síguelo en vivo desde la cocina hasta tu puerta.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {isLoading && (
          <p className="text-center text-crust-950/50 py-20 text-lg">Cargando menú…</p>
        )}
        {errorMsg && (
          <p className="text-center text-sauce-600 text-sm mb-8">{errorMsg}</p>
        )}
        {!isLoading && products.length > 0 && (
          <section>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-crust-950 mb-6">
              Nuestros productos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} onAdd={handleAdd} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}