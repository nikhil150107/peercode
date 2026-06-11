import type { Language } from "../data/mockProblem"
import type { QuestionExample } from "../types/question"

const JUDGE0_URL = "https://ce.judge0.com/submissions?wait=true"

export const JUDGE0_LANGUAGE_IDS: Record<Language, number> = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54,
}

type Judge0Submission = {
  stdout: string | null
  stderr: string | null
  compile_output: string | null
  message: string | null
  status?: { id: number; description: string }
}

export type TestCaseResult = {
  index: number
  input: string
  expected: string
  actual: string
  passed: boolean
  error?: string
}

export async function submitToJudge0(
  sourceCode: string,
  languageId: number,
  stdin = "",
): Promise<Judge0Submission> {
  const response = await fetch(JUDGE0_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin,
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Judge0 request failed (${response.status}): ${response.statusText}`,
    )
  }

  return response.json() as Promise<Judge0Submission>
}

function splitTopLevelCommas(input: string): string[] {
  const parts: string[] = []
  let depth = 0
  let inString = false
  let stringChar = ""
  let current = ""

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (inString) {
      current += char
      if (char === stringChar && input[i - 1] !== "\\") {
        inString = false
      }
      continue
    }

    if (char === '"' || char === "'") {
      inString = true
      stringChar = char
      current += char
      continue
    }

    if (char === "[" || char === "(" || char === "{") depth++
    if (char === "]" || char === ")" || char === "}") depth--

    if (char === "," && depth === 0) {
      parts.push(current.trim())
      current = ""
      continue
    }

    current += char
  }

  if (current.trim()) parts.push(current.trim())
  return parts
}

export function parseExampleInput(
  input: string,
): { name: string; value: string }[] {
  return splitTopLevelCommas(input)
    .map((part) => {
      const eqIndex = part.indexOf("=")
      if (eqIndex === -1) return null
      return {
        name: part.slice(0, eqIndex).trim(),
        value: part.slice(eqIndex + 1).trim(),
      }
    })
    .filter((part): part is { name: string; value: string } => part !== null)
}

function extractFunctionNames(code: string, language: Language): string[] {
  const names: string[] = []

  if (language === "python") {
    for (const match of code.matchAll(/^\s*def\s+(\w+)\s*\(/gm)) {
      names.push(match[1])
    }
  }

  if (language === "javascript") {
    for (const match of code.matchAll(/function\s+(\w+)\s*\(/g)) {
      names.push(match[1])
    }
    for (const match of code.matchAll(/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/g)) {
      names.push(match[1])
    }
  }

  if (language === "java") {
    for (const match of code.matchAll(
      /public\s+[\w\[\]<>,\s]+\s+(\w+)\s*\([^)]*\)\s*\{/g,
    )) {
      if (match[1] !== "main") names.push(match[1])
    }
  }

  if (language === "cpp") {
    for (const match of code.matchAll(
      /(?:vector|int|bool|string|double|float|long|char|auto)[\w<>,\s*&]*\s+(\w+)\s*\([^)]*\)\s*\{/g,
    )) {
      if (match[1] !== "main") names.push(match[1])
    }
  }

  const preferred = ["solution", "solve"]
  const ordered = [
    ...preferred.filter((name) => names.includes(name)),
    ...names.filter((name) => !preferred.includes(name)),
  ]

  return [...new Set(ordered)]
}

function toJsValue(value: string): string {
  return value
    .replace(/\btrue\b/g, "true")
    .replace(/\bfalse\b/g, "false")
    .replace(/\bnull\b/g, "null")
}

function toPythonValue(value: string): string {
  return value
    .replace(/\btrue\b/gi, "True")
    .replace(/\bfalse\b/gi, "False")
    .replace(/\bnull\b/gi, "None")
}

function buildAssignments(
  assignments: { name: string; value: string }[],
  language: Language,
): string {
  return assignments
    .map(({ name, value }) => {
      const converted =
        language === "python" ? toPythonValue(value) : toJsValue(value)
      if (language === "python") return `${name} = ${converted}`
      if (language === "javascript") return `const ${name} = ${converted};`
      if (language === "java") return toJavaAssignment(name, value)
      return toCppAssignment(name, value)
    })
    .join("\n")
}

function toJavaAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return `var ${name} = new int[] {};`
    const nums = inner.split(",").map((n) => n.trim())
    if (nums.every((n) => /^-?\d+$/.test(n))) {
      return `int[] ${name} = {${nums.join(", ")}};`
    }
  }
  if (value.startsWith('"')) {
    return `String ${name} = ${value};`
  }
  if (value === "true" || value === "false") {
    return `boolean ${name} = ${value};`
  }
  if (/^-?\d+$/.test(value)) {
    return `int ${name} = ${value};`
  }
  return `var ${name} = ${value};`
}

function toCppAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return `vector<int> ${name} = {};`
    return `vector<int> ${name} = ${value};`
  }
  if (value.startsWith('"')) {
    return `string ${name} = ${value};`
  }
  if (value === "true" || value === "false") {
    return `bool ${name} = ${value};`
  }
  return `auto ${name} = ${value};`
}

function buildArgList(
  assignments: { name: string; value: string }[],
  language: Language,
): string {
  const names = assignments.map((a) => a.name)
  if (language === "python") return names.join(", ")
  if (language === "javascript") return names.join(", ")
  if (language === "java") return names.join(", ")
  return names.join(", ")
}

function buildRunnableCode(
  userCode: string,
  language: Language,
  exampleInput: string,
): string {
  const assignments = parseExampleInput(exampleInput)
  const assignmentBlock = buildAssignments(assignments, language)
  const argList = buildArgList(assignments, language)
  const functionNames = extractFunctionNames(userCode, language)

  if (language === "python") {
    const callChain = functionNames
      .map(
        (name) =>
          `try:\n    __result__ = ${name}(${argList})\n    __called__ = True\nexcept TypeError:\n    pass`,
      )
      .join("\n")

    return `${userCode}

# --- PeerCode harness ---
${assignmentBlock}
__result__ = None
__called__ = False
${callChain}
if not __called__:
    raise Exception("Could not find a matching solution function")
import json
if isinstance(__result__, bool):
    print(str(__result__).lower())
elif isinstance(__result__, (list, dict)):
    print(json.dumps(__result__, separators=(',', ':')))
else:
    print(__result__)
`
  }

  if (language === "javascript") {
    const attempts = functionNames
      .map(
        (name) =>
          `if (typeof ${name} === "function") { try { const __result__ = ${name}(${argList}); if (typeof __result__ === "boolean") { console.log(String(__result__)); } else if (typeof __result__ === "object" && __result__ !== null) { console.log(JSON.stringify(__result__)); } else { console.log(String(__result__)); } process.exit(0); } catch (e) {} }`,
      )
      .join("\n")

    return `${userCode}

${assignmentBlock}
${attempts}
throw new Error("Could not find a matching solution function");
`
  }

  if (language === "java") {
    const methodName = functionNames[0] ?? "solution"
    const returnPrinter = `System.out.println(java.util.Arrays.toString(__result__));`

    return `${userCode}

public class Main {
  public static void main(String[] args) {
    ${assignmentBlock.replace(/^/gm, "    ")}
    Solution sol = new Solution();
    var __result__ = sol.${methodName}(${argList});
    if (__result__ instanceof boolean) {
      System.out.println(__result__);
    } else if (__result__ instanceof Integer || __result__ instanceof Double) {
      System.out.println(__result__);
    } else if (__result__ instanceof String) {
      System.out.println(__result__);
    } else {
      ${returnPrinter}
    }
  }
}
`
  }

  const methodName = functionNames[0] ?? "solution"
  return `#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
  ${assignmentBlock.replace(/^/gm, "  ")}
  auto __result__ = ${methodName}(${argList});
  if constexpr (false) {}
  cout << __result__ << endl;
  return 0;
}
`
}

export function normalizeOutput(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, "")
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

export async function runTestCase(
  userCode: string,
  language: Language,
  example: QuestionExample,
  index: number,
): Promise<TestCaseResult> {
  const languageId = JUDGE0_LANGUAGE_IDS[language]
  const runnableCode = buildRunnableCode(userCode, language, example.input)

  try {
    const submission = await submitToJudge0(runnableCode, languageId)
    const actual = formatActualOutput(submission)
    const hasRuntimeError =
      Boolean(submission.compile_output?.trim()) ||
      (Boolean(submission.stderr?.trim()) && !submission.stdout?.trim())

    if (hasRuntimeError) {
      return {
        index,
        input: example.input,
        expected: example.output,
        actual,
        passed: false,
        error: actual || submission.status?.description || "Execution failed",
      }
    }

    const passed =
      normalizeOutput(actual) === normalizeOutput(example.output)

    return {
      index,
      input: example.input,
      expected: example.output,
      actual: actual || "(no output)",
      passed,
    }
  } catch (err) {
    return {
      index,
      input: example.input,
      expected: example.output,
      actual: "",
      passed: false,
      error: err instanceof Error ? err.message : "Failed to run test case",
    }
  }
}

export function resolveSubmitTestCases(
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
): Promise<TestCaseResult[]> {
  const results: TestCaseResult[] = []

  for (let i = 0; i < examples.length; i++) {
    results.push(await runTestCase(userCode, language, examples[i], i + 1))
  }

  return results
}

export async function runSubmitTests(
  userCode: string,
  language: Language,
  hiddenTests: QuestionExample[] | null | undefined,
  examples: QuestionExample[],
): Promise<TestCaseResult[]> {
  const testCases = resolveSubmitTestCases(hiddenTests, examples)
  if (testCases.length === 0) {
    return []
  }
  return runAgainstExamples(userCode, language, testCases)
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

  return results
    .map((result) => {
      const status = result.passed ? "✅ Passed" : "❌ Failed"
      const lines = [
        `Test Case ${result.index}: ${status}`,
        `Input: ${result.input}`,
        `Expected: ${result.expected}`,
        `Got: ${result.actual || "(no output)"}`,
      ]

      if (result.error) {
        lines.push(`Error: ${result.error}`)
      }

      return lines.join("\n")
    })
    .join("\n\n")
}
