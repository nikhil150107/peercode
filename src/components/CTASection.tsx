import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <section className="border-t border-stroke/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-surface-secondary/80 to-surface-primary px-8 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
              Ready to practice?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-content-muted">
              Sign up, book a slot, get matched. Still free.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block rounded-xl bg-emerald-500 px-10 py-3.5 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
