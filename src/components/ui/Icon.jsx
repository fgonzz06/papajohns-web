/**
 * Set de iconos SVG propios (trazos simples estilo outline) para no
 * depender de assets externos. Uso: <Icon name="cart" className="w-5 h-5" />
 */
const PATHS = {
  // Porción de pizza
  pizza: (
    <>
      <path d="M12 3L3 20h18L12 3z" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  percent: (
    <>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M9 20v-6h6v6" />
      <path d="M3 9h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
      <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l1-2-2-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2-1.5 1.5z" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.7 1.5C10 19.7 4.3 14 3.5 5.7A1.5 1.5 0 0 1 5 4z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.5 12h11L21 8H7" />
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="16.5" cy="19.5" r="1.5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 11c-1.8 4.4-9.3 9-9.3 9z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3.5" />
      <circle cx="18" cy="17" r="3.5" />
      <path d="M6 17l4-8h5l3 8M10 9h4" />
    </>
  ),
  scooter: (
    <>
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M8 17.5h8" />
      <path d="M16 8l2.5 9.5" />
      <path d="M13 8h3" />
      <path d="M5.5 17.5L8 12h4" />
      <rect x="9" y="5" width="5" height="4" rx="1" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  chevronLeft: <polyline points="14 6 8 12 14 18" />,
  chevronRight: <polyline points="10 6 16 12 10 18" />,
  chevronDown: <polyline points="6 10 12 16 18 10" />,
  chevronUp: <polyline points="6 14 12 8 18 14" />,
};

export default function Icon({ name, className = "w-5 h-5", filled = false, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
