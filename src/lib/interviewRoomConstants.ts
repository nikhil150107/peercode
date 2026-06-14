import type { Language } from "../data/mockProblem"

export const SESSION_SECONDS = 120 * 60
export const SWAP_ALERT_AT = 22 * 60 + 30
export const SWAP_AT = 22 * 60
export const TIMER_FALLBACK_MS = 5000
export const VIDEO_CONNECT_TIMEOUT_MS = 10_000
export const QUESTION_LOAD_FALLBACK_MS = 12_000

export const ALL_LANGUAGES: Language[] = [
  "python",
  "javascript",
  "typescript",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "kotlin",
  "csharp",
  "php",
  "ruby",
  "swift",
]

export const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
  iceTransportPolicy: "all",
}

export function createPeerConnectionConfig(): RTCConfiguration {
  return {
    iceServers: ICE_SERVERS.iceServers,
    iceTransportPolicy: "all",
  }
}
