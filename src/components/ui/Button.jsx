const variants = {
  // Verde oscuro: botones de acción "serios" (Confirmar pedido, Buscar)
  primary: "bg-forest-700 hover:bg-forest-900 text-white",
  // Lima: el color de acento real del sitio (carrito, "+", CTAs rápidos)
  lime: "bg-lime-400 hover:bg-lime-500 text-forest-700",
  secondary: "bg-ink-950 hover:bg-forest-900 text-white",
  // Píldora blanca con borde negro, igual a las categorías del sitio real
  ghost: "bg-white hover:bg-mist-100 text-ink-950 border-2 border-ink-950",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
