import type { Difficulty } from "../types/question"

export type DifficultyPreference = Difficulty | "Random"

const STORAGE_KEY = "peercode_difficulty_pref"

export function getDifficultyPreference(): DifficultyPreference {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (
    stored === "Easy" ||
    stored === "Medium" ||
    stored === "Hard" ||
    stored === "Random"
  ) {
    return stored
  }
  return "Random"
}

export function setDifficultyPreference(pref: DifficultyPreference) {
  localStorage.setItem(STORAGE_KEY, pref)
}
