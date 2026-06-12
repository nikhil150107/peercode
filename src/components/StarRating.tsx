type StarRatingProps = {
  value: number
  onChange: (rating: number) => void
  label?: string
}

export default function StarRating({ value, onChange, label }: StarRatingProps) {
  return (
    <div>
      {label && (
        <p className="mb-2 text-sm font-medium text-content">{label}</p>
      )}
      <div className="flex gap-1" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            onClick={() => onChange(star)}
            className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <svg
              className={`h-8 w-8 ${
                star <= value ? "text-amber-400" : "text-stroke"
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
