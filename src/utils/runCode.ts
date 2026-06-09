import type { Language } from "../data/mockProblem"
import { mockProblem } from "../data/mockProblem"

export async function runCode(
  code: string,
  language: Language,
): Promise<string> {
  await new Promise((r) => setTimeout(r, 400))

  if (language === "javascript") {
    try {
      const logs: string[] = []
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
      }
      const fn = new Function("console", code)
      fn(mockConsole)
      return logs.length > 0 ? logs.join("\n") : "No output"
    } catch (err) {
      return `Error: ${err instanceof Error ? err.message : String(err)}`
    }
  }

  return [
    `> Running ${language}...`,
    `Input:  ${mockProblem.examples[0].input}`,
    `Output: ${mockProblem.examples[0].output}`,
    mockProblem.examples[0].explanation
      ? `// ${mockProblem.examples[0].explanation}`
      : "",
  ]
    .filter(Boolean)
    .join("\n")
}
