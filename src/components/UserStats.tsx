import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import {
  computeProfileStats,
  computeTopicsPracticed,
  fetchUserSessions,
} from "../lib/sessions"

export default function UserStats() {
  const { user } = useAuth()
  const [totalSessions, setTotalSessions] = useState(0)
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [topics, setTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    async function load() {
      setLoading(true)
      try {
        const sessions = await fetchUserSessions(user.id)
        const stats = computeProfileStats(sessions)
        setTotalSessions(stats.totalSessions)
        setAverageRating(stats.averageRatingReceived)
        setTopics(computeTopicsPracticed(sessions))
      } catch (err) {
        console.error("[UserStats] Failed to load sessions:", err)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [user?.id])

  return (
    <section className="rounded-2xl border border-stroke bg-surface-card/80 p-6">
      <h2 className="text-lg font-semibold text-content">Your stats</h2>
      <p className="mt-1 text-sm text-content-muted">
        Track your interview practice progress
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-content-muted">Loading stats...</p>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stroke bg-surface-primary p-5">
              <p className="text-sm text-content-muted">Total sessions</p>
              <p className="mt-1 text-3xl font-bold text-content">
                {totalSessions}
              </p>
            </div>
            <div className="rounded-xl border border-stroke bg-surface-primary p-5">
              <p className="text-sm text-content-muted">Average rating</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <p className="text-3xl font-bold text-content">
                  {averageRating != null ? averageRating : "—"}
                </p>
                {averageRating != null && (
                  <>
                    <span className="text-sm text-content-muted">/ 5</span>
                    <span className="ml-1 text-warn">★</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-content-muted">Topics practiced</p>
            {topics.length === 0 ? (
              <p className="mt-3 text-sm text-content-muted">None yet</p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-brand"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
