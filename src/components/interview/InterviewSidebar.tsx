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
  className = "",
  style,
  showChat = true,
  chatMessages = [],
  onSendChat,
}: InterviewSidebarProps) {
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
      className={`flex h-full min-w-0 shrink-0 flex-col bg-zinc-950 ${className}`}
      style={style}
    >
      <div className="relative shrink-0 border-b border-zinc-800 p-2 sm:p-3">
        {videoError && (
          <div className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-center text-xs text-red-400">
            {videoError}
          </div>
        )}
        {videoLoading && !videoError && (
          <p className="mb-2 text-center text-xs text-zinc-500">
            Connecting video...
          </p>
        )}
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/60 sm:rounded-xl">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="aspect-video max-h-20 w-full bg-zinc-950 object-cover sm:max-h-none"
            />
            <p className="px-2 py-1.5 text-center text-xs font-medium text-zinc-400">
              You
            </p>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/60 sm:rounded-xl">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="aspect-video max-h-20 w-full bg-zinc-950 object-cover sm:max-h-none"
            />
            <p className="px-2 py-1.5 text-center text-xs font-medium text-zinc-400">
              {peerLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          {questionLoading && (
            <p className="text-sm text-zinc-500">{questionLoadingMessage}</p>
          )}

          {questionError && (
            <p className="text-sm text-red-400">{questionError}</p>
          )}

          {question && !questionLoading && (
            <>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-white">
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
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {question.description}
              </p>
              {question.constraints && (
                <p className="mt-3 text-xs text-zinc-500">
                  <span className="font-medium text-zinc-400">Constraints: </span>
                  {question.constraints}
                </p>
              )}
              <div className="mt-4 space-y-3">
                {question.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-sm"
                  >
                    <p className="font-medium text-zinc-300">
                      Example {i + 1}
                    </p>
                    <p className="mt-1 font-mono text-xs text-zinc-500">
                      Input: {ex.input}
                    </p>
                    <p className="mt-1 font-mono text-xs text-emerald-400/80">
                      Output: {ex.output}
                    </p>
                    {ex.explanation && (
                      <p className="mt-1 text-xs text-zinc-500">
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
        <div className="shrink-0 border-t border-zinc-800">
          <div className="max-h-40 space-y-2 overflow-y-auto px-4 py-3">
            {chatMessages.length === 0 && (
              <p className="text-center text-xs text-zinc-600">
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
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {!msg.isSelf && (
                    <p className="mb-0.5 text-xs font-medium text-zinc-500">
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
            className="flex gap-2 border-t border-zinc-800 p-3"
          >
            <input
              name="chat"
              type="text"
              placeholder="Message your peer..."
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              disabled={!onSendChat}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
