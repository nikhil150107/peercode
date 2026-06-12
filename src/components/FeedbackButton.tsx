import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { submitFeedback } from "../lib/feedback"

export default function FeedbackButton() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function closeModal() {
    setOpen(false)
    setMessage("")
    setName("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!message.trim()) {
      showToast("Please enter your feedback", "error")
      return
    }

    setSubmitting(true)
    try {
      await submitFeedback(message, name, user?.id)
      closeModal()
      showToast("Thanks for your feedback! We read every single one 🙏", "success")
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to submit feedback",
        "error",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full border border-stroke bg-surface-secondary/90 px-4 py-2.5 text-sm font-medium text-content shadow-lg backdrop-blur transition hover:border-emerald-500/40 hover:text-brand"
      >
        💬 Feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-surface-overlay/60 p-4 sm:items-center"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-stroke bg-surface-secondary p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="feedback-title"
            aria-modal="true"
          >
            <h2
              id="feedback-title"
              className="text-lg font-semibold text-content"
            >
              Share your feedback
            </h2>

            <form className="mt-4 space-y-4" onSubmit={(e) => void handleSubmit(e)}>
              <div>
                <label
                  htmlFor="feedback-message"
                  className="sr-only"
                >
                  Feedback message
                </label>
                <textarea
                  id="feedback-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's working? What's missing? Any bugs? Tell us anything!"
                  className="w-full resize-none rounded-lg border border-stroke bg-surface-primary px-3 py-2.5 text-sm text-content placeholder:text-content-muted focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label
                  htmlFor="feedback-name"
                  className="mb-1.5 block text-xs font-medium text-content-muted"
                >
                  Name (optional)
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-stroke bg-surface-primary px-3 py-2 text-sm text-content placeholder:text-content-muted focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-content-muted transition hover:text-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-content transition hover:bg-emerald-500 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
