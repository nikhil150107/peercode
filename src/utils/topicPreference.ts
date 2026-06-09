export type TopicPreference =
  | "Any"
  | "Arrays"
  | "Strings"
  | "Trees"
  | "Graphs"
  | "DP"
  | "Linked Lists"

const STORAGE_KEY = "peercode_topic_pref"

const VALID_PREFS: TopicPreference[] = [
  "Any",
  "Arrays",
  "Strings",
  "Trees",
  "Graphs",
  "DP",
  "Linked Lists",
]

export function getTopicPreference(): TopicPreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && VALID_PREFS.includes(stored as TopicPreference)) {
    return stored as TopicPreference
  }
  return "Any"
}

export function setTopicPreference(pref: TopicPreference) {
  localStorage.setItem(STORAGE_KEY, pref)
}
