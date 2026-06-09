import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading...
      </div>
    )
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
