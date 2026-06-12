const demoLines = [
  { text: "def twoSum(nums, target):", color: "text-emerald-400" },
  { text: "    seen = {}", color: "text-zinc-400" },
  { text: "    for i, n in enumerate(nums):", color: "text-zinc-400" },
  { text: "        if target - n in seen:", color: "text-zinc-400" },
  { text: "            return [seen[target-n], i]", color: "text-amber-300" },
]

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-zinc-500">PeerCode Interview Room</span>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
            LIVE
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="min-w-0 border-b border-zinc-800 sm:border-b-0 sm:border-r">
            <div className="border-b border-zinc-800 px-3 py-2 text-[10px] uppercase tracking-wider text-zinc-500">
              Code editor
            </div>
            <pre
              className="max-h-52 max-w-full overflow-x-auto overflow-y-auto p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap sm:text-xs"
              style={{ wordBreak: "break-word" }}
            >
              {demoLines.map((line, index) => (
                <code
                  key={index}
                  className={`block animate-[fadeIn_0.5s_ease-out_both] ${line.color}`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {line.text}
                </code>
              ))}
            </pre>
            <div className="border-t border-zinc-800 px-3 py-2">
              <span className="inline-block rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-zinc-950">
                Run Code
              </span>
            </div>
          </div>

          <div className="min-w-0 p-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-zinc-800 text-xl text-emerald-400">
                A
              </div>
              <div className="h-1.5 w-24 rounded bg-zinc-800" />
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-500/40 bg-zinc-800 text-xl text-indigo-400">
                B
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
