import type { Question, QuestionExample } from "../types/question"
import type { DifficultyPreference } from "../utils/difficultyPreference"
import type { TopicPreference } from "../utils/topicPreference"
import { supabase } from "./supabase"
import {
  clearSeenQuestions,
  getSeenQuestionIds,
  markQuestionSeen,
} from "../utils/seenQuestions"

export function parseQuestionExamples(raw: unknown): QuestionExample[] {
  if (Array.isArray(raw)) {
    return raw.filter(
      (ex): ex is QuestionExample =>
        typeof ex === "object" &&
        ex !== null &&
        "input" in ex &&
        "output" in ex,
    )
  }

  if (typeof raw === "string") {
    try {
      return parseQuestionExamples(JSON.parse(raw))
    } catch {
      return []
    }
  }

  return []
}

function parseExamples(raw: unknown): QuestionExample[] {
  return parseQuestionExamples(raw)
}

export function normalizeQuestion(question: Question): Question {
  return {
    ...question,
    examples: parseQuestionExamples(question.examples),
    hidden_tests:
      question.hidden_tests == null
        ? null
        : parseQuestionExamples(question.hidden_tests),
  }
}

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null
  return items[Math.floor(Math.random() * items.length)]
}

function mapRowToQuestion(row: Record<string, unknown>): Question {
  const starterRaw = row.starter_code
  const starter_code =
    starterRaw && typeof starterRaw === "object" && !Array.isArray(starterRaw)
      ? (starterRaw as Question["starter_code"])
      : null

  return {
    id: row.id as string,
    title: row.title as string,
    difficulty: row.difficulty as Question["difficulty"],
    topic: row.topic as string,
    description: row.description as string,
    examples: parseExamples(row.examples),
    hidden_tests:
      row.hidden_tests == null ? null : parseExamples(row.hidden_tests),
    constraints: (row.constraints as string) ?? null,
    function_name: (row.function_name as string) ?? null,
    starter_code,
  }
}

export async function fetchAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, title, difficulty, topic, description, examples, constraints")
    .order("title", { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) =>
    mapRowToQuestion(row as Record<string, unknown>),
  )
}

export async function fetchRandomUnseenQuestion(
  userId: string,
  difficultyPref: DifficultyPreference = "Random",
  topicPref: TopicPreference | null = "Any",
): Promise<Question | null> {
  let query = supabase.from("questions").select("*")

  if (difficultyPref !== "Random") {
    query = query.eq("difficulty", difficultyPref)
  }

  if (topicPref && topicPref !== "Any") {
    query = query.eq("topic", topicPref)
  }

  const { data, error } = await query

  if (error) throw error
  if (!data || data.length === 0) return null

  const pool = data

  let seen = getSeenQuestionIds(userId)
  let unseen = pool.filter((q) => !seen.includes(q.id))

  if (unseen.length === 0) {
    clearSeenQuestions(userId)
    seen = []
    unseen = pool
  }

  const picked = pickRandom(unseen)
  if (!picked) return null

  const question = mapRowToQuestion(picked)
  markQuestionSeen(userId, question.id)
  return question
}

export function applyQuestionSeen(userId: string, questionId: string) {
  markQuestionSeen(userId, questionId)
}
