import type { Question } from "../types/question"

export function getQuestionHints(question: Question): string[] {
  const hints: string[] = [
    `This is a ${question.difficulty} ${question.topic} problem — ask the interviewee to explain their approach before coding.`,
  ]

  if (question.constraints) {
    hints.push(`Key constraints: ${question.constraints}`)
  }

  if (question.examples[0]?.explanation) {
    hints.push(`Example insight: ${question.examples[0].explanation}`)
  } else if (question.examples[0]) {
    hints.push(
      `Walk through Example 1: input ${question.examples[0].input} → output ${question.examples[0].output}`,
    )
  }

  if (question.difficulty === "Easy") {
    hints.push("Start with a brute-force idea, then ask how to optimize time or space.")
  } else if (question.difficulty === "Medium") {
    hints.push("Probe edge cases: empty input, single element, and duplicates.")
  } else {
    hints.push("Discuss trade-offs between time complexity and extra space.")
  }

  return hints
}
