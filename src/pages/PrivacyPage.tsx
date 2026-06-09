import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-28">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <div className="mt-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Information we collect</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              When you sign up, we collect your email address and profile
              information (such as display name from Google OAuth). During
              sessions we store interview metadata including questions practiced,
              ratings, session history, and slot bookings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. How we use your data</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              We use your information to authenticate you, match you with peers,
              send booking and match confirmation emails, display your session
              history, and improve the PeerCode experience. We do not sell your
              personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Session data</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Code written during interviews is shared in real time with your
              matched peer. Video and audio streams are peer-to-peer via WebRTC
              and are not recorded or stored by PeerCode.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Third-party services</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              PeerCode uses Supabase for authentication and database storage,
              Resend for transactional emails, and Judge0 for code execution.
              These providers process data according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Data retention</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Session history and profile data are retained while your account is
              active. You may request account deletion by contacting us; we will
              remove your personal data within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Your rights</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              You can view your session history and profile information within
              the app. You may update preferences and sign out at any time.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-zinc-500">
          See also our{" "}
          <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
            Terms of Service
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  )
}
