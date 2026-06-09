-- Allow authenticated users to read slot_bookings for real-time slot counts
CREATE POLICY "Authenticated users can view slot bookings for counts"
  ON slot_bookings FOR SELECT
  TO authenticated
  USING (true);
