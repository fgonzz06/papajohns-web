import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orders";
import CartSummary from "../components/order/CartSummary";
import Button from "../components/ui/Button";

const PAYMENT_METHODS = [
  { id: "EFECTIVO", label: "Efectivo (simulado)" },
  { id: "TARJETA", label: "Tarjeta (simulado)" },
  { id: "YAPE", label: "Yape / Plin (simulado)" },
];

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [deliveryType, setDeliveryType] = useState("DELIVERY");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Si hay sesión (simulada), prellenamos el nombre del pedido
  useEffect(() => {
    if (user?.name) setCustomerName((prev) => prev || user.name);
  }, [user]);

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
    if (deliveryType === "DELIVERY" && !address.trim()) {
      setErrorMsg("Ingresa una dirección de entrega (puede ser cualquier dirección de prueba).");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: customerName.trim(),
        items: items.map(({ name, qty, price, optionsLabel }) => ({
          name: optionsLabel ? `${name} (${optionsLabel})` : name,
          qty,
          price,
        })),
        totalAmount,
        source: "WEB",
        // Campos adicionales de simulación (no forman parte del contrato
        // mínimo, pero DynamoDB los guarda igual y sirven para el dashboard)
        deliveryType,
        address: deliveryType === "DELIVERY" ? address.trim() : null,
        paymentMethod,
      };
      const result = await createOrder(payload);
      clearCart();
      navigate(`/seguimiento/${result.orderId}`);
    } catch {
      setErrorMsg(
        "No pudimos enviar tu pedido. Revisa tu conexión e intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-950 mb-2">
        Tu pedido
      </h1>
      <p className="text-ink-950/60 mb-2">
        Revisa lo que vas a pedir y dinos a nombre de quién va.
      </p>
      <p className="text-xs text-forest-700 font-medium bg-forest-700/10 inline-block rounded-full px-3 py-1 mb-8">
        🔒 Esto es una simulación académica: no se realiza ningún cobro real.
      </p>

      <div className="mb-8">
        <CartSummary />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-ink-950 mb-2">
            Nombre para el pedido
          </label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ej: Carlos Mendoza"
            className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-ink-950 placeholder:text-ink-950/30 focus:border-forest-700 outline-none transition-colors"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-ink-950 mb-2">Tipo de entrega</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "DELIVERY", label: "🛵 Delivery" },
              { id: "RECOJO", label: "🏬 Recojo en tienda" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDeliveryType(opt.id)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  deliveryType === opt.id
                    ? "border-forest-700 bg-lime-400/15 text-forest-700"
                    : "border-ink-950/15 text-ink-950/70 hover:border-ink-950/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {deliveryType === "DELIVERY" && (
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-ink-950 mb-2">
              Dirección de entrega
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Av. Salaverry 123, Jesús María (dirección de prueba)"
              className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-ink-950 placeholder:text-ink-950/30 focus:border-forest-700 outline-none transition-colors"
            />
          </div>
        )}

        <div>
          <span className="block text-sm font-medium text-ink-950 mb-2">Método de pago</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPaymentMethod(pm.id)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  paymentMethod === pm.id
                    ? "border-forest-700 bg-lime-400/15 text-forest-700"
                    : "border-ink-950/15 text-ink-950/70 hover:border-ink-950/30"
                }`}
              >
                {pm.label}
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <p role="alert" className="text-sm text-discount font-medium">
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
