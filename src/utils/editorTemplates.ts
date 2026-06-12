import type { Language } from "../data/mockProblem"
import type { Question } from "../types/question"

export const CP_STARTER_TEMPLATES: Record<Language, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Read input from stdin (see example format in the question panel)
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // Write your solution here

    // Print output to stdout
    // cout << answer << "\\n";
    return 0;
}
`,
  c: `#include <stdio.h>

int main() {
    // Read input from stdin (see example format in the question panel)
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    // Write your solution here

    // Print output to stdout
    // printf("%d\\n", answer);
    return 0;
}
`,
  python: `import sys

def main():
    data = sys.stdin.read().split()
    # tokens = list of strings — parse as needed
    # Example: n = int(data[0]); arr = list(map(int, data[1:1 + n]))

    # Write your solution here

    # Print output to stdout
    # print(answer)

if __name__ == "__main__":
    main()
`,
  java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        // Read input from stdin (see example format in the question panel)

        // Write your solution here

        // Print output to stdout
        // System.out.println(answer);
    }
}
`,
  javascript: `const fs = require("fs");

const tokens = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
// Parse tokens as needed, e.g. const n = Number(tokens[0]);

// Write your solution here

// Print output to stdout
// console.log(answer);
`,
  typescript: `const fs = require("fs");

const tokens = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
// Parse tokens as needed, e.g. const n = Number(tokens[0]);

// Write your solution here

// Print output to stdout
// console.log(answer);
`,
  go: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    in := bufio.NewReader(os.Stdin)
    // Read input from stdin (see example format in the question panel)

    // Write your solution here

    // Print output to stdout
    // fmt.Println(answer)
}
`,
  rust: `use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let tokens: Vec<&str> = input.split_whitespace().collect();
    // Parse tokens as needed

    // Write your solution here

    // Print output to stdout
    // println!("{}", answer);
}
`,
  kotlin: `fun main() {
    val tokens = generateSequence { readlnOrNull() }
        .filterNotNull()
        .flatMap { it.split("\\\\s+".toRegex()) }
        .toList()
    // Parse tokens as needed

    // Write your solution here

    // Print output to stdout
    // println(answer)
}
`,
  csharp: `using System;
using System.Linq;

class Program {
    static void Main() {
        var tokens = Console.In.ReadToEnd()
            .Split((char[])null, StringSplitOptions.RemoveEmptyEntries);
        // Parse tokens as needed

        // Write your solution here

        // Print output to stdout
        // Console.WriteLine(answer);
    }
}
`,
  php: `<?php
$input = trim(stream_get_contents(STDIN));
$tokens = preg_split('/\\s+/', $input, -1, PREG_SPLIT_NO_EMPTY);
// Parse tokens as needed

// Write your solution here

// Print output to stdout
// echo $answer, "\\n";
`,
  ruby: `tokens = STDIN.read.split
# Parse tokens as needed

# Write your solution here

# Print output to stdout
# puts answer
`,
  swift: `import Foundation

let input = readLine() ?? ""
let tokens = input.split(separator: " ").map(String.init)
// Parse tokens as needed

// Write your solution here

// Print output to stdout
// print(answer)
`,
}

export const EMPTY_CODE: Record<Language, string> = { ...CP_STARTER_TEMPLATES }

const PLACEHOLDER_MARKERS = [
  /Write your solution here/i,
  /Parse tokens as needed/i,
  /Parse tokens as needed/i,
]

export function isPlaceholderCode(code: string, language: Language): boolean {
  const normalized = code.trim()
  if (!normalized) return true
  if (normalized === CP_STARTER_TEMPLATES[language].trim()) return true
  return PLACEHOLDER_MARKERS.some((pattern) => pattern.test(normalized))
}

export function buildStarterCodeForLanguage(
  question: Question,
  language: Language,
): string {
  if (question.starter_code?.[language]?.trim()) {
    return question.starter_code[language]
  }
  return CP_STARTER_TEMPLATES[language]
}

export function buildStarterCodeForQuestion(
  question: Question,
): Record<Language, string> {
  return {
    python: buildStarterCodeForLanguage(question, "python"),
    javascript: buildStarterCodeForLanguage(question, "javascript"),
    java: buildStarterCodeForLanguage(question, "java"),
    cpp: buildStarterCodeForLanguage(question, "cpp"),
    c: buildStarterCodeForLanguage(question, "c"),
    go: buildStarterCodeForLanguage(question, "go"),
    rust: buildStarterCodeForLanguage(question, "rust"),
    kotlin: buildStarterCodeForLanguage(question, "kotlin"),
    csharp: buildStarterCodeForLanguage(question, "csharp"),
    typescript: buildStarterCodeForLanguage(question, "typescript"),
    php: buildStarterCodeForLanguage(question, "php"),
    ruby: buildStarterCodeForLanguage(question, "ruby"),
    swift: buildStarterCodeForLanguage(question, "swift"),
  }
}

export const CP_EXECUTION_HINT =
  "Write a complete program. Read input from stdin and print your answer to stdout (Codeforces / CodeChef style)."
