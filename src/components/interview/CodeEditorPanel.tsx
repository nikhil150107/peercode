import Editor from "@monaco-editor/react"
import { useState, type CSSProperties } from "react"
import type { Language } from "../../data/mockProblem"
import { languageOptions, monacoLanguage } from "../../data/mockProblem"
import {
  compilerVersionsByLanguage,
  defaultCompilerVersion,
} from "../../data/compilerVersions"
import ResizeHandle from "./ResizeHandle"

export type CustomTestCase = {
  id: string
  input: string
  output?: string
}

type OutputTab = "tests" | "custom"

type CodeEditorPanelProps = {
  codes: Record<Language, string>
  language: Language
  compilerVersionId?: number
  hints?: string[]
  testOutput?: string
  customOutput?: string
  customTests?: CustomTestCase[]
  running?: boolean
  runningCustom?: boolean
  className?: string
  style?: CSSProperties
  outputHeight?: number
  onOutputHeightChange?: (height: number) => void
  onRunCode?: () => void
  onSubmitCode?: () => void
  onRunCustom?: (input: string) => void
  onCustomTestsChange?: (tests: CustomTestCase[]) => void
  onCodeChange: (lang: Language, code: string) => void
  onLanguageChange: (lang: Language) => void
  onCompilerVersionChange?: (versionId: number) => void
}

export default function CodeEditorPanel({
  codes,
  language,
  compilerVersionId,
  hints,
  testOutput = "Run your code against example test cases.",
  customOutput = "Run a custom test case to see output here.",
  customTests = [],
  running = false,
  runningCustom = false,
  className = "",
  style,
  outputHeight = 192,
  onOutputHeightChange,
  onRunCode,
  onSubmitCode,
  onRunCustom,
  onCustomTestsChange,
  onCodeChange,
  onLanguageChange,
  onCompilerVersionChange,
}: CodeEditorPanelProps) {
  const [outputTab, setOutputTab] = useState<OutputTab>("tests")
  const [activeCustomId, setActiveCustomId] = useState(
    () => customTests[0]?.id ?? "",
  )
  const [draftCustomInput, setDraftCustomInput] = useState(
    () => customTests[0]?.input ?? "nums = [2,7], target = 9",
  )

  const versions = compilerVersionsByLanguage[language]
  const selectedVersionId =
    compilerVersionId ?? defaultCompilerVersion(language).id

  function handleLanguageChange(lang: Language) {
    onLanguageChange(lang)
    const nextDefault = defaultCompilerVersion(lang)
    onCompilerVersionChange?.(nextDefault.id)
  }

  function handleOutputResize(delta: number) {
    if (!onOutputHeightChange) return
    onOutputHeightChange(Math.min(480, Math.max(96, outputHeight - delta)))
  }

  function addCustomTest() {
    const next: CustomTestCase = {
      id: crypto.randomUUID(),
      input: draftCustomInput.trim() || "nums = [], target = 0",
    }
    const updated = [...customTests, next]
    onCustomTestsChange?.(updated)
    setActiveCustomId(next.id)
  }

  function saveCustomTestInput() {
    if (!onCustomTestsChange) return
    if (customTests.length === 0) {
      addCustomTest()
      return
    }
    const updated = customTests.map((test) =>
      test.id === activeCustomId
        ? { ...test, input: draftCustomInput }
        : test,
    )
    onCustomTestsChange(updated)
  }

  function selectCustomTest(test: CustomTestCase) {
    setActiveCustomId(test.id)
    setDraftCustomInput(test.input)
  }

  function handleRunCustomClick() {
    saveCustomTestInput()
    onRunCustom?.(draftCustomInput.trim())
    setOutputTab("custom")
  }

  return (
    <div
      className={`flex h-full min-w-0 shrink-0 flex-col bg-surface-primary ${className}`}
      style={style}
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-stroke px-4 py-2">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          className="rounded-lg border border-stroke bg-surface-secondary px-3 py-1.5 text-sm text-content outline-none focus:border-emerald-500/50"
        >
          {languageOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {versions.length > 0 && (
          <select
            value={selectedVersionId}
            onChange={(e) =>
              onCompilerVersionChange?.(Number(e.target.value))
            }
            className="rounded-lg border border-stroke bg-surface-secondary px-3 py-1.5 text-sm text-content outline-none focus:border-emerald-500/50"
            aria-label="Compiler version"
          >
            {versions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.label}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={onRunCode}
          disabled={running || !onRunCode}
          className="rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {running ? "Running..." : "Run Code"}
        </button>
        <button
          type="button"
          onClick={onSubmitCode}
          disabled={running || !onSubmitCode}
          className="rounded-lg bg-violet-500 px-4 py-1.5 text-sm font-semibold text-content transition hover:bg-violet-400 disabled:opacity-60"
        >
          {running ? "Submitting..." : "Submit"}
        </button>
      </div>

      {hints && hints.length > 0 && (
        <div className="shrink-0 border-b border-stroke bg-violet-500/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Hints
          </p>
          <ul className="mt-2 space-y-1.5">
            {hints.map((hint, i) => (
              <li key={i} className="text-sm leading-relaxed text-content">
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
          onChange={(value) => onCodeChange(language, value ?? "")}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            lineNumbers: "on",
            automaticLayout: true,
          }}
        />
      </div>

      {onOutputHeightChange && (
        <ResizeHandle direction="vertical" onResize={handleOutputResize} />
      )}

      <div
        className="flex shrink-0 flex-col border-t border-stroke bg-surface-secondary/80"
        style={{ height: outputHeight }}
      >
        <div className="flex items-center border-b border-stroke">
          <button
            type="button"
            onClick={() => setOutputTab("tests")}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
              outputTab === "tests"
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-content-muted hover:text-content"
            }`}
          >
            Output
          </button>
          <button
            type="button"
            onClick={() => setOutputTab("custom")}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
              outputTab === "custom"
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-content-muted hover:text-content"
            }`}
          >
            Custom Test
          </button>
        </div>

        {outputTab === "tests" ? (
          <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-sm text-emerald-400 whitespace-pre-wrap">
            {running ? "Running test cases..." : testOutput}
          </pre>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
            <textarea
              value={draftCustomInput}
              onChange={(e) => setDraftCustomInput(e.target.value)}
              onBlur={saveCustomTestInput}
              placeholder='nums = [2,7], target = 9'
              className="min-h-[72px] flex-1 resize-none rounded-lg border border-stroke bg-surface-primary px-3 py-2 font-mono text-xs text-content outline-none focus:border-emerald-500/50"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRunCustomClick}
                disabled={runningCustom || !onRunCustom}
                className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                {runningCustom ? "Running..." : "Run Custom"}
              </button>
              <button
                type="button"
                onClick={addCustomTest}
                className="rounded-lg border border-stroke px-3 py-1.5 text-xs text-content hover:border-stroke"
              >
                Add test
              </button>
            </div>
            {customTests.length > 0 && (
              <div className="flex flex-wrap gap-1.5 overflow-x-auto">
                {customTests.map((test, index) => (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => selectCustomTest(test)}
                    className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                      test.id === activeCustomId
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-surface-hover text-content-muted"
                    }`}
                  >
                    Test {index + 1}
                  </button>
                ))}
              </div>
            )}
            <pre className="max-h-24 overflow-auto rounded-lg border border-stroke bg-surface-primary p-2 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
              {runningCustom ? "Running custom test..." : customOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
