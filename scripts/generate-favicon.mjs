import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const publicDir = join(root, "public")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#064e3b"/>
  <text x="50" y="68" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="52" font-weight="700" fill="#10b981" text-anchor="middle">&lt;/&gt;</text>
</svg>`

writeFileSync(join(publicDir, "favicon.svg"), svg)

const { Resvg } = await import("@resvg/resvg-js")
const { default: toIco } = await import("to-ico")

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 32 },
  font: { loadSystemFonts: true },
})
const png32 = resvg.render().asPng()

const resvg64 = new Resvg(svg, {
  fitTo: { mode: "width", value: 64 },
  font: { loadSystemFonts: true },
})
const png64 = resvg64.render().asPng()

const ico = await toIco([png32, png64])
writeFileSync(join(publicDir, "favicon.ico"), ico)
writeFileSync(join(publicDir, "favicon.png"), png32)

console.log("Generated public/favicon.svg, favicon.png, and favicon.ico")
