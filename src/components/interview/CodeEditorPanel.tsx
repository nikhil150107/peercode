import Editor from "@monaco-editor/react"
import type { Language } from "../../data/mockProblem"
import { languageOptions, monacoLanguage } from "../../data/mockProblem"
import { EMPTY_CODE } from "../../utils/editorTemplates"

type CodeEditorPanelProps = {
  codes: Record<Language, string>
  language: Language
  readOnly?: boolean
  hints?: string[]
  testOutput?: string
  running?: boolean
  className?: string
  onRunCode?: () => void
  onSubmitCode?: () => void
  onCodeChange: (lang: Language, code: string) => void
  onLanguageChange: (lang: Language) => void
}

export default function CodeEditorPanel({
  codes,
  language,
  readOnly = false,
  hints,
  testOutput = "Run your code against example test cases.",
  running = false,
  className = "",
  onRunCode,
  onSubmitCode,
  onCodeChange,
  onLanguageChange,
}: CodeEditorPanelProps) {

  function handleLanguageChange(lang: Language) {
    if (!codes[lang].trim()) {
      onCodeChange(lang, EMPTY_CODE[lang])
    }
    onLanguageChange(lang)
  }

  return (
    <div
      className={`flex h-full w-full shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 lg:w-[60%] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-2">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          disabled={readOnly}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 outline-none focus:border-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {languageOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onRunCode}
          disabled={running || readOnly || !onRunCode}
          className="rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {running ? "Running..." : "Run Code"}
        </button>
        <button
          type="button"
          onClick={onSubmitCode}
          disabled={running || readOnly || !onSubmitCode}
          className="rounded-lg bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
        >
          {running ? "Submitting..." : "Submit"}
        </button>
        {readOnly && (
          <span className="text-xs font-medium text-violet-400">
            View only — interviewee is coding
          </span>
        )}
      </div>

      {hints && hints.length > 0 && (
        <div className="shrink-0 border-b border-zinc-800 bg-violet-500/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Hints
          </p>
          <ul className="mt-2 space-y-1.5">
            {hints.map((hint, i) => (
              <li key={i} className="text-sm leading-relaxed text-zinc-300">
                {i + 1}. {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language={monacoLanguage[language]}
          theme="vs-dark"
          value={codes[language]}
          onChange={(value) => {
            if (!readOnly) onCodeChange(language, value ?? "")
          }}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />
      </div>

      <div className="shrink-0 border-t border-zinc-800 bg-zinc-900/80">
        <div className="border-b border-zinc-800 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Output
        </div>
        <pre className="max-h-48 overflow-auto p-4 font-mono text-sm text-emerald-400 whitespace-pre-wrap">
          {running ? "Running test cases..." : testOutput}
        </pre>
      </div>
    </div>
  )
}
