-- Competitive programming profile links on user profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS leetcode_username text,
  ADD COLUMN IF NOT EXISTS codeforces_handle text,
  ADD COLUMN IF NOT EXISTS codechef_username text,
  ADD COLUMN IF NOT EXISTS gfg_username text;
