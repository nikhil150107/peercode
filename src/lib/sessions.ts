import { supabase } from "./supabase"

export type UserRole = "interviewer" | "interviewee"

export type SessionRecord = {
  id: string
  user_id: string
  peer_id: string | null
  peer_email: string | null
  room_id: string | null
  question_title: string | null
  question_difficulty: string | null
  question_topic: string | null
  user_role: UserRole | null
  rating_given: number | null
  rating_received: number | null
  feedback_tags: string[] | null
  duration_seconds: number | null
  submission_passed: boolean | null
  passed_tests: number | null
  total_tests: number | null
  completed_at: string
}

export type CreateSessionInput = {
  userId: string
  peerId?: string | null
  peerEmail?: string | null
  roomId: string
  questionTitle?: string | null
  questionDifficulty?: string | null
  questionTopic?: string | null
  userRole: UserRole
  durationSeconds?: number
  submissionPassed?: boolean
  passedTests?: number | null
  totalTests?: number | null
}

export type SubmissionResultInput = {
  userId: string
  roomId: string
  peerId?: string | null
  peerEmail?: string | null
  questionTitle?: string | null
  questionDifficulty?: string | null
  questionTopic?: string | null
  userRole: UserRole
  passedTests: number
  totalTests: number
  submissionPassed: boolean
}

export type ProfileStats = {
  totalSessions: number
  averageRatingReceived: number | null
  problemsSolved: number
  favoriteTopic: string | null
}

export async function lookupPeerIdByEmail(
  email: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("email", email)
    .maybeSingle()

  if (error) throw error
  return data?.user_id ?? null
}

async function findSessionByRoom(
  userId: string,
  roomId: string,
): Promise<SessionRecord | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .maybeSingle()

  if (error) throw error
  return (data as SessionRecord | null) ?? null
}

function buildSessionRow(input: CreateSessionInput) {
  return {
    peer_id: input.peerId ?? null,
    peer_email: input.peerEmail ?? null,
    room_id: input.roomId,
    question_title: input.questionTitle ?? null,
    question_difficulty: input.questionDifficulty ?? null,
    question_topic: input.questionTopic ?? null,
    user_role: input.userRole,
    duration_seconds: input.durationSeconds ?? 2700,
    submission_passed: input.submissionPassed ?? false,
    passed_tests: input.passedTests ?? null,
    total_tests: input.totalTests ?? null,
  }
}

export async function createSession(
  input: CreateSessionInput,
): Promise<SessionRecord> {
  const existing = await findSessionByRoom(input.userId, input.roomId)
  const row = buildSessionRow(input)

  if (existing) {
    const { data, error } = await supabase
      .from("sessions")
      .update(row)
      .eq("id", existing.id)
      .select()
      .single()

    if (error) throw error
    return data as SessionRecord
  }

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: input.userId,
      ...row,
    })
    .select()
    .single()

  if (error) throw error
  return data as SessionRecord
}

export async function recordSubmissionResult(
  input: SubmissionResultInput,
): Promise<SessionRecord> {
  const existing = await findSessionByRoom(input.userId, input.roomId)
  const submissionRow = {
    peer_id: input.peerId ?? null,
    peer_email: input.peerEmail ?? null,
    question_title: input.questionTitle ?? null,
    question_difficulty: input.questionDifficulty ?? null,
    question_topic: input.questionTopic ?? null,
    user_role: input.userRole,
    submission_passed: input.submissionPassed,
    passed_tests: input.passedTests,
    total_tests: input.totalTests,
  }

  if (existing) {
    const { data, error } = await supabase
      .from("sessions")
      .update(submissionRow)
      .eq("id", existing.id)
      .select()
      .single()

    if (error) throw error
    return data as SessionRecord
  }

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: input.userId,
      room_id: input.roomId,
      duration_seconds: 0,
      ...submissionRow,
    })
    .select()
    .single()

  if (error) throw error
  return data as SessionRecord
}

export function isProblemSolved(session: SessionRecord): boolean {
  return (
    session.user_role === "interviewee" &&
    session.submission_passed === true &&
    session.total_tests != null &&
    session.total_tests > 0 &&
    session.passed_tests === session.total_tests
  )
}

export async function updateRatingGiven(
  sessionId: string,
  rating: number,
  feedbackTags: string[],
) {
  console.log("[sessions] updating rating_given:", sessionId, rating)

  const { data, error } = await supabase
    .from("sessions")
    .update({
      rating_given: rating,
      feedback_tags: feedbackTags,
    })
    .eq("id", sessionId)
    .select("id, rating_given")

  if (error) throw error

  if (!data?.length) {
    throw new Error(`No session found with id ${sessionId}`)
  }

  console.log("[sessions] rating_given saved:", data[0])
  return data[0]
}

export async function updatePeerRatingReceived(
  peerId: string,
  roomId: string,
  rating: number,
) {
  console.log("[sessions] updating rating_received for peer:", peerId, roomId)

  const { data, error } = await supabase
    .from("sessions")
    .update({ rating_received: rating })
    .eq("room_id", roomId)
    .eq("user_id", peerId)
    .select("id, user_id, rating_received")

  if (error) throw error

  if (!data?.length) {
    console.warn(
      "[sessions] no peer session row found for rating_received",
      { peerId, roomId },
    )
    return null
  }

  console.log("[sessions] rating_received saved on peer row:", data[0])
  return data[0]
}

export async function submitSessionFeedback(input: {
  sessionId: string
  roomId: string
  peerId: string | null
  ratingGiven: number
  feedbackTags: string[]
}) {
  await updateRatingGiven(input.sessionId, input.ratingGiven, input.feedbackTags)

  if (input.peerId && input.roomId) {
    await updatePeerRatingReceived(
      input.peerId,
      input.roomId,
      input.ratingGiven,
    )
  } else {
    console.warn("[sessions] skipping rating_received — missing peerId or roomId", {
      peerId: input.peerId,
      roomId: input.roomId,
    })
  }
}

export async function fetchUserSessions(
  userId: string,
): Promise<SessionRecord[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as SessionRecord[]
}

export function computeTopicsPracticed(sessions: SessionRecord[]): string[] {
  const topics = new Set<string>()
  for (const session of sessions) {
    if (session.question_topic) {
      topics.add(session.question_topic)
    }
  }
  return [...topics].sort()
}

function hasValidRatingReceived(session: SessionRecord): boolean {
  return (
    session.user_role === "interviewee" &&
    session.rating_received != null &&
    session.rating_received > 0
  )
}

export function computeProfileStats(sessions: SessionRecord[]): ProfileStats {
  const ratedIntervieweeSessions = sessions.filter(hasValidRatingReceived)
  const averageRatingReceived =
    ratedIntervieweeSessions.length > 0
      ? ratedIntervieweeSessions.reduce(
          (sum, session) => sum + (session.rating_received ?? 0),
          0,
        ) / ratedIntervieweeSessions.length
      : null

  const intervieweeSessions = sessions.filter(
    (s) => s.user_role === "interviewee",
  )
  const problemsSolved = sessions.filter(isProblemSolved).length

  const topicCounts = new Map<string, number>()
  for (const session of intervieweeSessions) {
    if (!session.question_topic) continue
    topicCounts.set(
      session.question_topic,
      (topicCounts.get(session.question_topic) ?? 0) + 1,
    )
  }

  let favoriteTopic: string | null = null
  let maxCount = 0
  for (const [topic, count] of topicCounts) {
    if (count > maxCount) {
      maxCount = count
      favoriteTopic = topic
    }
  }

  return {
    totalSessions: sessions.length,
    averageRatingReceived:
      averageRatingReceived != null
        ? Math.round(averageRatingReceived * 10) / 10
        : null,
    problemsSolved,
    favoriteTopic,
  }
}
