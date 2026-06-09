export type Difficulty = "Easy" | "Medium" | "Hard"

export type QuestionExample = {
  input: string
  output: string
  explanation?: string
}

export type Question = {
  id: string
  title: string
  difficulty: Difficulty
  topic: string
  description: string
  examples: QuestionExample[]
  hidden_tests: QuestionExample[] | null
  constraints: string | null
}
