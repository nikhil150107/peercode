import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

type LogoProps = {
  compact?: boolean
}

export default function Logo({ compact = false }: LogoProps) {
  const navigate = useNavigate()
  const { session } = useAuth()

  function handleClick() {
    navigate(session ? "/dashboard" : "/")
  }

  const iconSize = compact ? "h-8 w-8" : "h-9 w-9"
  const svgSize = compact ? "h-4 w-4" : "h-5 w-5"
  const textSize = compact ? "text-sm" : "text-lg"

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2.5 group"
      aria-label="PeerCode home"
    >
      <div
        className={`flex ${iconSize} items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/20`}
      >
        <svg
          className={`${svgSize} text-emerald-400`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
      <span className={`${textSize} font-semibold tracking-tight text-white`}>
        Peer<span className="text-emerald-400">Code</span>
      </span>
    </button>
  )
}
