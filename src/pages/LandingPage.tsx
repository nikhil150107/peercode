import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Features from "../components/Features"
import CTASection from "../components/CTASection"
import Footer from "../components/Footer"

export default function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === "#how-it-works") {
      document
        .getElementById("how-it-works")
        ?.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
