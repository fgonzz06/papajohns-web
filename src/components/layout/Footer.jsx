export default function Footer() {
  return (
    <footer className="bg-crust-950 text-dough-100/70 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg text-dough-50">
          Papa<span className="text-sauce-600">John's</span>
        </p>
        <p className="text-sm">
          Hecho con masa, queso y CON REACT ALV, papa jon. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
