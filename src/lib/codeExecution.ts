import type { Language } from "../data/mockProblem"
import type { QuestionExample } from "../types/question"
import { resolveJudge0LanguageId } from "../data/compilerVersions"
import { compareCpOutput, toCpStdin } from "./stdinFormat"
import { SERVER_URL } from "./serverUrl"

type ExecuteResponse = {
  ok?: boolean
  stdout?: string | null
  stderr?: string | null
  compile_output?: string | null
  message?: string | null
  status?: string
  status_id?: number | null
  error?: string
}

type Judge0Submission = {
  stdout: string | null
  stderr: string | null
  compile_output: string | null
  message: string | null
  status?: { id: number; description: string }
}

export type ExecutionOptions = {
  languageId?: number
}

export type TestCaseResult = {
  index: number
  input: string
  expected: string
  actual: string
  passed: boolean
  error?: string
}

function resolveExecutionLanguageId(
  language: Language,
  options: ExecutionOptions,
): number {
  return resolveJudge0LanguageId(language, options.languageId)
}

export async function submitToJudge0(
  sourceCode: string,
  languageId: number,
  stdin = "",
): Promise<Judge0Submission> {
  console.log("=== CODE SENT TO EXECUTE ===", sourceCode)
  console.log("=== STDIN ===", stdin)
  console.log("=== LANGUAGE ID ===", languageId)

  const response = await fetch(`${SERVER_URL}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: sourceCode,
      language_id: languageId,
      stdin,
    }),
  })

  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(
      `Execution request failed (${response.status}): ${responseText || response.statusText}`,
    )
  }

  const data = JSON.parse(responseText) as ExecuteResponse

  if (data.ok === false) {
    throw new Error(data.error ?? "Execution failed")
  }

  return {
    stdout: data.stdout ?? null,
    stderr: data.stderr ?? null,
    compile_output: data.compile_output ?? null,
    message: data.message ?? null,
    status:
      data.status_id != null
        ? { id: data.status_id, description: data.status ?? "Unknown" }
        : undefined,
  }
}

export function normalizeOutput(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .toLowerCase()
}

function formatActualOutput(submission: Judge0Submission): string {
  if (submission.compile_output?.trim()) {
    return submission.compile_output.trim()
  }
  if (submission.stderr?.trim()) {
    return submission.stderr.trim()
  }
  if (submission.message?.trim()) {
    return submission.message.trim()
  }
  return (submission.stdout ?? "").trim()
}

async function executeWithStdin(
  userCode: string,
  language: Language,
  stdin: string,
  options: ExecutionOptions,
): Promise<{ actual: string; hasRuntimeError: boolean; status?: string }> {
  const languageId = resolveExecutionLanguageId(language, options)
  const submission = await submitToJudge0(userCode, languageId, stdin)
  const actual = formatActualOutput(submission)
  const hasRuntimeError =
    Boolean(submission.compile_output?.trim()) ||
    (Boolean(submission.stderr?.trim()) && !submission.stdout?.trim())

  return {
    actual,
    hasRuntimeError,
    status: submission.status?.description,
  }
}

export async function runTestCase(
  userCode: string,
  language: Language,
  example: QuestionExample,
  index: number,
  options: ExecutionOptions = {},
): Promise<TestCaseResult> {
  const stdin = toCpStdin(example.input)

  try {
    const { actual, hasRuntimeError, status } = await executeWithStdin(
      userCode,
      language,
      stdin,
      options,
    )

    if (hasRuntimeError) {
      return {
        index,
        input: stdin,
        expected: example.output,
        actual,
        passed: false,
        error: actual || status || "Execution failed",
      }
    }

    const passed = compareCpOutput(actual, example.output)

    return {
      index,
      input: stdin,
      expected: example.output,
      actual: actual || "(no output)",
      passed,
    }
  } catch (err) {
    return {
      index,
      input: stdin,
      expected: example.output,
      actual: "",
      passed: false,
      error: err instanceof Error ? err.message : "Execution failed",
    }
  }
}

function resolveSubmitTestCases(
  hiddenTests: QuestionExample[] | null | undefined,
  examples: QuestionExample[],
): QuestionExample[] {
  if (hiddenTests && hiddenTests.length > 0) {
    return hiddenTests
  }
  return examples
}

export async function runAgainstExamples(
  userCode: string,
  language: Language,
  examples: QuestionExample[],
  options: ExecutionOptions = {},
): Promise<TestCaseResult[]> {
  const results: TestCaseResult[] = []

  for (let i = 0; i < examples.length; i++) {
    results.push(
      await runTestCase(userCode, language, examples[i], i + 1, options),
    )
  }

  return results
}

export async function runSubmitTests(
  userCode: string,
  language: Language,
  hiddenTests: QuestionExample[] | null | undefined,
  examples: QuestionExample[],
  options: ExecutionOptions = {},
): Promise<TestCaseResult[]> {
  const testCases = resolveSubmitTestCases(hiddenTests, examples)
  if (testCases.length === 0) {
    return []
  }
  return runAgainstExamples(userCode, language, testCases, options)
}

export async function runCustomInput(
  userCode: string,
  language: Language,
  input: string,
  options: ExecutionOptions = {},
): Promise<string> {
  const stdin = toCpStdin(input)
  const { actual, hasRuntimeError, status } = await executeWithStdin(
    userCode,
    language,
    stdin,
    options,
  )

  if (hasRuntimeError) {
    return actual || status || "Execution failed"
  }

  return actual || "(no output)"
}

export function allSubmitTestsPassed(results: TestCaseResult[]): boolean {
  return results.length > 0 && results.every((result) => result.passed)
}

export function countSubmitTestResults(results: TestCaseResult[]): {
  passed: number
  total: number
} {
  return {
    passed: results.filter((result) => result.passed).length,
    total: results.length,
  }
}

export function formatSubmitResults(results: TestCaseResult[]): string {
  const passed = results.filter((r) => r.passed).length
  const total = results.length
  const header = `${passed}/${total} test cases passed ✅`
  const verdict = passed === total ? "🎉 Accepted!" : "❌ Wrong Answer"
  return `${header}\n${verdict}`
}

export function formatTestResults(results: TestCaseResult[]): string {
  if (results.length === 0) {
    return "No example test cases available for this question."
  }

  const passed = results.filter((r) => r.passed).length
  const lines = [`${passed}/${results.length} example test cases passed`]

  for (const result of results) {
    const status = result.passed ? "✅" : "❌"
    lines.push(`\nTest ${result.index} ${status}`)
    if (!result.passed) {
      lines.push(`Expected: ${result.expected}`)
      lines.push(`Got: ${result.actual}`)
      if (result.error) lines.push(`Error: ${result.error}`)
    }
  }

  return lines.join("\n")
}
