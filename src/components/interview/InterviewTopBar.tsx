import Logo from "../Logo"
import ThemeToggle from "../ThemeToggle"

type Role = "interviewer" | "interviewee"

type InterviewTopBarProps = {
  timer: string
  role: Role
  showSwapAlert: boolean
  onSwapRoles?: () => void
  onEndSession: () => void
}

export default function InterviewTopBar({
  timer,
  role,
  showSwapAlert,
  onSwapRoles,
  onEndSession,
}: InterviewTopBarProps) {
  const roleLabel = role === "interviewer" ? "Interviewer" : "Interviewee"

  return (
    <header className="shrink-0 border-b border-stroke bg-navbar">
      {showSwapAlert && (
        <div className="bg-amber-500/15 px-4 py-2 text-center text-sm font-medium text-warn">
          Roles swapping in 30s
        </div>
      )}
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4">
        <Logo />

        <div className="flex items-center gap-2 font-mono text-lg font-bold tabular-nums text-content sm:text-2xl">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {timer}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle className="h-9 w-9" />
          <span
            className={`hidden rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide sm:inline-flex sm:px-3 sm:py-1.5 ${
              role === "interviewer"
                ? "bg-violet-500/15 text-info ring-1 ring-violet-500/30"
                : "bg-emerald-500/15 text-brand ring-1 ring-emerald-500/30"
            }`}
          >
            Role: {roleLabel}
          </span>
          {role === "interviewer" && onSwapRoles && (
            <button
              type="button"
              onClick={onSwapRoles}
              className="rounded-lg bg-violet-500/15 px-2 py-1.5 text-xs font-semibold text-info ring-1 ring-violet-500/30 transition hover:bg-violet-500/25 sm:px-4 sm:py-2 sm:text-sm"
            >
              Swap
            </button>
          )}
          <button
            type="button"
            onClick={onEndSession}
            className="rounded-lg bg-red-500/15 px-2 py-1.5 text-xs font-semibold text-danger ring-1 ring-red-500/30 transition hover:bg-red-500/25 sm:px-4 sm:py-2 sm:text-sm"
          >
            End
          </button>
        </div>
      </div>
    </header>
  )
}
