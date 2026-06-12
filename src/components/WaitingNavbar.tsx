import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

export default function WaitingNavbar() {
  return (
    <header className="border-b border-stroke/80 bg-navbar/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <ThemeToggle />
      </nav>
    </header>
  )
}
