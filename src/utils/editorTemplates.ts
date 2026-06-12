import type { Language } from "../data/mockProblem"

export const EMPTY_CODE: Record<Language, string> = {
  python: "# Write your solution here\n",
  javascript: "// Write your solution here\n",
  java: "// Write your solution here\n",
  cpp: "// Write your solution here\n",
  c: "// Write your solution here\n",
  go: "// Write your solution here\n",
  rust: "// Write your solution here\n",
  kotlin: "// Write your solution here\n",
  csharp: "// Write your solution here\n",
}

const PLACEHOLDER_PATTERNS: Record<Language, RegExp[]> = {
  python: [
    /^#\s*Write your solution here\s*$/i,
    /^pass\s*$/i,
  ],
  javascript: [
    /^\/\/\s*Write your solution here\s*$/i,
    /^function\s+\w+\s*\([^)]*\)\s*\{\s*\}\s*$/s,
  ],
  java: [
    /^\/\/\s*Write your solution here\s*$/i,
  ],
  cpp: [
    /^\/\/\s*Write your solution here\s*$/i,
  ],
  c: [/^\/\/\s*Write your solution here\s*$/i],
  go: [/^\/\/\s*Write your solution here\s*$/i],
  rust: [/^\/\/\s*Write your solution here\s*$/i],
  kotlin: [/^\/\/\s*Write your solution here\s*$/i],
  csharp: [/^\/\/\s*Write your solution here\s*$/i],
}

export function isPlaceholderCode(code: string, language: Language): boolean {
  const normalized = code.trim()
  if (!normalized) return true
  if (normalized === EMPTY_CODE[language].trim()) return true
  return PLACEHOLDER_PATTERNS[language].some((pattern) => pattern.test(normalized))
}
