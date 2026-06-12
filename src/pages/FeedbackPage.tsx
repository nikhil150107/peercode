import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import ThemeToggle from "../components/ThemeToggle"
import StarRating from "../components/StarRating"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"
import {
  lookupPeerIdByEmail,
  submitSessionFeedback,
} from "../lib/sessions"
import { getPeerDisplayLabel, getStoredPeerEmail } from "../utils/userDisplay"
import { downloadReviewCard } from "../utils/downloadReviewCard"

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

const SESSION_SECONDS = 120 * 60

export default function FeedbackPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
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
  const [downloadingCard, setDownloadingCard] = useState(false)

  useEffect(() => {
    if (!submitted) return

    const timer = setTimeout(() => navigate("/dashboard"), 3000)
    return () => clearTimeout(timer)
  }, [submitted, navigate])

  function toggleTrait(trait: string) {
    setPeerTraitsChecked((prev) => ({ ...prev, [trait]: !prev[trait] }))
  }

  async function handleDownloadReviewCard() {
    setDownloadingCard(true)
    try {
      const feedbackTags = peerTraits.filter((trait) => peerTraitsChecked[trait])
      const questionDifficulty =
        localStorage.getItem("peercode_my_question_difficulty") ?? "—"
      const durationSeconds = Number(
        localStorage.getItem("peercode_session_duration") ?? SESSION_SECONDS,
      )
      const durationMinutes = Math.floor(durationSeconds / 60)
      const durationLabel = `${Math.floor(durationMinutes / 60)}:${String(durationMinutes % 60).padStart(2, "0")}:00`

      await downloadReviewCard({
        sessionDate: new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        duration: durationLabel,
        questionTitle: lastQuestion,
        questionDifficulty,
        userRole,
        ratingReceived:
          peerRating > 0 ? `${peerRating} / 5 stars to peer` : "Not rated",
        feedbackTags,
        writtenFeedback: peerFeedback,
        selfRating: selfRating > 0 ? `${selfRating} / 5` : "Not rated",
      })
    } catch (err) {
      console.error("[feedback] review card download failed:", err)
      showToast("Failed to download review card", "error")
    } finally {
      setDownloadingCard(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    const sessionId = localStorage.getItem("peercode_session_id")
    const roomId =
      localStorage.getItem("peercode_room_id") ??
      localStorage.getItem("peercode_roomId")
    let peerId = localStorage.getItem("peercode_peer_id")

    if (!peerId && storedPeerEmail) {
      try {
        peerId = await lookupPeerIdByEmail(storedPeerEmail)
        if (peerId) {
          localStorage.setItem("peercode_peer_id", peerId)
        }
      } catch (err) {
        console.error("[feedback] Peer lookup failed:", err)
      }
    }

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
          raterUserId: user?.id,
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-primary px-6 text-content">
        <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-surface-card/80 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-2 ring-emerald-500/30">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-content">
            Thanks! See you next session 🚀
          </h1>
          <p className="mt-3 text-sm text-content-muted">
            Redirecting to dashboard...
          </p>
          <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-surface-hover">
            <div className="h-full animate-pulse rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <header className="border-b border-stroke/80 bg-navbar backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Logo />
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-content sm:text-4xl">
            Session Complete! 🎉
          </h1>
          <p className="mt-2 text-content-muted">
            Great work — take a moment to reflect on your session.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-stroke bg-surface-card/80 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-content-muted">
            Session summary
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stroke bg-surface-primary p-4">
              <p className="text-xs text-content-muted">
                Problem you were interviewed on
              </p>
              <p className="mt-1 font-semibold text-content">{lastQuestion}</p>
            </div>
            <div className="rounded-xl border border-stroke bg-surface-primary p-4">
              <p className="text-xs text-content-muted">Duration</p>
              <p className="mt-1 font-mono font-semibold text-content">2:00:00</p>
            </div>
            <div className="rounded-xl border border-stroke bg-surface-primary p-4">
              <p className="text-xs text-content-muted">Your role</p>
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
          <section className="rounded-2xl border border-stroke bg-surface-card/80 p-6">
            <h2 className="text-lg font-semibold text-content">
              Rate your peer
            </h2>
            <p className="mt-1 text-sm text-content-muted">
              How was {peerName} as your peer?
            </p>

            <div className="mt-5">
              <StarRating value={peerRating} onChange={setPeerRating} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {peerTraits.map((trait) => (
                <label
                  key={trait}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-stroke bg-surface-primary px-4 py-3 transition hover:border-stroke"
                >
                  <input
                    type="checkbox"
                    checked={!!peerTraitsChecked[trait]}
                    onChange={() => toggleTrait(trait)}
                    className="h-4 w-4 rounded border-stroke bg-surface-secondary text-emerald-500 focus:ring-emerald-500/30"
                  />
                  <span className="text-sm text-content">{trait}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <label
                htmlFor="peer-feedback"
                className="mb-1.5 block text-sm font-medium text-content"
              >
                Any additional feedback?
              </label>
              <textarea
                id="peer-feedback"
                value={peerFeedback}
                onChange={(e) => setPeerFeedback(e.target.value)}
                rows={3}
                placeholder="Share anything that would help them improve..."
                className="w-full resize-none rounded-lg border border-stroke bg-surface-primary px-4 py-3 text-sm text-content placeholder:text-content-muted outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-stroke bg-surface-card/80 p-6">
            <h2 className="text-lg font-semibold text-content">Rate yourself</h2>
            <p className="mt-1 text-sm text-content-muted">How did you perform?</p>

            <div className="mt-5">
              <StarRating value={selfRating} onChange={setSelfRating} />
            </div>

            <div className="mt-6">
              <label
                htmlFor="struggle-topic"
                className="mb-1.5 block text-sm font-medium text-content"
              >
                What topic did you struggle with?
              </label>
              <select
                id="struggle-topic"
                value={struggleTopic}
                onChange={(e) => setStruggleTopic(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content outline-none focus:border-emerald-500/50"
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
            <button
              type="button"
              onClick={() => void handleDownloadReviewCard()}
              disabled={downloadingCard}
              className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-8 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-60"
            >
              {downloadingCard ? "Generating..." : "Download Review Card"}
            </button>
            <Link
              to="/dashboard"
              className="rounded-xl border border-stroke px-8 py-3 text-center text-sm font-medium text-content transition hover:border-stroke hover:text-content"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
