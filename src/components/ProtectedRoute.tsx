import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
