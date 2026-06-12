import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-28">
        <h1 className="text-3xl font-bold text-content">Terms of Service</h1>
        <p className="mt-2 text-sm text-content-muted">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <div className="prose prose-invert mt-8 max-w-none space-y-6 text-content">
          <section>
            <h2 className="text-lg font-semibold text-content">1. About PeerCode</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              PeerCode is a free platform that connects engineers for peer-to-peer
              DSA mock interviews. By using PeerCode, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-content">2. Your account</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              You are responsible for keeping your login credentials secure. You
              must provide accurate information when creating an account and may
              not impersonate others or use the service for harassment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-content">3. Acceptable use</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              Sessions should be respectful and professional. Do not share
              offensive content, spam other users, attempt to disrupt sessions, or
              misuse the code editor or video features. We may suspend accounts
              that violate these rules.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-content">4. Sessions and matching</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              PeerCode matches users based on booked slots but cannot guarantee a
              match for every booking. Session quality depends on participant
              behavior. PeerCode is a practice tool, not a hiring or certification
              service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-content">5. Disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              PeerCode is provided &quot;as is&quot; without warranties. We are not
              liable for interview outcomes, technical issues during sessions, or
              content shared between peers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-content">6. Changes</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-muted">
              We may update these terms from time to time. Continued use of
              PeerCode after changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-content-muted">
          Questions?{" "}
          <Link to="/" className="text-emerald-400 hover:text-emerald-300">
            Return to PeerCode
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}
