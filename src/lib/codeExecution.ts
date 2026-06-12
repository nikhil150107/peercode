import type { Language } from "../data/mockProblem"
import type { QuestionExample } from "../types/question"
import { SERVER_URL } from "./serverUrl"
import { getVoidExecutionMeta } from "../utils/questionExecution"

function camelToSnake(name: string): string {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "")
}

export const JUDGE0_LANGUAGE_IDS: Record<Language, number> = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54,
}

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
  functionName?: string
}

export type TestCaseResult = {
  index: number
  input: string
  expected: string
  actual: string
  passed: boolean
  error?: string
}

function languageFromId(languageId: number): Language {
  const entry = Object.entries(JUDGE0_LANGUAGE_IDS).find(
    ([, id]) => id === languageId,
  )
  if (!entry) {
    throw new Error(`Unknown language id: ${languageId}`)
  }
  return entry[0] as Language
}

export async function submitToJudge0(
  sourceCode: string,
  languageId: number,
  stdin = "",
): Promise<Judge0Submission> {
  const language = languageFromId(languageId)

  console.log("=== CODE SENT TO EXECUTE ===", sourceCode)
  console.log("=== STDIN ===", stdin)
  console.log("=== LANGUAGE ===", language)

  const response = await fetch(`${SERVER_URL}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: sourceCode, language, stdin }),
  })

  const responseText = await response.text()

  if (!response.ok) {
    console.error("=== EXECUTE ERROR ===", response.status, responseText)
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

function resolveFunctionNames(
  cleanedCode: string,
  language: Language,
  preferredFunctionName?: string,
): string[] {
  const extracted = extractFunctionNames(cleanedCode, language)
  const candidates: string[] = []

  if (preferredFunctionName) {
    candidates.push(preferredFunctionName)
    if (language === "python") {
      candidates.push(camelToSnake(preferredFunctionName))
    }
  }

  candidates.push(...extracted)

  const preferred = ["solution", "solve"]
  const ordered = [
    ...candidates.filter((name) => preferred.includes(name)),
    ...candidates.filter((name) => !preferred.includes(name)),
  ]

  return [...new Set(ordered.filter(Boolean))]
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
    if (!inner) {
      if (isJavaTreeArrayParam(name, value)) {
        return `Integer[] __${name}_values__ = new Integer[0];`
      }
      return `int[] ${name} = new int[] {};`
    }

    if (isJavaTreeArrayParam(name, value)) {
      return toJavaIntegerArrayAssignment(name, value)
    }

    const nums = splitTopLevelCommas(inner)
    if (nums.every((n) => /^-?\d+$/.test(n.trim()))) {
      return `int[] ${name} = {${nums.map((n) => n.trim()).join(", ")}};`
    }

    if (nums.some((n) => n.trim().toLowerCase() === "null")) {
      return toJavaIntegerArrayAssignment(name, value)
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

const JAVA_TREE_PARAM_NAMES = new Set(["root", "p", "q"])

function isJavaTreeArrayParam(name: string, value: string): boolean {
  if (!value.startsWith("[")) return false
  return JAVA_TREE_PARAM_NAMES.has(name)
}

function toJavaIntegerArrayAssignment(name: string, value: string): string {
  const inner = value.slice(1, -1).trim()
  if (!inner) {
    return `Integer[] __${name}_values__ = new Integer[0];`
  }

  const elements = splitTopLevelCommas(inner).map((element) => {
    const trimmed = element.trim()
    if (trimmed.toLowerCase() === "null") return "null"
    return trimmed
  })

  return `Integer[] __${name}_values__ = new Integer[]{${elements.join(", ")}};`
}

function userDefinesTreeNode(code: string): boolean {
  return /class\s+TreeNode\b/.test(code)
}

function buildJavaHarnessContext(
  assignments: { name: string; value: string }[],
  cleanedCode: string,
): {
  assignmentBlock: string
  argList: string
  usesTreeConversion: boolean
  injectTreeNodeClass: boolean
} {
  const lines: string[] = []
  const args: string[] = []
  let usesTreeConversion = false

  for (const { name, value } of assignments) {
    if (isJavaTreeArrayParam(name, value)) {
      usesTreeConversion = true
      lines.push(toJavaIntegerArrayAssignment(name, value))
      lines.push(`TreeNode ${name} = __peer_build_tree__(__${name}_values__);`)
      args.push(name)
      continue
    }

    lines.push(toJavaAssignment(name, value))
    args.push(name)
  }

  return {
    assignmentBlock: lines.join("\n"),
    argList: args.join(", "),
    usesTreeConversion,
    injectTreeNodeClass:
      usesTreeConversion && !userDefinesTreeNode(cleanedCode),
  }
}

const JAVA_TREE_NODE_CLASS = `
class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode() {}
  TreeNode(int val) { this.val = val; }
  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
`

const JAVA_TREE_MAIN_HELPERS = `
  static TreeNode __peer_build_tree__(Integer[] nodes) {
    if (nodes == null || nodes.length == 0 || nodes[0] == null) {
      return null;
    }
    TreeNode root = new TreeNode(nodes[0]);
    java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
    queue.offer(root);
    int i = 1;
    while (!queue.isEmpty() && i < nodes.length) {
      TreeNode current = queue.poll();
      if (i < nodes.length && nodes[i] != null) {
        current.left = new TreeNode(nodes[i]);
        queue.offer(current.left);
      }
      i++;
      if (i < nodes.length && nodes[i] != null) {
        current.right = new TreeNode(nodes[i]);
        queue.offer(current.right);
      }
      i++;
    }
    return root;
  }
`

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

function resolveVoidExecution(functionNames: string[]) {
  for (const name of functionNames) {
    const meta = getVoidExecutionMeta(name)
    if (meta) {
      return { functionName: name, ...meta }
    }
  }
  return null
}

function buildRunnableCode(
  userCode: string,
  language: Language,
  exampleInput: string,
  preferredFunctionName?: string,
): string {
  const cleanedCode = prepareUserCode(userCode, language)
  const assignments = parseExampleInput(exampleInput)
  const assignmentBlock = buildAssignments(assignments, language)
  const argList = buildArgList(assignments, language)
  const functionNames = resolveFunctionNames(
    cleanedCode,
    language,
    preferredFunctionName,
  )
  const voidExecution = resolveVoidExecution(functionNames)

  if (language === "python") {
    if (voidExecution) {
      const pyName =
        functionNames.find((name) => getVoidExecutionMeta(name)) ??
        voidExecution.functionName
      return `${cleanedCode}

# --- PeerCode harness ---
${assignmentBlock}
__called__ = False
try:
    ${pyName}(${argList})
    __called__ = True
except TypeError:
    pass
if not __called__:
    raise Exception("Could not find a matching solution function")
import json
__out__ = ${voidExecution.outputVar}[:${voidExecution.lengthExpr}]
print(json.dumps(__out__, separators=(',', ':')))
`
    }

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
    if (voidExecution) {
      const jsName =
        functionNames.find((name) => getVoidExecutionMeta(name)) ??
        voidExecution.functionName
      return `${cleanedCode}

// --- PeerCode harness ---
${assignmentBlock}
if (typeof ${jsName} === "function") {
  ${jsName}(${argList});
  const __out__ = ${voidExecution.outputVar}.slice(0, ${voidExecution.lengthExpr});
  console.log(JSON.stringify(__out__));
  process.exit(0);
}
throw new Error("Could not find a matching solution function");
`
    }

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
    const javaContext = buildJavaHarnessContext(assignments, cleanedCode)
    const javaAssignments = javaContext.assignmentBlock.replace(/^/gm, "    ")
    const javaArgs = javaContext.argList
    const treeNodeClass = javaContext.injectTreeNodeClass
      ? JAVA_TREE_NODE_CLASS
      : ""
    const treeMainHelpers = javaContext.usesTreeConversion
      ? JAVA_TREE_MAIN_HELPERS
      : ""

    if (voidExecution) {
      return `${cleanedCode}
${treeNodeClass}
public class Main {${treeMainHelpers}
  public static void main(String[] args) {
${javaAssignments}
    Solution sol = new Solution();
    sol.${methodName}(${javaArgs});
    int[] __out__ = java.util.Arrays.copyOfRange(${voidExecution.outputVar}, 0, ${voidExecution.lengthExpr});
    System.out.println(java.util.Arrays.toString(__out__));
  }
}
`
    }

    return `${cleanedCode}
${treeNodeClass}
public class Main {${treeMainHelpers}
  public static void main(String[] args) {
${javaAssignments}
    Solution sol = new Solution();
    Object __result__ = sol.${methodName}(${javaArgs});
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

  if (voidExecution) {
    return `#include <bits/stdc++.h>
using namespace std;

${cleanedCode}

// --- PeerCode harness ---
void __peer_print__(const vector<int>& value) {
  cout << "[";
  for (int i = 0; i < (int)value.size(); ++i) {
    if (i > 0) cout << ",";
    cout << value[i];
  }
  cout << "]";
}

int main() {
  ${assignmentBlock.replace(/^/gm, "  ")}
  ${methodName}(${argList});
  vector<int> __out__(${voidExecution.outputVar}.begin(), ${voidExecution.outputVar}.begin() + (${voidExecution.lengthExpr}));
  __peer_print__(__out__);
  cout << endl;
  return 0;
}
`
  }

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
  options: ExecutionOptions = {},
): Promise<TestCaseResult> {
  const languageId = JUDGE0_LANGUAGE_IDS[language]
  const runnableCode = buildRunnableCode(
    userCode,
    language,
    example.input,
    options.functionName,
  )

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
