import { useState } from "react"
import { Outlet } from "react-router-dom"
import DashboardNavbar from "../components/DashboardNavbar"
import DashboardSidebar from "../components/DashboardSidebar"
import FeedbackButton from "../components/FeedbackButton"

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <DashboardNavbar
        mobileNavOpen={mobileNavOpen}
        onMobileNavToggle={() => setMobileNavOpen((open) => !open)}
        onMobileNavClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
        <DashboardSidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <FeedbackButton />
    </div>
  )
}
