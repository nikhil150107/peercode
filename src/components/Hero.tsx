import { Link } from "react-router-dom"
import HeroIllustration from "./HeroIllustration"

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-brand">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            100% free — no credit card required
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-content sm:text-5xl lg:text-6xl">
            Practice DSA Interviews with{" "}
            <span className="text-gradient-brand">
              Real Peers
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-content-muted sm:text-xl">
            Book a slot, get matched, swap roles. The free alternative to
            expensive mock interview platforms.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/signup"
              className="w-full rounded-xl bg-emerald-500 px-8 py-3.5 text-center text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 sm:w-auto"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="w-full rounded-xl border border-stroke px-8 py-3.5 text-center text-base font-medium text-content transition hover:border-stroke hover:text-content sm:w-auto"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="lg:pl-4">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}
