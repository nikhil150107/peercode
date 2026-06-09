export const mockUser = {
  name: "Nikita",
  email: "nikita@example.com",
  initials: "NK",
  stats: {
    totalSessions: 12,
    averageRating: 4.7,
    topics: ["Arrays", "Trees", "DP", "Graphs", "Strings", "Heaps"],
  },
}

export type { SlotStatus, TimeSlot } from "./slots"
export { TIME_SLOTS, SCHEDULED_SLOT_TIMES, getSlotById, getSlotByTime } from "./slots"

/** @deprecated Use TIME_SLOTS */
export { TIME_SLOTS as todaySlots } from "./slots"
