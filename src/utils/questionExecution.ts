import type { Language } from "../data/mockProblem"
import type { Question } from "../types/question"
import { parseExampleInput } from "../lib/codeExecution"

/** LeetCode-style names that differ from title-derived camelCase */
const FUNCTION_NAME_OVERRIDES: Record<string, string> = {
  "Best Time to Buy and Sell Stock": "maxProfit",
  "Longest Substring Without Repeating Characters": "lengthOfLongestSubstring",
  "Container With Most Water": "maxArea",
  "Valid Palindrome": "isPalindrome",
  "Maximum Subarray": "maxSubArray",
  "Merge Intervals": "merge",
  "Merge Sorted Array": "merge",
  "Binary Tree Level Order Traversal": "levelOrder",
  "Reverse Linked List": "reverseList",
  "Linked List Cycle": "hasCycle",
  "Climbing Stairs": "climbStairs",
  "House Robber": "rob",
  "Coin Change": "coinChange",
  "Word Break": "wordBreak",
  "Number of Islands": "numIslands",
  "Course Schedule": "canFinish",
  "Implement Trie (Prefix Tree)": "Trie",
  "Serialize and Deserialize Binary Tree": "Codec",
  "Find Median from Data Stream": "MedianFinder",
  "Trapping Rain Water": "trap",
  "Product of Array Except Self": "productExceptSelf",
  "Rotate Array": "rotate",
  "Spiral Matrix": "spiralOrder",
  "Set Matrix Zeroes": "setZeroes",
  "Longest Consecutive Sequence": "longestConsecutive",
  "Encode and Decode Strings": "Codec",
  "Meeting Rooms II": "minMeetingRooms",
  "Graph Valid Tree": "validTree",
  "Alien Dictionary": "alienOrder",
  "Reconstruct Itinerary": "findItinerary",
  "Minimum Window Substring": "minWindow",
  "Daily Temperatures": "dailyTemperatures",
  "Car Fleet": "carFleet",
  "Largest Rectangle in Histogram": "largestRectangleArea",
}

export function titleToFunctionName(title: string): string {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return "solution"

  return words
    .map((word, index) => {
      const lower = word.toLowerCase()
      if (index === 0) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join("")
}

function extractFunctionNameFromDescription(description: string): string | null {
  const patterns = [
    /(?:function|implement)\s+(?:the\s+)?(\w+)\s*\(/i,
    /(\w+)\s*\([^)]*\)\s+function/i,
  ]

  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match?.[1] && match[1] !== "function") {
      return match[1]
    }
  }

  return null
}

export function resolveFunctionName(question: Question): string {
  if (question.function_name?.trim()) {
    return question.function_name.trim()
  }

  if (FUNCTION_NAME_OVERRIDES[question.title]) {
    return FUNCTION_NAME_OVERRIDES[question.title]
  }

  const fromDescription = extractFunctionNameFromDescription(question.description)
  if (fromDescription) {
    return fromDescription
  }

  return titleToFunctionName(question.title)
}

export function camelToSnake(name: string): string {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "")
}

type ParamType = "int[]" | "int" | "string" | "bool" | "double" | "unknown"
type ReturnType = ParamType | "int[][]" | "void"

type SignatureOverride = {
  functionName: string
  returnType: ReturnType
  params: { name: string; type: ParamType }[]
  /** For void functions: param to print after call (e.g. nums1) */
  inPlaceOutputParam?: string
  /** Expression for how many elements to print from inPlaceOutputParam */
  inPlaceOutputLengthExpr?: string
}

const SIGNATURE_OVERRIDES: Record<string, SignatureOverride> = {
  "Merge Sorted Array": {
    functionName: "merge",
    returnType: "void",
    params: [
      { name: "nums1", type: "int[]" },
      { name: "m", type: "int" },
      { name: "nums2", type: "int[]" },
      { name: "n", type: "int" },
    ],
    inPlaceOutputParam: "nums1",
    inPlaceOutputLengthExpr: "m + n",
  },
}

export function getSignatureOverride(
  question: Question,
): SignatureOverride | null {
  if (SIGNATURE_OVERRIDES[question.title]) {
    return SIGNATURE_OVERRIDES[question.title]
  }
  return null
}

export function getVoidExecutionMeta(functionName: string): {
  outputVar: string
  lengthExpr: string
} | null {
  const override = Object.values(SIGNATURE_OVERRIDES).find(
    (entry) => entry.functionName === functionName && entry.returnType === "void",
  )
  if (!override?.inPlaceOutputParam) return null
  return {
    outputVar: override.inPlaceOutputParam,
    lengthExpr: override.inPlaceOutputLengthExpr ?? "0",
  }
}

function inferParamType(value: string): ParamType {
  const trimmed = value.trim()
  if (trimmed.startsWith("[")) return "int[]"
  if (trimmed.startsWith('"')) return "string"
  if (trimmed === "true" || trimmed === "false") return "bool"
  if (/^-?\d+$/.test(trimmed)) return "int"
  if (/^-?\d+\.\d+$/.test(trimmed)) return "double"
  return "unknown"
}

function inferReturnHint(output: string): ReturnType {
  const trimmed = output.trim()
  if (trimmed === "true" || trimmed === "false") return "bool"
  if (trimmed.startsWith("[[")) return "int[][]"
  if (trimmed.startsWith("[")) return "int[]"
  if (/^-?\d+$/.test(trimmed)) return "int"
  if (trimmed.startsWith('"')) return "string"
  return "unknown"
}

function javaType(type: ReturnType | ParamType): string {
  switch (type) {
    case "void":
      return "void"
    case "int[]":
      return "int[]"
    case "int[][]":
      return "java.util.List<java.util.List<Integer>>"
    case "int":
      return "int"
    case "string":
      return "String"
    case "bool":
      return "boolean"
    case "double":
      return "double"
    default:
      return "Object"
  }
}

function cppType(type: ParamType | "int[][]"): string {
  switch (type) {
    case "int[]":
      return "vector<int>&"
    case "int[][]":
      return "vector<vector<int>>&"
    case "int":
      return "int"
    case "string":
      return "string&"
    case "bool":
      return "bool"
    case "double":
      return "double"
    default:
      return "auto"
  }
}

function javaDefaultReturn(type: ParamType | "int[][]"): string {
  switch (type) {
    case "int[]":
      return "new int[] {}"
    case "int[][]":
      return "new java.util.ArrayList<>()"
    case "int":
      return "0"
    case "string":
      return '""'
    case "bool":
      return "false"
    case "double":
      return "0.0"
    default:
      return "null"
  }
}

function buildJavaStarter(
  functionName: string,
  params: { name: string; type: ParamType }[],
  returnType: ReturnType,
): string {
  const paramList = params
    .map((param) => `${javaType(param.type)} ${param.name}`)
    .join(", ")

  if (returnType === "void") {
    return `import java.util.*;

class Solution {
    public void ${functionName}(${paramList}) {
        // Write your solution here
    }
}`
  }

  return `import java.util.*;

class Solution {
    public ${javaType(returnType)} ${functionName}(${paramList}) {
        return ${javaDefaultReturn(returnType)};
    }
}`
}

function buildCppStarter(
  functionName: string,
  params: { name: string; type: ParamType }[],
  returnType: ReturnType,
): string {
  const paramList = params
    .map((param) => {
      const type = cppType(param.type)
      if (type.endsWith("&")) return `${type} ${param.name}`
      return `${type} ${param.name}`
    })
    .join(", ")

  if (returnType === "void") {
    return `void ${functionName}(${paramList}) {
    // Write your solution here
}`
  }

  const returnCpp =
    returnType === "int[]"
      ? "vector<int>"
      : returnType === "int[][]"
        ? "vector<vector<int>>"
        : returnType === "bool"
          ? "bool"
          : returnType === "string"
            ? "string"
            : returnType === "int"
              ? "int"
              : returnType === "double"
                ? "double"
                : "auto"

  const defaultReturn =
    returnType === "int[]" || returnType === "int[][]"
      ? "{}"
      : returnType === "bool"
        ? "false"
        : returnType === "string"
          ? '""'
          : returnType === "int"
            ? "0"
            : returnType === "double"
              ? "0.0"
              : "{}"

  return `${returnCpp} ${functionName}(${paramList}) {
    return ${defaultReturn};
}`
}

function buildPythonStarter(
  functionName: string,
  params: { name: string }[],
  returnType: ReturnType,
): string {
  const paramList = params.map((param) => param.name).join(", ")
  if (returnType === "void") {
    return `def ${camelToSnake(functionName)}(${paramList}):
    # Write your solution here
    pass`
  }
  return `def ${camelToSnake(functionName)}(${paramList}):
    pass`
}

function buildJavaScriptStarter(
  functionName: string,
  params: { name: string }[],
  returnType: ReturnType,
): string {
  const paramList = params.map((param) => param.name).join(", ")
  if (returnType === "void") {
    return `function ${functionName}(${paramList}) {
  // Write your solution here
}`
  }
  return `function ${functionName}(${paramList}) {

}`
}

export function buildStarterCodeForLanguage(
  question: Question,
  language: Language,
): string {
  if (question.starter_code?.[language]?.trim()) {
    return question.starter_code[language]
  }

  const signatureOverride = getSignatureOverride(question)
  const functionName = signatureOverride?.functionName ?? resolveFunctionName(question)
  const firstExample = question.examples[0]
  if (!firstExample) {
    return language === "python"
      ? `# Write your solution here\n`
      : `// Write your solution here\n`
  }

  const assignments = parseExampleInput(firstExample.input)
  const params = signatureOverride
    ? signatureOverride.params
    : assignments.map(({ name, value }) => ({
        name,
        type: inferParamType(value),
      }))
  const returnType =
    signatureOverride?.returnType ?? inferReturnHint(firstExample.output)

  switch (language) {
    case "python":
      return buildPythonStarter(functionName, params, returnType)
    case "javascript":
      return buildJavaScriptStarter(functionName, params, returnType)
    case "java":
      return buildJavaStarter(functionName, params, returnType)
    case "cpp":
      return buildCppStarter(functionName, params, returnType)
    default:
      return `// Write your solution here\n`
  }
}

export function buildStarterCodeForQuestion(
  question: Question,
): Record<Language, string> {
  return {
    python: buildStarterCodeForLanguage(question, "python"),
    javascript: buildStarterCodeForLanguage(question, "javascript"),
    java: buildStarterCodeForLanguage(question, "java"),
    cpp: buildStarterCodeForLanguage(question, "cpp"),
  }
}
