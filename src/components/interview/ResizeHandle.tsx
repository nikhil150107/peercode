import { useCallback, useRef } from "react"

type ResizeHandleProps = {
  direction: "horizontal" | "vertical"
  onResize: (delta: number) => void
  className?: string
}

export default function ResizeHandle({
  direction,
  onResize,
  className = "",
}: ResizeHandleProps) {
  const dragging = useRef(false)
  const lastPos = useRef(0)

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = true
      lastPos.current = direction === "horizontal" ? event.clientX : event.clientY
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [direction],
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return
      const pos = direction === "horizontal" ? event.clientX : event.clientY
      const delta = pos - lastPos.current
      lastPos.current = pos
      onResize(delta)
    },
    [direction, onResize],
  )

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = false
      event.currentTarget.releasePointerCapture(event.pointerId)
    },
    [],
  )

  return (
    <div
      role="separator"
      aria-orientation={direction}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={`shrink-0 touch-none select-none bg-zinc-800/80 transition-colors hover:bg-emerald-500/40 active:bg-emerald-500/60 ${
        direction === "horizontal"
          ? "w-1.5 cursor-col-resize"
          : "h-1.5 cursor-row-resize"
      } ${className}`}
    />
  )
}
