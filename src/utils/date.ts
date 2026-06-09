const IST_TIMEZONE = "Asia/Kolkata"

function formatISTDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function getTodayISTDate(): string {
  return formatISTDate(new Date())
}

export function getTomorrowISTDate(): string {
  const today = getTodayISTDate()
  const [year, month, day] = today.split("-").map(Number)
  const tomorrow = new Date(Date.UTC(year, month - 1, day + 1))
  return formatISTDate(tomorrow)
}

export function formatISTDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`)
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date)
}
