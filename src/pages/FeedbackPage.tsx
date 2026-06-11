import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import StarRating from "../components/StarRating"
import { useToast } from "../context/ToastContext"
import { submitSessionFeedback } from "../lib/sessions"
import { getPeerDisplayLabel, getStoredPeerEmail } from "../utils/userDisplay"

const peerTraits = [
  "Clear communication",
  "Good hints",
  "Respectful",
  "On time",
] as const

const struggleTopics = [
  "Arrays",
  "Trees",
  "DP",
  "Graphs",
  "Strings",
  "Heaps",
]

export default function FeedbackPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const lastQuestion =
    localStorage.getItem("peercode_last_question") ?? "Practice problem"
  const storedPeerEmail = getStoredPeerEmail()
  const peerName = getPeerDisplayLabel(storedPeerEmail)
  const userRole =
    localStorage.getItem("peercode_user_role") ?? "interviewee"

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [peerRating, setPeerRating] = useState(0)
  const [peerTraitsChecked, setPeerTraitsChecked] = useState<
    Record<string, boolean>
  >({})
  const [peerFeedback, setPeerFeedback] = useState("")

  const [selfRating, setSelfRating] = useState(0)
  const [struggleTopic, setStruggleTopic] = useState(struggleTopics[0])

  useEffect(() => {
    if (!submitted) return

    const timer = setTimeout(() => navigate("/dashboard"), 3000)
    return () => clearTimeout(timer)
  }, [submitted, navigate])

  function toggleTrait(trait: string) {
    setPeerTraitsChecked((prev) => ({ ...prev, [trait]: !prev[trait] }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    const sessionId = localStorage.getItem("peercode_session_id")
    const roomId =
      localStorage.getItem("peercode_room_id") ??
      localStorage.getItem("peercode_roomId")
    const peerId = localStorage.getItem("peercode_peer_id")

    const feedbackTags = peerTraits.filter((trait) => peerTraitsChecked[trait])

    console.log("[feedback] submitting rating:", {
      sessionId,
      rating: peerRating,
      tags: feedbackTags,
      peerId,
      roomId,
    })

    if (!sessionId) {
      console.warn("[feedback] missing peercode_session_id — was session saved?")
    }

    if (sessionId && peerRating > 0) {
      try {
        await submitSessionFeedback({
          sessionId,
          roomId: roomId ?? "",
          peerId,
          ratingGiven: peerRating,
          feedbackTags,
        })
        showToast("Rating submitted", "success")
      } catch (err) {
        console.error("[feedback] Failed to save ratings:", err)
        const message =
          err instanceof Error ? err.message : "Failed to save feedback"
        setSubmitError(message)
        showToast(message, "error")
        setSubmitting(false)
        return
      }
    }

    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-zinc-100">
        <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-zinc-900/50 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-2 ring-emerald-500/30">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-white">
            Thanks! See you next session 🚀
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Redirecting to dashboard...
          </p>
          <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full animate-pulse rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <Logo />
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Session Complete! 🎉
          </h1>
          <p className="mt-2 text-zinc-400">
            Great work — take a moment to reflect on your session.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Session summary
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">
                Problem you were interviewed on
              </p>
              <p className="mt-1 font-semibold text-white">{lastQuestion}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">Duration</p>
              <p className="mt-1 font-mono font-semibold text-white">2:00:00</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">Your role</p>
              <p
                className={`mt-1 font-semibold capitalize ${
                  userRole === "interviewer"
                    ? "text-violet-400"
                    : "text-emerald-400"
                }`}
              >
                {userRole}
              </p>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {submitError}
          </div>
        )}

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-8">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">
              Rate your peer
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              How was {peerName} as your peer?
            </p>

            <div className="mt-5">
              <StarRating value={peerRating} onChange={setPeerRating} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {peerTraits.map((trait) => (
                <label
                  key={trait}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 transition hover:border-zinc-700"
                >
                  <input
                    type="checkbox"
                    checked={!!peerTraitsChecked[trait]}
                    onChange={() => toggleTrait(trait)}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/30"
                  />
                  <span className="text-sm text-zinc-300">{trait}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <label
                htmlFor="peer-feedback"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Any additional feedback?
              </label>
              <textarea
                id="peer-feedback"
                value={peerFeedback}
                onChange={(e) => setPeerFeedback(e.target.value)}
                rows={3}
                placeholder="Share anything that would help them improve..."
                className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">Rate yourself</h2>
            <p className="mt-1 text-sm text-zinc-400">How did you perform?</p>

            <div className="mt-5">
              <StarRating value={selfRating} onChange={setSelfRating} />
            </div>

            <div className="mt-6">
              <label
                htmlFor="struggle-topic"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                What topic did you struggle with?
              </label>
              <select
                id="struggle-topic"
                value={struggleTopic}
                onChange={(e) => setStruggleTopic(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-emerald-500/50"
              >
                {struggleTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <Link
              to="/dashboard"
              className="rounded-xl border border-zinc-700 px-8 py-3 text-center text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
