import { computeSessionStart } from "../utils/sessionTime"

const REMINDER_STORAGE_KEY = "peercode_scheduled_reminders"
const REMINDER_LEAD_MS = 10 * 60 * 1000

const activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function getScheduledIds(): Set<string> {
  try {
    const raw = localStorage.getItem(REMINDER_STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : [])
  } catch {
    return new Set()
  }
}

function markScheduled(slotId: string) {
  const ids = getScheduledIds()
  ids.add(slotId)
  localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify([...ids]))
}

function showReminderNotification() {
  const notification = new Notification(
    "Your PeerCode session starts in 10 minutes! 🚀",
    {
      body: "Get ready — your peer interview slot is coming up. Click to open PeerCode.",
      icon: "/favicon.svg",
    },
  )

  notification.onclick = () => {
    window.focus()
    notification.close()
    window.location.href = "/dashboard"
  }
}

export async function requestNotificationPermission(): Promise<
  NotificationPermission | "unsupported"
> {
  if (!("Notification" in window)) {
    return "unsupported"
  }

  if (Notification.permission === "granted") {
    return "granted"
  }

  if (Notification.permission === "denied") {
    return "denied"
  }

  return Notification.requestPermission()
}

export function scheduleSlotReminder(
  slotTime: string,
  slotId: string,
  slotDate: string,
): boolean {
  if (!("Notification" in window)) {
    return false
  }

  if (Notification.permission !== "granted") {
    return false
  }

  if (getScheduledIds().has(slotId)) {
    return false
  }

  const sessionStart = computeSessionStart(slotTime, slotDate)
  const reminderAt = sessionStart.getTime() - REMINDER_LEAD_MS
  const delay = reminderAt - Date.now()

  if (delay <= 0) {
    return false
  }

  const existingTimeout = activeTimeouts.get(slotId)
  if (existingTimeout) {
    clearTimeout(existingTimeout)
  }

  const timeoutId = setTimeout(() => {
    activeTimeouts.delete(slotId)
    showReminderNotification()
  }, delay)

  activeTimeouts.set(slotId, timeoutId)
  markScheduled(slotId)
  return true
}

export function cancelSlotReminder(slotId: string) {
  const timeoutId = activeTimeouts.get(slotId)
  if (timeoutId) {
    clearTimeout(timeoutId)
    activeTimeouts.delete(slotId)
  }
}

export function clearActiveReminders() {
  for (const timeoutId of activeTimeouts.values()) {
    clearTimeout(timeoutId)
  }
  activeTimeouts.clear()
}
