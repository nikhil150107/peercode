import type { SessionRecord } from "../lib/sessions"

type SessionHistoryTableProps = {
  sessions: SessionRecord[]
  emptyMessage?: string
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso))
}

function difficultyClass(difficulty: string | null): string {
  switch (difficulty) {
    case "Easy":
      return "text-emerald-400"
    case "Medium":
      return "text-amber-400"
    case "Hard":
      return "text-red-400"
    default:
      return "text-zinc-400"
  }
}

function getSessionRating(session: SessionRecord): number | null {
  if (session.rating_received != null && session.rating_received > 0) {
    return session.rating_received
  }
  if (session.rating != null && session.rating > 0) {
    return session.rating
  }
  if (session.rating_given != null && session.rating_given > 0) {
    return session.rating_given
  }
  return null
}

export default function SessionHistoryTable({
  sessions,
  emptyMessage = "No sessions yet. Book a slot and complete your first interview!",
}: SessionHistoryTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-12 text-center text-sm text-zinc-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full min-w-[540px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="px-4 py-3 font-medium text-zinc-500">Date</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Question</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Difficulty</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Topic</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const rating = getSessionRating(session)

            return (
            <tr
              key={session.id}
              className="border-b border-zinc-800/80 bg-zinc-950/50 last:border-0"
            >
              <td className="px-4 py-3 text-zinc-300">
                {formatDate(session.completed_at)}
              </td>
              <td className="px-4 py-3 font-medium text-white">
                {session.question_title ?? "—"}
              </td>
              <td
                className={`px-4 py-3 font-medium ${difficultyClass(session.question_difficulty)}`}
              >
                {session.question_difficulty ?? "—"}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {session.question_topic ?? "—"}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {rating != null ? (
                  <span>
                    <span className="text-amber-400">★</span> {rating}/5
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
