import Logo from "./Logo"

export default function WaitingNavbar() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-6">
        <Logo />
      </nav>
    </header>
  )
}
