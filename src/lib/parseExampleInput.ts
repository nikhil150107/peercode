/** Parse LeetCode-style assignment strings (used only for starter templates). */

export type ParsedAssignment = { name: string; value: string }

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
      if (current.trim()) parts.push(current.trim())
      current = ""
      continue
    }

    if (char === "\n" && depth === 0) {
      if (current.trim()) parts.push(current.trim())
      current = ""
      continue
    }

    if (char === "\r") continue

    current += char
  }

  if (current.trim()) parts.push(current.trim())
  return parts
}

export function parseExampleInput(input: string): ParsedAssignment[] {
  return splitTopLevelCommas(input.trim())
    .map((part) => {
      const trimmed = part.trim()
      if (!trimmed || !trimmed.includes("=")) return null
      const eqIndex = trimmed.indexOf("=")
      const name = trimmed.slice(0, eqIndex).trim()
      const value = trimmed.slice(eqIndex + 1).trim()
      if (!name || !value) return null
      return { name, value }
    })
    .filter((part): part is ParsedAssignment => part !== null)
}
