const variants = {
  primary: "bg-sauce-600 hover:bg-sauce-700 text-dough-50",
  secondary: "bg-crust-950 hover:bg-crust-800 text-dough-50",
  ghost: "bg-transparent hover:bg-dough-100 text-crust-950 border border-crust-950/20",
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
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
