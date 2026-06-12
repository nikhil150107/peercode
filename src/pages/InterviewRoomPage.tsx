import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"
import CodeEditorPanel, {
  createCustomTest,
  type CustomTestCase,
} from "../components/interview/CodeEditorPanel"
import CodeHistoryPanel, {
  type CodeHistoryEntry,
} from "../components/interview/CodeHistoryPanel"
import InterviewSidebar, {
  type SidebarChatMessage,
} from "../components/interview/InterviewSidebar"
import InterviewTopBar from "../components/interview/InterviewTopBar"
import ResizeHandle from "../components/interview/ResizeHandle"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import type { Language } from "../data/mockProblem"
import { acquireLocalMediaStream } from "../lib/acquireMediaStream"
import {
  attachStreamToVideoElement,
  scheduleVideoAttachment,
} from "../lib/videoStreamAttach"
import {
  allSubmitTestsPassed,
  countSubmitTestResults,
  formatSubmitResults,
  formatTestResults,
  runAgainstExamples,
  runCustomInput,
  runSubmitTests,
} from "../lib/codeExecution"
import {
  DEFAULT_EDITOR_LANGUAGE,
  defaultCompilerVersion,
  harnessLanguageForEditor,
  resolveJudge0LanguageId,
} from "../data/compilerVersions"
import {
  applyQuestionSeen,
  fetchRandomUnseenQuestion,
  normalizeQuestion,
} from "../lib/questions"
import { completeBookingByRoom } from "../lib/bookings"
import {
  createSession,
  lookupPeerIdByEmail,
  recordSubmissionResult,
  type UserRole,
} from "../lib/sessions"
import type { Question } from "../types/question"
import {
  getDifficultyPreference,
  type DifficultyPreference,
} from "../utils/difficultyPreference"
import {
  getTopicPreference,
  type TopicPreference,
} from "../utils/topicPreference"
import { EMPTY_CODE, isPlaceholderCode } from "../utils/editorTemplates"
import { getQuestionHints } from "../utils/questionHints"
import {
  buildStarterCodeForLanguage,
  resolveFunctionName,
} from "../utils/questionExecution"
import { SERVER_URL } from "../lib/serverUrl"
import {
  checkRoomEnded,
  endRoomSession,
  fetchRoomState,
  saveRoomState,
  type ChatMessagePayload,
  type RoomLiveState,
} from "../lib/roomState"
import { getDisplayNameFromEmail } from "../utils/userDisplay"
import { summarizeCodeDiff } from "../utils/codeDiff"
import {
  ALL_LANGUAGES,
  ICE_SERVERS,
  SESSION_SECONDS,
  SWAP_ALERT_AT,
  SWAP_AT,
  VIDEO_CONNECT_TIMEOUT_MS,
} from "../lib/interviewRoomConstants"

type VideoConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "failed"

type Role = "interviewer" | "interviewee"

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function InterviewRoomPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { showToast } = useToast()
  const roomId = new URLSearchParams(location.search).get("room")

  const [role, setRole] = useState<Role>("interviewee")
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS)
  const [timerStarted, setTimerStarted] = useState(false)
  const [showSwapAlert, setShowSwapAlert] = useState(false)
  const [codes, setCodes] = useState<Record<Language, string>>(EMPTY_CODE)
  const [language, setLanguage] = useState<Language>(DEFAULT_EDITOR_LANGUAGE)
  const [compilerVersionId, setCompilerVersionId] = useState(
    defaultCompilerVersion(DEFAULT_EDITOR_LANGUAGE).id,
  )
  const [customTests, setCustomTests] = useState<CustomTestCase[]>(() => [
    createCustomTest(),
  ])
  const [runningCustomTestId, setRunningCustomTestId] = useState<string | null>(
    null,
  )
  const [runningCustom, setRunningCustom] = useState(false)
  const [codeHistory, setCodeHistory] = useState<CodeHistoryEntry[]>([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [videoConnectionStatus, setVideoConnectionStatus] =
    useState<VideoConnectionStatus>("connecting")
  const [question, setQuestion] = useState<Question | null>(null)
  const [questionLoading, setQuestionLoading] = useState(true)
  const [questionLoadingMessage, setQuestionLoadingMessage] = useState(
    "Loading question...",
  )
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [questionAsInterviewee, setQuestionAsInterviewee] = useState<
    string | null
  >(null)
  const [questionAsInterviewer, setQuestionAsInterviewer] = useState<
    string | null
  >(null)
  const [myIntervieweeQuestion, setMyIntervieweeQuestion] = useState<{
    title: string
    difficulty: string
    topic: string
  } | null>(null)
  const [mobilePanel, setMobilePanel] = useState<"code" | "question">("code")
  const [sidebarWidthPct, setSidebarWidthPct] = useState(40)
  const [outputHeight, setOutputHeight] = useState(192)
  const [chatMessages, setChatMessages] = useState<ChatMessagePayload[]>([])
  const [peerStatus, setPeerStatus] = useState<
    "connected" | "disconnected" | "left"
  >("connected")
  const [testOutput, setTestOutput] = useState(
    "Run your code against example test cases.",
  )
  const [runningTests, setRunningTests] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoLoading, setVideoLoading] = useState(true)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const remoteStreamRef = useRef<MediaStream | null>(null)
  const localVideoEnabledRef = useRef(true)
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([])
  const makingOfferRef = useRef(false)
  const isRemoteCodeUpdateRef = useRef(false)
  const questionLockedRef = useRef(false)
  const questionIdRef = useRef<string | null>(null)
  const languageRef = useRef<Language>(language)
  const isFetchingQuestionRef = useRef(false)
  const roleRef = useRef<Role>(role)
  const secondsLeftRef = useRef(secondsLeft)
  const myIntervieweeQuestionRef = useRef(myIntervieweeQuestion)
  const submissionPassedRef = useRef(false)
  const passedTestsRef = useRef(0)
  const totalTestsRef = useRef(0)
  const timerStartedRef = useRef(false)
  const timerFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const peerCountRef = useRef(0)
  const timerStartedAtRef = useRef<number | null>(null)
  const saveStateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const restoredFromServerRef = useRef(false)
  const layoutContainerRef = useRef<HTMLDivElement>(null)
  const endingSessionRef = useRef(false)
  const codesRef = useRef(codes)
  const videoConnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const socketForWebRTCRef = useRef<Socket | null>(null)
  const reconnectWebRTCRef = useRef<(() => Promise<void>) | null>(null)
  const codeHistoryDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const codeEditBurstRef = useRef<{ lang: Language; startCode: string } | null>(
    null,
  )

  const peerEmail =
    localStorage.getItem("peercode_peerEmail") ?? "peer@example.com"
  const peerLabel = getDisplayNameFromEmail(peerEmail)
  const myDisplayName =
    user?.user_metadata?.full_name?.trim() ||
    getDisplayNameFromEmail(user?.email ?? "You")

  function retryAttachVideoElements() {
    const localStream = localStreamRef.current
    if (
      localStream &&
      localVideoEnabledRef.current &&
      localVideoRef.current
    ) {
      attachStreamToVideoElement(localVideoRef.current, localStream)
    }

    const remoteStream = remoteStreamRef.current
    if (remoteStream && remoteVideoRef.current) {
      attachStreamToVideoElement(remoteVideoRef.current, remoteStream)
    }
  }

  function attachLocalPreview(stream: MediaStream, videoEnabled: boolean) {
    localStreamRef.current = stream
    const showVideo =
      videoEnabled &&
      stream.getVideoTracks().some((track) => track.readyState !== "ended")
    localVideoEnabledRef.current = showVideo

    console.log("[video] attaching local preview", {
      showVideo,
      tracks: stream.getTracks().map((track) => ({
        kind: track.kind,
        enabled: track.enabled,
        readyState: track.readyState,
      })),
    })

    if (showVideo && localVideoRef.current) {
      attachStreamToVideoElement(localVideoRef.current, stream)
    } else if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }

    scheduleVideoAttachment(retryAttachVideoElements)
  }

  function attachRemotePreview(stream: MediaStream) {
    remoteStreamRef.current = stream

    console.log("[video] attaching remote preview", {
      tracks: stream.getTracks().map((track) => ({
        kind: track.kind,
        enabled: track.enabled,
        readyState: track.readyState,
      })),
    })

    if (remoteVideoRef.current) {
      attachStreamToVideoElement(remoteVideoRef.current, stream)
    }

    scheduleVideoAttachment(retryAttachVideoElements)
  }

  useEffect(() => {
    retryAttachVideoElements()
  }, [mobilePanel, videoConnectionStatus, videoLoading])

  useEffect(() => {
    codesRef.current = codes
  }, [codes])

  useEffect(() => {
    roleRef.current = role
  }, [role])

  function buildExecutionOptions() {
    return {
      functionName: question ? resolveFunctionName(question) : undefined,
      languageId: resolveJudge0LanguageId(language, compilerVersionId),
      harnessLanguage: harnessLanguageForEditor[language],
    }
  }

  function pushCodeHistory(
    author: "You" | "Peer",
    lang: Language,
    previousCode: string,
    nextCode: string,
  ) {
    if (previousCode === nextCode) return
    const diff = summarizeCodeDiff(previousCode, nextCode)
    if (diff.added === 0 && diff.removed === 0) return

    setCodeHistory((prev) =>
      [
        {
          id: crypto.randomUUID(),
          author,
          timestamp: Date.now(),
          language: lang,
          diff,
        },
        ...prev,
      ].slice(0, 20),
    )
  }

  function clearVideoConnectTimeout() {
    if (videoConnectTimeoutRef.current) {
      clearTimeout(videoConnectTimeoutRef.current)
      videoConnectTimeoutRef.current = null
    }
  }

  function scheduleVideoConnectTimeout() {
    clearVideoConnectTimeout()
    videoConnectTimeoutRef.current = setTimeout(() => {
      setVideoConnectionStatus((status) =>
        status === "connected" ? status : "failed",
      )
    }, VIDEO_CONNECT_TIMEOUT_MS)
  }

  async function retryVideoConnection() {
    if (reconnectWebRTCRef.current) {
      await reconnectWebRTCRef.current()
      return
    }
    const socket = socketForWebRTCRef.current
    const pc = pcRef.current
    if (!socket || !pc || !roomId || !user?.id) return

    setVideoConnectionStatus("reconnecting")
    scheduleVideoConnectTimeout()
    setVideoLoading(true)
    try {
      const offer = await pc.createOffer({ iceRestart: true })
      await pc.setLocalDescription(offer)
      socket.emit("webrtc_offer", { roomId, offer, userId: user.id })
    } catch (err) {
      console.error("[webrtc] retry failed:", err)
      setVideoConnectionStatus("failed")
    }
  }

  useEffect(() => {
    secondsLeftRef.current = secondsLeft
  }, [secondsLeft])

  useEffect(() => {
    myIntervieweeQuestionRef.current = myIntervieweeQuestion
  }, [myIntervieweeQuestion])

  useEffect(() => {
    languageRef.current = language
  }, [language])

  useEffect(() => {
    timerStartedRef.current = timerStarted
  }, [timerStarted])

  function clearTimerFallback() {
    if (timerFallbackRef.current) {
      clearTimeout(timerFallbackRef.current)
      timerFallbackRef.current = null
    }
  }

  function startSessionTimer(
    durationSeconds = SESSION_SECONDS,
    startedAt?: number | null,
  ) {
    clearTimerFallback()

    let remaining = durationSeconds
    const anchorStartedAt = startedAt ?? timerStartedAtRef.current ?? null

    if (anchorStartedAt != null) {
      const elapsed = Math.floor((Date.now() - anchorStartedAt) / 1000)
      remaining = Math.max(0, SESSION_SECONDS - elapsed)
    }

    timerStartedRef.current = true
    timerStartedAtRef.current = anchorStartedAt ?? Date.now()
    setSecondsLeft(remaining)
    setTimerStarted(true)
    console.log("[interview] session timer started", {
      remaining,
      startedAt: timerStartedAtRef.current,
    })
  }

  function mapChatMessages(
    messages: ChatMessagePayload[],
    currentUserId: string,
  ): SidebarChatMessage[] {
    return messages.map((message) => ({
      id: message.id,
      text: message.text,
      sender: message.from === currentUserId ? "You" : message.senderName,
      isSelf: message.from === currentUserId,
    }))
  }

  function applyRestoredRoomState(state: RoomLiveState) {
    restoredFromServerRef.current = true

    if (state.chatMessages?.length) {
      setChatMessages(state.chatMessages)
    }

    if (state.language) {
      setLanguage(state.language)
      languageRef.current = state.language
      setCompilerVersionId(defaultCompilerVersion(state.language).id)
    }

    if (state.question) {
      const q = normalizeQuestion(state.question)
      questionLockedRef.current = true
      questionIdRef.current = q.id
      setQuestion(q)
      setQuestionLoading(false)
      setQuestionError(null)

      setCodes((prev) => {
        const next = { ...prev }
        for (const lang of ALL_LANGUAGES) {
          const saved = state.codes?.[lang]
          next[lang] =
            saved && !isPlaceholderCode(saved, lang)
              ? saved
              : buildStarterCodeForLanguage(q, lang)
        }
        return next
      })
    } else if (state.codes && Object.keys(state.codes).length > 0) {
      setCodes((prev) => ({ ...prev, ...state.codes }))
    }

    if (state.timerStarted) {
      let remaining = SESSION_SECONDS
      if (state.timerStartedAt) {
        const elapsed = Math.floor((Date.now() - state.timerStartedAt) / 1000)
        remaining = Math.max(0, SESSION_SECONDS - elapsed)
      } else if (state.secondsLeft != null) {
        remaining = Math.max(0, state.secondsLeft)
      }
      startSessionTimer(remaining, state.timerStartedAt)
    }
  }

  function scheduleRoomStateSave() {
    if (!roomId || !user?.id || endingSessionRef.current) return

    if (saveStateTimeoutRef.current) {
      clearTimeout(saveStateTimeoutRef.current)
    }

    saveStateTimeoutRef.current = setTimeout(() => {
      void saveRoomState(roomId, user.id, {
        question,
        codes,
        language,
        secondsLeft: secondsLeftRef.current,
        timerStarted: timerStartedRef.current,
        timerStartedAt: timerStartedAtRef.current,
        chatMessages,
      }).catch((err) => {
        console.error("[room_state] save failed:", err)
      })
    }, 1500)
  }

  function scheduleTimerFallback(peerCount: number) {
    peerCountRef.current = peerCount
    // Timer start is owned by the server (persisted via room_live_state).
    // Do not start a local 120:00 countdown here — that resets on refresh.
  }

  function mergeStarterCodes(
    q: Question,
    previous: Record<Language, string>,
    replaceAll = false,
  ): Record<Language, string> {
    const next = { ...previous }
    for (const lang of ALL_LANGUAGES) {
      if (replaceAll || isPlaceholderCode(previous[lang], lang)) {
        next[lang] = buildStarterCodeForLanguage(q, lang)
      }
    }
    return next
  }

  function emitStarterForLanguage(
    q: Question,
    lang: Language,
    code?: string,
  ) {
    const starter = code ?? buildStarterCodeForLanguage(q, lang)
    emitCodeChange(starter, lang)
  }

  function handleSendChat(text: string) {
    if (!socketRef.current?.connected || !roomId || !user?.id || !text.trim()) {
      return
    }

    const message: ChatMessagePayload = {
      id: crypto.randomUUID(),
      text: text.trim(),
      senderName: myDisplayName,
      from: user.id,
      at: Date.now(),
    }

    setChatMessages((prev) => [...prev, message])
    socketRef.current.emit("chat_message", {
      roomId,
      userId: user.id,
      text: message.text,
      senderName: message.senderName,
    })
  }

  useEffect(() => {
    scheduleRoomStateSave()
  }, [question, codes, language, secondsLeft, timerStarted, chatMessages, roomId, user?.id])

  useEffect(() => {
    if (!roomId || !user?.id) return

    let cancelled = false

    async function guardAndRestore() {
      try {
        if (await checkRoomEnded(roomId)) {
          navigate("/session-ended")
          return
        }

        const state = await fetchRoomState(roomId)
        if (!cancelled && state) {
          applyRestoredRoomState(state)
        }
      } catch (err) {
        console.error("[room_state] restore failed:", err)
      }
    }

    void guardAndRestore()

    return () => {
      cancelled = true
    }
  }, [roomId, user?.id, navigate])

  useEffect(() => {
    if (!roomId) return
    localStorage.removeItem("peercode_my_question")
    setQuestionAsInterviewee(null)
    setQuestionAsInterviewer(null)
    setMyIntervieweeQuestion(null)
  }, [roomId])

  useEffect(() => {
    if (!question?.title) return

    if (role === "interviewee") {
      setQuestionAsInterviewee(question.title)
      setMyIntervieweeQuestion({
        title: question.title,
        difficulty: question.difficulty,
        topic: question.topic,
      })
      localStorage.setItem("peercode_my_question", question.title)
      localStorage.setItem("peercode_my_question_difficulty", question.difficulty)
      localStorage.setItem("peercode_my_question_topic", question.topic)
    } else {
      setQuestionAsInterviewer(question.title)
    }
  }, [question, role])

  function saveLastQuestionForFeedback() {
    const myQuestion = localStorage.getItem("peercode_my_question")
    if (myQuestion) {
      localStorage.setItem("peercode_last_question", myQuestion)
    }
  }

  async function persistSession() {
    if (!user?.id || !roomId) return false

    const peerEmail = localStorage.getItem("peercode_peerEmail")
    const intervieweeQ = myIntervieweeQuestionRef.current

    let peerId = localStorage.getItem("peercode_peer_id")
    if (!peerId && peerEmail) {
      try {
        peerId = await lookupPeerIdByEmail(peerEmail)
      } catch (err) {
        console.error("[session] Peer lookup failed:", err)
      }
    }

    const sessionRole: UserRole = intervieweeQ ? "interviewee" : roleRef.current

    try {
      const record = await createSession({
        userId: user.id,
        peerId,
        peerEmail,
        roomId,
        questionTitle:
          intervieweeQ?.title ??
          localStorage.getItem("peercode_my_question"),
        questionDifficulty:
          intervieweeQ?.difficulty ??
          localStorage.getItem("peercode_my_question_difficulty"),
        questionTopic:
          intervieweeQ?.topic ??
          localStorage.getItem("peercode_my_question_topic"),
        userRole: sessionRole,
        durationSeconds: SESSION_SECONDS - secondsLeftRef.current,
        submissionPassed: submissionPassedRef.current,
        passedTests: passedTestsRef.current || null,
        totalTests: totalTestsRef.current || null,
      })

      localStorage.setItem("peercode_session_id", record.id)
      localStorage.setItem("peercode_room_id", roomId)
      localStorage.setItem("peercode_roomId", roomId)
      localStorage.setItem("peercode_user_role", sessionRole)
      localStorage.setItem(
        "peercode_session_duration",
        String(SESSION_SECONDS - secondsLeftRef.current),
      )
      if (peerId) localStorage.setItem("peercode_peer_id", peerId)
      return true
    } catch (err) {
      console.error("[session] Failed to save session:", err)
      showToast("Failed to save session", "error")
      return false
    }
  }

  async function markBookingCompleted() {
    if (!user?.id || !roomId) return

    try {
      await completeBookingByRoom(user.id, roomId)
    } catch (err) {
      console.error("[booking] Failed to mark booking completed:", err)
    }
  }

  async function finishSession() {
    saveLastQuestionForFeedback()
    const saved = await persistSession()
    await markBookingCompleted()
    if (saved) {
      showToast("Session saved", "success")
    }
    navigate("/feedback")
  }

  async function handleEndSession() {
    if (!roomId || !user?.id) {
      await finishSession()
      return
    }

    endingSessionRef.current = true
    try {
      await endRoomSession(roomId, user.id)
    } catch (err) {
      console.error("[room_state] end session failed:", err)
    }
    await finishSession()
  }

  useEffect(() => {
    if (peerStatus !== "disconnected") return

    const timer = setTimeout(() => {
      setPeerStatus("left")
    }, 60_000)

    return () => clearTimeout(timer)
  }, [peerStatus])

  useEffect(() => {
    if (!roomId || !user?.id) {
      setVideoLoading(false)
      setQuestionLoading(false)
      if (!roomId) setVideoError("No room ID provided")
      return
    }

    const userId = user.id
    let cancelled = false

    function resetQuestionState(loadingMessage: string) {
      questionLockedRef.current = false
      questionIdRef.current = null
      isFetchingQuestionRef.current = false
      setQuestion(null)
      setCodes({ ...EMPTY_CODE })
      setQuestionLoading(true)
      setQuestionLoadingMessage(loadingMessage)
      setQuestionError(null)
      setTestOutput("Run your code against example test cases.")
      setCustomTests([createCustomTest()])
    }

    function applyQuestion(rawQuestion: Question) {
      const q = normalizeQuestion(rawQuestion)

      if (questionLockedRef.current && questionIdRef.current === q.id) {
        return
      }

      if (
        questionLockedRef.current &&
        questionIdRef.current &&
        questionIdRef.current !== q.id
      ) {
        console.warn(
          "[question] ignoring new question — session question is locked",
          { current: questionIdRef.current, incoming: q.id },
        )
        return
      }

      questionLockedRef.current = true
      questionIdRef.current = q.id
      isFetchingQuestionRef.current = false
      setQuestion(q)

      const lang = languageRef.current
      setCodes((prev) => {
        const next = mergeStarterCodes(q, prev, true)
        queueMicrotask(() => emitStarterForLanguage(q, lang, next[lang]))
        return next
      })

      setQuestionLoading(false)
      setQuestionLoadingMessage("Loading question...")
      setQuestionError(null)
      setTestOutput("Run your code against example test cases.")
      setCustomTests([createCustomTest()])
      applyQuestionSeen(userId, q.id)
    }

    async function fetchAndEmitQuestion(
      socket: Socket,
      difficultyPreference: DifficultyPreference,
      topicPreference: TopicPreference,
    ) {
      if (
        questionLockedRef.current ||
        isFetchingQuestionRef.current ||
        cancelled
      ) {
        return
      }

      isFetchingQuestionRef.current = true
      setQuestionLoading(true)
      setQuestionError(null)

      try {
        console.log("[question] fetching with filters", {
          difficultyPreference,
          topicPreference,
        })
        const q = await fetchRandomUnseenQuestion(
          userId,
          difficultyPreference,
          topicPreference,
        )

        if (cancelled) return

        if (!q) {
          setQuestionError(
            "No questions available for your difficulty and topic preferences.",
          )
          setQuestionLoading(false)
          isFetchingQuestionRef.current = false
          return
        }

        console.log("[question] fetch_question → emitting question_selected", {
          roomId,
          title: q.title,
        })
        socket.emit("question_selected", {
          roomId,
          question: normalizeQuestion(q),
          userId,
        })
      } catch (err) {
        if (!cancelled) {
          setQuestionError(
            err instanceof Error ? err.message : "Failed to load question",
          )
          setQuestionLoading(false)
        }
        isFetchingQuestionRef.current = false
      }
    }

    async function flushPendingCandidates(pc: RTCPeerConnection) {
      for (const candidate of pendingCandidatesRef.current) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate))
      }
      pendingCandidatesRef.current = []
    }

    async function createOffer(pc: RTCPeerConnection, socket: Socket) {
      makingOfferRef.current = true
      try {
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        socket.emit("webrtc_offer", { roomId, offer, userId })
        console.log("[webrtc] Sent offer")
      } finally {
        makingOfferRef.current = false
      }
    }

    function assignRoleFromFirstPeer(isFirstPeer: boolean) {
      const assignedRole: Role = isFirstPeer ? "interviewer" : "interviewee"
      setRole(assignedRole)
      console.log("[interview] role assigned", {
        isFirstPeer,
        role: assignedRole,
      })
    }

    async function reconnectPeerConnection() {
      const socket = socketForWebRTCRef.current
      if (!socket) return

      setVideoConnectionStatus("reconnecting")
      scheduleVideoConnectTimeout()
      setVideoLoading(true)
      pcRef.current?.close()
      pendingCandidatesRef.current = []

      let stream = localStreamRef.current
      let videoEnabled = Boolean(
        stream?.getVideoTracks().some((track) => track.enabled),
      )

      if (!stream) {
        try {
          const acquired = await acquireLocalMediaStream()
          stream = acquired.stream
          videoEnabled = acquired.videoEnabled
          attachLocalPreview(stream, videoEnabled)
          if (!videoEnabled) {
            setVideoError(acquired.videoUnavailableMessage ?? "Video unavailable")
            setVideoLoading(false)
            clearVideoConnectTimeout()
          }
        } catch (err) {
          console.error("[interview] reconnect media failed:", err)
          setVideoConnectionStatus("failed")
          setVideoError(
            err instanceof Error ? err.message : "Failed to access microphone",
          )
          setVideoLoading(false)
          clearVideoConnectTimeout()
          return
        }
      } else {
        attachLocalPreview(stream, videoEnabled)
      }

      const pc = new RTCPeerConnection(ICE_SERVERS)
      pcRef.current = pc
      stream.getTracks().forEach((track) => pc.addTrack(track, stream))
      createPeerConnectionHandlers(pc)

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      socket.emit("webrtc_offer", { roomId, offer, userId })
    }

    let webrtcStarted = false
    let webrtcHandlersRegistered = false
    let pendingRoomReadyPeers: string[] | null = null
    let pendingRemoteOffer: RTCSessionDescriptionInit | null = null

    async function handleRemoteOffer(
      socket: Socket,
      offer: RTCSessionDescriptionInit,
    ) {
      const pc = pcRef.current
      if (!pc) {
        pendingRemoteOffer = offer
        return
      }

      console.log("[webrtc] Received offer")
      if (makingOfferRef.current) return

      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      await flushPendingCandidates(pc)

      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      socket.emit("webrtc_answer", { roomId, answer, userId })
      console.log("[webrtc] Sent answer")
    }

    function createPeerConnectionHandlers(pc: RTCPeerConnection) {
      pc.ontrack = (event) => {
        const stream =
          event.streams[0] ?? new MediaStream([event.track])
        attachRemotePreview(stream)
        setVideoLoading(false)
        setVideoConnectionStatus("connected")
        clearVideoConnectTimeout()
      }

      pc.onconnectionstatechange = () => {
        const state = pc.connectionState
        if (state === "connected") {
          setVideoConnectionStatus("connected")
          clearVideoConnectTimeout()
          retryAttachVideoElements()
          scheduleVideoAttachment(retryAttachVideoElements)
        } else if (state === "connecting") {
          setVideoConnectionStatus("connecting")
        } else if (state === "disconnected") {
          setVideoConnectionStatus("reconnecting")
          window.setTimeout(() => {
            if (pc.connectionState === "disconnected") {
              void retryVideoConnection()
            }
          }, 2000)
        } else if (state === "failed") {
          setVideoConnectionStatus("failed")
          clearVideoConnectTimeout()
        }
      }

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("webrtc_ice_candidate", {
            roomId,
            candidate: event.candidate,
            userId,
          })
        }
      }
    }

    async function handleRoomReady(socket: Socket, peers: string[]) {
      const pc = pcRef.current
      if (!pc) {
        pendingRoomReadyPeers = peers
        return
      }

      console.log("[interview] Room ready, peers:", peers)
      setPeerStatus("connected")
      scheduleTimerFallback(peers.length)
      const sortedPeers = [...peers].sort()
      const isOfferer = sortedPeers[0] === userId

      if (isOfferer && pc.signalingState === "stable") {
        await createOffer(pc, socket)
      }
    }

    function registerWebRTCSocketHandlers(socket: Socket) {
      if (webrtcHandlersRegistered) return
      webrtcHandlersRegistered = true

      socket.on("room_ready", async ({ peers }: { peers: string[] }) => {
        await handleRoomReady(socket, peers)
      })

      socket.on("webrtc_offer", async ({ offer }) => {
        await handleRemoteOffer(socket, offer)
      })

      socket.on("webrtc_answer", async ({ answer }) => {
        const pc = pcRef.current
        if (!pc) return

        console.log("[webrtc] Received answer")
        await pc.setRemoteDescription(new RTCSessionDescription(answer))
        await flushPendingCandidates(pc)
        setVideoLoading(false)
      })

      socket.on("webrtc_ice_candidate", async ({ candidate }) => {
        const pc = pcRef.current
        if (!pc || !candidate) return

        try {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate))
          } else {
            pendingCandidatesRef.current.push(candidate)
          }
        } catch (err) {
          console.warn("[webrtc] ICE candidate failed, queueing retry", err)
          pendingCandidatesRef.current.push(candidate)
          window.setTimeout(() => {
            void flushPendingCandidates(pc)
          }, 500)
        }
      })
    }

    async function startWebRTC(socket: Socket) {
      if (webrtcStarted || cancelled) return
      webrtcStarted = true

      socketForWebRTCRef.current = socket
      setVideoConnectionStatus("connecting")
      scheduleVideoConnectTimeout()
      setVideoLoading(true)
      setVideoError(null)

      try {
        const { stream, videoEnabled, videoUnavailableMessage } =
          await acquireLocalMediaStream()

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        console.log("[video] getUserMedia succeeded before WebRTC connect", {
          videoTracks: stream.getVideoTracks().length,
          audioTracks: stream.getAudioTracks().length,
          videoEnabled,
        })

        attachLocalPreview(stream, videoEnabled)

        if (!videoEnabled) {
          setVideoError(videoUnavailableMessage ?? "Video unavailable")
          setVideoLoading(false)
          clearVideoConnectTimeout()
        }

        const pc = new RTCPeerConnection(ICE_SERVERS)
        pcRef.current = pc
        createPeerConnectionHandlers(pc)
        stream.getTracks().forEach((track) => pc.addTrack(track, stream))

        reconnectWebRTCRef.current = reconnectPeerConnection

        if (pendingRemoteOffer) {
          const offer = pendingRemoteOffer
          pendingRemoteOffer = null
          await handleRemoteOffer(socket, offer)
        }

        if (pendingRoomReadyPeers) {
          const peers = pendingRoomReadyPeers
          pendingRoomReadyPeers = null
          await handleRoomReady(socket, peers)
        }
      } catch (err) {
        console.error("[interview] WebRTC setup failed:", err)
        setVideoConnectionStatus("failed")
        clearVideoConnectTimeout()
        setVideoError(
          err instanceof Error ? err.message : "Failed to start video call",
        )
        setVideoLoading(false)
      }
    }

    function setupSocket() {
      const socket = io(SERVER_URL)
      socketRef.current = socket

      socket.on("connect", () => {
        console.log("[interview] Socket connected, joining room", roomId)
        socket.emit("join_room", { roomId, userId })
      })

      socket.on("session_ended", () => {
        console.log("[interview] session ended by peer")
        endingSessionRef.current = true
        navigate("/session-ended")
      })

      socket.on(
        "room_state_sync",
        ({ state }: { state: RoomLiveState }) => {
          if (!restoredFromServerRef.current) {
            applyRestoredRoomState(state)
            return
          }

          if (state.timerStarted && state.timerStartedAt) {
            const elapsed = Math.floor(
              (Date.now() - state.timerStartedAt) / 1000,
            )
            const remaining = Math.max(0, SESSION_SECONDS - elapsed)
            startSessionTimer(remaining, state.timerStartedAt)
          }
        },
      )

      socket.on(
        "chat_message",
        ({ message }: { message: ChatMessagePayload }) => {
          if (!message || message.from === userId) return
          setChatMessages((prev) => {
            if (prev.some((entry) => entry.id === message.id)) return prev
            return [...prev, message]
          })
        },
      )

      socket.on(
        "room_joined",
        ({
          peerCount,
          isFirstPeer,
        }: {
          peerCount: number
          isFirstPeer: boolean
        }) => {
          assignRoleFromFirstPeer(isFirstPeer)
          console.log("[interview] room_joined", { peerCount, isFirstPeer })
          scheduleTimerFallback(peerCount)
          void startWebRTC(socket)

          if (restoredFromServerRef.current && questionIdRef.current) {
            return
          }

          const difficultyPreference = getDifficultyPreference()
          const topicPreference = getTopicPreference()
          console.log("[question] requesting question for room", {
            roomId,
            difficultyPreference,
            topicPreference,
          })
          socket.emit("request_question", {
            roomId,
            userId,
            difficultyPreference,
            topicPreference,
          })
        },
      )

      socket.on(
        "fetch_question",
        ({
          difficultyPreference,
          topicPreference,
        }: {
          difficultyPreference: DifficultyPreference
          topicPreference: TopicPreference
        }) => {
          console.log("[question] fetch_question received", {
            difficultyPreference,
            topicPreference,
          })
          void fetchAndEmitQuestion(
            socket,
            difficultyPreference,
            topicPreference,
          )
        },
      )

      socket.on(
        "question_selected",
        ({ question: selectedQuestion }: { question: Question }) => {
          console.log("[question] question_selected received", selectedQuestion)
          applyQuestion(selectedQuestion)
        },
      )

      socket.on(
        "roles_swapped",
        ({
          newInterviewerUserId,
          newIntervieweeUserId,
        }: {
          newInterviewerUserId: string
          newIntervieweeUserId: string
        }) => {
          console.log("[interview] roles_swapped received", {
            newInterviewerUserId,
            newIntervieweeUserId,
          })

          if (userId === newInterviewerUserId) {
            setRole("interviewer")
          } else if (userId === newIntervieweeUserId) {
            setRole("interviewee")
          }
        },
      )

      socket.on(
        "code_change",
        ({
          code,
          language: remoteLanguage,
          from,
        }: {
          code: string
          language: Language
          from: string
        }) => {
          if (from === userId) return

          isRemoteCodeUpdateRef.current = true
          setLanguage(remoteLanguage)
          setCompilerVersionId(defaultCompilerVersion(remoteLanguage).id)
          setCodes((prev) => {
            const previous = prev[remoteLanguage] ?? ""
            pushCodeHistory("Peer", remoteLanguage, previous, code)
            return { ...prev, [remoteLanguage]: code }
          })
          queueMicrotask(() => {
            isRemoteCodeUpdateRef.current = false
          })
        },
      )

      socket.on("peer_disconnected", () => {
        console.log("[interview] Peer disconnected")
        setPeerStatus("disconnected")
        setVideoConnectionStatus("reconnecting")
        window.setTimeout(() => {
          void retryVideoConnection()
        }, 2000)
      })

      socket.on("peer_reconnected", () => {
        console.log("[interview] Peer reconnected")
        setPeerStatus("connected")
        setVideoConnectionStatus("connecting")
        scheduleVideoConnectTimeout()
      })

      socket.on(
        "start_timer",
        ({
          durationSeconds,
          timerStartedAt,
        }: {
          durationSeconds?: number
          timerStartedAt?: number
        }) => {
          console.log("[interview] start_timer received", {
            durationSeconds,
            timerStartedAt,
          })
          startSessionTimer(durationSeconds ?? SESSION_SECONDS, timerStartedAt)
        },
      )

      socket.on(
        "code_output",
        ({
          output,
          from,
          loading,
          roomId: eventRoomId,
        }: {
          output: string
          from: string
          loading?: boolean
          roomId?: string
        }) => {
          if (from === userId) return
          if (eventRoomId && eventRoomId !== roomId) return

          console.log("[interview] code_output received from peer", { from })
          setTestOutput(output)
          setRunningTests(Boolean(loading))
        },
      )

      registerWebRTCSocketHandlers(socket)
    }

    setupSocket()

    return () => {
      cancelled = true
      clearTimerFallback()
      if (saveStateTimeoutRef.current) {
        clearTimeout(saveStateTimeoutRef.current)
      }
      if (codeHistoryDebounceRef.current) {
        clearTimeout(codeHistoryDebounceRef.current)
      }
      clearVideoConnectTimeout()
      questionLockedRef.current = false
      questionIdRef.current = null
      isFetchingQuestionRef.current = false
      localStreamRef.current?.getTracks().forEach((t) => t.stop())
      localStreamRef.current = null
      remoteStreamRef.current = null
      pcRef.current?.close()
      pcRef.current = null
      socketRef.current?.disconnect()
      socketRef.current = null
      pendingCandidatesRef.current = []
    }
  }, [roomId, user?.id])

  useEffect(() => {
    if (!timerStarted) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          void finishSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerStarted, navigate])

  useEffect(() => {
    if (!timerStarted) return

    if (secondsLeft === SWAP_ALERT_AT) {
      setShowSwapAlert(true)
    }
    if (secondsLeft === SWAP_AT) {
      setShowSwapAlert(false)
      setRole((r) => (r === "interviewer" ? "interviewee" : "interviewer"))
    }
  }, [secondsLeft, timerStarted])

  function emitCodeChange(code: string, lang: Language) {
    if (
      isRemoteCodeUpdateRef.current ||
      !socketRef.current ||
      !roomId ||
      !user?.id
    ) {
      return
    }

    socketRef.current.emit("code_change", {
      roomId,
      code,
      language: lang,
      userId: user.id,
    })
  }

  function handleCodeChange(lang: Language, code: string) {
    if (!codeEditBurstRef.current || codeEditBurstRef.current.lang !== lang) {
      codeEditBurstRef.current = {
        lang,
        startCode: codesRef.current[lang] ?? "",
      }
    }

    setCodes((prev) => ({ ...prev, [lang]: code }))
    emitCodeChange(code, lang)

    if (codeHistoryDebounceRef.current) {
      clearTimeout(codeHistoryDebounceRef.current)
    }

    codeHistoryDebounceRef.current = setTimeout(() => {
      const burst = codeEditBurstRef.current
      if (burst && burst.lang === lang) {
        pushCodeHistory("You", lang, burst.startCode, code)
        codeEditBurstRef.current = null
      }
    }, 900)
  }

  function handleSwapRoles() {
    if (role !== "interviewer" || !socketRef.current || !roomId || !user?.id) {
      return
    }

    const newIntervieweeDifficulty = getDifficultyPreference()
    const newIntervieweeTopic = getTopicPreference()
    console.log("[interview] emitting swap_roles", {
      newIntervieweeUserId: user.id,
      newIntervieweeDifficulty,
      newIntervieweeTopic,
    })
    socketRef.current.emit("swap_roles", {
      roomId,
      newIntervieweeUserId: user.id,
      newIntervieweeDifficulty,
      newIntervieweeTopic,
    })
  }

  function handleLanguageChange(lang: Language) {
    setLanguage(lang)
    setCompilerVersionId(defaultCompilerVersion(lang).id)

    if (!question) {
      setCodes((prev) => {
        emitCodeChange(prev[lang], lang)
        return prev
      })
      return
    }

    setCodes((prev) => {
      const shouldReplace = isPlaceholderCode(prev[lang], lang)
      const nextCode = shouldReplace
        ? buildStarterCodeForLanguage(question, lang)
        : prev[lang]
      const next = shouldReplace ? { ...prev, [lang]: nextCode } : prev
      emitCodeChange(nextCode, lang)
      return next
    })
  }

  function applyCodeOutput(output: string, loading: boolean) {
    setTestOutput(output)
    setRunningTests(loading)
  }

  function broadcastCodeOutput(output: string, loading: boolean) {
    applyCodeOutput(output, loading)

    if (!socketRef.current?.connected || !roomId || !user?.id) {
      console.warn("[interview] cannot broadcast code_output — socket not ready")
      return
    }

    console.log("[interview] emitting code_output", { loading })
    socketRef.current.emit("code_output", {
      roomId,
      output,
      userId: user.id,
      loading,
    })
  }

  async function handleRunCode() {
    if (role === "interviewer" || runningTests) return

    if (!question?.examples.length) {
      broadcastCodeOutput("No example test cases available for this question.", false)
      return
    }

    broadcastCodeOutput("Running test cases...", true)

    try {
      const executionOptions = buildExecutionOptions()
      const results = await runAgainstExamples(
        codes[language],
        language,
        question.examples,
        executionOptions,
      )
      broadcastCodeOutput(formatTestResults(results), false)
    } catch (err) {
      broadcastCodeOutput(
        `Failed to run test cases: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
        false,
      )
    }
  }

  async function handleRunCustom(testId: string, input: string) {
    if (role === "interviewer" || runningCustom || !input.trim()) return

    setRunningCustom(true)
    setRunningCustomTestId(testId)
    setCustomTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? { ...test, output: "Running custom test..." }
          : test,
      ),
    )

    try {
      const output = await runCustomInput(
        codes[language],
        language,
        input,
        buildExecutionOptions(),
      )
      setCustomTests((prev) =>
        prev.map((test) =>
          test.id === testId ? { ...test, output } : test,
        ),
      )
    } catch (err) {
      setCustomTests((prev) =>
        prev.map((test) =>
          test.id === testId
            ? {
                ...test,
                output: `Failed to run custom test: ${
                  err instanceof Error ? err.message : "Unknown error"
                }`,
              }
            : test,
        ),
      )
    } finally {
      setRunningCustom(false)
      setRunningCustomTestId(null)
    }
  }

  async function handleSubmitCode() {
    if (role === "interviewer" || runningTests) return

    const submitCases =
      question?.hidden_tests?.length || question?.examples.length
    if (!submitCases) {
      broadcastCodeOutput("No test cases available for this question.", false)
      return
    }

    broadcastCodeOutput("Submitting...", true)

    try {
      const executionOptions = buildExecutionOptions()
      const results = await runSubmitTests(
        codes[language],
        language,
        question?.hidden_tests,
        question?.examples ?? [],
        executionOptions,
      )
      broadcastCodeOutput(formatSubmitResults(results), false)

      if (role === "interviewee" && user?.id && roomId && results.length > 0) {
        const { passed, total } = countSubmitTestResults(results)
        const submissionPassed = allSubmitTestsPassed(results)

        if (submissionPassed) {
          submissionPassedRef.current = true
          passedTestsRef.current = passed
          totalTestsRef.current = total

          const peerEmail = localStorage.getItem("peercode_peerEmail")
          let peerId = localStorage.getItem("peercode_peer_id")
          if (!peerId && peerEmail) {
            try {
              peerId = await lookupPeerIdByEmail(peerEmail)
            } catch (err) {
              console.error("[session] Peer lookup failed:", err)
            }
          }

          const record = await recordSubmissionResult({
            userId: user.id,
            roomId,
            peerId,
            peerEmail,
            questionTitle: question?.title ?? null,
            questionDifficulty: question?.difficulty ?? null,
            questionTopic: question?.topic ?? null,
            userRole: "interviewee",
            passedTests: passed,
            totalTests: total,
            submissionPassed: true,
          })

          localStorage.setItem("peercode_session_id", record.id)
        }
      }
    } catch (err) {
      broadcastCodeOutput(
        `Failed to submit: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
        false,
      )
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-primary text-content">
      <InterviewTopBar
        timer={timerStarted ? formatTimer(secondsLeft) : "Waiting..."}
        role={role}
        showSwapAlert={showSwapAlert}
        onSwapRoles={handleSwapRoles}
        onEndSession={() => void handleEndSession()}
      />
      {peerStatus === "disconnected" && (
        <div className="shrink-0 bg-amber-500/15 px-4 py-2 text-center text-sm font-medium text-warn">
          Your peer disconnected. Waiting for reconnection...
        </div>
      )}
      {peerStatus === "left" && (
        <div className="shrink-0 bg-red-500/15 px-4 py-2 text-center text-sm font-medium text-danger">
          Peer left the session. You can end the session now.
        </div>
      )}
      <div className="flex shrink-0 border-b border-stroke lg:hidden">
        <button
          type="button"
          onClick={() => setMobilePanel("code")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
            mobilePanel === "code"
              ? "border-b-2 border-emerald-500 text-brand"
              : "text-content-muted"
          }`}
        >
          Code Editor
        </button>
        <button
          type="button"
          onClick={() => setMobilePanel("question")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
            mobilePanel === "question"
              ? "border-b-2 border-emerald-500 text-brand"
              : "text-content-muted"
          }`}
        >
          Question & Video
        </button>
      </div>

      <div
        ref={layoutContainerRef}
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
      >
        <div
          className={`flex min-h-0 flex-col ${mobilePanel === "code" ? "flex" : "hidden lg:flex"}`}
          style={{ width: `${100 - sidebarWidthPct}%` }}
        >
          <CodeEditorPanel
            codes={codes}
            language={language}
            compilerVersionId={compilerVersionId}
            hints={
              role === "interviewer" && question
                ? getQuestionHints(question)
                : undefined
            }
            testOutput={testOutput}
            customTests={customTests}
            customInputPlaceholder={question?.examples[0]?.input ?? ""}
            running={runningTests}
            runningCustom={runningCustom}
            runningCustomTestId={runningCustomTestId}
            className="min-h-0 flex-1"
            outputHeight={outputHeight}
            onOutputHeightChange={setOutputHeight}
            onRunCode={() => void handleRunCode()}
            onSubmitCode={() => void handleSubmitCode()}
            onRunCustom={(testId, input) => void handleRunCustom(testId, input)}
            onCustomTestsChange={setCustomTests}
            onCodeChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            onCompilerVersionChange={setCompilerVersionId}
          />
          <CodeHistoryPanel
            entries={codeHistory}
            open={historyOpen}
            onToggle={() => setHistoryOpen((open) => !open)}
          />
        </div>
        <ResizeHandle
          direction="horizontal"
          className="hidden lg:block"
          onResize={(delta) => {
            const width =
              layoutContainerRef.current?.clientWidth ?? window.innerWidth
            if (width <= 0) return
            setSidebarWidthPct((prev) => {
              const next = prev - (delta / width) * 100
              return Math.min(55, Math.max(25, next))
            })
          }}
        />
        <InterviewSidebar
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          peerLabel={peerLabel}
          question={question}
          questionLoading={questionLoading}
          questionLoadingMessage={questionLoadingMessage}
          questionError={questionError}
          videoLoading={videoLoading}
          videoError={videoError}
          videoConnectionStatus={videoConnectionStatus}
          onRetryVideo={() => void retryVideoConnection()}
          showChat
          chatMessages={
            user?.id ? mapChatMessages(chatMessages, user.id) : []
          }
          onSendChat={handleSendChat}
          className={mobilePanel === "question" ? "flex" : "hidden lg:flex"}
          style={{ width: `${sidebarWidthPct}%` }}
        />
      </div>
    </div>
  )
}
