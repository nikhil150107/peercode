import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikhil150107/",
    logo: (
      <img
        src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linkedin.svg"
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
      />
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/nikhil_mit/",
    logo: (
      <img
        src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/leetcode.svg"
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/invictus_07",
    logo: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={48}
        height={48}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="0" y="7.5" width="6" height="13.5" rx="1.5" fill="#F0A500" />
        <rect x="9" y="3" width="6" height="18" rx="1.5" fill="#1F8ACB" />
        <rect x="18" y="10.5" width="6" height="10.5" rx="1.5" fill="#E84444" />
      </svg>
    ),
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/nikhil_mit",
    logo: (
      <img
        src="https://cdn.brandfetch.io/idM2-b7Taf/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1775525452076"
        width={48}
        height={48}
        style={{ objectFit: "contain" }}
        alt=""
        aria-hidden="true"
      />
    ),
  },
]

const storyParagraphs = [
  "I'm Nikhil, 3rd year Data Science at MIT Academy of Engineering in Pune. When placement prep started, I wanted mock interviews that didn't cost money. Everything useful seemed to need a subscription.",
  "So I built PeerCode. You book a slot, get matched with another student, solve problems together on video, and swap interviewer/interviewee roles like a real interview. It's free and I want to keep it that way.",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />

      <main className="relative overflow-hidden pb-20 pt-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-[300px] w-[400px] rounded-full bg-emerald-600/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          <section className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              About PeerCode
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-content sm:text-5xl lg:text-6xl">
              Why I built{" "}
              <span className="text-gradient-brand">
                PeerCode
              </span>
            </h1>
          </section>

          <section className="relative mt-14">
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/30 via-transparent to-emerald-900/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-surface-secondary/60 p-8 backdrop-blur-sm sm:p-12">
              <div className="relative space-y-6">
                {storyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed text-content ${
                      index === 0
                        ? "text-lg sm:text-xl"
                        : "text-base font-medium text-brand-soft sm:text-lg"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16">
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-content-muted">
              Who built this
            </p>
            <div className="rounded-3xl border border-stroke bg-surface-card/80 p-8 shadow-xl shadow-black/20 sm:p-10">
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-teal-500/20 blur-sm" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-emerald-500/15 text-4xl font-bold text-brand ring-2 ring-emerald-500/30">
                    NJ
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-content sm:text-3xl">
                    Nikhil Jatale
                  </h2>
                  <p className="mt-2 text-sm font-medium text-brand">
                    MIT Academy of Engineering, Pune
                  </p>
                  <p className="text-sm text-content-muted">Data Science Branch</p>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-content-muted sm:text-base">
                    Competitive programming nerd who builds things that help
                    other students prep for placements.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-start justify-center gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-stroke bg-surface-secondary transition duration-200 group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      {link.logo}
                    </div>
                    <span className="text-sm font-medium text-content-muted transition-colors group-hover:text-brand">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-stroke/80 bg-gradient-to-b from-surface-secondary/40 to-surface-primary p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Why it exists
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-content sm:text-xl">
              Interview prep shouldn&apos;t depend on how much you can spend.
              PeerCode is students practicing with students, for free.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
