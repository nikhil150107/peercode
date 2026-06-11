import { SERVER_URL } from "./serverUrl"

export async function submitFeedback(
  message: string,
  name?: string,
  userId?: string,
): Promise<void> {
  const res = await fetch(`${SERVER_URL}/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: message.trim(),
      name: name?.trim() || undefined,
      userId,
    }),
  })

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error ?? "Failed to submit feedback")
  }
}
