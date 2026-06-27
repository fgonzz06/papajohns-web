import { formatCurrency } from "../../utils/formatters";
import Button from "../ui/Button";

export default function MenuItemCard({ product, onAdd }) {
  return (
    <article className="group bg-dough-100 rounded-2xl p-5 flex flex-col gap-3 border border-crust-950/5 hover:border-sauce-600/30 hover:shadow-lg hover:shadow-crust-950/5 transition-all">
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl" aria-hidden="true">
          {product.emoji}
        </span>
        <span className="font-mono text-sm text-basil-700 font-medium whitespace-nowrap">
          {formatCurrency(product.price)}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-lg font-semibold text-crust-950 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-crust-950/60 mt-1">{product.description}</p>
      </div>

      <Button
        variant="ghost"
        onClick={() => onAdd(product)}
        className="w-full mt-1 group-hover:bg-sauce-600 group-hover:text-dough-50 group-hover:border-sauce-600"
      >
        Agregar al pedido
      </Button>
    </article>
  );
}
