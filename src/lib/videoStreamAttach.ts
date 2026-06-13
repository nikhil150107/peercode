/** Attach a MediaStream to a <video> and start playback safely. */
export function attachStream(
  videoEl: HTMLVideoElement | null,
  stream: MediaStream | null,
): void {
  if (!videoEl || !stream) return
  if (videoEl.srcObject === stream) return
  videoEl.srcObject = stream
  videoEl.play().catch((err) => {
    if (err.name !== "AbortError") {
      console.warn("[video] play() failed:", err)
    }
  })
}

/** @deprecated Use attachStream */
export const attachStreamToVideoElement = attachStream

/** Retry attachment — refs may not be mounted on first WebRTC callback. */
export function scheduleVideoAttachment(
  attach: () => void,
  delaysMs = [0, 50, 150, 400],
) {
  for (const delay of delaysMs) {
    if (delay === 0) {
      requestAnimationFrame(attach)
    } else {
      window.setTimeout(attach, delay)
    }
  }
}
