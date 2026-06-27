const STAGES = [
  { key: "RECEPCION", label: "Recepción", icon: "📋" },
  { key: "COCINA", label: "Cocina", icon: "🔥" },
  { key: "EMPAQUE", label: "Empaque", icon: "📦" },
  { key: "DESPACHO", label: "Despacho", icon: "🛵" },
  { key: "ENTREGADO", label: "Entregado", icon: "✅" },
];

/**
 * Banda de horno: visualiza el recorrido del pedido por las 5 etapas
 * definidas en el API_CONTRACT.md (stages: RECEPCION...ENTREGADO).
 *
 * @param {string} currentStatus - status actual del pedido
 * @param {Object} stages - objeto stages tal como lo devuelve el GET de la API
 */
export default function OrderTracker({ currentStatus, stages = {} }) {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-crust-950 rounded-2xl p-6 sm:p-8 overflow-hidden">
      <div className="relative">
        {/* Riel base */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-crust-800 rounded-full" />
        {/* Riel de progreso, "horneándose" hacia la derecha */}
        <div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-sauce-600 to-cheese-400 rounded-full transition-all duration-700 ease-out"
          style={{
            width:
              currentIndex >= 0
                ? `${(currentIndex / (STAGES.length - 1)) * 100}%`
                : "0%",
          }}
        />

        <ol className="relative flex justify-between">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const stageData = stages[stage.key];

            return (
              <li key={stage.key} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-500
                    ${isCurrent ? "bg-sauce-600 border-cheese-400 scale-110 shadow-lg shadow-sauce-600/30 animate-pulse" : ""}
                    ${isDone ? "bg-basil-700 border-basil-700" : ""}
                    ${!isDone && !isCurrent ? "bg-crust-800 border-crust-800" : ""}
                  `}
                  aria-hidden="true"
                >
                  {isDone ? "✓" : stage.icon}
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium text-center leading-tight
                    ${isCurrent ? "text-cheese-400" : ""}
                    ${isDone ? "text-dough-100/70" : ""}
                    ${!isDone && !isCurrent ? "text-dough-100/30" : ""}
                  `}
                >
                  {stage.label}
                </span>
                {stageData?.responsable && (isDone || isCurrent) && (
                  <span className="text-[10px] text-dough-100/40 font-mono text-center">
                    {stageData.responsable}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
