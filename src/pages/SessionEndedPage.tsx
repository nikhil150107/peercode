import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import ThemeToggle from "../components/ThemeToggle"

export default function SessionEndedPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-surface-primary px-6 text-content">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-stroke bg-surface-card/80 p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-hover text-3xl">
          ⏹
        </div>
        <h1 className="text-2xl font-bold text-content">Session has ended</h1>
        <p className="mt-3 text-sm leading-relaxed text-content-muted">
          This interview room was closed by one of the participants. You can no
          longer rejoin this session.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
