import type { Language } from "./mockProblem"

export type CompilerVersion = {
  id: number
  label: string
}

/** Judge0 language_id options grouped by editor language */
export const compilerVersionsByLanguage: Record<Language, CompilerVersion[]> = {
  python: [
    { id: 71, label: "Python 3.8" },
    { id: 92, label: "Python 3.10" },
  ],
  javascript: [{ id: 63, label: "JavaScript (Node)" }],
  typescript: [{ id: 74, label: "TypeScript" }],
  java: [
    { id: 62, label: "Java 17" },
    { id: 91, label: "Java 21" },
  ],
  cpp: [
    { id: 54, label: "C++17" },
    { id: 76, label: "C++20" },
  ],
  c: [{ id: 50, label: "C (GCC)" }],
  go: [{ id: 60, label: "Go" }],
  rust: [{ id: 73, label: "Rust" }],
  kotlin: [{ id: 78, label: "Kotlin" }],
  csharp: [{ id: 51, label: "C#" }],
  php: [{ id: 68, label: "PHP" }],
  ruby: [{ id: 72, label: "Ruby" }],
  swift: [{ id: 83, label: "Swift" }],
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
  versionId?: number,
): CompilerVersion {
  const options = compilerVersionsByLanguage[language]
  if (versionId != null) {
    const match = options.find((option) => option.id === versionId)
    if (match) return match
  }
  return options[0]
}
