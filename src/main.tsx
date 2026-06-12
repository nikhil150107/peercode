import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider, initThemeFromStorage } from "./context/ThemeContext"
import { ToastProvider } from "./context/ToastContext"
import ToastContainer from "./components/ToastContainer"
import "./index.css"
import App from "./App.tsx"

initThemeFromStorage()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
