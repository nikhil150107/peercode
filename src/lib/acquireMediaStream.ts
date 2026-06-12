export const PREFERRED_MEDIA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
  audio: true,
}

const AUDIO_ONLY_CONSTRAINTS: MediaStreamConstraints = {
  audio: true,
  video: false,
}

const VIDEO_ONLY_CONSTRAINTS: MediaStreamConstraints = {
  video: PREFERRED_MEDIA_CONSTRAINTS.video,
  audio: false,
}

const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 2000

export type AcquireMediaResult = {
  stream: MediaStream
  videoEnabled: boolean
  videoUnavailableMessage?: string
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isNotAllowedError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "NotAllowedError"
}

function isRetryableMediaError(err: unknown): boolean {
  return (
    err instanceof DOMException &&
    (err.name === "NotAllowedError" ||
      err.name === "NotReadableError" ||
      err.name === "OverconstrainedError" ||
      err.name === "AbortError")
  )
}

function stopStream(stream: MediaStream) {
  stream.getTracks().forEach((track) => track.stop())
}

/**
 * On camera denial / busy device: grant mic first, then retry camera alone.
 */
async function tryAudioThenVideo(): Promise<AcquireMediaResult> {
  const audioStream = await navigator.mediaDevices.getUserMedia(
    AUDIO_ONLY_CONSTRAINTS,
  )

  try {
    const videoStream = await navigator.mediaDevices.getUserMedia(
      VIDEO_ONLY_CONSTRAINTS,
    )
    for (const track of videoStream.getVideoTracks()) {
      audioStream.addTrack(track)
    }
    videoStream.getAudioTracks().forEach((track) => track.stop())
    return { stream: audioStream, videoEnabled: true }
  } catch (videoErr) {
    console.warn("[media] video track unavailable after audio grant", videoErr)
    return {
      stream: audioStream,
      videoEnabled: false,
      videoUnavailableMessage: "Video unavailable",
    }
  }
}

/**
 * Acquire local mic/camera with retries. Falls back to audio-only when video
 * cannot be opened (e.g. camera already used by another tab on the same device).
 */
export async function acquireLocalMediaStream(): Promise<AcquireMediaResult> {
  let lastError: unknown
  let lastAudioOnlyStream: MediaStream | null = null

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        PREFERRED_MEDIA_CONSTRAINTS,
      )
      if (lastAudioOnlyStream) {
        stopStream(lastAudioOnlyStream)
      }
      return {
        stream,
        videoEnabled: stream.getVideoTracks().length > 0,
      }
    } catch (err) {
      lastError = err
      console.warn(
        `[media] getUserMedia attempt ${attempt}/${MAX_ATTEMPTS} failed`,
        err,
      )

      if (isNotAllowedError(err) || isRetryableMediaError(err)) {
        try {
          const fallback = await tryAudioThenVideo()
          if (fallback.videoEnabled) {
            if (lastAudioOnlyStream) {
              stopStream(lastAudioOnlyStream)
            }
            return fallback
          }

          if (lastAudioOnlyStream) {
            stopStream(lastAudioOnlyStream)
          }
          lastAudioOnlyStream = fallback.stream
        } catch (fallbackErr) {
          lastError = fallbackErr
          console.warn("[media] audio-then-video fallback failed", fallbackErr)
        }
      }

      if (attempt < MAX_ATTEMPTS) {
        await sleep(RETRY_DELAY_MS)
      }
    }
  }

  if (lastAudioOnlyStream) {
    return {
      stream: lastAudioOnlyStream,
      videoEnabled: false,
      videoUnavailableMessage: "Video unavailable",
    }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(
      AUDIO_ONLY_CONSTRAINTS,
    )
    return {
      stream,
      videoEnabled: false,
      videoUnavailableMessage: "Video unavailable",
    }
  } catch (finalErr) {
    throw lastError ?? finalErr
  }
}
