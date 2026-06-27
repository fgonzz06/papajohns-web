import { MENU } from "../utils/menu";
import { useCart } from "../context/CartContext";
import MenuItemCard from "../components/order/MenuItemCard";

export default function MenuPage() {
  const { addItem } = useCart();

  return (
    <div>
      {/* Hero */}
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

      {/* Menú */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {MENU.map((section) => (
          <section key={section.category} className="mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-crust-950 mb-6">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.items.map((product) => (
                <MenuItemCard key={product.id} product={product} onAdd={addItem} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
