import type { Language } from "../data/mockProblem"
import type { QuestionExample } from "../types/question"

const JUDGE0_HOST =
  import.meta.env.VITE_JUDGE0_URL?.replace(/\/$/, "") ?? "https://ce.judge0.com"
/** Must match request body: source_code and stdin are btoa-encoded when base64_encoded=true */
const JUDGE0_URL = `${JUDGE0_HOST}/submissions?base64_encoded=true&wait=true`
const JUDGE0_AUTH_TOKEN = import.meta.env.VITE_JUDGE0_AUTH_TOKEN

export const JUDGE0_LANGUAGE_IDS: Record<Language, number> = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54, // C++ (GCC 9.2.0)
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

function decodeBase64Field(value: string | null): string | null {
  if (!value) return value

  try {
    return atob(value)
  } catch {
    return value
  }
}

function decodeJudge0Submission(submission: Judge0Submission): Judge0Submission {
  return {
    ...submission,
    stdout: decodeBase64Field(submission.stdout),
    stderr: decodeBase64Field(submission.stderr),
    compile_output: decodeBase64Field(submission.compile_output),
    message: decodeBase64Field(submission.message),
  }
}

export async function submitToJudge0(
  sourceCode: string,
  languageId: number,
  stdin = "",
): Promise<Judge0Submission> {
  console.log("=== CODE SENT TO JUDGE0 ===", sourceCode)
  console.log("=== STDIN ===", stdin)

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (JUDGE0_AUTH_TOKEN) {
    headers["X-Auth-Token"] = JUDGE0_AUTH_TOKEN
  }

  const encodedSource = btoa(sourceCode)
  const encodedStdin = btoa(stdin)

  const requestBody = {
    source_code: encodedSource,
    language_id: languageId,
    stdin: encodedStdin,
  }

  console.log("=== JUDGE0 URL ===", JUDGE0_URL)
  console.log("=== JUDGE0 LANGUAGE ID ===", languageId)
  console.log("=== JUDGE0 AUTH ===", JUDGE0_AUTH_TOKEN ? "token set" : "no token")
  console.log("=== JUDGE0 ENCODED source_code (btoa) ===", encodedSource.slice(0, 80))
  console.log("=== JUDGE0 ENCODED stdin (btoa) ===", encodedStdin)

  const response = await fetch(JUDGE0_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  })

  const responseText = await response.text()

  if (!response.ok) {
    console.error("=== JUDGE0 ERROR ===", response.status, responseText)
    throw new Error(
      `Judge0 request failed (${response.status}): ${responseText || response.statusText}`,
    )
  }

  const submission = JSON.parse(responseText) as Judge0Submission
  return decodeJudge0Submission(submission)
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

function stripBalancedBlock(code: string, startPattern: RegExp): string {
  const match = startPattern.exec(code)
  if (!match || match.index === undefined) return code

  const startIdx = match.index
  const braceStart = code.indexOf("{", startIdx)
  if (braceStart === -1) return code

  let depth = 0
  for (let i = braceStart; i < code.length; i++) {
    if (code[i] === "{") depth++
    else if (code[i] === "}") {
      depth--
      if (depth === 0) {
        return (code.slice(0, startIdx) + code.slice(i + 1)).trim()
      }
    }
  }

  return code
}

function stripTrailingJsConsoleLogs(code: string): string {
  return code.replace(/(?:^|\n)\s*console\.log\([\s\S]*?\);?\s*$/g, "").trim()
}

function stripTrailingPythonPrints(code: string): string {
  let cleaned = stripBalancedBlock(
    code,
    /if\s+__name__\s*==\s*['"]__main__['"]\s*/,
  )
  cleaned = cleaned.replace(/(?:^|\n)\s*print\([\s\S]*?\)\s*$/g, "").trim()
  return cleaned
}

function wrapJavaSolutionIfNeeded(code: string): string {
  if (/class\s+\w+/i.test(code)) return code

  const importLines: string[] = []
  const bodyLines: string[] = []

  for (const line of code.split("\n")) {
    if (/^\s*import\s+/.test(line)) importLines.push(line)
    else bodyLines.push(line)
  }

  const body = bodyLines
    .join("\n")
    .trim()
    .split("\n")
    .map((line) => (line.trim() ? `  ${line}` : line))
    .join("\n")

  return `${importLines.join("\n")}${importLines.length ? "\n" : ""}class Solution {
${body}
}`
}

function prepareUserCode(code: string, language: Language): string {
  let cleaned = code.trim()

  if (language === "cpp") {
    cleaned = stripBalancedBlock(cleaned, /\bint\s+main\s*\(\s*[^)]*\)/)
  } else if (language === "java") {
    cleaned = stripBalancedBlock(
      cleaned,
      /public\s+static\s+void\s+main\s*\(\s*String\s*\[\]\s*\w*\s*\)/,
    )
    cleaned = wrapJavaSolutionIfNeeded(cleaned)
  } else if (language === "javascript") {
    cleaned = stripTrailingJsConsoleLogs(cleaned)
  } else if (language === "python") {
    cleaned = stripTrailingPythonPrints(cleaned)
  }

  return cleaned
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
    for (const match of code.matchAll(
      /(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/g,
    )) {
      names.push(match[1])
    }
  }

  if (language === "java") {
    for (const match of code.matchAll(
      /(?:public|private|protected)?\s*(?:static\s+)?[\w\[\]<>,\s]+\s+(\w+)\s*\([^)]*\)\s*\{/g,
    )) {
      if (match[1] !== "main") names.push(match[1])
    }
  }

  if (language === "cpp") {
    for (const match of code.matchAll(
      /(?:^|\n)\s*(?:vector|int|bool|string|double|float|long|char|auto|void)[\w<>,\s*&]*\s+(\w+)\s*\([^;{]*\)\s*(?:const)?\s*\{/g,
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

function jsonArrayToCppInit(value: string): string {
  const inner = value.slice(1, -1).trim()
  if (!inner) return "{}"
  return `{${inner}}`
}

function toCppAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (!value.slice(1, -1).trim()) return `vector<int> ${name} = {};`
    return `vector<int> ${name} = ${jsonArrayToCppInit(value)};`
  }
  if (value.startsWith('"')) {
    return `string ${name} = ${value};`
  }
  if (value === "true" || value === "false") {
    return `bool ${name} = ${value};`
  }
  if (/^-?\d+$/.test(value)) {
    return `int ${name} = ${value};`
  }
  if (/^-?\d+\.\d+$/.test(value)) {
    return `double ${name} = ${value};`
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
  const cleanedCode = prepareUserCode(userCode, language)
  const assignments = parseExampleInput(exampleInput)
  const assignmentBlock = buildAssignments(assignments, language)
  const argList = buildArgList(assignments, language)
  const functionNames = extractFunctionNames(cleanedCode, language)

  if (language === "python") {
    const callChain = functionNames
      .map(
        (name) =>
          `try:\n    __result__ = ${name}(${argList})\n    __called__ = True\nexcept TypeError:\n    pass`,
      )
      .join("\n")

    return `${cleanedCode}

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

    return `${cleanedCode}

// --- PeerCode harness ---
${assignmentBlock}
${attempts}
throw new Error("Could not find a matching solution function");
`
  }

  if (language === "java") {
    const methodName = functionNames[0] ?? "solution"

    return `${cleanedCode}

public class Main {
  public static void main(String[] args) {
    ${assignmentBlock.replace(/^/gm, "    ")}
    Solution sol = new Solution();
    Object __result__ = sol.${methodName}(${argList});
    if (__result__ instanceof Boolean) {
      System.out.println(__result__);
    } else if (__result__ instanceof Integer || __result__ instanceof Long || __result__ instanceof Double) {
      System.out.println(__result__);
    } else if (__result__ instanceof String) {
      System.out.println(__result__);
    } else if (__result__ instanceof int[]) {
      System.out.println(java.util.Arrays.toString((int[]) __result__));
    } else {
      System.out.println(__result__);
    }
  }
}
`
  }

  const methodName = functionNames[0] ?? "solution"
  return `#include <bits/stdc++.h>
using namespace std;

${cleanedCode}

// --- PeerCode harness ---
void __peer_print__(bool value) {
  cout << (value ? "true" : "false");
}

void __peer_print__(int value) {
  cout << value;
}

void __peer_print__(long long value) {
  cout << value;
}

void __peer_print__(double value) {
  cout << value;
}

void __peer_print__(const string& value) {
  cout << value;
}

void __peer_print__(const vector<int>& value) {
  cout << "[";
  for (int i = 0; i < (int)value.size(); ++i) {
    if (i > 0) cout << ",";
    cout << value[i];
  }
  cout << "]";
}

template <typename T>
void __peer_print__(const T& value) {
  cout << value;
}

int main() {
  ${assignmentBlock.replace(/^/gm, "  ")}
  auto __result__ = ${methodName}(${argList});
  __peer_print__(__result__);
  cout << endl;
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
