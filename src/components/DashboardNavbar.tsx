import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"
import { getInitialsFromName, getUserDisplayName } from "../utils/userDisplay"

type DashboardNavbarProps = {
  mobileNavOpen?: boolean
  onMobileNavToggle?: () => void
  onMobileNavClose?: () => void
}

export default function DashboardNavbar({
  mobileNavOpen = false,
  onMobileNavToggle,
}: DashboardNavbarProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const email = user?.email ?? ""
  const displayName = getUserDisplayName(user)
  const initials = getInitialsFromName(displayName)

  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
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

  function goToProfile() {
    setMenuOpen(false)
    navigate("/dashboard/profile")
  }

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await supabase.auth.signOut()
      navigate("/")
    } catch (err) {
      console.error("[navbar] Sign out failed:", err)
    } finally {
      setSigningOut(false)
      setMenuOpen(false)
    }
  }

  return (
    <header className="theme-nav sticky top-0 z-50 border-b border-[var(--pc-border)] bg-[var(--pc-nav-bg)] backdrop-blur-md">
      <nav className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileNavToggle}
            aria-expanded={mobileNavOpen}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition hover:border-zinc-700 hover:text-white lg:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-1.5 py-1.5 transition hover:border-zinc-700 hover:bg-zinc-900/60 sm:gap-3 sm:px-2"
          >
            <span className="hidden max-w-[180px] truncate text-sm text-zinc-400 md:inline">
              {email}
            </span>
            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 py-1.5 pl-1.5 pr-2 sm:gap-2.5 sm:pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                {initials}
              </div>
              <span className="hidden max-w-[120px] truncate text-sm font-medium text-white sm:inline">
                {displayName}
              </span>
              <svg
                className={`h-4 w-4 shrink-0 text-zinc-500 transition ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 py-1 shadow-xl shadow-black/40"
            >
              <div className="border-b border-zinc-800 px-4 py-2.5 md:hidden">
                <p className="truncate text-sm font-medium text-white">{displayName}</p>
                <p className="truncate text-xs text-zinc-500">{email}</p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={goToProfile}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                <svg className="h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                View Profile
              </button>
              <div className="my-1 border-t border-zinc-800" />
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleSignOut()}
                disabled={signingOut}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          )}
        </div>
        </div>
      </nav>
    </header>
  )
}
