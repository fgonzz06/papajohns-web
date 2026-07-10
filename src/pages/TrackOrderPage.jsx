import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrder } from "../api/orders";
import OrderTracker from "../components/order/OrderTracker";
import { formatCurrency } from "../utils/formatters";
import Icon from "../components/ui/Icon";

const POLL_INTERVAL_MS = 8000;

const CHANNELS = [
  { id: "WEB", label: "Web" },
  { id: "RAPPI", label: "Rappi" },
  { id: "WHATSAPP", label: "WhatsApp" },
];

const FAQS = [
  {
    q: "¿Cómo hacer seguimiento de pedido en Papa Johns?",
    a: "Al confirmar tu pedido te mostramos un número de pedido. Elige el canal por el que compraste, escribe ese número en el buscador de esta página y presiona BUSCAR: verás en qué etapa está (recepción, cocina, empaque, despacho o entregado), junto con quién atendió cada paso.",
  },
  {
    q: "¿Cuánto demora el delivery de pizzas en Lima y provincias?",
    a: "En esta demo el tiempo depende de qué tan rápido los trabajadores (cocina, empaque y despacho) completen cada etapa en su aplicación. En un escenario real, el tiempo estimado varía según la distancia de la sucursal y la demanda del momento.",
  },
  {
    q: "¿El seguimiento funciona para delivery y recojo en tienda?",
    a: "Sí. El flujo de trabajo es el mismo para ambos tipos de entrega: el pedido pasa por recepción, cocina y empaque; si elegiste delivery, además verás la etapa de despacho hasta la entrega.",
  },
  {
    q: "¿Qué puedo hacer si tengo problemas con mi pedido?",
    a: "Verifica que el número de pedido esté bien escrito (se copia completo desde la pantalla de confirmación). Si el pedido no aparece, puede que el backend de la demo esté detenido — avísale al equipo para reiniciar el laboratorio.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-black/10 rounded-lg bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-bold text-sm sm:text-base text-ink-950">{q}</span>
        <Icon name={open ? "chevronUp" : "chevronDown"} className="w-4 h-4 shrink-0" />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-ink-950/70 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function TrackOrderPage() {
  const { orderId: orderIdFromUrl } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState("WEB");
  const [orderIdInput, setOrderIdInput] = useState(orderIdFromUrl || "");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const deliveryTimerRef = useRef(null);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setErrorMsg("No encontramos un pedido con ese número. Revísalo e intenta de nuevo.");
      } else {
        setErrorMsg("No pudimos consultar tu pedido. Intenta de nuevo en un momento.");
      }
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial si viene el número en la URL
  useEffect(() => {
    if (orderIdFromUrl) {
      fetchOrder(orderIdFromUrl);
    }
  }, [orderIdFromUrl, fetchOrder]);

  // Polling mientras el pedido no esté en DESPACHO o ENTREGADO
  useEffect(() => {
    if (!order || order.status === "ENTREGADO" || order.status === "DESPACHO") return;
    const interval = setInterval(() => {
      fetchOrder(order.orderId);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [order, fetchOrder]);

  // Cuando llega a DESPACHO, simula entrega en 10-15 minutos
  useEffect(() => {
    if (!order || order.status !== "DESPACHO") return;
    if (deliveryTimerRef.current) clearTimeout(deliveryTimerRef.current);
    const delay = (Math.floor(Math.random() * 6) + 10) * 60 * 1000;
    deliveryTimerRef.current = setTimeout(() => {
      setOrder((prev) => ({
        ...prev,
        status: "ENTREGADO",
        stages: {
          ...prev.stages,
          ENTREGADO: {
            startedAt: new Date().toISOString(),
            endedAt: new Date().toISOString(),
            responsable: "Sistema",
          },
        },
      }));
    }, delay);
    return () => clearTimeout(deliveryTimerRef.current);
  }, [order?.status]);

  function handleSearch(e) {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    navigate(`/seguimiento/${orderIdInput.trim()}`);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="border border-black/15 rounded-lg bg-white px-6 sm:px-12 py-10 sm:py-14 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10"
        >
          <div className="shrink-0 text-forest-700">
            <Icon name="scooter" className="w-24 h-24" />
            <div className="h-1.5 bg-mist-100 rounded-full mt-1" aria-hidden="true" />
          </div>

          <div className="flex-1 w-full">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-950 uppercase mb-6">
              ¡Sigue tu pedido!
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
              <div>
                <label htmlFor="channel" className="block text-sm font-bold text-ink-950 mb-2">
                  Elige tu canal
                </label>
                <div className="relative">
                  <select
                    id="channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-black/20 bg-white px-4 py-3 text-sm text-ink-950 focus:border-forest-700 outline-none"
                  >
                    {CHANNELS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevronDown"
                    className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-950/60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-bold text-ink-950 mb-2">
                  Escribe tu número de pedido
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="N° de Pedido"
                  className="w-full rounded-lg border border-black/20 bg-white px-4 py-3 font-mono text-sm text-ink-950 placeholder:text-ink-950/30 focus:border-forest-700 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
              <button
                type="submit"
                disabled={isLoading || !orderIdInput.trim()}
                className={`w-full sm:w-auto rounded-full font-bold px-12 py-3 uppercase transition-colors ${
                  orderIdInput.trim()
                    ? "bg-lime-400 hover:bg-lime-500 text-forest-700"
                    : "bg-lime-200 text-forest-700/50 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Buscando…" : "Buscar"}
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-900 text-white font-bold px-8 py-3 rounded-full uppercase transition-colors"
              >
                <Icon name="pizza" className="w-4 h-4" /> Ir a menú
              </Link>
            </div>
          </div>
        </form>
      </div>

      <p className="text-center text-sm text-ink-950/70 mt-8">
        Si tienes consultas sobre tu pedido, escríbenos{" "}
        <a
          href="https://wa.me/51016060000"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-forest-700"
        >
          AQUÍ 016060000
        </a>
      </p>

      {errorMsg && (
        <p role="alert" className="text-center text-discount font-medium mt-6">
          {errorMsg}
        </p>
      )}

      {order && (
        <div className="space-y-6 mt-10">
          <OrderTracker currentStatus={order.status} stages={order.stages} />

          <div className="bg-mist-100 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold text-ink-950">
                Pedido de {order.customerName}
              </h2>
              <span className="font-mono text-xs text-ink-950/40">
                #{order.orderId.slice(0, 8)}
              </span>
            </div>
            <ul className="text-sm text-ink-950/70 space-y-1 mb-3">
              {order.items?.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.qty}× {item.name}</span>
                  <span className="font-mono">{formatCurrency(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 pt-3 flex justify-between font-semibold text-ink-950">
              <span>Total</span>
              <span className="font-mono">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

      <section className="mt-16 border-t border-black/10 pt-12">
        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink-950 text-center mb-8">
          Preguntas frecuentes sobre el seguimiento Papa Johns
        </h2>
        <div className="space-y-3 max-w-4xl mx-auto">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}