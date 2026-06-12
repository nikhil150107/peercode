import type { Language } from "../../data/mockProblem"

export type ParsedAssignment = { name: string; value: string }

export const TREE_PARAM_NAMES = new Set(["root", "p", "q"])
export const LIST_PARAM_NAMES = new Set(["head", "l1", "l2"])

export function isListArrayParam(name: string, value: string): boolean {
  if (!value.startsWith("[")) return false
  return LIST_PARAM_NAMES.has(name)
}

export function splitTopLevelCommas(input: string): string[] {
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

export function isTreeArrayParam(name: string, value: string): boolean {
  if (!value.startsWith("[")) return false
  return TREE_PARAM_NAMES.has(name) || /\bnull\b/i.test(value)
}

export function isNestedArray(value: string): boolean {
  return value.trim().startsWith("[[")
}

export function isPlainIntArray(value: string): boolean {
  if (!value.startsWith("[") || isNestedArray(value)) return false
  const inner = value.slice(1, -1).trim()
  if (!inner) return true
  return splitTopLevelCommas(inner).every((part) => /^-?\d+$/.test(part.trim()))
}

export type HarnessContext = {
  assignmentBlock: string
  argList: string
  prelude: string
  mainHelpers: string
  usesTree: boolean
}

export function parseArrayElements(value: string): string[] {
  const inner = value.slice(1, -1).trim()
  if (!inner) return []
  return splitTopLevelCommas(inner).map((el) => el.trim())
}
