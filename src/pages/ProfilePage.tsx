import { useEffect, useState } from "react"
import SessionHistoryTable from "../components/SessionHistoryTable"
import { StatCardSkeleton } from "../components/Skeleton"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import {
  fetchUserProfile,
  profileLinkUrl,
  upsertProfileLinks,
  type ProfileLinks,
} from "../lib/profile"
import {
  computeProfileStats,
  fetchUserSessions,
  type ProfileStats,
  type SessionRecord,
} from "../lib/sessions"
import { getInitialsFromName, getUserDisplayName } from "../utils/userDisplay"

const PLATFORM_FIELDS: {
  key: keyof ProfileLinks
  label: string
  placeholder: string
}[] = [
  {
    key: "leetcode_username",
    label: "LeetCode",
    placeholder: "username",
  },
  {
    key: "codeforces_handle",
    label: "Codeforces",
    placeholder: "handle",
  },
  {
    key: "codechef_username",
    label: "CodeChef",
    placeholder: "username",
  },
  {
    key: "gfg_username",
    label: "GeeksForGeeks",
    placeholder: "username",
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingLinks, setSavingLinks] = useState(false)
  const [links, setLinks] = useState<ProfileLinks>({
    leetcode_username: "",
    codeforces_handle: "",
    codechef_username: "",
    gfg_username: "",
  })

  const displayName = getUserDisplayName(user)
  const initials = getInitialsFromName(displayName)

  useEffect(() => {
    if (!user?.id) return

    async function load() {
      setLoading(true)
      try {
        const [data, profile] = await Promise.all([
          fetchUserSessions(user.id),
          fetchUserProfile(user.id),
        ])
        setSessions(data)
        setStats(computeProfileStats(data))
        if (profile) {
          setLinks({
            leetcode_username: profile.leetcode_username ?? "",
            codeforces_handle: profile.codeforces_handle ?? "",
            codechef_username: profile.codechef_username ?? "",
            gfg_username: profile.gfg_username ?? "",
          })
        }
      } catch (err) {
        console.error("[profile] Failed to load sessions:", err)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [user?.id])

  async function handleSaveLinks() {
    if (!user?.id) return
    setSavingLinks(true)
    try {
      await upsertProfileLinks(user.id, user.email, links)
      showToast("Profile links saved", "success")
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to save profile links",
        "error",
      )
    } finally {
      setSavingLinks(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl font-bold text-emerald-400 ring-2 ring-emerald-500/30">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {displayName}
            </h1>
            <p className="mt-1 text-zinc-400">{user?.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLATFORM_FIELDS.map(({ key, label }) => {
                const value = links[key]?.trim()
                if (!value) return null
                return (
                  <a
                    key={key}
                    href={profileLinkUrl(key, value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${label}: ${value}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-bold text-emerald-400 transition hover:border-emerald-500/40 hover:bg-emerald-500/10"
                  >
                    {label.slice(0, 2).toUpperCase()}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="text-lg font-semibold text-white">
            Competitive programming profiles
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Add your handles to show clickable profile links.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {PLATFORM_FIELDS.map(({ key, label, placeholder }) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                  {label}
                </span>
                <input
                  type="text"
                  value={links[key] ?? ""}
                  onChange={(e) =>
                    setLinks((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void handleSaveLinks()}
            disabled={savingLinks}
            className="mt-5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
          >
            {savingLinks ? "Saving..." : "Save profile links"}
          </button>
        </section>

        {loading ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
            <div className="mt-10 space-y-4">
              <div className="h-6 w-40 animate-pulse rounded-lg bg-zinc-800/80" />
              <div className="h-4 w-64 animate-pulse rounded-lg bg-zinc-800/60" />
              <div className="overflow-hidden rounded-xl border border-zinc-800">
                <div className="space-y-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-lg bg-zinc-800/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-500">Total sessions</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {stats?.totalSessions ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-500">Average rating received</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {stats?.averageRatingReceived != null
                    ? stats.averageRatingReceived
                    : "—"}
                  {stats?.averageRatingReceived != null && (
                    <span className="ml-1 text-lg text-amber-400">★</span>
                  )}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-500">Problems solved</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {stats?.problemsSolved ?? 0}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  as interviewee with all tests passed
                </p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-500">Favorite topic</p>
                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {stats?.favoriteTopic ?? "—"}
                </p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-lg font-semibold text-white">
                Session history
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Your completed mock interviews, most recent first.
              </p>
              <div className="mt-4 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <SessionHistoryTable sessions={sessions} />
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
