import { useEffect, useMemo, useState } from "react"
import { QuestionRowSkeleton } from "../components/Skeleton"
import { useToast } from "../context/ToastContext"
import { fetchAllQuestions } from "../lib/questions"
import type { Difficulty, Question } from "../types/question"

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  Hard: "bg-red-500/15 text-red-400 ring-red-500/30",
}

const difficultyFilters: Array<Difficulty | "All"> = [
  "All",
  "Easy",
  "Medium",
  "Hard",
]

export default function QuestionBankPage() {
  const { showToast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All")
  const [topic, setTopic] = useState<string>("All")

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchAllQuestions()
        setQuestions(data)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load questions"
        setError(message)
        showToast(message, "error")
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const topics = useMemo(() => {
    const unique = new Set(questions.map((q) => q.topic))
    return ["All", ...[...unique].sort()]
  }, [questions])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return questions.filter((q) => {
      if (difficulty !== "All" && q.difficulty !== difficulty) return false
      if (topic !== "All" && q.topic !== topic) return false
      if (query && !q.title.toLowerCase().includes(query)) return false
      return true
    })
  }, [questions, search, difficulty, topic])

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Question Bank
          </h1>
          <p className="mt-2 text-zinc-400">
            Browse 100+ curated DSA problems by topic and difficulty.
          </p>
        </div>

        <div className="mb-6 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div>
            <label
              htmlFor="question-search"
              className="text-sm font-medium text-zinc-400"
            >
              Search by title
            </label>
            <input
              id="question-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Two Sum, Binary Search..."
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-400">Difficulty</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {difficultyFilters.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDifficulty(value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    difficulty === value
                      ? "bg-emerald-500 text-zinc-950"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-400">Topic</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTopic(value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    topic === value
                      ? "bg-emerald-500 text-zinc-950"
                      : "border border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-900/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-zinc-500">Title</th>
                  <th className="hidden px-4 py-3 font-medium text-zinc-500 sm:table-cell">
                    Difficulty
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-500">Topic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                {Array.from({ length: 8 }).map((_, i) => (
                  <QuestionRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-zinc-500">
              Showing {filtered.length} of {questions.length} questions
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-12 text-center text-sm text-zinc-500">
                No questions match your filters.
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-zinc-800">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 bg-zinc-900/80">
                    <tr>
                      <th className="px-4 py-3 font-medium text-zinc-500">
                        Title
                      </th>
                      <th className="hidden px-4 py-3 font-medium text-zinc-500 sm:table-cell">
                        Difficulty
                      </th>
                      <th className="px-4 py-3 font-medium text-zinc-500">
                        Topic
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                    {filtered.map((question) => (
                      <tr
                        key={question.id}
                        className="transition hover:bg-zinc-900/50"
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {question.title}
                          <span
                            className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ring-1 sm:hidden ${difficultyStyles[question.difficulty]}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${difficultyStyles[question.difficulty]}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          {question.topic}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
