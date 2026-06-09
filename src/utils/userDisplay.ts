import type { User } from "@supabase/supabase-js"

export function getDisplayNameFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? email
  const namePart = localPart.replace(/\d+$/, "")
  const base = namePart || localPart
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase()
}

function readNameFromMetadata(
  metadata: Record<string, unknown> | undefined,
): string | null {
  if (!metadata) return null

  for (const key of ["full_name", "name", "display_name"]) {
    const value = metadata[key]
    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }

  return null
}

export function getUserDisplayName(user: User | null): string {
  if (!user) return "User"

  const fromUserMetadata = readNameFromMetadata(user.user_metadata)
  if (fromUserMetadata) return fromUserMetadata

  for (const identity of user.identities ?? []) {
    const fromIdentity = readNameFromMetadata(
      identity.identity_data as Record<string, unknown> | undefined,
    )
    if (fromIdentity) return fromIdentity
  }

  if (user.email) {
    return getDisplayNameFromEmail(user.email)
  }

  return "User"
}

export function getPeerDisplayLabel(peerEmail: string | null): string {
  if (!peerEmail) return "your peer"
  if (peerEmail.includes("@")) {
    return getDisplayNameFromEmail(peerEmail)
  }
  return peerEmail
}

export function getStoredPeerEmail(): string | null {
  return (
    localStorage.getItem("peercode_peer_email") ??
    localStorage.getItem("peercode_peerEmail")
  )
}

export function getInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}
