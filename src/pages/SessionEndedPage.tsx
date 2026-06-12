import { Link } from "react-router-dom"
import Logo from "../components/Logo"

export default function SessionEndedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-3xl">
          ⏹
        </div>
        <h1 className="text-2xl font-bold text-white">Session has ended</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
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
