import { supabase } from "./supabase"

export type ProfileLinks = {
  leetcode_username: string | null
  codeforces_handle: string | null
  codechef_username: string | null
  gfg_username: string | null
}

export type UserProfile = ProfileLinks & {
  id: string
  user_id: string
  username: string | null
  email: string | null
}

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, user_id, username, email, leetcode_username, codeforces_handle, codechef_username, gfg_username",
    )
    .eq("user_id", userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data as UserProfile | null
}

export async function upsertProfileLinks(
  userId: string,
  email: string | undefined,
  links: ProfileLinks,
): Promise<void> {
  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      email: email ?? null,
      leetcode_username: links.leetcode_username?.trim() || null,
      codeforces_handle: links.codeforces_handle?.trim() || null,
      codechef_username: links.codechef_username?.trim() || null,
      gfg_username: links.gfg_username?.trim() || null,
    },
    { onConflict: "user_id" },
  )

  if (error) {
    throw new Error(error.message)
  }
}

export function profileLinkUrl(
  platform: keyof ProfileLinks,
  value: string,
): string {
  const trimmed = value.trim()
  switch (platform) {
    case "leetcode_username":
      return `https://leetcode.com/u/${trimmed}/`
    case "codeforces_handle":
      return `https://codeforces.com/profile/${trimmed}`
    case "codechef_username":
      return `https://www.codechef.com/users/${trimmed}`
    case "gfg_username":
      return `https://auth.geeksforgeeks.org/user/${trimmed}`
    default:
      return "#"
  }
}
