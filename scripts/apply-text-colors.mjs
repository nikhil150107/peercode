import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, "..", "src")

const replacements = [
  ["group-hover:text-emerald-400", "group-hover:text-brand"],
  ["hover:text-emerald-400", "hover:text-brand"],
  ["hover:text-emerald-300", "hover:text-brand-hover"],
  ["hover:text-red-300", "hover:text-danger"],
  ["text-emerald-100/90", "text-brand-soft"],
  ["text-emerald-400/80", "text-brand-soft"],
  ["text-emerald-100", "text-brand-soft"],
  ["text-emerald-400", "text-brand"],
  ["text-emerald-300", "text-brand-hover"],
  ["text-green-400", "text-brand"],
  ["text-green-700", "text-brand"],
  ["text-amber-400", "text-warn"],
  ["text-amber-300", "text-warn"],
  ["text-red-400", "text-danger"],
  ["text-red-300", "text-danger"],
  ["text-violet-400", "text-info"],
  ["text-violet-300", "text-info"],
  ["text-indigo-400", "text-info"],
  [
    "bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent",
    "text-gradient-brand",
  ],
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
  let content = fs.readFileSync(file, "utf8")
  const original = content
  for (const [from, to] of replacements) {
    content = content.split(from).join(to)
  }
  if (content !== original) {
    fs.writeFileSync(file, content)
    changed++
    console.log("updated", path.relative(srcDir, file))
  }
}

console.log(`Done. ${changed} files updated.`)
