const STORAGE_PREFIX = "peercode_seen_questions_"

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`
}

export function getSeenQuestionIds(userId: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function markQuestionSeen(userId: string, questionId: string) {
  const seen = getSeenQuestionIds(userId)
  if (seen.includes(questionId)) return
  localStorage.setItem(
    storageKey(userId),
    JSON.stringify([...seen, questionId]),
  )
}

export function clearSeenQuestions(userId: string) {
  localStorage.removeItem(storageKey(userId))
}
