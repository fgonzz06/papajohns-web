import { useRef } from "react";
import Icon from "../ui/Icon";

/**
 * Carrusel de categorías: píldora blanca con borde negro + FOTO del
 * producto representativo debajo, como en la home real. La foto es la
 * imagen del primer producto de cada categoría (vienen del backend).
 *
 * @param {[string, object[]][]} groups - salida de groupByCategory
 * @param {(category: string) => void} onSelect
 */
export default function CategoryCarousel({ groups, onSelect }) {
  const scrollerRef = useRef(null);
  const scrollBy = (dir) =>
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Categorías anteriores"
        className="hidden sm:flex shrink-0 w-9 h-9 rounded-full bg-white border border-black/15 shadow items-center justify-center text-ink-950 hover:bg-mist-100"
      >
        <Icon name="chevronLeft" className="w-5 h-5" />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] flex-1"
      >
        {groups.map(([category, items]) => {
          const cover = items.find((p) => p.imageUrl)?.imageUrl || null;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className="shrink-0 flex flex-col items-center gap-2 group w-36"
            >
              <span className="rounded-full border-2 border-ink-950 bg-white px-5 py-2 text-sm font-bold text-ink-950 group-hover:bg-lime-400 group-hover:border-lime-400 transition-colors whitespace-nowrap">
                {category}
              </span>
              <span className="h-28 flex items-center justify-center">
                {cover ? (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    className="max-h-28 object-contain group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <span className="text-6xl" aria-hidden="true">🍕</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Siguientes categorías"
        className="hidden sm:flex shrink-0 w-9 h-9 rounded-full bg-white border border-black/15 shadow items-center justify-center text-ink-950 hover:bg-mist-100"
      >
        <Icon name="chevronRight" className="w-5 h-5" />
      </button>
    </div>
  );
}
