-- Primary rating column for ratings received by the interviewee
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS rating integer;
