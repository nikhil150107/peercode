import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })
      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center px-6 pt-16 pb-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
              Reset your password
            </h1>
            <p className="mt-2 text-sm text-content-muted">
              Enter a new password for your account.
            </p>
          </div>

          <div className="rounded-2xl border border-stroke bg-surface-card/80 p-8 shadow-xl shadow-black/20">
            {success ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-400 ring-2 ring-emerald-500/30">
                  ✓
                </div>
                <p className="text-sm text-emerald-400">
                  Password updated successfully! Redirecting to login...
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-1.5 block text-sm font-medium text-content"
                    >
                      New password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content placeholder:text-content-muted outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-1.5 block text-sm font-medium text-content"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      disabled={loading}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content placeholder:text-content-muted outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {loading ? "Updating..." : "Update password"}
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-content-muted">
            <Link
              to="/login"
              className="font-medium text-emerald-400 transition hover:text-emerald-300"
            >
              Back to login
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
