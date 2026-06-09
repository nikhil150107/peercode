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

function roleClass(role: string | null): string {
  return role === "interviewer"
    ? "text-violet-400"
    : "text-emerald-400"
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
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="px-4 py-3 font-medium text-zinc-500">Date</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Question</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Difficulty</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Topic</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Role</th>
            <th className="px-4 py-3 font-medium text-zinc-500">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
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
              <td
                className={`px-4 py-3 capitalize ${roleClass(session.user_role)}`}
              >
                {session.user_role ?? "—"}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {session.rating_received != null ? (
                  <span>
                    <span className="text-amber-400">★</span>{" "}
                    {session.rating_received}/5 received
                  </span>
                ) : session.rating_given != null ? (
                  <span>
                    <span className="text-amber-400">★</span>{" "}
                    {session.rating_given}/5 given
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
