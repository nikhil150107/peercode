import type { CodeDiffSummary } from "../../utils/codeDiff"

export type CodeHistoryEntry = {
  id: string
  author: "You" | "Peer"
  timestamp: number
  language: string
  diff: CodeDiffSummary
}

type CodeHistoryPanelProps = {
  entries: CodeHistoryEntry[]
  open: boolean
  onToggle: () => void
}

function formatTime(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ts))
}

export default function CodeHistoryPanel({
  entries,
  open,
  onToggle,
}: CodeHistoryPanelProps) {
  return (
    <div className="shrink-0 border-t border-zinc-800 bg-zinc-900/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-zinc-300"
      >
        <span>Activity log ({entries.length})</span>
        <svg
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="max-h-36 space-y-2 overflow-y-auto border-t border-zinc-800 px-4 py-3">
          {entries.length === 0 ? (
            <p className="text-xs text-zinc-600">No edits recorded yet.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={
                      entry.author === "You"
                        ? "font-medium text-emerald-400"
                        : "font-medium text-violet-400"
                    }
                  >
                    {entry.author}
                  </span>
                  <span className="text-zinc-600">{formatTime(entry.timestamp)}</span>
                </div>
                <p className="mt-1 text-zinc-500">
                  {entry.language} ·{" "}
                  <span className="text-emerald-400/80">+{entry.diff.added}</span>{" "}
                  <span className="text-red-400/80">−{entry.diff.removed}</span> lines
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
