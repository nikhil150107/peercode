import { useToast } from "../context/ToastContext"

const typeStyles = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
  info: "border-zinc-700 bg-zinc-900 text-zinc-200",
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg shadow-black/30 ${typeStyles[toast.type]}`}
        >
          <div className="flex items-start justify-between gap-3">
            <p>{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-zinc-500 transition hover:text-zinc-300"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
