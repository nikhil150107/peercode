-- Run in Supabase SQL Editor to replace legacy sessions table

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  peer_id uuid REFERENCES auth.users(id),
  peer_email text,
  room_id text,
  question_title text,
  question_difficulty text,
  question_topic text,
  user_role text,
  rating_given integer,
  rating_received integer,
  feedback_tags text[],
  duration_seconds integer DEFAULT 7200,
  completed_at timestamp DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Peers can update rating received"
  ON sessions FOR UPDATE
  USING (auth.uid() = peer_id);
