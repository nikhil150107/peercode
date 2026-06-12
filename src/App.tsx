import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicOnlyRoute from "./components/PublicOnlyRoute"
import DashboardLayout from "./layouts/DashboardLayout"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import QuestionBankPage from "./pages/QuestionBankPage"
import SessionsPage from "./pages/SessionsPage"
import WaitingRoomPage from "./pages/WaitingRoomPage"
import InterviewRoomPage from "./pages/InterviewRoomPage"
import SessionEndedPage from "./pages/SessionEndedPage"
import FeedbackPage from "./pages/FeedbackPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import NotFoundPage from "./pages/NotFoundPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import AboutPage from "./pages/AboutPage"

function App() {
  return (
    <div className="min-h-screen bg-surface-primary text-content">
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <AuthPage initialMode="login" />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <AuthPage initialMode="signup" />
          </PublicOnlyRoute>
        }
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="questions" element={<QuestionBankPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="/waiting"
        element={
          <ProtectedRoute>
            <WaitingRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/session-ended"
        element={
          <ProtectedRoute>
            <SessionEndedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <FeedbackPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
