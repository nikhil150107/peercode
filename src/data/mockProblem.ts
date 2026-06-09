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

export type Language = "python" | "java" | "cpp" | "javascript"

export const languageOptions: { value: Language; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "javascript", label: "JavaScript" },
]

export const starterCode: Record<Language, string> = {
  python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))`,

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

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9)));
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto result = twoSum(nums, 9);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
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
}

console.log(twoSum([2, 7, 11, 15], 9));`,
}

export const monacoLanguage: Record<Language, string> = {
  python: "python",
  java: "java",
  cpp: "cpp",
  javascript: "javascript",
}
