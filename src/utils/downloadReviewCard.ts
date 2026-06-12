import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export type ReviewCardData = {
  sessionDate: string
  duration: string
  questionTitle: string
  questionDifficulty: string
  userRole: string
  ratingReceived: string
  feedbackTags: string[]
  writtenFeedback: string
  selfRating: string
}

export async function downloadReviewCard(data: ReviewCardData): Promise<void> {
  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.left = "-9999px"
  container.style.top = "0"
  container.style.width = "640px"
  container.style.padding = "32px"
  container.style.background = "#18181b"
  container.style.color = "#fafafa"
  container.style.fontFamily =
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

  container.innerHTML = `
    <div style="border:1px solid #27272a;border-radius:16px;overflow:hidden;background:#09090b;">
      <div style="padding:24px 28px;background:linear-gradient(180deg,rgba(16,185,129,0.15),transparent);">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#10b981;">PeerCode</p>
        <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;">Session Review Card</h1>
      </div>
      <div style="padding:0 28px 28px;">
        <p style="margin:0 0 8px;color:#71717a;font-size:13px;">${data.sessionDate}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px;">
          <div style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
            <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Duration</p>
            <p style="margin:6px 0 0;font-size:18px;font-weight:600;">${data.duration}</p>
          </div>
          <div style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
            <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Your role</p>
            <p style="margin:6px 0 0;font-size:18px;font-weight:600;text-transform:capitalize;color:#10b981;">${data.userRole}</p>
          </div>
        </div>
        <div style="margin-top:12px;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
          <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Question</p>
          <p style="margin:6px 0 0;font-size:18px;font-weight:600;">${data.questionTitle}</p>
          <p style="margin:6px 0 0;color:#10b981;font-size:13px;">${data.questionDifficulty}</p>
        </div>
        <div style="margin-top:12px;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
          <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Rating given to peer</p>
          <p style="margin:6px 0 0;font-size:18px;font-weight:600;">${data.ratingReceived}</p>
        </div>
        <div style="margin-top:12px;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
          <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Self rating</p>
          <p style="margin:6px 0 0;font-size:18px;font-weight:600;">${data.selfRating}</p>
        </div>
        ${
          data.feedbackTags.length
            ? `<div style="margin-top:12px;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
          <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Feedback tags</p>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.6;">${data.feedbackTags.join(" · ")}</p>
        </div>`
            : ""
        }
        ${
          data.writtenFeedback.trim()
            ? `<div style="margin-top:12px;background:#18181b;border:1px solid #27272a;border-radius:12px;padding:14px;">
          <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;">Written feedback</p>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#d4d4d8;">${data.writtenFeedback}</p>
        </div>`
            : ""
        }
      </div>
    </div>
  `

  document.body.appendChild(container)

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: "#09090b",
      scale: 2,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(
      (pageWidth - 48) / canvas.width,
      (pageHeight - 48) / canvas.height,
    )
    const width = canvas.width * ratio
    const height = canvas.height * ratio

    pdf.addImage(
      imgData,
      "PNG",
      (pageWidth - width) / 2,
      24,
      width,
      height,
    )
    pdf.save(`peercode-review-${Date.now()}.pdf`)
  } finally {
    document.body.removeChild(container)
  }
}
