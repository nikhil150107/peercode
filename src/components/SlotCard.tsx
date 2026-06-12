import type { TimeSlot } from "../data/slots"
import { getSlotStatus } from "../data/slots"

const statusConfig = {
  available: {
    label: "Available",
    badge: " bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  },
  "filling-fast": {
    label: "Filling Fast",
    badge: " bg-amber-500/10 text-amber-400 ring-amber-500/20",
  },
  full: {
    label: "Full",
    badge: " bg-red-500/10 text-red-400 ring-red-500/20",
  },
} as const

type SlotCardProps = {
  slot: TimeSlot
  dateLabel: string
  bookedCount: number
  onBook: (slotId: string) => void | Promise<void>
  isBooking?: boolean
  isBooked?: boolean
  isExpired?: boolean
  isClosingSoon?: boolean
}

export default function SlotCard({
  slot,
  dateLabel,
  bookedCount,
  onBook,
  isBooking,
  isBooked,
  isExpired,
  isClosingSoon,
}: SlotCardProps) {
  const status = getSlotStatus(bookedCount, slot.capacity)
  const config = statusConfig[status]
  const isFull = status === "full"
  const isUnavailable = isFull || isExpired || isClosingSoon

  return (
    <div className="flex flex-col rounded-2xl border border-stroke bg-surface-card/80 p-6 transition hover:border-stroke">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
            {dateLabel} · IST
          </p>
          <p className="mt-1 text-2xl font-bold text-content">{slot.time}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
            isExpired
              ? " bg-surface-hover text-content-muted ring-stroke"
              : isClosingSoon
                ? " bg-amber-500/10 text-amber-400 ring-amber-500/20"
                : config.badge
          }`}
        >
          {isExpired ? "Expired" : isClosingSoon ? "Closing soon" : config.label}
        </span>
      </div>

      <div className="mb-6 flex items-center gap-2 text-sm text-content-muted">
        <svg
          className="h-4 w-4 text-content-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>
          <span className="font-medium text-content">{bookedCount}</span>{" "}
          booked
        </span>
      </div>

      <div className="mt-auto">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-surface-hover">
          <div
            className={`h-full rounded-full transition-all ${
              isExpired
                ? " bg-content-muted/40"
                : isClosingSoon
                  ? " bg-amber-500"
                  : isFull
                    ? " bg-red-500"
                    : status === "filling-fast"
                      ? " bg-amber-500"
                      : " bg-emerald-500"
            }`}
            style={{
              width: `${Math.min((bookedCount / slot.capacity) * 100, 100)}%`,
            }}
          />
        </div>
        <button
          type="button"
          disabled={isUnavailable || isBooking || isBooked}
          onClick={() => onBook(slot.id)}
          className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${
            isBooked
              ? "cursor-default bg-surface-hover text-emerald-400"
              : isExpired || isClosingSoon
                ? "cursor-not-allowed bg-surface-hover text-content-muted"
                : isFull || isBooking
                  ? "cursor-not-allowed bg-surface-hover text-content-muted"
                  : " bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
          }`}
        >
          {isBooked
            ? "Booked"
            : isExpired
              ? "Expired"
              : isClosingSoon
                ? "Closing soon"
                : isFull
                  ? "Slot Full"
                  : isBooking
                    ? "Booking..."
                    : "Book This Slot"}
        </button>
      </div>
    </div>
  )
}
