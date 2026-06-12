import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "theme"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "light" ? "light" : "dark"
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("dark", "light")
  root.classList.add(theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme())

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}

/** Call before React mounts to avoid theme flash */
export function initThemeFromStorage() {
  applyThemeClass(readStoredTheme())
}
