import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, "..", "src")

const replacements = [
  ["border-zinc-800/80", "border-stroke/80"],
  ["border-zinc-800/60", "border-stroke/60"],
  ["border-zinc-700/50", "border-stroke/50"],
  ["bg-zinc-950/80", "bg-navbar/80"],
  ["bg-zinc-900/80", "bg-surface-secondary/80"],
  ["bg-zinc-900/60", "bg-surface-secondary/60"],
  ["bg-zinc-900/50", "bg-surface-card/80"],
  ["bg-zinc-900/30", "bg-surface-secondary/30"],
  ["bg-zinc-800/80", "bg-surface-hover/80"],
  ["bg-zinc-800/60", "bg-surface-hover/60"],
  ["bg-zinc-800/50", "bg-surface-hover/50"],
  ["bg-zinc-800/40", "bg-surface-hover/40"],
  ["bg-zinc-700/50", "bg-surface-hover/50"],
  ["bg-zinc-700/30", "bg-surface-hover/30"],
  ["bg-zinc-950", "bg-surface-primary"],
  ["bg-zinc-900", "bg-surface-secondary"],
  ["bg-zinc-800", "bg-surface-hover"],
  ["bg-black/60", "bg-surface-overlay/60"],
  ["bg-black/40", "bg-surface-overlay/40"],
  ["border-zinc-800", "border-stroke"],
  ["border-zinc-700", "border-stroke"],
  ["border-zinc-600", "border-stroke"],
  ["text-zinc-100", "text-content"],
  ["text-zinc-200", "text-content"],
  ["text-zinc-300", "text-content"],
  ["text-zinc-400", "text-content-muted"],
  ["text-zinc-500", "text-content-muted"],
  ["text-zinc-600", "text-content-muted"],
  ["text-white", "text-content"],
  ["hover:text-white", "hover:text-content"],
  ["hover:text-zinc-200", "hover:text-content"],
  ["hover:text-zinc-300", "hover:text-content"],
  ["hover:border-zinc-700", "hover:border-stroke"],
  ["hover:border-zinc-500", "hover:border-stroke"],
  ["hover:bg-zinc-800", "hover:bg-surface-hover"],
  ["hover:bg-zinc-700", "hover:bg-surface-hover"],
  ["focus:border-zinc-500", "focus:border-stroke"],
  ["divide-zinc-800", "divide-stroke"],
  ["ring-zinc-600", "ring-stroke"],
  ["from-zinc-900", "from-surface-secondary"],
  ["to-zinc-950", "to-surface-primary"],
  ["via-zinc-900", "via-surface-secondary"],
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (entry.name.endsWith(".tsx")) files.push(full)
  }
  return files
}

let changed = 0
for (const file of walk(srcDir)) {
  if (file.includes("ThemeContext") || file.includes("downloadReviewCard")) continue
  let content = fs.readFileSync(file, "utf8")
  const original = content
  for (const [from, to] of replacements) {
    content = content.split(from).join(to)
  }
  content = content.replace(/var\(--pc-[^)]+\)/g, (match) => {
    if (match.includes("nav")) return "var(--navbar-bg)"
    if (match.includes("border")) return "var(--border)"
    if (match.includes("muted")) return "var(--text-secondary)"
    return "var(--bg-primary)"
  })
  content = content.replace(/border-\[var\(--pc-border\)\]/g, "border-stroke")
  content = content.replace(/bg-\[var\(--pc-nav-bg\)\]/g, "bg-navbar")
  content = content.replace(/bg-\[var\(--pc-bg\)\]/g, "bg-surface-primary")
  content = content.replace(/text-\[var\(--pc-text[^\]]*\)\]/g, "text-content")
  if (content !== original) {
    fs.writeFileSync(file, content)
    changed++
    console.log("updated", path.relative(srcDir, file))
  }
}

console.log(`Done. ${changed} files updated.`)
