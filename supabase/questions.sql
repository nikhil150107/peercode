-- Run in Supabase SQL Editor after main schema.sql

CREATE TABLE IF NOT EXISTS questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  difficulty text NOT NULL,
  topic text NOT NULL,
  description text NOT NULL,
  examples jsonb,
  hidden_tests jsonb,
  constraints text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

-- 5 Easy
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Best Time to Buy and Sell Stock',
  'Easy',
  'Arrays',
  'You are given an array prices where prices[i] is the price of a given stock on day i. You want to maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit. If you cannot achieve any profit, return 0.',
  '[{"input": "prices = [7,1,5,3,6,4]", "output": "5", "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."}, {"input": "prices = [7,6,4,3,1]", "output": "0", "explanation": "No transactions yield profit."}]',
  '1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^4'
),
(
  'Valid Palindrome',
  'Easy',
  'Strings',
  'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
  '[{"input": "s = \"A man, a plan, a canal: Panama\"", "output": "true", "explanation": "amanaplanacanalpanama is a palindrome."}, {"input": "s = \"race a car\"", "output": "false"}]',
  '1 <= s.length <= 2 * 10^5, s consists of printable ASCII characters'
),
(
  'Contains Duplicate',
  'Easy',
  'Arrays',
  'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
  '[{"input": "nums = [1,2,3,1]", "output": "true"}, {"input": "nums = [1,2,3,4]", "output": "false"}]',
  '1 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9'
),
(
  'Maximum Subarray',
  'Easy',
  'Arrays',
  'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
  '[{"input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "output": "6", "explanation": "The subarray [4,-1,2,1] has the largest sum 6."}, {"input": "nums = [1]", "output": "1"}]',
  '1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4'
),
(
  'Merge Sorted Array',
  'Easy',
  'Arrays',
  'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n. Merge nums2 into nums1 as one sorted array in-place. The first m elements of nums1 represent the merged elements.',
  '[{"input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", "output": "[1,2,2,3,5,6]"}, {"input": "nums1 = [1], m = 1, nums2 = [], n = 0", "output": "[1]"}]',
  'nums1.length == m + n, nums2.length == n'
);

-- 10 Medium
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Two Sum',
  'Medium',
  'Arrays',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  '[{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "nums[0] + nums[1] == 9."}, {"input": "nums = [3,2,4], target = 6", "output": "[1,2]"}]',
  '2 <= nums.length <= 10^4, -10^9 <= nums[i], target <= 10^9'
),
(
  'Longest Substring Without Repeating Characters',
  'Medium',
  'Strings',
  'Given a string s, find the length of the longest substring without repeating characters.',
  '[{"input": "s = \"abcabcbb\"", "output": "3", "explanation": "The answer is \"abc\" with length 3."}, {"input": "s = \"bbbbb\"", "output": "1"}]',
  '0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces'
),
(
  '3Sum',
  'Medium',
  'Arrays',
  'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.',
  '[{"input": "nums = [-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]"}, {"input": "nums = [0,1,1]", "output": "[]"}]',
  '3 <= nums.length <= 3000, -10^5 <= nums[i] <= 10^5'
),
(
  'Binary Tree Level Order Traversal',
  'Medium',
  'Trees',
  'Given the root of a binary tree, return the level order traversal of its nodes'' values (i.e., from left to right, level by level).',
  '[{"input": "root = [3,9,20,null,null,15,7]", "output": "[[3],[9,20],[15,7]]"}, {"input": "root = [1]", "output": "[[1]]"}]',
  'The number of nodes in the tree is in the range [0, 2000], -1000 <= Node.val <= 1000'
),
(
  'Validate Binary Search Tree',
  'Medium',
  'Trees',
  'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: the left subtree of a node contains only nodes with keys less than the node''s key, and the right subtree contains only nodes with keys greater than the node''s key.',
  '[{"input": "root = [2,1,3]", "output": "true"}, {"input": "root = [5,1,4,null,null,3,6]", "output": "false"}]',
  'The number of nodes in the tree is in the range [1, 10^4], -2^31 <= Node.val <= 2^31 - 1'
),
(
  'Number of Islands',
  'Medium',
  'Graphs',
  'Given an m x n 2D binary grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
  '[{"input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "output": "1"}, {"input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "output": "3"}]',
  'm == grid.length, n == grid[i].length, 1 <= m, n <= 300'
),
(
  'Course Schedule',
  'Medium',
  'Graphs',
  'There are a total of numCourses courses labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take course bi before course ai. Return true if you can finish all courses, or false otherwise.',
  '[{"input": "numCourses = 2, prerequisites = [[1,0]]", "output": "true"}, {"input": "numCourses = 2, prerequisites = [[1,0],[0,1]]", "output": "false"}]',
  '1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000'
),
(
  'Coin Change',
  'Medium',
  'DP',
  'You are given an integer array coins representing coin denominations and an integer amount representing a total amount of money. Return the fewest number of coins needed to make up that amount. If that amount cannot be made up, return -1.',
  '[{"input": "coins = [1,2,5], amount = 11", "output": "3", "explanation": "11 = 5 + 5 + 1"}, {"input": "coins = [2], amount = 3", "output": "-1"}]',
  '1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1, 0 <= amount <= 10^4'
),
(
  'Longest Increasing Subsequence',
  'Medium',
  'DP',
  'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
  '[{"input": "nums = [10,9,2,5,3,7,101,18]", "output": "4", "explanation": "The longest increasing subsequence is [2,3,7,101]."}, {"input": "nums = [0,1,0,3,2,3]", "output": "4"}]',
  '1 <= nums.length <= 2500, -10^4 <= nums[i] <= 10^4'
),
(
  'Group Anagrams',
  'Medium',
  'Strings',
  'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An anagram is a word or phrase formed by rearranging the letters of another, using all original letters exactly once.',
  '[{"input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"}, {"input": "strs = [\"\"]", "output": "[[\"\"]]"}]',
  '1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100'
);

-- 5 Hard
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Trapping Rain Water',
  'Hard',
  'Arrays',
  'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
  '[{"input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]", "output": "6"}, {"input": "height = [4,2,0,3,2,5]", "output": "9"}]',
  'n == height.length, 1 <= n <= 2 * 10^4, 0 <= height[i] <= 10^5'
),
(
  'Serialize and Deserialize Binary Tree',
  'Hard',
  'Trees',
  'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.',
  '[{"input": "root = [1,2,3,null,null,4,5]", "output": "[1,2,3,null,null,4,5]"}, {"input": "root = []", "output": "[]"}]',
  'The number of nodes in the tree is in the range [0, 10^4], -1000 <= Node.val <= 1000'
),
(
  'Word Ladder',
  'Hard',
  'Graphs',
  'Given two words beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. Only one letter can be changed at a time, and each transformed word must exist in wordList.',
  '[{"input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "output": "5", "explanation": "hit -> hot -> dot -> dog -> cog"}, {"input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", "output": "0"}]',
  '1 <= beginWord.length <= 10, endWord.length == beginWord.length, 1 <= wordList.length <= 5000'
),
(
  'Edit Distance',
  'Hard',
  'DP',
  'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations: insert a character, delete a character, or replace a character.',
  '[{"input": "word1 = \"horse\", word2 = \"ros\"", "output": "3", "explanation": "horse -> rorse -> rose -> ros"}, {"input": "word1 = \"intention\", word2 = \"execution\"", "output": "5"}]',
  '0 <= word1.length, word2.length <= 500, word1 and word2 consist of lowercase English letters'
),
(
  'Median of Two Sorted Arrays',
  'Hard',
  'Arrays',
  'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
  '[{"input": "nums1 = [1,3], nums2 = [2]", "output": "2.00000", "explanation": "Merged array is [1,2,3], median is 2."}, {"input": "nums1 = [1,2], nums2 = [3,4]", "output": "2.50000"}]',
  'nums1.length == m, nums2.length == n, 0 <= m, n <= 1000, 1 <= m + n <= 2000'
);

-- 80 additional questions (100 total)

-- Arrays: 20 more
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Remove Duplicates from Sorted Array',
  'Easy',
  'Arrays',
  'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return k, the number of unique elements. The first k elements of nums should hold the unique elements.',
  '[{"input": "nums = [1,1,2]", "output": "2, nums = [1,2,_]", "explanation": "After removing duplicates, k = 2 and the first two elements are 1 and 2."}, {"input": "nums = [0,0,1,1,1,2,2,3,3,4]", "output": "5, nums = [0,1,2,3,4,_,_,_,_,_]"}]',
  '1 <= nums.length <= 3 * 10^4, -100 <= nums[i] <= 100, nums is sorted in non-decreasing order'
),
(
  'Plus One',
  'Easy',
  'Arrays',
  'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. Increment the large integer by one and return the resulting array of digits.',
  '[{"input": "digits = [1,2,3]", "output": "[1,2,4]", "explanation": "123 + 1 = 124."}, {"input": "digits = [9,9,9]", "output": "[1,0,0,0]"}]',
  '1 <= digits.length <= 100, 0 <= digits[i] <= 9, digits does not contain leading zeros except for zero itself'
),
(
  'Move Zeroes',
  'Easy',
  'Arrays',
  'Given an integer array nums, move all 0s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.',
  '[{"input": "nums = [0,1,0,3,12]", "output": "[1,3,12,0,0]"}, {"input": "nums = [0]", "output": "[0]"}]',
  '1 <= nums.length <= 10^4, -2^31 <= nums[i] <= 2^31 - 1'
),
(
  'Single Number',
  'Easy',
  'Arrays',
  'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime complexity and use only constant extra space.',
  '[{"input": "nums = [2,2,1]", "output": "1"}, {"input": "nums = [4,1,2,1,2]", "output": "4"}]',
  '1 <= nums.length <= 3 * 10^4, -3 * 10^4 <= nums[i] <= 3 * 10^4, each element appears twice except for one'
),
(
  'Intersection of Two Arrays II',
  'Easy',
  'Arrays',
  'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays. You may return the result in any order.',
  '[{"input": "nums1 = [1,2,2,1], nums2 = [2,2]", "output": "[2,2]"}, {"input": "nums1 = [4,9,5], nums2 = [9,4,8,9,1]", "output": "[4,9]"}]',
  '1 <= nums1.length, nums2.length <= 1000, 0 <= nums1[i], nums2[i] <= 1000'
),
(
  'Squares of a Sorted Array',
  'Easy',
  'Arrays',
  'Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
  '[{"input": "nums = [-4,-1,0,3,10]", "output": "[0,1,9,16,100]"}, {"input": "nums = [-7,-3,2,3,11]", "output": "[4,9,9,49,121]"}]',
  '1 <= nums.length <= 10^4, -10^4 <= nums[i] <= 10^4, nums is sorted in non-decreasing order'
),
(
  'Assign Cookies',
  'Easy',
  'Arrays',
  'Assume you are an awesome parent and want to give your children some cookies. Each child i has a greed factor g[i] and each cookie j has a size s[j]. If s[j] >= g[i], the child is content. Maximize the number of content children.',
  '[{"input": "g = [1,2,3], s = [1,1]", "output": "1"}, {"input": "g = [1,2], s = [1,2,3]", "output": "2"}]',
  '1 <= g.length <= 3 * 10^4, 0 <= s.length <= 3 * 10^4, 1 <= g[i], s[j] <= 2^31 - 1'
),
(
  'Majority Element',
  'Easy',
  'Arrays',
  'Given an array nums of size n, return the majority element. The majority element is the element that appears more than floor(n / 2) times. You may assume that the majority element always exists.',
  '[{"input": "nums = [3,2,3]", "output": "3"}, {"input": "nums = [2,2,1,1,1,2,2]", "output": "2"}]',
  'n == nums.length, 1 <= n <= 5 * 10^4, -10^9 <= nums[i] <= 10^9'
),
(
  'Product of Array Except Self',
  'Medium',
  'Arrays',
  'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.',
  '[{"input": "nums = [1,2,3,4]", "output": "[24,12,8,6]"}, {"input": "nums = [-1,1,0,-3,3]", "output": "[0,0,9,0,0]"}]',
  '2 <= nums.length <= 10^5, -30 <= nums[i] <= 30, the product of any prefix or suffix fits in a 32-bit integer'
),
(
  'Rotate Array',
  'Medium',
  'Arrays',
  'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.',
  '[{"input": "nums = [1,2,3,4,5,6,7], k = 3", "output": "[5,6,7,1,2,3,4]"}, {"input": "nums = [-1,-100,3,99], k = 2", "output": "[3,99,-1,-100]"}]',
  '1 <= nums.length <= 10^5, -2^31 <= nums[i] <= 2^31 - 1, 0 <= k <= 10^5'
),
(
  'Find Minimum in Rotated Sorted Array',
  'Medium',
  'Arrays',
  'Given the sorted rotated array nums of distinct integers, return the minimum element. You must write an algorithm that runs in O(log n) time.',
  '[{"input": "nums = [3,4,5,1,2]", "output": "1"}, {"input": "nums = [4,5,6,7,0,1,2]", "output": "0"}]',
  'n == nums.length, 1 <= n <= 5000, -5000 <= nums[i] <= 5000, all integers are unique, nums is sorted and rotated'
),
(
  'Search in Rotated Sorted Array',
  'Medium',
  'Arrays',
  'Given the array nums after rotation and an integer target, return the index of target if it is in nums, or -1 if it is not. You must write an algorithm with O(log n) runtime complexity.',
  '[{"input": "nums = [4,5,6,7,0,1,2], target = 0", "output": "4"}, {"input": "nums = [4,5,6,7,0,1,2], target = 3", "output": "-1"}]',
  'n == nums.length, 1 <= n <= 5000, -10^4 <= nums[i] <= 10^4, all values are unique, nums is rotated sorted'
),
(
  'Container With Most Water',
  'Medium',
  'Arrays',
  'You are given an integer array height of length n. There are n vertical lines such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that holds the most water.',
  '[{"input": "height = [1,8,6,2,5,4,8,3,7]", "output": "49"}, {"input": "height = [1,1]", "output": "1"}]',
  'n == height.length, 2 <= n <= 10^5, 0 <= height[i] <= 10^4'
),
(
  'Next Permutation',
  'Medium',
  'Arrays',
  'Given an array of integers nums, rearrange nums into the lexicographically next greater permutation. If such an arrangement is not possible, rearrange it as the lowest possible order (sorted in ascending order).',
  '[{"input": "nums = [1,2,3]", "output": "[1,3,2]"}, {"input": "nums = [3,2,1]", "output": "[1,2,3]"}]',
  '1 <= nums.length <= 100, 0 <= nums[i] <= 100'
),
(
  'Spiral Matrix',
  'Medium',
  'Arrays',
  'Given an m x n matrix, return all elements of the matrix in spiral order.',
  '[{"input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "output": "[1,2,3,6,9,8,7,4,5]"}, {"input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", "output": "[1,2,3,4,8,12,11,10,9,5,6,7]"}]',
  'm == matrix.length, n == matrix[i].length, 1 <= m, n <= 10, -100 <= matrix[i][j] <= 100'
),
(
  'Set Matrix Zeroes',
  'Medium',
  'Arrays',
  'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0s. You must do it in place.',
  '[{"input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]", "output": "[[1,0,1],[0,0,0],[1,0,1]]"}, {"input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"}]',
  'm == matrix.length, n == matrix[0].length, 1 <= m, n <= 200, -2^31 <= matrix[i][j] <= 2^31 - 1'
),
(
  'Subarray Sum Equals K',
  'Medium',
  'Arrays',
  'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals k.',
  '[{"input": "nums = [1,1,1], k = 2", "output": "2"}, {"input": "nums = [1,2,3], k = 3", "output": "2"}]',
  '1 <= nums.length <= 2 * 10^4, -1000 <= nums[i] <= 1000, -10^7 <= k <= 10^7'
),
(
  'Kth Largest Element in an Array',
  'Medium',
  'Arrays',
  'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.',
  '[{"input": "nums = [3,2,1,5,6,4], k = 2", "output": "5"}, {"input": "nums = [3,2,3,1,2,4,5,5,6], k = 4", "output": "4"}]',
  '1 <= k <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4'
),
(
  'Find Peak Element',
  'Medium',
  'Arrays',
  'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element and return its index. You must write an algorithm that runs in O(log n) time.',
  '[{"input": "nums = [1,2,3,1]", "output": "2", "explanation": "3 is a peak element and index 2."}, {"input": "nums = [1,2,1,3,5,6,4]", "output": "5"}]',
  '1 <= nums.length <= 1000, -2^31 <= nums[i] <= 2^31 - 1, nums[i] != nums[i + 1] for all valid i'
),
(
  'First Missing Positive',
  'Hard',
  'Arrays',
  'Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.',
  '[{"input": "nums = [1,2,0]", "output": "3"}, {"input": "nums = [3,4,-1,1]", "output": "2"}, {"input": "nums = [7,8,9,11,12]", "output": "1"}]',
  '1 <= nums.length <= 10^5, -2^31 <= nums[i] <= 2^31 - 1'
);

-- Strings: 15 more
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Valid Anagram',
  'Easy',
  'Strings',
  'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another word using all original letters exactly once.',
  '[{"input": "s = \"anagram\", t = \"nagaram\"", "output": "true"}, {"input": "s = \"rat\", t = \"car\"", "output": "false"}]',
  '1 <= s.length, t.length <= 5 * 10^4, s and t consist of lowercase English letters'
),
(
  'Reverse String',
  'Easy',
  'Strings',
  'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
  '[{"input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"}, {"input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"}]',
  '1 <= s.length <= 10^5, s[i] is a printable ASCII character'
),
(
  'Find the Index of the First Occurrence in a String',
  'Easy',
  'Strings',
  'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
  '[{"input": "haystack = \"sadbutsad\", needle = \"sad\"", "output": "0"}, {"input": "haystack = \"leetcode\", needle = \"leeto\"", "output": "-1"}]',
  '1 <= haystack.length, needle.length <= 10^4, haystack and needle consist of only lowercase English letters'
),
(
  'Longest Common Prefix',
  'Easy',
  'Strings',
  'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.',
  '[{"input": "strs = [\"flower\",\"flow\",\"flight\"]", "output": "\"fl\""}, {"input": "strs = [\"dog\",\"racecar\",\"car\"]", "output": "\"\""}]',
  '1 <= strs.length <= 200, 0 <= strs[i].length <= 200, strs[i] consists of lowercase English letters'
),
(
  'Reverse Words in a String III',
  'Easy',
  'Strings',
  'Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.',
  '[{"input": "s = \"Let''s take LeetCode contest\"", "output": "\"s''teL ekat edoCteeL tsetnoc\""}, {"input": "s = \"God Ding\"", "output": "\"doG gniD\""}]',
  '1 <= s.length <= 5 * 10^4, s contains printable ASCII characters, s does not contain leading or trailing spaces'
),
(
  'Valid Parentheses',
  'Easy',
  'Strings',
  'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid. An input string is valid if open brackets are closed in the correct order.',
  '[{"input": "s = \"()\"", "output": "true"}, {"input": "s = \"()[]{}\"", "output": "true"}, {"input": "s = \"(]\"", "output": "false"}]',
  '1 <= s.length <= 10^4, s consists of parentheses only ''()[]{}'''
),
(
  'Longest Palindromic Substring',
  'Medium',
  'Strings',
  'Given a string s, return the longest palindromic substring in s.',
  '[{"input": "s = \"babad\"", "output": "\"bab\"", "explanation": "\"aba\" is also a valid answer."}, {"input": "s = \"cbbd\"", "output": "\"bb\""}]',
  '1 <= s.length <= 1000, s consists of digits and English letters'
),
(
  'String to Integer (atoi)',
  'Medium',
  'Strings',
  'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer. The algorithm should read leading whitespace, optional sign, and digits until a non-digit character is encountered.',
  '[{"input": "s = \"42\"", "output": "42"}, {"input": "s = \"   -42\"", "output": "-42"}, {"input": "s = \"4193 with words\"", "output": "4193"}]',
  '0 <= s.length <= 200, s consists of English letters, digits, '' '', ''+'', ''-'' and ''.'''
),
(
  'Zigzag Conversion',
  'Medium',
  'Strings',
  'The string \"PAYPALISHIRING\" is written zigzag on a given number of rows. Read line by line: \"PAHNAPLSIIGYIR\". Write code that will take a string and make this conversion given a number of rows.',
  '[{"input": "s = \"PAYPALISHIRING\", numRows = 3", "output": "\"PAHNAPLSIIGYIR\""}, {"input": "s = \"PAYPALISHIRING\", numRows = 4", "output": "\"PINALSIGYAHRPI\""}]',
  '1 <= s.length <= 1000, s consists of English letters, 1 <= numRows <= 1000'
),
(
  'Letter Combinations of a Phone Number',
  'Medium',
  'Strings',
  'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters is given on a telephone keypad.',
  '[{"input": "digits = \"23\"", "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"}, {"input": "digits = \"\"", "output": "[]"}]',
  '0 <= digits.length <= 4, digits[i] is a digit in the range 2-9'
),
(
  'Generate Parentheses',
  'Medium',
  'Strings',
  'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
  '[{"input": "n = 3", "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"}, {"input": "n = 1", "output": "[\"()\"]"}]',
  '1 <= n <= 8'
),
(
  'Decode String',
  'Medium',
  'Strings',
  'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times.',
  '[{"input": "s = \"3[a]2[bc]\"", "output": "\"aaabcbc\""}, {"input": "s = \"3[a2[c]]\"", "output": "\"accaccacc\""}]',
  '1 <= s.length <= 30, s consists of lowercase English letters, digits, and square brackets'
),
(
  'Palindromic Substrings',
  'Medium',
  'Strings',
  'Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.',
  '[{"input": "s = \"abc\"", "output": "3", "explanation": "Three palindromic substrings: \"a\", \"b\", \"c\"."}, {"input": "s = \"aaa\"", "output": "6"}]',
  '1 <= s.length <= 1000, s consists of lowercase English letters'
),
(
  'Minimum Window Substring',
  'Hard',
  'Strings',
  'Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string.',
  '[{"input": "s = \"ADOBECODEBANC\", t = \"ABC\"", "output": "\"BANC\""}, {"input": "s = \"a\", t = \"a\"", "output": "\"a\""}]',
  'm == s.length, n == t.length, 1 <= m, n <= 10^5, s and t consist of uppercase and lowercase English letters'
),
(
  'Regular Expression Matching',
  'Hard',
  'Strings',
  'Given an input string s and a pattern p, implement regular expression matching with support for ''.'' and ''*'' where ''.'' matches any single character and ''*'' matches zero or more of the preceding element.',
  '[{"input": "s = \"aa\", p = \"a\"", "output": "false"}, {"input": "s = \"aa\", p = \"a*\"", "output": "true"}, {"input": "s = \"ab\", p = \".*\"", "output": "true"}]',
  '1 <= s.length <= 20, 1 <= p.length <= 30, s contains only lowercase English letters, p contains lowercase letters, ''.'' and ''*'''
);

-- Trees: 15 more
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Maximum Depth of Binary Tree',
  'Easy',
  'Trees',
  'Given the root of a binary tree, return its maximum depth. A binary tree''s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
  '[{"input": "root = [3,9,20,null,null,15,7]", "output": "3"}, {"input": "root = [1,null,2]", "output": "2"}]',
  'The number of nodes in the tree is in the range [0, 10^4], -100 <= Node.val <= 100'
),
(
  'Invert Binary Tree',
  'Easy',
  'Trees',
  'Given the root of a binary tree, invert the tree, and return its root. Inverting means swapping the left and right children of all nodes.',
  '[{"input": "root = [4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]"}, {"input": "root = [2,1,3]", "output": "[2,3,1]"}]',
  'The number of nodes in the tree is in the range [0, 100], -100 <= Node.val <= 100'
),
(
  'Symmetric Tree',
  'Easy',
  'Trees',
  'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
  '[{"input": "root = [1,2,2,3,4,4,3]", "output": "true"}, {"input": "root = [1,2,2,null,3,null,3]", "output": "false"}]',
  'The number of nodes in the tree is in the range [1, 1000], -100 <= Node.val <= 100'
),
(
  'Diameter of Binary Tree',
  'Easy',
  'Trees',
  'Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes, which may or may not pass through the root.',
  '[{"input": "root = [1,2,3,4,5]", "output": "3", "explanation": "Longest path is [4,2,1,3] or [5,2,1,3]."}, {"input": "root = [1,2]", "output": "1"}]',
  'The number of nodes in the tree is in the range [1, 10^4], -100 <= Node.val <= 100'
),
(
  'Balanced Binary Tree',
  'Easy',
  'Trees',
  'Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is one in which the depth of the two subtrees of every node never differs by more than one.',
  '[{"input": "root = [3,9,20,null,null,15,7]", "output": "true"}, {"input": "root = [1,2,2,3,3,null,null,4,4]", "output": "false"}]',
  'The number of nodes in the tree is in the range [0, 5000], -10^4 <= Node.val <= 10^4'
),
(
  'Path Sum',
  'Easy',
  'Trees',
  'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
  '[{"input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", "output": "true"}, {"input": "root = [1,2,3], targetSum = 5", "output": "false"}]',
  'The number of nodes in the tree is in the range [0, 5000], -1000 <= Node.val <= 1000, -1000 <= targetSum <= 1000'
),
(
  'Same Tree',
  'Easy',
  'Trees',
  'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two trees are the same if they are structurally identical and nodes have the same value.',
  '[{"input": "p = [1,2,3], q = [1,2,3]", "output": "true"}, {"input": "p = [1,2], q = [1,null,2]", "output": "false"}]',
  'The number of nodes in both trees is in the range [0, 100], -10^4 <= Node.val <= 10^4'
),
(
  'Lowest Common Ancestor of a Binary Search Tree',
  'Medium',
  'Trees',
  'Given a binary search tree root, and two nodes p and q, return the lowest common ancestor (LCA) of the two given nodes. The LCA is the lowest node that has both p and q as descendants.',
  '[{"input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", "output": "6"}, {"input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", "output": "2"}]',
  'The number of nodes in the tree is in the range [2, 10^5], -10^9 <= Node.val <= 10^9, all Node.val are unique, p != q'
),
(
  'Construct Binary Tree from Preorder and Inorder Traversal',
  'Medium',
  'Trees',
  'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
  '[{"input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", "output": "[3,9,20,null,null,15,7]"}, {"input": "preorder = [-1], inorder = [-1]", "output": "[-1]"}]',
  '1 <= preorder.length <= 3000, inorder.length == preorder.length, -3000 <= preorder[i], inorder[i] <= 3000, all values are unique'
),
(
  'Binary Tree Right Side View',
  'Medium',
  'Trees',
  'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
  '[{"input": "root = [1,2,3,null,5,null,4]", "output": "[1,3,4]"}, {"input": "root = [1,null,3]", "output": "[1,3]"}]',
  'The number of nodes in the tree is in the range [0, 100], -100 <= Node.val <= 100'
),
(
  'Count Good Nodes in Binary Tree',
  'Medium',
  'Trees',
  'Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.',
  '[{"input": "root = [3,1,4,3,null,1,5]", "output": "4"}, {"input": "root = [3,3,null,4,2]", "output": "3"}]',
  'The number of nodes in the binary tree is in the range [1, 10^5], -10^4 <= Node.val <= 10^4'
),
(
  'Kth Smallest Element in a BST',
  'Medium',
  'Trees',
  'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
  '[{"input": "root = [3,1,4,null,2], k = 1", "output": "1"}, {"input": "root = [5,3,6,2,4,null,null,1], k = 3", "output": "3"}]',
  'The number of nodes in the tree is n, 1 <= k <= n <= 10^4, 0 <= Node.val <= 10^4'
),
(
  'Flatten Binary Tree to Linked List',
  'Medium',
  'Trees',
  'Given the root of a binary tree, flatten the tree into a linked list. The linked list should use the same TreeNode class where the right child pointer points to the next node and left child pointer is always null.',
  '[{"input": "root = [1,2,5,3,4,null,6]", "output": "[1,null,2,null,3,null,4,null,5,null,6]"}, {"input": "root = []", "output": "[]"}]',
  'The number of nodes in the tree is in the range [0, 200], -100 <= Node.val <= 100'
),
(
  'Binary Tree Maximum Path Sum',
  'Hard',
  'Trees',
  'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. The path sum is the sum of the node values. Return the maximum path sum of any non-empty path.',
  '[{"input": "root = [1,2,3]", "output": "6", "explanation": "Optimal path is 2 -> 1 -> 3 with sum 6."}, {"input": "root = [-10,9,20,null,null,15,7]", "output": "42"}]',
  'The number of nodes in the tree is in the range [1, 3 * 10^4], -1000 <= Node.val <= 1000'
),
(
  'Lowest Common Ancestor of a Binary Tree',
  'Medium',
  'Trees',
  'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q. The LCA is defined as the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself).',
  '[{"input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", "output": "3"}, {"input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", "output": "5"}]',
  'The number of nodes in the tree is in the range [2, 10^5], -10^9 <= Node.val <= 10^9, all Node.val are unique, p != q, p and q exist in the tree'
);

-- Graphs: 10 more
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Clone Graph',
  'Medium',
  'Graphs',
  'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.',
  '[{"input": "adjList = [[2,4],[1,3],[2,4],[1,3]]", "output": "[[2,4],[1,3],[2,4],[1,3]]"}, {"input": "adjList = [[]]", "output": "[[]]"}]',
  'The number of nodes in the graph is in the range [0, 100], 1 <= Node.val <= 100, Node.val is unique, no repeated edges'
),
(
  'Pacific Atlantic Water Flow',
  'Medium',
  'Graphs',
  'There is an m x n rectangular island that borders both the Pacific and Atlantic oceans. Rain water can flow to adjacent cells or the same height. Return a list of grid coordinates where water can flow to both oceans.',
  '[{"input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"}, {"input": "heights = [[2,1],[1,2]]", "output": "[[0,0],[0,1],[1,0],[1,1]]"}]',
  'm == heights.length, n == heights[i].length, 1 <= m, n <= 200, 0 <= heights[i][j] <= 10^5'
),
(
  'Redundant Connection',
  'Medium',
  'Graphs',
  'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes and one additional edge. Return an edge that can be removed so that the graph is a tree.',
  '[{"input": "edges = [[1,2],[1,3],[2,3]]", "output": "[2,3]"}, {"input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", "output": "[1,4]"}]',
  'n == edges.length, 3 <= n <= 1000, edges[i].length == 2, 1 <= ai < bi <= edges.length'
),
(
  'Graph Valid Tree',
  'Medium',
  'Graphs',
  'Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
  '[{"input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", "output": "true"}, {"input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", "output": "false"}]',
  '1 <= n <= 2000, 0 <= edges.length <= 5000, edges[i].length == 2, 0 <= ai, bi < n, ai != bi, no duplicate edges'
),
(
  'Number of Connected Components in an Undirected Graph',
  'Medium',
  'Graphs',
  'You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates an undirected edge between nodes ai and bi. Return the number of connected components.',
  '[{"input": "n = 5, edges = [[0,1],[1,2],[3,4]]", "output": "2"}, {"input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", "output": "1"}]',
  '1 <= n <= 2000, 1 <= edges.length <= 5000, edges[i].length == 2, 0 <= ai <= bi < n, ai != bi, no duplicate edges'
),
(
  'Rotting Oranges',
  'Medium',
  'Graphs',
  'You are given an m x n grid where each cell can have one of three values: 0 empty, 1 fresh orange, or 2 rotten orange. Every minute, any fresh orange adjacent to a rotten orange becomes rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.',
  '[{"input": "grid = [[2,1,1],[1,1,0],[0,1,1]]", "output": "4"}, {"input": "grid = [[2,1,1],[0,1,1],[1,0,1]]", "output": "-1"}]',
  'm == grid.length, n == grid[i].length, 1 <= m, n <= 10, grid[i][j] is 0, 1, or 2'
),
(
  'Walls and Gates',
  'Medium',
  'Graphs',
  'You are given an m x n grid rooms with walls, gates, and empty rooms. Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, leave it as INF.',
  '[{"input": "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]", "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]"}]',
  'm == rooms.length, n == rooms[i].length, 1 <= m, n <= 250, rooms[i][j] is -1, 0, or 2^31 - 1'
),
(
  'Cheapest Flights Within K Stops',
  'Medium',
  'Graphs',
  'There are n cities connected by some number of flights. You are given flights[i] = [fromi, toi, pricei] and integers src, dst, and k. Return the cheapest price from src to dst with at most k stops, or -1 if impossible.',
  '[{"input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1", "output": "700"}, {"input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", "output": "200"}]',
  '1 <= n <= 100, 0 <= flights.length <= (n * (n - 1) / 2), flights[i].length == 3, 0 <= src, dst, k < n, src != dst'
),
(
  'Network Delay Time',
  'Medium',
  'Graphs',
  'You are given a network of n nodes labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi). Return the minimum time it takes for all n nodes to receive a signal from node k, or -1 if impossible.',
  '[{"input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", "output": "2"}, {"input": "times = [[1,2,1]], n = 2, k = 1", "output": "1"}]',
  '1 <= k <= n <= 100, 1 <= times.length <= 6000, times[i].length == 3, 1 <= ui, vi <= n, ui != vi, 0 <= wi <= 100'
),
(
  'Alien Dictionary',
  'Hard',
  'Graphs',
  'There is a new alien language that uses the English alphabet. However, the order among the letters is unknown. You are given a list of strings words from the alien language, where the strings are sorted lexicographically. Derive the order of letters in this language, or return an empty string if the order is invalid.',
  '[{"input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", "output": "\"wertf\""}, {"input": "words = [\"z\",\"x\"]", "output": "\"zx\""}, {"input": "words = [\"z\",\"x\",\"z\"]", "output": "\"\""}]',
  '1 <= words.length <= 100, 1 <= words[i].length <= 100, words[i] consists of lowercase English letters'
);

-- DP: 15 more
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Climbing Stairs',
  'Easy',
  'DP',
  'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
  '[{"input": "n = 2", "output": "2", "explanation": "1+1 or 2."}, {"input": "n = 3", "output": "3"}]',
  '1 <= n <= 45'
),
(
  'House Robber',
  'Medium',
  'DP',
  'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected and will alert police if two adjacent houses are broken into on the same night. Return the maximum amount you can rob without alerting police.',
  '[{"input": "nums = [1,2,3,1]", "output": "4", "explanation": "Rob house 1 (1) then house 3 (3), total = 4."}, {"input": "nums = [2,7,9,3,1]", "output": "12"}]',
  '1 <= nums.length <= 100, 0 <= nums[i] <= 400'
),
(
  'House Robber II',
  'Medium',
  'DP',
  'All houses are arranged in a circle. That means the first house is the neighbor of the last one. Given an integer array nums representing money in each house, return the maximum amount you can rob tonight without alerting police.',
  '[{"input": "nums = [2,3,2]", "output": "3"}, {"input": "nums = [1,2,3,1]", "output": "4"}]',
  '1 <= nums.length <= 100, 0 <= nums[i] <= 1000'
),
(
  'Decode Ways',
  'Medium',
  'DP',
  'A message containing letters from A-Z can be encoded into numbers using the mapping A=1, B=2, ..., Z=26. Given a string s containing only digits, return the number of ways to decode it.',
  '[{"input": "s = \"12\"", "output": "2", "explanation": "\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12)."}, {"input": "s = \"226\"", "output": "3"}]',
  '1 <= s.length <= 100, s contains only digits and may contain leading zeros'
),
(
  'Unique Paths',
  'Medium',
  'DP',
  'There is a robot on an m x n grid. The robot is initially located at the top-left corner and tries to move to the bottom-right corner. The robot can only move either down or right. How many possible unique paths are there?',
  '[{"input": "m = 3, n = 7", "output": "28"}, {"input": "m = 3, n = 2", "output": "3"}]',
  '1 <= m, n <= 100'
),
(
  'Minimum Path Sum',
  'Medium',
  'DP',
  'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right.',
  '[{"input": "grid = [[1,3,1],[1,5,1],[4,2,1]]", "output": "7", "explanation": "Path 1->3->1->1->1 minimizes sum."}, {"input": "grid = [[1,2,3],[4,5,6]]", "output": "12"}]',
  'm == grid.length, n == grid[i].length, 1 <= m, n <= 200, 0 <= grid[i][j] <= 200'
),
(
  'Triangle',
  'Medium',
  'DP',
  'Given a triangle array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number on the row below. Adjacent numbers are ones directly left or right of the current position.',
  '[{"input": "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]", "output": "11"}, {"input": "triangle = [[-10]]", "output": "-10"}]',
  '1 <= triangle.length <= 200, triangle[0].length == 1, triangle[i].length == triangle[i - 1].length + 1'
),
(
  'Word Break',
  'Medium',
  'DP',
  'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. The same word may be reused.',
  '[{"input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", "output": "true"}, {"input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]", "output": "true"}, {"input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", "output": "false"}]',
  '1 <= s.length <= 300, 1 <= wordDict.length <= 1000, 1 <= wordDict[i].length <= 20, s and wordDict[i] consist of lowercase English letters'
),
(
  'Partition Equal Subset Sum',
  'Medium',
  'DP',
  'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.',
  '[{"input": "nums = [1,5,11,5]", "output": "true", "explanation": "The array can be partitioned as [1,5,5] and [11]."}, {"input": "nums = [1,2,3,5]", "output": "false"}]',
  '1 <= nums.length <= 200, 1 <= nums[i] <= 100'
),
(
  'Longest Common Subsequence',
  'Medium',
  'DP',
  'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
  '[{"input": "text1 = \"abcde\", text2 = \"ace\"", "output": "3", "explanation": "The longest common subsequence is \"ace\"."}, {"input": "text1 = \"abc\", text2 = \"abc\"", "output": "3"}]',
  '1 <= text1.length, text2.length <= 1000, text1 and text2 consist of lowercase English characters'
),
(
  'Target Sum',
  'Medium',
  'DP',
  'You are given an integer array nums and an integer target. You want to build an expression by adding a + or - before each integer in nums, then concatenate all integers. Return the number of different expressions that evaluate to target.',
  '[{"input": "nums = [1,1,1,1,1], target = 3", "output": "5"}, {"input": "nums = [1], target = 1", "output": "1"}]',
  '1 <= nums.length <= 20, 0 <= nums[i] <= 1000, 0 <= sum(nums[i]) <= 1000, -1000 <= target <= 1000'
),
(
  'Maximum Product Subarray',
  'Medium',
  'DP',
  'Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product. The test cases are generated so that the answer will fit in a 32-bit integer.',
  '[{"input": "nums = [2,3,-2,4]", "output": "6"}, {"input": "nums = [-2,0,-1]", "output": "0"}]',
  '1 <= nums.length <= 2 * 10^4, -10 <= nums[i] <= 10, the product of any subarray fits in a 32-bit integer'
),
(
  'Interleaving String',
  'Medium',
  'DP',
  'Given strings s1, s2, and s3, return true if s3 is formed by an interleaving of s1 and s2. An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, and the substrings are alternated.',
  '[{"input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"", "output": "true"}, {"input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"", "output": "false"}]',
  '0 <= s1.length, s2.length <= 100, s3.length == s1.length + s2.length, s1, s2, and s3 consist of lowercase English letters'
),
(
  'Best Time to Buy and Sell Stock III',
  'Hard',
  'DP',
  'You are given an array prices where prices[i] is the price of a given stock on day i. Find the maximum profit you can achieve. You may complete at most two transactions. You may not engage in multiple transactions simultaneously.',
  '[{"input": "prices = [3,3,5,0,0,3,1,4]", "output": "6"}, {"input": "prices = [1,2,3,4,5]", "output": "4"}]',
  '1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^5'
),
(
  'Burst Balloons',
  'Hard',
  'DP',
  'You are given n balloons indexed from 0 to n - 1, each with a number. You are asked to burst all the balloons. If you burst the ith balloon, you get nums[i - 1] * nums[i] * nums[i + 1] coins. Return the maximum coins you can collect by bursting the balloons wisely.',
  '[{"input": "nums = [3,1,5,8]", "output": "167"}, {"input": "nums = [1,5]", "output": "10"}]',
  'n == nums.length, 1 <= n <= 500, 0 <= nums[i] <= 100'
);

-- Linked Lists: 5 new
INSERT INTO questions (title, difficulty, topic, description, examples, constraints) VALUES
(
  'Reverse Linked List',
  'Easy',
  'Linked Lists',
  'Given the head of a singly linked list, reverse the list, and return the reversed list.',
  '[{"input": "head = [1,2,3,4,5]", "output": "[5,4,3,2,1]"}, {"input": "head = [1,2]", "output": "[2,1]"}, {"input": "head = []", "output": "[]"}]',
  'The number of nodes in the list is the range [0, 5000], -5000 <= Node.val <= 5000'
),
(
  'Merge Two Sorted Lists',
  'Easy',
  'Linked Lists',
  'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
  '[{"input": "list1 = [1,2,4], list2 = [1,3,4]", "output": "[1,1,2,3,4,4]"}, {"input": "list1 = [], list2 = []", "output": "[]"}]',
  'The number of nodes in both lists is in the range [0, 50], -100 <= Node.val <= 100, both lists are sorted in non-decreasing order'
),
(
  'Linked List Cycle',
  'Easy',
  'Linked Lists',
  'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle if some node can be reached again by continuously following the next pointer.',
  '[{"input": "head = [3,2,0,-4], pos = 1", "output": "true", "explanation": "Tail connects to node index 1."}, {"input": "head = [1,2], pos = 0", "output": "true"}, {"input": "head = [1], pos = -1", "output": "false"}]',
  'The number of nodes in the list is in the range [0, 10^4], -10^5 <= Node.val <= 10^5, pos is -1 or a valid index'
),
(
  'Remove Nth Node From End of List',
  'Medium',
  'Linked Lists',
  'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
  '[{"input": "head = [1,2,3,4,5], n = 2", "output": "[1,2,3,5]"}, {"input": "head = [1], n = 1", "output": "[]"}, {"input": "head = [1,2], n = 1", "output": "[1]"}]',
  'The number of nodes in the list is sz, 1 <= sz <= 30, 0 <= Node.val <= 100, 1 <= n <= sz'
),
(
  'Copy List with Random Pointer',
  'Medium',
  'Linked Lists',
  'A linked list of length n has each node with an additional random pointer that could point to any node or null. Construct a deep copy of the list.',
  '[{"input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]"}, {"input": "head = [[1,1],[2,1]]", "output": "[[1,1],[2,1]]"}]',
  '0 <= n <= 1000, -10^4 <= Node.val <= 10^4, Node.random is null or points to a node in the list'
);
