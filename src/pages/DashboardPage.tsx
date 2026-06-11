import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SlotCard from "../components/SlotCard"
import { SlotCardSkeleton } from "../components/Skeleton"
import UserStats from "../components/UserStats"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { getSlotById, getSlotByTime } from "../data/slots"
import {
  cancelBooking,
  createSlotBooking,
  fetchPeerEmail,
  fetchSlotBookingCounts,
  fetchUserBookings,
  getBookingErrorMessage,
  sendBookingConfirmationEmail,
  type SlotBooking,
} from "../lib/bookings"
import {
  requestNotificationPermission,
  scheduleSlotReminder,
} from "../lib/notifications"
import {
  getDifficultyPreference,
  setDifficultyPreference,
  type DifficultyPreference,
} from "../utils/difficultyPreference"
import {
  getTopicPreference,
  setTopicPreference,
  type TopicPreference,
} from "../utils/topicPreference"
import {
  formatISTDateLabel,
  getTodayISTDate,
  getTomorrowISTDate,
} from "../utils/date"
import {
  computeSessionStart,
  formatCountdownHuman,
  getSlotsForDate,
  isSlotExpired,
  isSlotPast,
} from "../utils/sessionTime"
import {
  getDisplayNameFromEmail,
  getUserDisplayName,
} from "../utils/userDisplay"

type DayTab = "today" | "tomorrow"

const difficultyOptions: { value: DifficultyPreference; label: string }[] = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
  { value: "Random", label: "Random" },
]

const topicOptions: { value: TopicPreference; label: string }[] = [
  { value: "Any", label: "Any" },
  { value: "Arrays", label: "Arrays" },
  { value: "Strings", label: "Strings" },
  { value: "Trees", label: "Trees" },
  { value: "Graphs", label: "Graphs" },
  { value: "DP", label: "Dynamic Programming" },
  { value: "Linked Lists", label: "Linked Lists" },
]

function getDateForTab(tab: DayTab): string {
  return tab === "today" ? getTodayISTDate() : getTomorrowISTDate()
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()
  const displayName = getUserDisplayName(user) || "there"

  const [activeTab, setActiveTab] = useState<DayTab>("today")
  const [difficulty, setDifficulty] = useState<DifficultyPreference>(
    getDifficultyPreference,
  )
  const [topic, setTopic] = useState<TopicPreference>(getTopicPreference)
  const [bookings, setBookings] = useState<SlotBooking[]>([])
  const [bookingSlotId, setBookingSlotId] = useState<string | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [countdown, setCountdown] = useState("")
  const [peerEmail, setPeerEmail] = useState<string | null>(null)
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({})
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [, setSlotTimeTick] = useState(0)

  const selectedDate = getDateForTab(activeTab)
  const visibleSlots = getSlotsForDate(selectedDate)
  const activeBooking = bookings.find(
    (b) =>
      b.slot_date === selectedDate &&
      !isSlotPast(b.slot_time, b.slot_date),
  )
  const matchedBooking = bookings.find(
    (b) =>
      b.status === "matched" &&
      b.room_id &&
      !isSlotExpired(b.slot_time, b.slot_date),
  )

  async function loadSlotCounts(date: string) {
    setSlotsLoading(true)
    try {
      const counts = await fetchSlotBookingCounts(date)
      setSlotCounts(counts)
    } catch (err) {
      console.error("[dashboard] Failed to load slot counts:", err)
      showToast("Failed to load slot availability", "error")
    } finally {
      setSlotsLoading(false)
    }
  }

  async function loadBookings() {
    if (!user?.id) return
    const data = await fetchUserBookings(user.id)
    setBookings(data)

    const matched = data.find((b) => b.status === "matched" && b.matched_with)
    if (matched?.matched_with) {
      const email = await fetchPeerEmail(matched.matched_with)
      setPeerEmail(email)
    } else {
      setPeerEmail(null)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setSlotTimeTick((t) => t + 1), 60_000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    void loadBookings()
  }, [user?.id])

  useEffect(() => {
    async function setupReminders() {
      await requestNotificationPermission()

      for (const booking of bookings) {
        if (
          (booking.status === "pending" || booking.status === "matched") &&
          !isSlotPast(booking.slot_time, booking.slot_date)
        ) {
          scheduleSlotReminder(
            booking.slot_time,
            booking.id,
            booking.slot_date,
          )
        }
      }
    }

    void setupReminders()
  }, [bookings])

  useEffect(() => {
    void loadSlotCounts(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (!user?.id) return
    const interval = setInterval(() => {
      void loadBookings()
      void loadSlotCounts(selectedDate)
    }, 15_000)
    return () => clearInterval(interval)
  }, [user?.id, selectedDate])

  useEffect(() => {
    const booking = activeBooking ?? matchedBooking
    if (!booking) {
      setCountdown("")
      return
    }

    function tick() {
      const start = computeSessionStart(booking!.slot_time, booking!.slot_date)
      setCountdown(formatCountdownHuman(start.getTime() - Date.now()))
    }

    tick()
    const interval = setInterval(tick, 30_000)
    return () => clearInterval(interval)
  }, [activeBooking, matchedBooking])

  function handleDifficultyChange(pref: DifficultyPreference) {
    setDifficulty(pref)
    setDifficultyPreference(pref)
  }

  function handleTopicChange(pref: TopicPreference) {
    setTopic(pref)
    setTopicPreference(pref)
  }

  async function handleBook(slotId: string) {
    if (!user) return

    const slot = getSlotById(slotId)
    const slotDate = getDateForTab(activeTab)

    if (isSlotPast(slot.time, slotDate)) {
      showToast("This slot has already passed", "error")
      return
    }

    setBookingSlotId(slotId)

    try {
      await createSlotBooking(user.id, slot.time, slotDate)
      await loadBookings()
      await loadSlotCounts(slotDate)

      if (user.email) {
        void sendBookingConfirmationEmail(
          user.email,
          slot.time,
          slotDate,
          slot.id,
        )
      }

      showToast("Slot booked successfully", "success")
    } catch (err) {
      console.error("[dashboard] handleBook failed:", err)
      showToast(getBookingErrorMessage(err), "error")
    } finally {
      setBookingSlotId(null)
    }
  }

  async function handleCancelBooking(booking: SlotBooking) {
    setCancellingId(booking.id)

    try {
      await cancelBooking(booking.id)
      await loadBookings()
      await loadSlotCounts(booking.slot_date)
      setCancelConfirmId(null)
      showToast("Booking cancelled", "success")
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to cancel booking",
        "error",
      )
    } finally {
      setCancellingId(null)
    }
  }

  function getBookedSlotIdForDate(date: string): string | undefined {
    const booking = bookings.find((b) => b.slot_date === date)
    if (!booking) return undefined
    return getSlotByTime(booking.slot_time)?.id
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Hey {displayName}, ready to practice?
          </h1>
          <p className="mt-2 text-zinc-400">
            Book a slot for today or tomorrow. Matching happens at the
            scheduled time.
          </p>
        </div>

        {matchedBooking?.room_id && (
          <div className="mb-6 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-4">
            <p className="text-sm font-semibold text-violet-300">
              Match found!
            </p>
            <p className="mt-1 text-sm text-zinc-300">
              {matchedBooking.slot_time} ·{" "}
              {formatISTDateLabel(matchedBooking.slot_date)}
              {peerEmail ? ` · paired with ${getDisplayNameFromEmail(peerEmail)}` : ""}
            </p>
            <Link
              to={`/interview?room=${matchedBooking.room_id}`}
              className="mt-4 inline-block rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Join Room
            </Link>
          </div>
        )}

        {activeBooking?.status === "pending" && (
          <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
            <p className="text-sm text-zinc-400">Your upcoming session</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {activeBooking.slot_time} · {formatISTDateLabel(activeBooking.slot_date)}
            </p>
            {countdown && (
              <p className="mt-2 text-sm text-emerald-400">
                Starts in <span className="font-mono font-semibold">{countdown}</span>
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const slot = visibleSlots.find(
                    (s) => s.time === activeBooking.slot_time,
                  )
                  if (slot) {
                    navigate(
                      `/waiting?slot=${slot.id}&date=${activeBooking.slot_date}`,
                    )
                  }
                }}
                className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
              >
                Go to waiting room →
              </button>

              {cancelConfirmId === activeBooking.id ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-zinc-400">
                    Are you sure you want to cancel?
                  </span>
                  <button
                    type="button"
                    disabled={cancellingId === activeBooking.id}
                    onClick={() => void handleCancelBooking(activeBooking)}
                    className="rounded-lg bg-red-500/15 px-3 py-1.5 text-sm font-medium text-red-400 ring-1 ring-red-500/30 transition hover:bg-red-500/25 disabled:opacity-60"
                  >
                    {cancellingId === activeBooking.id
                      ? "Cancelling..."
                      : "Yes, cancel"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCancelConfirmId(null)}
                    className="text-sm text-zinc-500 transition hover:text-zinc-300"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCancelConfirmId(activeBooking.id)}
                  className="text-sm font-medium text-red-400 transition hover:text-red-300"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        )}

        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Preferred difficulty
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Choose the question difficulty for your next interview session.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleDifficultyChange(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  difficulty === opt.value
                    ? "bg-emerald-500 text-zinc-950"
                    : "border border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Preferred topic
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Narrow questions to a specific topic, or choose Any for all topics.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topicOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTopicChange(opt.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    topic === opt.value
                      ? "bg-emerald-500 text-zinc-950"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("today")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeTab === "today"
                    ? "bg-emerald-500 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tomorrow")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeTab === "tomorrow"
                    ? "bg-emerald-500 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Tomorrow
              </button>
            </div>
            <span className="text-sm text-zinc-500">
              {formatISTDateLabel(selectedDate)} · IST
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {slotsLoading
              ? visibleSlots.map((slot) => (
                  <SlotCardSkeleton key={`skeleton-${activeTab}-${slot.id}`} />
                ))
              : visibleSlots.length === 0 ? (
                  <p className="col-span-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500">
                    No bookable slots left for{" "}
                    {activeTab === "today" ? "today" : "tomorrow"}.
                  </p>
                ) : (
                  visibleSlots.map((slot) => (
                    <SlotCard
                      key={`${activeTab}-${slot.id}`}
                      slot={slot}
                      bookedCount={slotCounts[slot.time] ?? 0}
                      dateLabel={activeTab === "today" ? "Today" : "Tomorrow"}
                      onBook={handleBook}
                      isBooking={bookingSlotId === slot.id}
                      isBooked={
                        getBookedSlotIdForDate(selectedDate) === slot.id
                      }
                      isExpired={isSlotPast(slot.time, selectedDate)}
                    />
                  ))
                )}
          </div>
        </section>

        <div className="mt-10">
          <UserStats />
        </div>
      </div>
    </div>
  )
}
