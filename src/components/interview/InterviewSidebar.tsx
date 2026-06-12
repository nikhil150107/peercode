import type { CSSProperties, FormEvent, RefObject } from "react"
import type { Difficulty, Question } from "../../types/question"

export type SidebarChatMessage = {
  id: string
  sender: string
  text: string
  isSelf: boolean
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  Hard: "bg-red-500/15 text-red-400 ring-red-500/30",
}

type InterviewSidebarProps = {
  localVideoRef: RefObject<HTMLVideoElement | null>
  remoteVideoRef: RefObject<HTMLVideoElement | null>
  peerLabel: string
  question: Question | null
  questionLoading?: boolean
  questionLoadingMessage?: string
  questionError?: string | null
  videoLoading?: boolean
  videoError?: string | null
  videoConnectionStatus?:
    | "connecting"
    | "connected"
    | "reconnecting"
    | "failed"
  onRetryVideo?: () => void
  className?: string
  style?: CSSProperties
  showChat?: boolean
  chatMessages?: SidebarChatMessage[]
  onSendChat?: (text: string) => void
}

export default function InterviewSidebar({
  localVideoRef,
  remoteVideoRef,
  peerLabel,
  question,
  questionLoading,
  questionLoadingMessage = "Loading question...",
  questionError,
  videoLoading,
  videoError,
  videoConnectionStatus = "connecting",
  onRetryVideo,
  className = "",
  style,
  showChat = true,
  chatMessages = [],
  onSendChat,
}: InterviewSidebarProps) {
  const statusLabel =
    videoConnectionStatus === "connected"
      ? "Connected"
      : videoConnectionStatus === "connecting"
        ? "Connecting..."
        : videoConnectionStatus === "reconnecting"
          ? "Reconnecting..."
          : "Failed - Click to retry"

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem("chat") as HTMLInputElement
    const text = input.value.trim()
    if (!text || !onSendChat) return

    onSendChat(text)
    input.value = ""
  }

  return (
    <div
      className={`flex h-full min-w-0 shrink-0 flex-col bg-surface-primary ${className}`}
      style={style}
    >
      <div className="relative shrink-0 border-b border-stroke p-2 sm:p-3">
        {videoError && (
          <div className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-center text-xs text-red-400">
            {videoError}
          </div>
        )}
        {videoLoading && !videoError && (
          <p className="mb-2 text-center text-xs text-content-muted">
            Connecting video...
          </p>
        )}
        <div className="mb-2 flex items-center justify-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
              videoConnectionStatus === "connected"
                ? "bg-emerald-500/15 text-emerald-400"
                : videoConnectionStatus === "failed"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-amber-500/15 text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                videoConnectionStatus === "connected"
                  ? "bg-emerald-400"
                  : videoConnectionStatus === "failed"
                    ? "bg-red-400"
                    : "animate-pulse bg-amber-400"
              }`}
            />
            {statusLabel}
          </span>
          {videoConnectionStatus === "failed" && onRetryVideo && (
            <button
              type="button"
              onClick={onRetryVideo}
              className="rounded-md border border-red-500/30 px-2 py-1 text-[10px] font-medium text-red-300 hover:bg-red-500/10"
            >
              Retry
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-stroke bg-surface-secondary/60 sm:rounded-xl">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="aspect-video max-h-20 w-full bg-surface-primary object-cover sm:max-h-none"
            />
            <p className="px-2 py-1.5 text-center text-xs font-medium text-content-muted">
              You
            </p>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-stroke bg-surface-secondary/60 sm:rounded-xl">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="aspect-video max-h-20 w-full bg-surface-primary object-cover sm:max-h-none"
            />
            <p className="px-2 py-1.5 text-center text-xs font-medium text-content-muted">
              {peerLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="rounded-xl border border-stroke bg-surface-card/80 p-4">
          {questionLoading && (
            <p className="text-sm text-content-muted">{questionLoadingMessage}</p>
          )}

          {questionError && (
            <p className="text-sm text-red-400">{questionError}</p>
          )}

          {question && !questionLoading && (
            <>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-content">
                  {question.title}
                </h2>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${difficultyStyles[question.difficulty]}`}
                >
                  {question.difficulty}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-emerald-400/80">
                {question.topic}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-content-muted">
                {question.description}
              </p>
              {question.constraints && (
                <p className="mt-3 text-xs text-content-muted">
                  <span className="font-medium text-content-muted">Constraints: </span>
                  {question.constraints}
                </p>
              )}
              <div className="mt-4 space-y-3">
                {question.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-stroke bg-surface-primary p-3 text-sm"
                  >
                    <p className="font-medium text-content">
                      Example {i + 1}
                    </p>
                    <p className="mt-1 font-mono text-xs text-content-muted">
                      Input: {ex.input}
                    </p>
                    <p className="mt-1 font-mono text-xs text-emerald-400/80">
                      Output: {ex.output}
                    </p>
                    {ex.explanation && (
                      <p className="mt-1 text-xs text-content-muted">
                        {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {showChat && (
        <div className="shrink-0 border-t border-stroke">
          <div className="max-h-40 space-y-2 overflow-y-auto px-4 py-3">
            {chatMessages.length === 0 && (
              <p className="text-center text-xs text-content-muted">
                Send a message to your peer
              </p>
            )}
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.isSelf
                      ? "bg-emerald-500/15 text-emerald-100"
                      : "bg-surface-hover text-content"
                  }`}
                >
                  {!msg.isSelf && (
                    <p className="mb-0.5 text-xs font-medium text-content-muted">
                      {msg.sender}
                    </p>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSend}
            className="flex gap-2 border-t border-stroke p-3"
          >
            <input
              name="chat"
              type="text"
              placeholder="Message your peer..."
              className="flex-1 rounded-lg border border-stroke bg-surface-secondary px-3 py-2 text-sm text-content placeholder:text-content-muted outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              disabled={!onSendChat}
              className="rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-content transition hover:bg-surface-hover disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
