import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import CartSummary from "../components/order/CartSummary";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!customerName.trim()) {
      setErrorMsg("Cuéntanos tu nombre para poder llamarte cuando esté listo.");
      return;
    }
    if (items.length === 0) {
      setErrorMsg("Tu carrito está vacío. Agrega algo del menú primero.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: customerName.trim(),
        items: items.map(({ name, qty, price }) => ({ name, qty, price })),
        totalAmount,
        source: "WEB",
      };
      const result = await createOrder(payload);
      clearCart();
      navigate(`/seguimiento/${result.orderId}`);
    } catch (err) {
      setErrorMsg(
        "No pudimos enviar tu pedido. Revisa tu conexión e intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-crust-950 mb-2">
        Tu pedido
      </h1>
      <p className="text-crust-950/60 mb-8">
        Revisa lo que vas a pedir y dinos a nombre de quién va.
      </p>

      <div className="mb-8">
        <CartSummary />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-crust-950 mb-2">
            Nombre para el pedido
          </label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ej: Carlos Mendoza"
            className="w-full rounded-xl border border-crust-950/15 bg-dough-50 px-4 py-3 text-crust-950 placeholder:text-crust-950/30 focus:border-sauce-600 outline-none transition-colors"
          />
        </div>

        {errorMsg && (
          <p role="alert" className="text-sm text-sauce-600 font-medium">
            {errorMsg}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Enviando pedido…" : "Confirmar pedido"}
        </Button>
      </form>
    </main>
  );
}
