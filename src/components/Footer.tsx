import { Link } from "react-router-dom"
import Logo from "./Logo"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"

export default function Footer() {
  const { session } = useAuth()
  const { showToast } = useToast()

  const questionBankPath = session ? "/dashboard/questions" : "/login"

  function handleCommunityClick() {
    showToast("Community — coming soon!", "info")
  }

  return (
    <footer className="border-t border-zinc-800/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <Logo compact />

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <Link to="/about" className="transition hover:text-zinc-300">
              About
            </Link>
            <Link
              to={questionBankPath}
              className="transition hover:text-zinc-300"
            >
              Question Bank
            </Link>
            <button
              type="button"
              onClick={handleCommunityClick}
              className="transition hover:text-zinc-300"
            >
              Community
            </button>
            <Link to="/privacy" className="transition hover:text-zinc-300">
              Privacy
            </Link>
            <Link to="/terms" className="transition hover:text-zinc-300">
              Terms
            </Link>
          </nav>

          <p className="text-sm text-zinc-600">
            © 2026 PeerCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
