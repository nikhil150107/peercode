-- Run in Supabase SQL Editor to upgrade existing slot_bookings table

ALTER TABLE slot_bookings
  ADD COLUMN IF NOT EXISTS room_id text;

ALTER TABLE slot_bookings
  DROP CONSTRAINT IF EXISTS slot_bookings_matched_with_fkey;

ALTER TABLE slot_bookings
  ADD CONSTRAINT slot_bookings_matched_with_fkey
  FOREIGN KEY (matched_with) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Ensure status default and check constraint
ALTER TABLE slot_bookings
  ALTER COLUMN status SET DEFAULT 'pending';

COMMENT ON COLUMN slot_bookings.slot_date IS 'Date the booking is for (IST calendar date)';
COMMENT ON COLUMN slot_bookings.status IS 'pending | matched | cancelled | completed | expired';
COMMENT ON COLUMN slot_bookings.room_id IS 'Interview room id assigned when matched';
