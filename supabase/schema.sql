-- Paste this entire file into Supabase Dashboard → SQL Editor → Run

CREATE TABLE profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username text,
  email text,
  rating float DEFAULT 5.0,
  sessions_count int DEFAULT 0,
  created_at timestamp DEFAULT now()
);

CREATE TABLE slot_bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_time text NOT NULL,
  slot_date date NOT NULL,
  status text DEFAULT 'waiting' CHECK (status IN ('waiting', 'matched', 'cancelled', 'completed')),
  matched_with uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  room_id text,
  created_at timestamp DEFAULT now(),
  UNIQUE (user_id, slot_time, slot_date)
);

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
  duration_seconds integer DEFAULT 2700,
  completed_at timestamp DEFAULT now()
);

-- Row Level Security (required for client-side inserts/selects)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own bookings"
  ON slot_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view slot bookings for counts"
  ON slot_bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own bookings"
  ON slot_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON slot_bookings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings"
  ON slot_bookings FOR DELETE
  USING (auth.uid() = user_id);

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

CREATE TABLE questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  difficulty text NOT NULL,
  topic text NOT NULL,
  description text NOT NULL,
  examples jsonb,
  hidden_tests jsonb,
  constraints text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);
