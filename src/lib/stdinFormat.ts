import { parseExampleInput } from "./parseExampleInput"

function isLeetCodeAssignmentFormat(input: string): boolean {
  const trimmed = input.trim()
  if (!trimmed.includes("=")) return false
  return /=/.test(trimmed)
}

function parseValue(raw: string): unknown {
  const value = raw.trim()
  if (value === "true") return true
  if (value === "false") return false
  if (value === "null") return null
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value) as unknown
    } catch {
      return value.slice(1, -1)
    }
  }
  if (value.startsWith("[")) {
    try {
      return JSON.parse(value) as unknown
    } catch {
      return value
    }
  }
  if (/^-?\d+$/.test(value)) return Number.parseInt(value, 10)
  if (/^-?\d+\.\d+$/.test(value)) return Number.parseFloat(value)
  return value
}

function valueToStdinLines(value: unknown): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return ["0"]
    }

    const isMatrix = value.every((item) => Array.isArray(item))
    if (isMatrix) {
      const rows = value as unknown[][]
      const cols = rows[0]?.length ?? 0
      return [
        `${rows.length} ${cols}`,
        ...rows.map((row) => row.map(String).join(" ")),
      ]
    }

    return [`${value.length}`, value.map(String).join(" ")]
  }

  if (typeof value === "boolean") {
    return [value ? "true" : "false"]
  }

  if (typeof value === "number") {
    return [String(value)]
  }

  if (typeof value === "string") {
    return [value]
  }

  return [String(value)]
}

/** Convert LeetCode assignment input or pass through raw CP stdin. */
export function toCpStdin(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ""

  if (!isLeetCodeAssignmentFormat(trimmed)) {
    return trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`
  }

  const assignments = parseExampleInput(trimmed)
  if (assignments.length === 0) {
    return trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`
  }

  const lines: string[] = []
  for (const { value } of assignments) {
    lines.push(...valueToStdinLines(parseValue(value)))
  }

  return `${lines.join("\n")}\n`
}

/** Convert LeetCode-style expected output to CP stdout format. */
export function toCpExpectedStdout(output: string): string {
  const trimmed = output.trim()
  if (!trimmed) return ""

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return ""
        if (parsed.every((item) => Array.isArray(item))) {
          return (parsed as unknown[][]).map((row) => row.join(" ")).join("\n")
        }
        return parsed.map(String).join(" ")
      }
    } catch {
      // fall through
    }
  }

  return trimmed
}

function normalizeLine(line: string): string {
  const collapsed = line.trim().replace(/\s+/g, " ")
  if (/^-?\d+\.\d+$/.test(collapsed)) {
    return String(Number.parseFloat(collapsed))
  }
  return collapsed.toLowerCase()
}

export function normalizeCpOutput(value: string): string {
  const converted = toCpExpectedStdout(value)
  return converted
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(normalizeLine)
    .join("\n")
    .trim()
}

export function compareCpOutput(actual: string, expected: string): boolean {
  return normalizeCpOutput(actual) === normalizeCpOutput(expected)
}
