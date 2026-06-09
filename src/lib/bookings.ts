import { supabase } from "./supabase"

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:3001"

export type BookingStatus = "waiting" | "matched" | "cancelled"

export type SlotBooking = {
  id: string
  user_id: string
  slot_time: string
  slot_date: string
  status: BookingStatus
  matched_with: string | null
  room_id: string | null
  created_at: string
}

export async function deleteBookingsForUserOnDate(
  userId: string,
  slotDate: string,
) {
  const { error } = await supabase
    .from("slot_bookings")
    .delete()
    .eq("user_id", userId)
    .eq("slot_date", slotDate)

  if (error) throw error
}

export async function createSlotBooking(
  userId: string,
  slotTime: string,
  slotDate: string,
) {
  await deleteBookingsForUserOnDate(userId, slotDate)

  const { data, error } = await supabase
    .from("slot_bookings")
    .insert({
      user_id: userId,
      slot_time: slotTime,
      slot_date: slotDate,
      status: "waiting",
    })
    .select()
    .single()

  if (error) throw error
  return data as SlotBooking
}

export async function sendBookingConfirmationEmail(
  userEmail: string,
  slotTime: string,
  slotDate: string,
  slotId: string,
) {
  try {
    const res = await fetch(`${SERVER_URL}/api/emails/booking-confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, slotTime, slotDate, slotId }),
    })

    if (!res.ok) {
      console.error("[email] Booking confirmation request failed:", res.status)
    }
  } catch (err) {
    console.error("[email] Booking confirmation request error:", err)
  }
}

export async function fetchUserBookings(userId: string): Promise<SlotBooking[]> {
  const { data, error } = await supabase
    .from("slot_bookings")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["waiting", "matched"])
    .order("slot_date", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as SlotBooking[]
}

export async function fetchSlotBookingCounts(
  slotDate: string,
): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("slot_bookings")
    .select("slot_time")
    .eq("slot_date", slotDate)
    .in("status", ["waiting", "matched"])

  if (error) throw error

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    const time = row.slot_time as string
    counts[time] = (counts[time] ?? 0) + 1
  }
  return counts
}

export async function cancelBooking(bookingId: string) {
  const { error } = await supabase
    .from("slot_bookings")
    .delete()
    .eq("id", bookingId)

  if (error) throw error
}

export async function fetchPeerEmail(peerUserId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("user_id", peerUserId)
    .maybeSingle()

  if (error) throw error
  return data?.email ?? null
}
