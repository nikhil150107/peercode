-- Allow completed status on slot_bookings after a session ends
ALTER TABLE slot_bookings
  DROP CONSTRAINT IF EXISTS slot_bookings_status_check;

ALTER TABLE slot_bookings
  ADD CONSTRAINT slot_bookings_status_check
  CHECK (status IN ('waiting', 'matched', 'cancelled', 'completed'));
