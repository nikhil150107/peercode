import { getSlotById } from "../data/slots"

export { getSlotById }

function parseSlotHoursMinutes(
  slotTime: string,
): { hours: number; minutes: number } | null {
  const match = slotTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null

  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3].toUpperCase()

  if (period === "PM" && hours !== 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0

  return { hours, minutes }
}

function getISTMs(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10)

  const year = get("year")
  const month = get("month") - 1
  const day = get("day")
  const hour = get("hour") === 24 ? 0 : get("hour")
  const minute = get("minute")
  const second = get("second")

  return Date.UTC(year, month, day, hour - 5, minute - 30, second)
}

export function computeSessionStart(slotTime: string, slotDate: string): Date {
  const parsed = parseSlotHoursMinutes(slotTime)
  if (!parsed) {
    return new Date(Date.now() + 8 * 60 * 1000)
  }

  const [year, month, day] = slotDate.split("-").map(Number)
  const sessionMs = Date.UTC(
    year,
    month - 1,
    day,
    parsed.hours - 5,
    parsed.minutes - 30,
    0,
  )

  return new Date(sessionMs)
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00"

  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

const SLOT_EXPIRY_MINUTES = 70

export function isSlotExpired(
  slotTime: string,
  slotDate: string,
  graceMinutes = SLOT_EXPIRY_MINUTES,
): boolean {
  const sessionStart = computeSessionStart(slotTime, slotDate)
  const expiryMs = sessionStart.getTime() + graceMinutes * 60 * 1000
  return Date.now() > expiryMs
}

export function formatCountdownHuman(ms: number): string {
  if (ms <= 0) return "Starting now"

  const totalMinutes = Math.ceil(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`
  }
  if (hours > 0) {
    return `${hours}h`
  }
  return `${minutes}m`
}
