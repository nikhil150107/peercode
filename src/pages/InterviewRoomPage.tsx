import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import type { Socket } from "socket.io-client"
import CodeEditorPanel from "../components/interview/CodeEditorPanel"
import InterviewSidebar from "../components/interview/InterviewSidebar"
import InterviewTopBar from "../components/interview/InterviewTopBar"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import type { Language } from "../data/mockProblem"
import {
  allSubmitTestsPassed,
  countSubmitTestResults,
  formatSubmitResults,
  formatTestResults,
  runAgainstExamples,
  runSubmitTests,
} from "../lib/codeExecution"
import {
  applyQuestionSeen,
  fetchRandomUnseenQuestion,
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
import { EMPTY_CODE } from "../utils/editorTemplates"
import { getQuestionHints } from "../utils/questionHints"
import {
  buildStarterCodeForQuestion,
  resolveFunctionName,
} from "../utils/questionExecution"
import { SERVER_URL } from "../lib/serverUrl"
import { getDisplayNameFromEmail } from "../utils/userDisplay"

const SESSION_SECONDS = 120 * 60
const SWAP_ALERT_AT = 22 * 60 + 30
const SWAP_AT = 22 * 60

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
}

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
  const [language, setLanguage] = useState<Language>("python")
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
  const [peerStatus, setPeerStatus] = useState<
    "connected" | "disconnected" | "left"
  >("connected")

  const peerEmail =
    localStorage.getItem("peercode_peerEmail") ?? "peer@example.com"
  const peerLabel = getDisplayNameFromEmail(peerEmail)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([])
  const makingOfferRef = useRef(false)
  const isRemoteCodeUpdateRef = useRef(false)
  const questionLockedRef = useRef(false)
  const isFetchingQuestionRef = useRef(false)
  const roleRef = useRef<Role>(role)
  const secondsLeftRef = useRef(secondsLeft)
  const myIntervieweeQuestionRef = useRef(myIntervieweeQuestion)
  const submissionPassedRef = useRef(false)
  const passedTestsRef = useRef(0)
  const totalTestsRef = useRef(0)

  useEffect(() => {
    roleRef.current = role
  }, [role])

  useEffect(() => {
    secondsLeftRef.current = secondsLeft
  }, [secondsLeft])

  useEffect(() => {
    myIntervieweeQuestionRef.current = myIntervieweeQuestion
  }, [myIntervieweeQuestion])

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
    await finishSession()
  }
  const [testOutput, setTestOutput] = useState(
    "Run your code against example test cases.",
  )
  const [runningTests, setRunningTests] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [videoLoading, setVideoLoading] = useState(true)

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
      isFetchingQuestionRef.current = false
      setQuestion(null)
      setCodes({ ...EMPTY_CODE })
      setQuestionLoading(true)
      setQuestionLoadingMessage(loadingMessage)
      setQuestionError(null)
      setTestOutput("Run your code against example test cases.")
    }

    function applyQuestion(q: Question) {
      if (questionLockedRef.current) return

      questionLockedRef.current = true
      isFetchingQuestionRef.current = false
      setQuestion(q)
      setCodes(buildStarterCodeForQuestion(q))
      setQuestionLoading(false)
      setQuestionLoadingMessage("Loading question...")
      setQuestionError(null)
      setTestOutput("Run your code against example test cases.")
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
        socket.emit("question_selected", { roomId, question: q, userId })
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

    async function setupWebRTC(socket: Socket) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        localStreamRef.current = stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        const pc = new RTCPeerConnection(ICE_SERVERS)
        pcRef.current = pc

        stream.getTracks().forEach((track) => pc.addTrack(track, stream))

        pc.ontrack = (event) => {
          if (remoteVideoRef.current && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0]
            setVideoLoading(false)
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

        socket.on("room_ready", async ({ peers }: { peers: string[] }) => {
          console.log("[interview] Room ready, peers:", peers)
          setPeerStatus("connected")
          const sortedPeers = [...peers].sort()
          const isOfferer = sortedPeers[0] === userId

          if (isOfferer && pc.signalingState === "stable") {
            await createOffer(pc, socket)
          }
        })

        socket.on("webrtc_offer", async ({ offer }) => {
          console.log("[webrtc] Received offer")
          if (makingOfferRef.current) return

          await pc.setRemoteDescription(new RTCSessionDescription(offer))
          await flushPendingCandidates(pc)

          const answer = await pc.createAnswer()
          await pc.setLocalDescription(answer)
          socket.emit("webrtc_answer", { roomId, answer, userId })
          console.log("[webrtc] Sent answer")
        })

        socket.on("webrtc_answer", async ({ answer }) => {
          console.log("[webrtc] Received answer")
          await pc.setRemoteDescription(new RTCSessionDescription(answer))
          await flushPendingCandidates(pc)
          setVideoLoading(false)
        })

        socket.on("webrtc_ice_candidate", async ({ candidate }) => {
          if (!candidate) return
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate))
          } else {
            pendingCandidatesRef.current.push(candidate)
          }
        })
      } catch (err) {
        console.error("[interview] WebRTC setup failed:", err)
        const message =
          err instanceof DOMException &&
          (err.name === "NotReadableError" || err.name === "NotAllowedError")
            ? "Device in use — video unavailable. Interview continues without camera."
            : err instanceof Error
              ? err.message
              : "Failed to start video call"
        setVideoError(message)
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

          resetQuestionState("Loading new question...")
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
          setCodes((prev) => ({ ...prev, [remoteLanguage]: code }))
          queueMicrotask(() => {
            isRemoteCodeUpdateRef.current = false
          })
        },
      )

      socket.on("peer_disconnected", () => {
        console.log("[interview] Peer disconnected")
        setPeerStatus("disconnected")
      })

      socket.on("peer_reconnected", () => {
        console.log("[interview] Peer reconnected")
        setPeerStatus("connected")
      })

      socket.on(
        "start_timer",
        ({ durationSeconds }: { durationSeconds?: number }) => {
          console.log("[interview] start_timer received", { durationSeconds })
          setSecondsLeft(durationSeconds ?? SESSION_SECONDS)
          setTimerStarted(true)
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

      void setupWebRTC(socket)
    }

    setupSocket()

    return () => {
      cancelled = true
      questionLockedRef.current = false
      isFetchingQuestionRef.current = false
      localStreamRef.current?.getTracks().forEach((t) => t.stop())
      localStreamRef.current = null
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
    setCodes((prev) => ({ ...prev, [lang]: code }))
    emitCodeChange(code, lang)
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
    setCodes((prev) => {
      emitCodeChange(prev[lang], lang)
      return prev
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
      const executionOptions = {
        functionName: question ? resolveFunctionName(question) : undefined,
      }
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
      const executionOptions = {
        functionName: question ? resolveFunctionName(question) : undefined,
      }
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
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      <InterviewTopBar
        timer={timerStarted ? formatTimer(secondsLeft) : "Waiting..."}
        role={role}
        showSwapAlert={showSwapAlert}
        onSwapRoles={handleSwapRoles}
        onEndSession={() => void handleEndSession()}
      />
      {peerStatus === "disconnected" && (
        <div className="shrink-0 bg-amber-500/15 px-4 py-2 text-center text-sm font-medium text-amber-400">
          Your peer disconnected. Waiting for reconnection...
        </div>
      )}
      {peerStatus === "left" && (
        <div className="shrink-0 bg-red-500/15 px-4 py-2 text-center text-sm font-medium text-red-400">
          Peer left the session. You can end the session now.
        </div>
      )}
      <div className="flex shrink-0 border-b border-zinc-800 lg:hidden">
        <button
          type="button"
          onClick={() => setMobilePanel("code")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
            mobilePanel === "code"
              ? "border-b-2 border-emerald-500 text-emerald-400"
              : "text-zinc-500"
          }`}
        >
          Code Editor
        </button>
        <button
          type="button"
          onClick={() => setMobilePanel("question")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
            mobilePanel === "question"
              ? "border-b-2 border-emerald-500 text-emerald-400"
              : "text-zinc-500"
          }`}
        >
          Question & Video
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <CodeEditorPanel
          codes={codes}
          language={language}
          hints={
            role === "interviewer" && question
              ? getQuestionHints(question)
              : undefined
          }
          testOutput={testOutput}
          running={runningTests}
          className={mobilePanel === "code" ? "flex" : "hidden lg:flex"}
          onRunCode={() => void handleRunCode()}
          onSubmitCode={() => void handleSubmitCode()}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
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
          showChat={false}
          className={mobilePanel === "question" ? "flex" : "hidden lg:flex"}
        />
      </div>
    </div>
  )
}
