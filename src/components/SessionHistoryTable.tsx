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
      return "text-brand"
    case "Medium":
      return "text-warn"
    case "Hard":
      return "text-danger"
    default:
      return "text-content-muted"
  }
}

function getSessionRating(session: SessionRecord): number | null {
  if (session.rating_received != null && session.rating_received > 0) {
    return session.rating_received
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
      <div className="rounded-xl border border-stroke bg-surface-primary px-6 py-12 text-center text-sm text-content-muted">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stroke">
      <table className="w-full min-w-[540px] text-left text-sm">
        <thead>
          <tr className="border-b border-stroke bg-surface-secondary/80">
            <th className="px-4 py-3 font-medium text-content-muted">Date</th>
            <th className="px-4 py-3 font-medium text-content-muted">Question</th>
            <th className="px-4 py-3 font-medium text-content-muted">Difficulty</th>
            <th className="px-4 py-3 font-medium text-content-muted">Topic</th>
            <th className="px-4 py-3 font-medium text-content-muted">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            const rating = getSessionRating(session)

            return (
            <tr
              key={session.id}
              className="border-b border-stroke/80 bg-surface-primary/50 last:border-0"
            >
              <td className="px-4 py-3 text-content">
                {formatDate(session.completed_at)}
              </td>
              <td className="px-4 py-3 font-medium text-content">
                {session.question_title ?? "—"}
              </td>
              <td
                className={`px-4 py-3 font-medium ${difficultyClass(session.question_difficulty)}`}
              >
                {session.question_difficulty ?? "—"}
              </td>
              <td className="px-4 py-3 text-content">
                {session.question_topic ?? "—"}
              </td>
              <td className="px-4 py-3 text-content">
                {rating != null ? (
                  <span>
                    <span className="text-warn">★</span> {rating}/5
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
