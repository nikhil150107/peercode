CREATE TABLE IF NOT EXISTS feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  name text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
