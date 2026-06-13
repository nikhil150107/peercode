-- Persist interviewer/interviewee roles across reconnects
ALTER TABLE room_live_state
  ADD COLUMN IF NOT EXISTS interviewer_user_id text,
  ADD COLUMN IF NOT EXISTS interviewee_user_id text;
