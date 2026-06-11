import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"
import WaitingNavbar from "../components/WaitingNavbar"
import { useAuth } from "../context/AuthContext"
import { getSlotById } from "../data/slots"
import { fetchPeerEmail, fetchUserBookings } from "../lib/bookings"
import { getDifficultyPreference } from "../utils/difficultyPreference"
import { getTopicPreference } from "../utils/topicPreference"
import { SERVER_URL } from "../lib/serverUrl"
import {
  computeSessionStart,
  formatCountdown,
  formatCountdownHuman,
} from "../utils/sessionTime"
import { getPeerDisplayLabel } from "../utils/userDisplay"

type MatchFoundPayload = {
  roomId: string
  peerId: string
  peerEmail: string
  slotTime: string
}

function WaitingAnimation() {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <span className="absolute h-32 w-32 animate-ping rounded-full bg-emerald-500/20" />
      <span className="absolute h-24 w-24 animate-pulse rounded-full bg-emerald-500/15" />
      <span className="absolute h-32 w-32 animate-spin rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400/30" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 ring-2 ring-emerald-500/40">
        <svg
          className="h-7 w-7 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    </div>
  )
}

function MatchFoundView({
  peerName,
  onEnterRoom,
}: {
  peerName: string
  onEnterRoom: () => void
}) {
  return (
    <div className="flex max-w-md flex-col items-center text-center">
      <h1 className="mt-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        🎉 Peer found! Your peer is {peerName}
      </h1>
      <p className="mt-3 text-zinc-400">Click to join your session</p>

      <button
        type="button"
        onClick={onEnterRoom}
        className="mt-8 w-full rounded-xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
      >
        Enter Room
      </button>
    </div>
  )
}

export default function WaitingRoomPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const slotId = searchParams.get("slot") ?? "slot-6pm"
  const slotDate = searchParams.get("date") ?? ""
  const slot = getSlotById(slotId)

  const socketRef = useRef<Socket | null>(null)

  const [countdown, setCountdown] = useState("")
  const [humanCountdown, setHumanCountdown] = useState("")
  const [sessionStart, setSessionStart] = useState<Date | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [matchData, setMatchData] = useState<MatchFoundPayload | null>(null)

  const storeMatchData = useCallback((data: MatchFoundPayload) => {
    localStorage.setItem("peercode_room_id", data.roomId)
    localStorage.setItem("peercode_roomId", data.roomId)
    localStorage.setItem("peercode_peer_email", data.peerEmail)
    localStorage.setItem("peercode_peerEmail", data.peerEmail)
    localStorage.setItem("peercode_peer_id", data.peerId)
    setMatchData(data)
    setStatusMessage("")
  }, [])

  const enterRoom = useCallback(() => {
    if (!matchData) return
    navigate(`/interview?room=${matchData.roomId}`)
  }, [matchData, navigate])

  useEffect(() => {
    if (!user?.id) return

    async function loadBooking() {
      const bookings = await fetchUserBookings(user.id)
      const booking =
        bookings.find(
          (b) =>
            b.slot_time === slot.time &&
            (slotDate ? b.slot_date === slotDate : true),
        ) ?? bookings.find((b) => b.slot_time === slot.time)

      if (booking?.status === "matched" && booking.room_id && booking.matched_with) {
        const peerEmail =
          (await fetchPeerEmail(booking.matched_with)) ?? "your peer"
        storeMatchData({
          roomId: booking.room_id,
          peerId: booking.matched_with,
          peerEmail,
          slotTime: slot.time,
        })
        return
      }

      const date = booking?.slot_date ?? slotDate
      if (date) {
        setSessionStart(computeSessionStart(slot.time, date))
      }

      if (booking?.status === "pending") {
        setStatusMessage(`Waiting for your scheduled match at ${slot.time}`)
      } else {
        setStatusMessage(`Scheduled session at ${slot.time}`)
      }
    }

    void loadBooking()

    const poll = setInterval(() => void loadBooking(), 10_000)
    return () => clearInterval(poll)
  }, [user?.id, slot.time, slotDate, storeMatchData])

  useEffect(() => {
    if (!user?.id || !user.email || matchData) return

    const socket = io(SERVER_URL)
    socketRef.current = socket
    ;(window as Window & { __peerSocket?: Socket }).__peerSocket = socket

    socket.on("connect", () => {
      console.log("[waiting] Connected to matching server")
      socket.emit("join_waiting", {
        userId: user.id,
        userEmail: user.email,
        slotTime: slot.time,
        slotDate: slotDate || undefined,
        difficultyPreference: getDifficultyPreference(),
        topicPreference: getTopicPreference(),
      })
    })

    socket.on("match_found", (data: MatchFoundPayload) => {
      console.log("[waiting] Match found:", data)
      storeMatchData(data)
    })

    return () => {
      socket.emit("leave_waiting", {
        userId: user.id,
        slotTime: slot.time,
        slotDate: slotDate || undefined,
      })
      socket.disconnect()
      socketRef.current = null
    }
  }, [user, slot.time, slotDate, matchData, storeMatchData])

  useEffect(() => {
    if (!sessionStart || matchData) return

    function tick() {
      const remaining = sessionStart!.getTime() - Date.now()
      setCountdown(formatCountdown(remaining))
      setHumanCountdown(formatCountdownHuman(remaining))
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [sessionStart, matchData])

  function handleCancel() {
    if (socketRef.current && user) {
      socketRef.current.emit("leave_waiting", {
        userId: user.id,
        slotTime: slot.time,
        slotDate: slotDate || undefined,
      })
      socketRef.current.disconnect()
    }
    navigate("/dashboard")
  }

  const peerName = matchData
    ? getPeerDisplayLabel(matchData.peerEmail)
    : "your peer"

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <WaitingNavbar />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl" />
        </div>

        {matchData ? (
          <MatchFoundView peerName={peerName} onEnterRoom={enterRoom} />
        ) : (
          <div className="flex max-w-md flex-col items-center text-center">
            <WaitingAnimation />

            <h1 className="mt-10 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {statusMessage || `Waiting for your scheduled match at ${slot.time}`}
            </h1>
            <p className="mt-3 text-zinc-400">
              You&apos;ll be matched with a peer when the slot starts. Stay on
              this page or return before the session begins.
            </p>

            <div className="mt-8 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
              <p className="text-sm text-zinc-500">Your session</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {slot.time} IST
              </p>
            </div>

            {sessionStart && (
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Session starts in
                </p>
                <p className="mt-1 font-mono text-4xl font-bold tabular-nums text-emerald-400">
                  {countdown}
                </p>
                {humanCountdown && (
                  <p className="mt-2 text-sm text-zinc-500">
                    ({humanCountdown})
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handleCancel}
          className="mt-12 text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  )
}
