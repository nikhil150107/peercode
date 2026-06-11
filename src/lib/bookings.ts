import { supabase } from "./supabase"
import { SERVER_URL } from "./serverUrl"

import { isSlotBookingClosed } from "../utils/sessionTime"

export type BookingStatus =
  | "pending"
  | "matched"
  | "cancelled"
  | "completed"
  | "expired"

export function getBookingErrorMessage(error: unknown): string {
  if (!error) return "Failed to book slot"

  if (typeof error === "object" && error !== null && "message" in error) {
    const pg = error as {
      message?: string
      details?: string
      hint?: string
      code?: string
    }
    const parts = [pg.message, pg.details, pg.hint, pg.code].filter(Boolean)
    if (parts.length > 0) return parts.join(" — ")
  }

  if (error instanceof Error) return error.message
  return String(error)
}

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
  try {
    console.log("[booking] createSlotBooking", { userId, slotTime, slotDate })

    if (isSlotBookingClosed(slotTime, slotDate)) {
      throw new Error("Bookings close 5 minutes before the slot starts")
    }

    const { error: deleteError } = await supabase
      .from("slot_bookings")
      .delete()
      .eq("user_id", userId)
      .eq("slot_date", slotDate)

    if (deleteError) {
      console.error("[booking] deleteBookingsForUserOnDate failed:", deleteError)
      throw deleteError
    }

    const { data, error } = await supabase
      .from("slot_bookings")
      .insert({
        user_id: userId,
        slot_time: slotTime,
        slot_date: slotDate,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("[booking] insert failed:", error)
      throw error
    }

    return data as SlotBooking
  } catch (error) {
    console.error("[booking] createSlotBooking error:", error)
    throw error
  }
}

export async function sendBookingConfirmationEmail(
  userEmail: string,
  slotTime: string,
  slotDate: string,
  slotId: string,
) {
  try {
    const res = await fetch(`${SERVER_URL}/api/emails/send-booking-email`, {
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
    .in("status", ["pending", "matched"])
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
    .in("status", ["pending", "matched"])

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

export async function completeBookingByRoom(
  userId: string,
  roomId: string,
): Promise<void> {
  const { error } = await supabase
    .from("slot_bookings")
    .update({ status: "completed" })
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .eq("status", "matched")

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
