import { useEffect, useState } from "react"
import SessionHistoryTable from "../components/SessionHistoryTable"
import { useAuth } from "../context/AuthContext"
import { fetchUserSessions, type SessionRecord } from "../lib/sessions"

export default function SessionsPage() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return

    async function load() {
      setLoading(true)
      try {
        const data = await fetchUserSessions(user.id)
        setSessions(data)
      } catch (err) {
        console.error("[sessions] Failed to load:", err)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [user?.id])

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">My Sessions</h1>
        <p className="mt-2 text-zinc-400">
          View your past mock interview sessions and ratings.
        </p>

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-zinc-500">Loading sessions...</p>
          ) : (
            <SessionHistoryTable sessions={sessions} />
          )}
        </div>
      </div>
    </div>
  )
}
