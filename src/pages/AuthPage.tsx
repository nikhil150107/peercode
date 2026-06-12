import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"

type AuthMode = "login" | "signup"

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

type AuthPageProps = {
  initialMode: AuthMode
}

export default function AuthPage({ initialMode }: AuthPageProps) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const isLogin = mode === "login"

  function switchMode(next: AuthMode) {
    setMode(next)
    setError(null)
    navigate(next === "login" ? "/login" : "/signup", { replace: true })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (authError) throw authError
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
        })
        if (authError) throw authError

        if (!data.session) {
          setError("Check your email to confirm your account before logging in.")
          return
        }
      }

      navigate("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword(e: FormEvent) {
    e.preventDefault()
    setResetLoading(true)
    setError(null)
    setResetSuccess(false)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        resetEmail,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      )
      if (resetError) throw resetError
      setResetSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email",
      )
    } finally {
      setResetLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center px-6 pt-16 pb-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-content sm:text-3xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-content-muted">
              {isLogin
                ? "Log in to book your next mock interview"
                : "Start practicing DSA interviews for free"}
            </p>
          </div>

          <div className="rounded-2xl border border-stroke bg-surface-card/80 p-8 shadow-xl shadow-black/20">
            <div className="mb-6 flex rounded-lg bg-surface-primary p-1 ring-1 ring-stroke">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                  isLogin
                    ? "bg-surface-hover text-content shadow-sm"
                    : "text-content-muted hover:text-content"
                }`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                  !isLogin
                    ? "bg-surface-hover text-content shadow-sm"
                    : "text-content-muted hover:text-content"
                }`}
              >
                Sign up
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {resetSuccess && (
              <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                Check your email for a password reset link
              </div>
            )}

            {showForgotPassword && isLogin && (
              <form
                onSubmit={(e) => void handleForgotPassword(e)}
                className="mb-6 space-y-3 rounded-lg border border-stroke bg-surface-primary/50 p-4"
              >
                <p className="text-sm text-content-muted">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
                <input
                  type="email"
                  required
                  disabled={resetLoading}
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content placeholder:text-content-muted outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {resetLoading ? "Sending..." : "Send reset link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setResetSuccess(false)
                      setError(null)
                    }}
                    className="rounded-lg border border-stroke px-4 py-2 text-sm text-content-muted transition hover:border-stroke hover:text-content"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button
              type="button"
              onClick={() => void handleGoogleLogin()}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-stroke bg-surface-card py-2.5 text-sm font-medium text-content shadow-sm transition hover:bg-surface-hover disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stroke" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-card/80 px-3 text-xs text-content-muted">
                  ── or continue with email ──
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-content"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content placeholder:text-content-muted outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-content"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? "Your password" : "At least 8 characters"}
                  minLength={isLogin ? undefined : 8}
                  className="w-full rounded-lg border border-stroke bg-surface-primary px-4 py-2.5 text-sm text-content placeholder:text-content-muted outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                />
              </div>

              {isLogin && !showForgotPassword && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true)
                      setResetEmail(email)
                      setResetSuccess(false)
                      setError(null)
                    }}
                    className="text-sm text-emerald-400 transition hover:text-emerald-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                    ? "Log in"
                    : "Create account"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-content-muted">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                  Log in
                </button>
              </>
            )}
          </p>

          <p className="mt-4 text-center text-xs text-content-muted">
            By continuing, you agree to PeerCode&apos;s{" "}
            <Link to="/" className="underline hover:text-content-muted">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/" className="underline hover:text-content-muted">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
