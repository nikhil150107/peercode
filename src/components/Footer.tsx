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
    <footer className="border-t border-stroke/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <Logo compact />

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-content-muted">
            <Link to="/about" className="transition hover:text-content">
              About
            </Link>
            <Link
              to={questionBankPath}
              className="transition hover:text-content"
            >
              Question Bank
            </Link>
            <button
              type="button"
              onClick={handleCommunityClick}
              className="transition hover:text-content"
            >
              Community
            </button>
            <Link to="/privacy" className="transition hover:text-content">
              Privacy
            </Link>
            <Link to="/terms" className="transition hover:text-content">
              Terms
            </Link>
          </nav>

          <p className="text-sm text-content-muted">
            © 2026 PeerCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
