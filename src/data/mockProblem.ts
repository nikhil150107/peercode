export type Difficulty = "Easy" | "Medium" | "Hard"

export const mockProblem = {
  title: "Two Sum",
  difficulty: "Medium" as Difficulty,
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3, 2, 4], target = 6",
      output: "[1, 2]",
    },
  ],
}

export type Language =
  | "python"
  | "java"
  | "cpp"
  | "javascript"
  | "typescript"
  | "c"
  | "go"
  | "rust"
  | "kotlin"
  | "csharp"
  | "php"
  | "ruby"
  | "swift"

export const languageOptions: { value: Language; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
]

export const starterCode: Record<Language, string> = {
  python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,

  java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,

  cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,

  javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
  typescript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
  c: `// Write your solution here`,
  go: `// Write your solution here`,
  rust: `// Write your solution here`,
  kotlin: `// Write your solution here`,
  csharp: `// Write your solution here`,
  php: `// Write your solution here`,
  ruby: `# Write your solution here`,
  swift: `// Write your solution here`,
}

export const monacoLanguage: Record<Language, string> = {
  python: "python",
  java: "java",
  cpp: "cpp",
  javascript: "javascript",
  typescript: "typescript",
  c: "c",
  go: "go",
  rust: "rust",
  kotlin: "kotlin",
  csharp: "csharp",
  php: "php",
  ruby: "ruby",
  swift: "swift",
}
