import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-16 pb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-content sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-content-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
        >
          Back to home
        </Link>
      </main>
    </div>
  )
}
