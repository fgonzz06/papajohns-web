import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

/**
 * Carrusel hero con arte propio (gradientes y patrones CSS): banners
 * grandes verdes con flechas y puntos, como la estructura del sitio real.
 * No usamos las artes de campaña reales por derechos de autor.
 */
const SLIDES = [
  {
    id: "combo",
    eyebrow: "SOLO POR HOY (SIMULADO)",
    title: "2 PIZZAS GRANDES",
    highlight: "S/ 39.90",
    subtitle: "Arma tu dúo con tus sabores favoritos",
    cta: "COMPRAR",
    to: "/#promociones",
    bg: "linear-gradient(120deg, #007d00 0%, #008d00 45%, #00a000 100%)",
  },
  {
    id: "delivery",
    eyebrow: "PIDE POR LA WEB",
    title: "DELIVERY GRATIS",
    highlight: "LUN A MIÉ",
    subtitle: "En pedidos desde s/23.90 · demo académica",
    cta: "VER MENÚ",
    to: "/",
    bg: "linear-gradient(120deg, #1c3319 0%, #2d5d2a 55%, #007d00 100%)",
  },
  {
    id: "seguimiento",
    eyebrow: "NUEVO",
    title: "SIGUE TU PEDIDO",
    highlight: "EN VIVO",
    subtitle: "De la cocina a tu puerta, paso a paso",
    cta: "PROBAR",
    to: "/seguimiento",
    bg: "linear-gradient(120deg, #008d00 0%, #2d5d2a 60%, #1c3319 100%)",
  },
];

const AUTO_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearInterval(t);
  }, []);

  const go = (dir) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: slide.bg }}
      aria-roledescription="carrusel"
    >
      {/* Patrón sutil de rombos, evocando la textura del banner real */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 26px), repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 26px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-12 sm:px-20 py-14 sm:py-24 flex flex-col sm:flex-row items-center gap-8">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-xs tracking-[0.25em] text-lime-400 font-bold mb-3">
            {slide.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold leading-[0.95] drop-shadow">
            {slide.title}
          </h2>
          <p className="font-display text-5xl sm:text-7xl font-extrabold text-lime-400 leading-none mt-2 drop-shadow">
            {slide.highlight}
          </p>
          <p className="mt-4 text-white/85 text-base sm:text-lg">{slide.subtitle}</p>
          <Link
            to={slide.to}
            className="inline-block mt-7 bg-cream-100 hover:bg-white text-forest-700 font-bold px-10 py-3.5 rounded-full transition-colors"
          >
            {slide.cta}
          </Link>
        </div>
        <div className="hidden sm:block text-[10rem] leading-none drop-shadow-xl select-none" aria-hidden="true">
          🍕
        </div>
      </div>

      {/* Flechas */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Banner anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-ink-950 flex items-center justify-center shadow"
      >
        <Icon name="chevronLeft" className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Siguiente banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-ink-950 flex items-center justify-center shadow"
      >
        <Icon name="chevronRight" className="w-5 h-5" />
      </button>

      {/* Puntos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ir al banner ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? "bg-lime-400" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
