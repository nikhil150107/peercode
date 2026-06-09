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
  "I'm a 3rd year Data Science student at MIT Academy of Engineering in Pune. When placement season started, I kept looking for mock interview practice that didn't cost money. Almost everything I found needed a subscription.",
  "That's why I built PeerCode. You book a slot, get matched with another student, solve DSA problems together, and swap interviewer and interviewee roles like a real interview. It's free, and I plan to keep it that way.",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              About PeerCode
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The Story Behind{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                PeerCode
              </span>
            </h1>
          </section>

          <section className="relative mt-14">
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/30 via-transparent to-emerald-900/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/60 p-8 backdrop-blur-sm sm:p-12">
              <div className="relative space-y-6">
                {storyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed text-zinc-300 ${
                      index === 0
                        ? "text-lg sm:text-xl"
                        : "text-base font-medium text-emerald-100/90 sm:text-lg"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16">
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Meet the founder
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl shadow-black/20 sm:p-10">
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-teal-500/20 blur-sm" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-emerald-500/15 text-4xl font-bold text-emerald-400 ring-2 ring-emerald-500/30">
                    NJ
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Nikhil Jatale
                  </h2>
                  <p className="mt-2 text-sm font-medium text-emerald-400">
                    MIT Academy of Engineering, Pune
                  </p>
                  <p className="text-sm text-zinc-500">Data Science Branch</p>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                    3rd year student who loves competitive programming and
                    building stuff that actually helps other students.
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
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition duration-200 group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      {link.logo}
                    </div>
                    <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-emerald-400">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Our Mission
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              I want every student to have access to real interview practice,
              whether or not they can pay for premium platforms. No paywalls, no
              subscriptions, just students helping students get better together.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
