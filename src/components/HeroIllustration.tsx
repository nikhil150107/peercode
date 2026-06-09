export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />
      <svg
        viewBox="0 0 520 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full drop-shadow-2xl"
      >
        <rect
          x="20"
          y="30"
          width="480"
          height="300"
          rx="20"
          fill="#18181b"
          stroke="#3f3f46"
          strokeWidth="1.5"
        />
        <rect x="20" y="30" width="480" height="44" rx="20" fill="#27272a" />
        <rect x="20" y="54" width="480" height="20" fill="#27272a" />
        <circle cx="44" cy="52" r="6" fill="#ef4444" opacity="0.8" />
        <circle cx="64" cy="52" r="6" fill="#eab308" opacity="0.8" />
        <circle cx="84" cy="52" r="6" fill="#22c55e" opacity="0.8" />
        <text x="260" y="57" textAnchor="middle" fill="#71717a" fontSize="11">
          PeerCode Interview Room
        </text>

        <rect
          x="36"
          y="90"
          width="200"
          height="220"
          rx="12"
          fill="#09090b"
          stroke="#3f3f46"
        />
        <rect x="48" y="102" width="80" height="10" rx="3" fill="#34d399" opacity="0.6" />
        <rect x="48" y="122" width="176" height="8" rx="2" fill="#3f3f46" />
        <rect x="48" y="136" width="140" height="8" rx="2" fill="#3f3f46" />
        <rect x="48" y="158" width="176" height="120" rx="8" fill="#0c0c0e" stroke="#27272a" />
        <text x="58" y="178" fill="#34d399" fontSize="10" fontFamily="monospace">
          def twoSum(nums, target):
        </text>
        <text x="68" y="194" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          seen = {}
        </text>
        <text x="68" y="210" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          for i, n in enumerate(nums):
        </text>
        <text x="84" y="226" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
          if target - n in seen:
        </text>
        <text x="100" y="242" fill="#fbbf24" fontSize="10" fontFamily="monospace">
          return [seen[target-n], i]
        </text>
        <rect x="48" y="262" width="60" height="20" rx="4" fill="#10b981" />
        <text x="58" y="276" fill="#09090b" fontSize="9" fontWeight="bold">
          Run Code
        </text>

        <rect
          x="284"
          y="90"
          width="200"
          height="220"
          rx="12"
          fill="#09090b"
          stroke="#3f3f46"
        />
        <circle cx="384" cy="145" r="36" fill="#27272a" stroke="#34d399" strokeWidth="2" />
        <text x="384" y="150" textAnchor="middle" fill="#34d399" fontSize="22">
          A
        </text>
        <rect x="304" y="195" width="160" height="8" rx="2" fill="#3f3f46" />
        <rect x="324" y="215" width="120" height="8" rx="2" fill="#3f3f46" />
        <circle cx="384" cy="265" r="36" fill="#27272a" stroke="#818cf8" strokeWidth="2" />
        <text x="384" y="270" textAnchor="middle" fill="#818cf8" fontSize="22">
          B
        </text>

        <rect x="230" y="175" width="60" height="28" rx="14" fill="#10b981" opacity="0.2" stroke="#34d399" />
        <text x="260" y="193" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
          LIVE
        </text>

        <path
          d="M120 320 Q260 340 400 320"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <circle cx="130" cy="318" r="4" fill="#34d399" />
        <circle cx="390" cy="318" r="4" fill="#818cf8" />
      </svg>
    </div>
  )
}
