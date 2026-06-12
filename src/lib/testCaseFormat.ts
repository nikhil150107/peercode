import type { QuestionExample } from "../types/question"
import {
  compareCpOutput,
  toCpExpectedStdout,
  toCpStdin,
} from "./stdinFormat"

export function normalizeExampleForCp(example: QuestionExample): QuestionExample {
  return {
    ...example,
    input: toCpStdin(example.input),
    output: toCpExpectedStdout(example.output),
  }
}

export { compareCpOutput, toCpExpectedStdout, toCpStdin }
