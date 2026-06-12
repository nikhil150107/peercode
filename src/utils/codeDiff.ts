export type CodeDiffSummary = {
  added: number
  removed: number
}

export function summarizeCodeDiff(before: string, after: string): CodeDiffSummary {
  const beforeLines = before.split("\n")
  const afterLines = after.split("\n")
  const max = Math.max(beforeLines.length, afterLines.length)
  let added = 0
  let removed = 0

  for (let i = 0; i < max; i += 1) {
    const prev = beforeLines[i]
    const next = afterLines[i]
    if (prev === undefined) added += 1
    else if (next === undefined) removed += 1
    else if (prev !== next) {
      added += 1
      removed += 1
    }
  }

  return { added, removed }
}
