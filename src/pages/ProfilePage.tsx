import { useEffect, useState, type ReactNode } from "react"
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

type PlatformKey = keyof ProfileLinks

const PLATFORMS: {
  key: PlatformKey
  label: string
  placeholder: string
  logo: ReactNode
}[] = [
  {
    key: "leetcode_username",
    label: "LeetCode",
    placeholder: "username",
    logo: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 object-contain dark:invert"
      />
    ),
  },
  {
    key: "codeforces_handle",
    label: "Codeforces",
    placeholder: "handle",
    logo: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={48}
        height={48}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-12 w-12"
      >
        <rect x="0" y="7.5" width="6" height="13.5" rx="1.5" fill="#F0A500" />
        <rect x="9" y="3" width="6" height="18" rx="1.5" fill="#1F8ACB" />
        <rect x="18" y="10.5" width="6" height="10.5" rx="1.5" fill="#E84444" />
      </svg>
    ),
  },
  {
    key: "codechef_username",
    label: "CodeChef",
    placeholder: "username",
    logo: (
      <img
        src="https://cdn.brandfetch.io/idM2-b7Taf/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX"
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 object-contain"
      />
    ),
  },
  {
    key: "gfg_username",
    label: "GeeksForGeeks",
    placeholder: "username",
    logo: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
        width={48}
        height={48}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 object-contain"
      />
    ),
  },
]

function PencilIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingLinks, setSavingLinks] = useState(false)
  const [editingProfiles, setEditingProfiles] = useState(false)
  const [links, setLinks] = useState<ProfileLinks>({
    leetcode_username: "",
    codeforces_handle: "",
    codechef_username: "",
    gfg_username: "",
  })

  const displayName = getUserDisplayName(user)
  const initials = getInitialsFromName(displayName)

  const savedPlatforms = PLATFORMS.filter(({ key }) => links[key]?.trim())
  const hasSavedLinks = savedPlatforms.length > 0

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
      setEditingProfiles(false)
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
            <h1 className="text-2xl font-bold text-content sm:text-3xl">
              {displayName}
            </h1>
            <p className="mt-1 text-content-muted">{user?.email}</p>
          </div>
        </div>

        <section className="mt-8">
          {editingProfiles ? (
            <div className="rounded-2xl border border-stroke bg-surface-card/80 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {PLATFORMS.map(({ key, label, placeholder }) => (
                  <label key={key} className="block">
                    <span className="mb-1.5 block text-sm font-medium text-content">
                      {label}
                    </span>
                    <input
                      type="text"
                      value={links[key] ?? ""}
                      onChange={(e) =>
                        setLinks((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      placeholder={placeholder}
                      className="w-full rounded-lg border border-stroke bg-surface-primary px-3 py-2 text-sm text-content outline-none focus:border-emerald-500/50"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleSaveLinks()}
                  disabled={savingLinks}
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
                >
                  {savingLinks ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProfiles(false)}
                  disabled={savingLinks}
                  className="rounded-lg px-4 py-2 text-sm text-content-muted transition hover:text-content disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : hasSavedLinks ? (
            <div>
              <div className="flex flex-wrap items-start gap-6">
                {savedPlatforms.map(({ key, label, logo }) => {
                  const value = links[key]!.trim()
                  return (
                    <div key={key} className="group relative flex flex-col items-center gap-3">
                      <a
                        href={profileLinkUrl(key, value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label}: ${value}`}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-stroke bg-surface-secondary transition duration-200 group-hover:border-emerald-500/60 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          {logo}
                        </div>
                        <span className="max-w-[5.5rem] truncate text-sm font-medium text-content-muted transition-colors group-hover:text-emerald-400">
                          {label}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setEditingProfiles(true)}
                        aria-label={`Edit ${label} profile`}
                        className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-stroke bg-surface-card text-content-muted shadow-sm transition hover:border-emerald-500/40 hover:text-emerald-400 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <PencilIcon />
                      </button>
                    </div>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => setEditingProfiles(true)}
                className="mt-4 text-sm text-content-muted transition hover:text-emerald-400"
              >
                Edit profiles
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditingProfiles(true)}
              className="rounded-xl border border-dashed border-stroke px-5 py-3 text-sm font-medium text-content-muted transition hover:border-emerald-500/40 hover:text-emerald-400"
            >
              + Add coding profiles
            </button>
          )}
        </section>

        {loading ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
            <div className="mt-10 space-y-4">
              <div className="h-6 w-40 animate-pulse rounded-lg bg-surface-hover/80" />
              <div className="h-4 w-64 animate-pulse rounded-lg bg-surface-hover/60" />
              <div className="overflow-hidden rounded-xl border border-stroke">
                <div className="space-y-3 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-lg bg-surface-hover/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-stroke bg-surface-card/80 p-5">
                <p className="text-sm text-content-muted">Total sessions</p>
                <p className="mt-1 text-3xl font-bold text-content">
                  {stats?.totalSessions ?? 0}
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-surface-card/80 p-5">
                <p className="text-sm text-content-muted">Average rating received</p>
                <p className="mt-1 text-3xl font-bold text-content">
                  {stats?.averageRatingReceived != null
                    ? stats.averageRatingReceived
                    : "—"}
                  {stats?.averageRatingReceived != null && (
                    <span className="ml-1 text-lg text-amber-400">★</span>
                  )}
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-surface-card/80 p-5">
                <p className="text-sm text-content-muted">Problems solved</p>
                <p className="mt-1 text-3xl font-bold text-content">
                  {stats?.problemsSolved ?? 0}
                </p>
                <p className="mt-1 text-xs text-content-muted">
                  as interviewee with all tests passed
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-surface-card/80 p-5">
                <p className="text-sm text-content-muted">Favorite topic</p>
                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {stats?.favoriteTopic ?? "—"}
                </p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content">
                Session history
              </h2>
              <p className="mt-1 text-sm text-content-muted">
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
