import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../api/orders";
import OrderTracker from "../components/order/OrderTracker";
import { formatCurrency } from "../utils/formatters";
import Button from "../components/ui/Button";

const POLL_INTERVAL_MS = 8000;

export default function TrackOrderPage() {
  const { orderId: orderIdFromUrl } = useParams();
  const navigate = useNavigate();

  const [orderIdInput, setOrderIdInput] = useState(orderIdFromUrl || "");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setErrorMsg("No encontramos un pedido con ese código. Revísalo e intenta de nuevo.");
      } else {
        setErrorMsg("No pudimos consultar tu pedido. Intenta de nuevo en un momento.");
      }
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial si viene orderId en la URL
  useEffect(() => {
    if (orderIdFromUrl) {
      fetchOrder(orderIdFromUrl);
    }
  }, [orderIdFromUrl, fetchOrder]);

  // Polling mientras el pedido no esté ENTREGADO
  useEffect(() => {
    if (!order || order.status === "ENTREGADO") return;
    const interval = setInterval(() => {
      fetchOrder(order.orderId);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [order, fetchOrder]);

  function handleSearch(e) {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    navigate(`/seguimiento/${orderIdInput.trim()}`);
  }

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-crust-950 mb-2">
        Sigue tu pedido
      </h1>
      <p className="text-crust-950/60 mb-8">
        Ingresa el código que te dimos al confirmar tu pedido.
      </p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          type="text"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          placeholder="ID del pedido"
          className="flex-1 rounded-xl border border-crust-950/15 bg-dough-50 px-4 py-3 font-mono text-sm text-crust-950 placeholder:text-crust-950/30 focus:border-sauce-600 outline-none transition-colors"
        />
        <Button type="submit" disabled={isLoading}>
          Buscar
        </Button>
      </form>

      {isLoading && !order && (
        <p className="text-center text-crust-950/50">Buscando tu pedido…</p>
      )}

      {errorMsg && (
        <p role="alert" className="text-center text-sauce-600 font-medium mb-6">
          {errorMsg}
        </p>
      )}

      {order && (
        <div className="space-y-6">
          <OrderTracker currentStatus={order.status} stages={order.stages} />

          <div className="bg-dough-100 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold text-crust-950">
                Pedido de {order.customerName}
              </h2>
              <span className="font-mono text-xs text-crust-950/40">
                #{order.orderId.slice(0, 8)}
              </span>
            </div>
            <ul className="text-sm text-crust-950/70 space-y-1 mb-3">
              {order.items?.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.qty}× {item.name}
                  </span>
                  <span className="font-mono">{formatCurrency(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-crust-950/10 pt-3 flex justify-between font-semibold text-crust-950">
              <span>Total</span>
              <span className="font-mono">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
