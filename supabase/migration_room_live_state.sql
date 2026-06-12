-- Live interview room state (persisted for refresh/rejoin)
CREATE TABLE IF NOT EXISTS room_live_state (
  room_id text PRIMARY KEY,
  question jsonb,
  codes jsonb,
  language text,
  seconds_left integer,
  timer_started boolean DEFAULT false,
  timer_started_at timestamptz,
  chat_messages jsonb DEFAULT '[]'::jsonb,
  ended_at timestamptz,
  ended_by uuid,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS room_live_state_ended_idx ON room_live_state (ended_at);
