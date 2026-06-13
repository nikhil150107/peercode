import type { Language } from "../data/mockProblem"
import { SERVER_URL } from "./serverUrl"
import type { Question } from "../types/question"

export type ChatMessagePayload = {
  id: string
  text: string
  senderName: string
  from: string
  at: number
  isSelf?: boolean
}

export type RoomLiveState = {
  question: Question | null
  codes: Partial<Record<Language, string>>
  language: Language
  secondsLeft: number
  timerStarted: boolean
  timerStartedAt: number | null
  chatMessages: ChatMessagePayload[]
  ended: boolean
  interviewerUserId?: string | null
  intervieweeUserId?: string | null
  myRole?: "interviewer" | "interviewee" | null
}

export async function fetchRoomState(
  roomId: string,
  userId?: string,
): Promise<RoomLiveState | null> {
  const query = userId
    ? `?userId=${encodeURIComponent(userId)}`
    : ""
  const res = await fetch(
    `${SERVER_URL}/api/room/${encodeURIComponent(roomId)}/state${query}`,
  )
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Failed to fetch room state (${res.status})`)
  }
  const payload = (await res.json()) as { ok?: boolean; state?: RoomLiveState }
  return payload.state ?? null
}

export async function saveRoomState(
  roomId: string,
  userId: string,
  patch: Partial<RoomLiveState>,
): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/room/${encodeURIComponent(roomId)}/state`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, patch }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Failed to save room state (${res.status})`)
  }
}

export async function endRoomSession(roomId: string, userId: string): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/room/${encodeURIComponent(roomId)}/end`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Failed to end room (${res.status})`)
  }
}

export async function checkRoomEnded(roomId: string): Promise<boolean> {
  const res = await fetch(`${SERVER_URL}/api/room/${encodeURIComponent(roomId)}/ended`)
  if (!res.ok) return false
  const payload = (await res.json()) as { ended?: boolean }
  return Boolean(payload.ended)
}
