import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "./Logo"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            About
          </Link>
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Get Started
          </Link>
        </div>

        <div ref={menuRef} className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition hover:border-zinc-700 hover:text-white"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 py-1 shadow-xl shadow-black/40">
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                About
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <svg className="h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-zinc-800"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
