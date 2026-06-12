import type { Language } from "./mockProblem"

export type CompilerVersion = {
  id: number
  label: string
}

/**
 * Judge0 language_id values — single source of truth.
 * @see https://ce.judge0.com/languages
 */
export const JUDGE0_LANGUAGE_IDS = {
  cpp17: 54,
  cpp20: 76,
  python3: 71,
  java: 62,
  javascript: 63,
  typescript: 74,
  c: 50,
  go: 60,
  rust: 73,
  kotlin: 78,
  csharp: 51,
  php: 68,
  ruby: 72,
  swift: 83,
} as const

/** Judge0 language_id options grouped by editor language */
export const compilerVersionsByLanguage: Record<Language, CompilerVersion[]> = {
  cpp: [
    { id: JUDGE0_LANGUAGE_IDS.cpp17, label: "C++17" },
    { id: JUDGE0_LANGUAGE_IDS.cpp20, label: "C++20" },
  ],
  python: [{ id: JUDGE0_LANGUAGE_IDS.python3, label: "Python 3" }],
  java: [{ id: JUDGE0_LANGUAGE_IDS.java, label: "Java" }],
  javascript: [{ id: JUDGE0_LANGUAGE_IDS.javascript, label: "JavaScript" }],
  typescript: [{ id: JUDGE0_LANGUAGE_IDS.typescript, label: "TypeScript" }],
  c: [{ id: JUDGE0_LANGUAGE_IDS.c, label: "C" }],
  go: [{ id: JUDGE0_LANGUAGE_IDS.go, label: "Go" }],
  rust: [{ id: JUDGE0_LANGUAGE_IDS.rust, label: "Rust" }],
  kotlin: [{ id: JUDGE0_LANGUAGE_IDS.kotlin, label: "Kotlin" }],
  csharp: [{ id: JUDGE0_LANGUAGE_IDS.csharp, label: "C#" }],
  php: [{ id: JUDGE0_LANGUAGE_IDS.php, label: "PHP" }],
  ruby: [{ id: JUDGE0_LANGUAGE_IDS.ruby, label: "Ruby" }],
  swift: [{ id: JUDGE0_LANGUAGE_IDS.swift, label: "Swift" }],
}

/** Harness/runtime mapping — TypeScript uses JS harness, etc. */
export const harnessLanguageForEditor: Record<Language, Language> = {
  python: "python",
  javascript: "javascript",
  typescript: "javascript",
  java: "java",
  cpp: "cpp",
  c: "c",
  go: "go",
  rust: "rust",
  kotlin: "kotlin",
  csharp: "csharp",
  php: "javascript",
  ruby: "python",
  swift: "javascript",
}

export function defaultCompilerVersion(language: Language): CompilerVersion {
  return compilerVersionsByLanguage[language][0]
}

export function getCompilerVersion(
  language: Language,
  versionId?: number | null,
): CompilerVersion {
  const options = compilerVersionsByLanguage[language]
  if (versionId != null) {
    const match = options.find((option) => option.id === versionId)
    if (match) return match
  }
  return options[0]
}

/** Resolve Judge0 language_id for the editor language + optional version dropdown. */
export function resolveJudge0LanguageId(
  language: Language,
  versionId?: number | null,
): number {
  return getCompilerVersion(language, versionId).id
}

export function isVersionValidForLanguage(
  language: Language,
  versionId: number,
): boolean {
  return compilerVersionsByLanguage[language].some(
    (option) => option.id === versionId,
  )
}

/** Default editor language for new sessions (C++17). */
export const DEFAULT_EDITOR_LANGUAGE: Language = "cpp"
