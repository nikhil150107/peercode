import type { Language } from "../data/mockProblem"
import {
  formatTestResults,
  runAgainstExamples,
} from "../lib/codeExecution"
import type { QuestionExample } from "../types/question"

export async function runCode(
  code: string,
  language: Language,
  examples: QuestionExample[],
): Promise<string> {
  if (examples.length === 0) {
    return "No example test cases available for this question."
  }

  const results = await runAgainstExamples(code, language, examples)
  return formatTestResults(results)
}
