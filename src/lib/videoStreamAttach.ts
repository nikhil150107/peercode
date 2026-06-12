/** Attach a MediaStream to a <video> and start playback. */
export function attachStreamToVideoElement(
  video: HTMLVideoElement | null | undefined,
  stream: MediaStream | null,
): boolean {
  if (!video || !stream) return false

  if (video.srcObject !== stream) {
    video.srcObject = stream
  }

  void video.play().catch((err) => {
    console.warn("[video] play() failed:", err)
  })

  return true
}

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
