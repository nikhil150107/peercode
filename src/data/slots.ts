export type SlotStatus = "available" | "filling-fast" | "full"

export type TimeSlot = {
  id: string
  time: string
  capacity: number
}

export const SCHEDULED_SLOT_TIMES = [
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "10:00 PM",
] as const

export type ScheduledSlotTime = (typeof SCHEDULED_SLOT_TIMES)[number]

export const TIME_SLOTS: TimeSlot[] = [
  { id: "slot-10am", time: "10:00 AM", capacity: 8 },
  { id: "slot-12pm", time: "12:00 PM", capacity: 8 },
  { id: "slot-2pm", time: "2:00 PM", capacity: 8 },
  { id: "slot-4pm", time: "4:00 PM", capacity: 8 },
  { id: "slot-6pm", time: "6:00 PM", capacity: 8 },
  { id: "slot-8pm", time: "8:00 PM", capacity: 8 },
  { id: "slot-10pm", time: "10:00 PM", capacity: 8 },
]

export function getSlotStatus(
  bookedCount: number,
  capacity: number,
): SlotStatus {
  if (bookedCount >= capacity) return "full"
  if (bookedCount >= Math.ceil(capacity / 2)) return "filling-fast"
  return "available"
}

export function getSlotById(slotId: string): TimeSlot {
  return TIME_SLOTS.find((s) => s.id === slotId) ?? TIME_SLOTS[0]
}

export function getSlotByTime(slotTime: string): TimeSlot | undefined {
  return TIME_SLOTS.find((s) => s.time === slotTime)
}
