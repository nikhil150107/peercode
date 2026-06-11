-- Track whether the interviewee passed all hidden tests on submit
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS submission_passed boolean DEFAULT false;

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS passed_tests integer;

ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS total_tests integer;
