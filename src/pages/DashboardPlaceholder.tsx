type DashboardPlaceholderProps = {
  title: string
  description: string
}

export default function DashboardPlaceholder({
  title,
  description,
}: DashboardPlaceholderProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6 lg:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-content">{title}</h1>
        <p className="mt-2 max-w-sm text-content-muted">{description}</p>
        <p className="mt-4 text-sm text-content-muted">Coming soon</p>
      </div>
    </div>
  )
}
