type SkeletonProps = {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-800/80 ${className}`}
      aria-hidden="true"
    />
  )
}

export function SlotCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mb-6 h-4 w-24" />
      <Skeleton className="mb-3 h-1.5 w-full rounded-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <Skeleton className="mb-3 h-4 w-28" />
      <Skeleton className="h-9 w-16" />
    </div>
  )
}

export function QuestionRowSkeleton() {
  return (
    <tr className="border-b border-zinc-800/80">
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="hidden px-4 py-3 sm:table-cell">
        <Skeleton className="h-6 w-16 rounded-md" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24" />
      </td>
    </tr>
  )
}
