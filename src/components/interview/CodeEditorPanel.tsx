import Editor from "@monaco-editor/react"
import { useEffect, useState, type CSSProperties } from "react"
import type { Language } from "../../data/mockProblem"
import { languageOptions, monacoLanguage } from "../../data/mockProblem"
import {
  compilerVersionsByLanguage,
  getCompilerVersion,
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
  executionHint?: string
  testOutput?: string
  customTests?: CustomTestCase[]
  customInputPlaceholder?: string
  running?: boolean
  runningCustom?: boolean
  runningCustomTestId?: string | null
  className?: string
  style?: CSSProperties
  outputHeight?: number
  onOutputHeightChange?: (height: number) => void
  onRunCode?: () => void
  onSubmitCode?: () => void
  onRunCustom?: (testId: string, input: string) => void
  onCustomTestsChange?: (tests: CustomTestCase[]) => void
  onCodeChange: (lang: Language, code: string) => void
  onLanguageChange: (lang: Language) => void
  onCompilerVersionChange?: (versionId: number) => void
}

export function createCustomTest(input = ""): CustomTestCase {
  return {
    id: crypto.randomUUID(),
    input,
    output: undefined,
  }
}

export default function CodeEditorPanel({
  codes,
  language,
  compilerVersionId,
  hints,
  executionHint,
  testOutput = "Run your code against example test cases.",
  customTests = [],
  customInputPlaceholder = "",
  running = false,
  runningCustom = false,
  runningCustomTestId = null,
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

  const tests =
    customTests.length > 0 ? customTests : [createCustomTest()]
  const activeTest =
    tests.find((test) => test.id === activeCustomId) ?? tests[0]
  const inputPlaceholder =
    customInputPlaceholder.trim() ||
    "Paste stdin for your program (matches the example format in the question panel)"

  const versions = compilerVersionsByLanguage[language]
  const selectedVersion = getCompilerVersion(language, compilerVersionId)
  const selectedVersionId = selectedVersion.id

  useEffect(() => {
    if (
      compilerVersionId != null &&
      compilerVersionId !== selectedVersionId &&
      onCompilerVersionChange
    ) {
      onCompilerVersionChange(selectedVersionId)
    }
  }, [compilerVersionId, language, selectedVersionId, onCompilerVersionChange])

  useEffect(() => {
    if (!tests.some((test) => test.id === activeCustomId)) {
      setActiveCustomId(tests[0]?.id ?? "")
    }
  }, [tests, activeCustomId])

  function handleLanguageChange(lang: Language) {
    onLanguageChange(lang)
    const nextDefault = getCompilerVersion(lang)
    onCompilerVersionChange?.(nextDefault.id)
  }

  function handleOutputResize(delta: number) {
    if (!onOutputHeightChange) return
    onOutputHeightChange(Math.min(480, Math.max(96, outputHeight - delta)))
  }

  function updateActiveTestInput(input: string) {
    if (!onCustomTestsChange) return
    onCustomTestsChange(
      tests.map((test) =>
        test.id === activeTest.id ? { ...test, input } : test,
      ),
    )
  }

  function addCustomTest() {
    const next = createCustomTest("")
    onCustomTestsChange?.([...tests, next])
    setActiveCustomId(next.id)
    setOutputTab("custom")
  }

  function deleteCustomTest(testId: string) {
    if (!onCustomTestsChange) return

    if (tests.length <= 1) {
      const reset = createCustomTest("")
      onCustomTestsChange([reset])
      setActiveCustomId(reset.id)
      return
    }

    const updated = tests.filter((test) => test.id !== testId)
    onCustomTestsChange(updated)
    if (activeCustomId === testId) {
      setActiveCustomId(updated[0]?.id ?? "")
    }
  }

  function handleRunCustomClick() {
    const input = activeTest.input.trim()
    if (!input || !onRunCustom) return
    onRunCustom(activeTest.id, input)
    setOutputTab("custom")
  }

  const activeOutput =
    runningCustom && runningCustomTestId === activeTest.id
      ? "Running custom test..."
      : activeTest.output ?? "Run a custom test to see output here."

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

      {executionHint && (
        <div className="shrink-0 border-b border-stroke bg-emerald-500/5 px-4 py-2.5">
          <p className="text-sm leading-relaxed text-content-muted">
            {executionHint}
          </p>
        </div>
      )}

      {hints && hints.length > 0 && (
        <div className="shrink-0 border-b border-stroke bg-violet-500/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-info">
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
                ? "border-b-2 border-emerald-500 text-brand"
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
                ? "border-b-2 border-emerald-500 text-brand"
                : "text-content-muted hover:text-content"
            }`}
          >
            Custom Test
          </button>
        </div>

        {outputTab === "tests" ? (
          <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-sm text-brand whitespace-pre-wrap">
            {running ? "Running test cases..." : testOutput}
          </pre>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {tests.map((test, index) => (
                <div
                  key={test.id}
                  className={`flex items-center overflow-hidden rounded-md border ${
                    test.id === activeTest.id
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-stroke bg-surface-primary"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveCustomId(test.id)}
                    className={`px-2 py-1 text-[10px] font-medium ${
                      test.id === activeTest.id
                        ? "text-brand-hover"
                        : "text-content-muted hover:text-content"
                    }`}
                  >
                    Test {index + 1}
                  </button>
                  {tests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteCustomTest(test.id)}
                      aria-label={`Delete test ${index + 1}`}
                      className="border-l border-stroke px-1.5 py-1 text-[10px] text-content-muted hover:bg-red-500/10 hover:text-danger"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCustomTest}
                className="rounded-md border border-dashed border-stroke px-2 py-1 text-[10px] font-medium text-content-muted hover:border-emerald-500/40 hover:text-brand"
              >
                + Add test
              </button>
            </div>

            <textarea
              value={activeTest.input}
              onChange={(e) => updateActiveTestInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="min-h-[72px] flex-1 resize-none rounded-lg border border-stroke bg-surface-primary px-3 py-2 font-mono text-xs text-content outline-none focus:border-emerald-500/50"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRunCustomClick}
                disabled={
                  runningCustom || !onRunCustom || !activeTest.input.trim()
                }
                className="rounded-lg bg-emerald-500/90 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                {runningCustom && runningCustomTestId === activeTest.id
                  ? "Running..."
                  : "Run Custom"}
              </button>
            </div>

            <pre className="max-h-24 overflow-auto rounded-lg border border-stroke bg-surface-primary p-2 font-mono text-xs text-brand whitespace-pre-wrap">
              {activeOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
