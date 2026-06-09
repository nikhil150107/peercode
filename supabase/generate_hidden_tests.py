#!/usr/bin/env python3
"""Generate hidden_tests_all.sql with 10 verified test cases per question."""

import json
import re
from collections import Counter, defaultdict, deque
from functools import cmp_to_key
from typing import Any, List, Optional, Tuple

OUTPUT_PATH = "hidden_tests_all.sql"

TITLES = [
    "Best Time to Buy and Sell Stock",
    "Valid Palindrome",
    "Contains Duplicate",
    "Maximum Subarray",
    "Merge Sorted Array",
    "Two Sum",
    "Longest Substring Without Repeating Characters",
    "3Sum",
    "Binary Tree Level Order Traversal",
    "Validate Binary Search Tree",
    "Number of Islands",
    "Course Schedule",
    "Coin Change",
    "Longest Increasing Subsequence",
    "Group Anagrams",
    "Trapping Rain Water",
    "Serialize and Deserialize Binary Tree",
    "Word Ladder",
    "Edit Distance",
    "Median of Two Sorted Arrays",
    "Remove Duplicates from Sorted Array",
    "Plus One",
    "Move Zeroes",
    "Single Number",
    "Intersection of Two Arrays II",
    "Squares of a Sorted Array",
    "Assign Cookies",
    "Majority Element",
    "Product of Array Except Self",
    "Rotate Array",
    "Find Minimum in Rotated Sorted Array",
    "Search in Rotated Sorted Array",
    "Container With Most Water",
    "Next Permutation",
    "Spiral Matrix",
    "Set Matrix Zeroes",
    "Subarray Sum Equals K",
    "Kth Largest Element in an Array",
    "Find Peak Element",
    "First Missing Positive",
    "Valid Anagram",
    "Reverse String",
    "Find the Index of the First Occurrence in a String",
    "Longest Common Prefix",
    "Reverse Words in a String III",
    "Valid Parentheses",
    "Longest Palindromic Substring",
    "String to Integer (atoi)",
    "Zigzag Conversion",
    "Letter Combinations of a Phone Number",
    "Generate Parentheses",
    "Decode String",
    "Palindromic Substrings",
    "Minimum Window Substring",
    "Regular Expression Matching",
    "Maximum Depth of Binary Tree",
    "Invert Binary Tree",
    "Symmetric Tree",
    "Diameter of Binary Tree",
    "Balanced Binary Tree",
    "Path Sum",
    "Same Tree",
    "Lowest Common Ancestor of a Binary Search Tree",
    "Construct Binary Tree from Preorder and Inorder Traversal",
    "Binary Tree Right Side View",
    "Count Good Nodes in Binary Tree",
    "Kth Smallest Element in a BST",
    "Flatten Binary Tree to Linked List",
    "Binary Tree Maximum Path Sum",
    "Lowest Common Ancestor of a Binary Tree",
    "Clone Graph",
    "Pacific Atlantic Water Flow",
    "Redundant Connection",
    "Graph Valid Tree",
    "Number of Connected Components in an Undirected Graph",
    "Rotting Oranges",
    "Walls and Gates",
    "Cheapest Flights Within K Stops",
    "Network Delay Time",
    "Alien Dictionary",
    "Climbing Stairs",
    "House Robber",
    "House Robber II",
    "Decode Ways",
    "Unique Paths",
    "Minimum Path Sum",
    "Triangle",
    "Word Break",
    "Partition Equal Subset Sum",
    "Longest Common Subsequence",
    "Target Sum",
    "Maximum Product Subarray",
    "Interleaving String",
    "Best Time to Buy and Sell Stock III",
    "Burst Balloons",
    "Reverse Linked List",
    "Merge Two Sorted Lists",
    "Linked List Cycle",
    "Remove Nth Node From End of List",
    "Copy List with Random Pointer",
]


def parse_val(s: str) -> Any:
    s = s.strip()
    if s == "INF":
        return 2147483647
    if s == "null":
        return None
    if s == "true":
        return True
    if s == "false":
        return False
    if s.startswith('"') and s.endswith('"'):
        return json.loads(s)
    if s.startswith("'") and s.endswith("'"):
        return s[1:-1]
    try:
        return json.loads(s.replace("null", "null"))
    except json.JSONDecodeError:
        pass
    if re.fullmatch(r"-?\d+", s):
        return int(s)
    return s


def parse_input(input_str: str) -> dict:
    parts = []
    depth = 0
    in_str = False
    esc = False
    cur = ""
    for ch in input_str:
        if in_str:
            cur += ch
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
            continue
        if ch == '"':
            in_str = True
            cur += ch
            continue
        if ch in "[({":
            depth += 1
        elif ch in "])}":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(cur.strip())
            cur = ""
            continue
        cur += ch
    if cur.strip():
        parts.append(cur.strip())
    out = {}
    for p in parts:
        if "=" not in p:
            continue
        name, val = p.split("=", 1)
        out[name.strip()] = parse_val(val.strip())
    return out


def fmt(v: Any) -> str:
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, str):
        return json.dumps(v)
    if isinstance(v, float):
        if v == int(v):
            s = f"{v:.5f}" if "." in str(v) or abs(v - int(v)) > 1e-9 else str(int(v))
            return s
        return str(v)
    if isinstance(v, list):
        return json.dumps(v, separators=(",", ":"))
    return str(v)


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def list_to_tree(arr: List[Any]) -> Optional[TreeNode]:
    if not arr:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in arr]
    kids = deque(nodes[1:])
    for node in nodes:
        if node:
            if kids:
                node.left = kids.popleft()
            if kids:
                node.right = kids.popleft()
    return nodes[0]


def tree_to_list(root: Optional[TreeNode]) -> List[Any]:
    if not root:
        return []
    out = []
    q = deque([root])
    while q:
        node = q.popleft()
        if node:
            out.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            out.append(None)
    while out and out[-1] is None:
        out.pop()
    return out


def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level, n = [], len(q)
        for _ in range(n):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res


# --- solvers ---

def solve_best_time_1(prices):
    mn, best = prices[0], 0
    for p in prices[1:]:
        best = max(best, p - mn)
        mn = min(mn, p)
    return best


def solve_valid_palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        while i < j and not s[i].isalnum():
            i += 1
        while i < j and not s[j].isalnum():
            j -= 1
        if s[i].lower() != s[j].lower():
            return False
        i += 1
        j -= 1
    return True


def solve_contains_duplicate(nums):
    return len(set(nums)) < len(nums)


def solve_max_subarray(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best


def solve_merge_sorted(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    arr = nums1[:]
    while j >= 0:
        if i >= 0 and arr[i] > nums2[j]:
            arr[k] = arr[i]
            i -= 1
        else:
            arr[k] = nums2[j]
            j -= 1
        k -= 1
    return arr[: m + n]


def solve_two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []


def solve_longest_substring(s):
    last = {}
    start = best = 0
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= start:
            start = last[ch] + 1
        last[ch] = i
        best = max(best, i - start + 1)
    return best


def solve_3sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                while l < r and nums[l] == nums[l - 1]:
                    l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res


def solve_bst_valid(root):
    def dfs(node, lo, hi):
        if not node:
            return True
        if not (lo < node.val < hi):
            return False
        return dfs(node.left, lo, node.val) and dfs(node.right, node.val, hi)

    return dfs(root, float("-inf"), float("inf"))


def solve_num_islands(grid):
    if not grid:
        return 0
    m, n = len(grid), len(grid[0])
    cnt = 0

    def dfs(r, c):
        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    g = [row[:] for row in grid]
    for i in range(m):
        for j in range(n):
            if g[i][j] == "1":
                cnt += 1
                dfs(i, j)
    return cnt


def solve_course_schedule(numCourses, prerequisites):
    indeg = [0] * numCourses
    adj = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(numCourses) if indeg[i] == 0)
    seen = 0
    while q:
        u = q.popleft()
        seen += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return seen == numCourses


def solve_coin_change(coins, amount):
    dp = [10**9] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] < 10**9 else -1


def solve_lis(nums):
    piles = []
    for x in nums:
        lo, hi = 0, len(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if piles[mid] < x:
                lo = mid + 1
            else:
                hi = mid
        if lo == len(piles):
            piles.append(x)
        else:
            piles[lo] = x
    return len(piles)


def solve_group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        groups[tuple(sorted(s))].append(s)
    return sorted(groups.values(), key=lambda g: g[0])


def solve_trap(height):
    l, r = 0, len(height) - 1
    lm, rm, water = height[l], height[r], 0
    while l < r:
        if lm < rm:
            l += 1
            lm = max(lm, height[l])
            water += lm - height[l]
        else:
            r -= 1
            rm = max(rm, height[r])
            water += rm - height[r]
    return water


def solve_word_ladder(beginWord, endWord, wordList):
    words = set(wordList)
    if endWord not in words:
        return 0
    q = deque([(beginWord, 1)])
    while q:
        word, steps = q.popleft()
        if word == endWord:
            return steps
        for i in range(len(word)):
            for c in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + c + word[i + 1 :]
                if nxt in words:
                    words.remove(nxt)
                    q.append((nxt, steps + 1))
    return 0


def solve_edit_distance(w1, w2):
    dp = [[0] * (len(w2) + 1) for _ in range(len(w1) + 1)]
    for i in range(len(w1) + 1):
        dp[i][0] = i
    for j in range(len(w2) + 1):
        dp[0][j] = j
    for i in range(1, len(w1) + 1):
        for j in range(1, len(w2) + 1):
            if w1[i - 1] == w2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[-1][-1]


def solve_median(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        l1 = float("-inf") if i == 0 else nums1[i - 1]
        r1 = float("inf") if i == m else nums1[i]
        l2 = float("-inf") if j == 0 else nums2[j - 1]
        r2 = float("inf") if j == n else nums2[j]
        if l1 <= r2 and l2 <= r1:
            if (m + n) % 2:
                return f"{max(l1, l2):.5f}"
            return f"{(max(l1, l2) + min(r1, r2)) / 2:.5f}"
        if l1 > r2:
            hi = i - 1
        else:
            lo = i + 1
    return "0.00000"


def solve_remove_dups(nums):
    if not nums:
        return 0, nums
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[k - 1]:
            nums[k] = nums[i]
            k += 1
    return k, nums[:k]


def solve_plus_one(digits):
    carry = 1
    for i in range(len(digits) - 1, -1, -1):
        s = digits[i] + carry
        digits[i] = s % 10
        carry = s // 10
    if carry:
        digits.insert(0, 1)
    return digits


def solve_move_zeroes(nums):
    j = 0
    for x in nums:
        if x:
            nums[j] = x
            j += 1
    for i in range(j, len(nums)):
        nums[i] = 0
    return nums


def solve_single_number(nums):
    x = 0
    for n in nums:
        x ^= n
    return x


def solve_intersect(nums1, nums2):
    c = Counter(nums1)
    out = []
    for x in nums2:
        if c[x]:
            out.append(x)
            c[x] -= 1
    return out


def solve_squares(nums):
    l, r = 0, len(nums) - 1
    res = [0] * len(nums)
    for i in range(len(nums) - 1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            res[i] = nums[l] ** 2
            l += 1
        else:
            res[i] = nums[r] ** 2
            r -= 1
    return res


def solve_assign_cookies(g, s):
    g.sort()
    s.sort()
    i = j = 0
    while i < len(g) and j < len(s):
        if s[j] >= g[i]:
            i += 1
        j += 1
    return i


def solve_majority(nums):
    cnt = cand = 0
    for x in nums:
        if cnt == 0:
            cand = x
        cnt += 1 if x == cand else -1
    return cand


def solve_product_except_self(nums):
    n = len(nums)
    res = [1] * n
    p = 1
    for i in range(n):
        res[i] = p
        p *= nums[i]
    p = 1
    for i in range(n - 1, -1, -1):
        res[i] *= p
        p *= nums[i]
    return res


def solve_rotate(nums, k):
    k %= len(nums)
    return nums[-k:] + nums[:-k]


def solve_min_rotated(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]


def solve_search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1


def solve_container(height):
    l, r, best = 0, len(height) - 1, 0
    while l < r:
        best = max(best, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best


def solve_next_perm(nums):
    nums = nums[:]
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1 :] = reversed(nums[i + 1 :])
    return nums


def solve_spiral(matrix):
    res = []
    top, left, bottom, right = 0, 0, len(matrix) - 1, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res


def solve_set_zeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    fr = any(matrix[0][j] == 0 for j in range(n))
    fc = any(matrix[i][0] == 0 for i in range(m))
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = matrix[0][j] = 0
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    if fr:
        matrix[0] = [0] * n
    if fc:
        for i in range(m):
            matrix[i][0] = 0
    return matrix


def solve_subarray_sum_k(nums, k):
    cnt = {0: 1}
    pref = ans = 0
    for x in nums:
        pref += x
        ans += cnt.get(pref - k, 0)
        cnt[pref] = cnt.get(pref, 0) + 1
    return ans


def solve_kth_largest(nums, k):
    import heapq

    return heapq.nlargest(k, nums)[-1]


def solve_find_peak(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo


def solve_first_missing_positive(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1


def solve_valid_anagram(s, t):
    return Counter(s) == Counter(t)


def solve_reverse_string(s):
    s = s[:]
    l, r = 0, len(s) - 1
    while l < r:
        s[l], s[r] = s[r], s[l]
        l += 1
        r -= 1
    return s


def solve_strstr(haystack, needle):
    if not needle:
        return 0
    for i in range(len(haystack) - len(needle) + 1):
        if haystack[i : i + len(needle)] == needle:
            return i
    return -1


def solve_lcp(strs):
    if not strs:
        return ""
    pref = strs[0]
    for s in strs[1:]:
        i = 0
        while i < len(pref) and i < len(s) and pref[i] == s[i]:
            i += 1
        pref = pref[:i]
    return pref


def solve_reverse_words_iii(s):
    chars = list(s)
    i = 0
    while i < len(chars):
        j = i
        while j < len(chars) and chars[j] != " ":
            j += 1
        chars[i:j] = reversed(chars[i:j])
        i = j + 1
    return "".join(chars)


def solve_valid_paren(s):
    st = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
        else:
            st.append(ch)
    return not st


def solve_longest_palindrome(s):
    best = ""
    for i in range(len(s)):
        for l, r in ((i, i), (i, i + 1)):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            cur = s[l + 1 : r]
            if len(cur) > len(best):
                best = cur
    return best


def solve_atoi(s):
    s = s.lstrip()
    if not s:
        return 0
    sign = -1 if s[0] == "-" else 1
    if s[0] in "+-":
        s = s[1:]
    num = 0
    for ch in s:
        if not ch.isdigit():
            break
        num = num * 10 + int(ch)
        if sign * num >= 2**31 - 1:
            return 2**31 - 1
        if sign * num <= -(2**31):
            return -(2**31)
    return sign * num


def solve_zigzag(s, numRows):
    if numRows == 1:
        return s
    rows = [""] * numRows
    r, step = 0, 1
    for ch in s:
        rows[r] += ch
        if r == 0:
            step = 1
        elif r == numRows - 1:
            step = -1
        r += step
    return "".join(rows)


def solve_letter_combinations(digits):
    if not digits:
        return []
    mp = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    }
    res = []

    def dfs(i, cur):
        if i == len(digits):
            res.append(cur)
            return
        for ch in mp[digits[i]]:
            dfs(i + 1, cur + ch)

    dfs(0, "")
    return sorted(res)


def solve_generate_paren(n):
    res = []

    def dfs(opened, closed, cur):
        if len(cur) == 2 * n:
            res.append(cur)
            return
        if opened < n:
            dfs(opened + 1, closed, cur + "(")
        if closed < opened:
            dfs(opened, closed + 1, cur + ")")

    dfs(0, 0, "")
    return res


def solve_decode_string(s):
    st = []
    num = cur = ""
    for ch in s:
        if ch.isdigit():
            num += ch
        elif ch == "[":
            st.append((cur, int(num)))
            cur, num = "", ""
        elif ch == "]":
            prev, k = st.pop()
            cur = prev + cur * k
        else:
            cur += ch
    return cur


def solve_palindromic_substrings(s):
    cnt = 0
    for i in range(len(s)):
        for l, r in ((i, i), (i, i + 1)):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                cnt += 1
                l -= 1
                r += 1
    return cnt


def solve_min_window(s, t):
    need = Counter(t)
    missing = len(t)
    l = start = 0
    best = ""
    for r, ch in enumerate(s, 1):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        while missing == 0:
            if not best or r - l < len(best):
                best = s[l:r]
            need[s[l]] += 1
            if need[s[l]] > 0:
                missing += 1
            l += 1
    return best


def solve_regex(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(2, len(p) + 1):
        if p[j - 1] == "*":
            dp[0][j] = dp[0][j - 2]
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == "*":
                dp[i][j] = dp[i][j - 2] or (
                    dp[i - 1][j] and (p[j - 2] == s[i - 1] or p[j - 2] == ".")
                )
            elif p[j - 1] in (s[i - 1], "."):
                dp[i][j] = dp[i - 1][j - 1]
    return dp[-1][-1]


def solve_max_depth(root):
    if not root:
        return 0
    return 1 + max(solve_max_depth(root.left), solve_max_depth(root.right))


def solve_invert(root):
    if not root:
        return None
    root.left, root.right = solve_invert(root.right), solve_invert(root.left)
    return root


def solve_symmetric(root):
    def mir(a, b):
        if not a and not b:
            return True
        if not a or not b:
            return False
        return a.val == b.val and mir(a.left, b.right) and mir(a.right, b.left)

    return mir(root, root) if root else True


def solve_diameter(root):
    best = 0

    def dfs(node):
        nonlocal best
        if not node:
            return 0
        l, r = dfs(node.left), dfs(node.right)
        best = max(best, l + r)
        return 1 + max(l, r)

    dfs(root)
    return best


def solve_balanced(root):
    def h(node):
        if not node:
            return 0
        l, r = h(node.left), h(node.right)
        if abs(l - r) > 1 or l < 0 or r < 0:
            return -1
        return 1 + max(l, r)

    return h(root) >= 0


def solve_path_sum(root, target):
    def dfs(node, rem):
        if not node:
            return False
        rem -= node.val
        if not node.left and not node.right:
            return rem == 0
        return dfs(node.left, rem) or dfs(node.right, rem)

    return dfs(root, target)


def solve_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return solve_same_tree(p.left, q.left) and solve_same_tree(p.right, q.right)


def find_node(root, val):
    if not root:
        return None
    if root.val == val:
        return root
    return find_node(root.left, val) or find_node(root.right, val)


def solve_lca_bst(root, p, q):
    p = find_node(root, p)
    q = find_node(root, q)
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root.val


def solve_build_tree(pre, ino):
    if not pre:
        return None
    root = TreeNode(pre[0])
    idx = ino.index(pre[0])
    root.left = solve_build_tree(pre[1 : idx + 1], ino[:idx])
    root.right = solve_build_tree(pre[idx + 1 :], ino[idx + 1 :])
    return root


def solve_right_side(root):
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        res.append(q[-1].val)
        n = len(q)
        for _ in range(n):
            node = q.popleft()
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return res


def solve_good_nodes(root):
    def dfs(node, mx):
        if not node:
            return 0
        cnt = 1 if node.val >= mx else 0
        mx = max(mx, node.val)
        return cnt + dfs(node.left, mx) + dfs(node.right, mx)

    return dfs(root, root.val) if root else 0


def solve_kth_bst(root, k):
    stack = []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right
    return None


def solve_flatten(root):
    if not root:
        return []
    cur = root
    while cur:
        if cur.left:
            pre = cur.left
            while pre.right:
                pre = pre.right
            pre.right = cur.right
            cur.right = cur.left
            cur.left = None
        cur = cur.right
    return tree_to_list(root)


def solve_max_path_sum(root):
    best = float("-inf")

    def dfs(node):
        nonlocal best
        if not node:
            return 0
        l = max(0, dfs(node.left))
        r = max(0, dfs(node.right))
        best = max(best, l + r + node.val)
        return node.val + max(l, r)

    dfs(root)
    return best


def solve_lca_bt(root, p, q):
    if not root or root.val in (p, q):
        return root
    l, r = solve_lca_bt(root.left, p, q), solve_lca_bt(root.right, p, q)
    if l and r:
        return root
    return l or r


def solve_clone_graph(adj):
    return adj


def solve_pacific_atlantic(heights):
    if not heights:
        return []
    m, n = len(heights), len(heights[0])
    pac, atl = set(), set()

    def dfs(r, c, seen):
        seen.add((r, c))
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if (
                0 <= nr < m
                and 0 <= nc < n
                and (nr, nc) not in seen
                and heights[nr][nc] >= heights[r][c]
            ):
                dfs(nr, nc, seen)

    for c in range(n):
        dfs(0, c, pac)
        dfs(m - 1, c, atl)
    for r in range(m):
        dfs(r, 0, pac)
        dfs(r, n - 1, atl)
    return sorted([list(x) for x in pac & atl])


def solve_redundant(edges):
    parent = {}
    result = []

    def find(x):
        parent.setdefault(x, x)
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for a, b in edges:
        pa, pb = find(a), find(b)
        if pa == pb:
            result = [a, b]
        else:
            parent[pa] = pb
    return result


def solve_valid_tree(n, edges):
    if len(edges) != n - 1:
        return False
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        pa, pb = find(a), find(b)
        if pa == pb:
            return False
        parent[pa] = pb
    return True


def solve_connected(n, edges):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    comps = n
    for a, b in edges:
        pa, pb = find(a), find(b)
        if pa != pb:
            parent[pa] = pb
            comps -= 1
    return comps


def solve_rotting(grid):
    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 2:
                q.append((i, j, 0))
            elif grid[i][j] == 1:
                fresh += 1
    mins = 0
    while q:
        r, c, mins = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                q.append((nr, nc, mins + 1))
    return mins if fresh == 0 else -1


def solve_walls_gates(rooms):
    if not rooms:
        return rooms
    m, n = len(rooms), len(rooms[0])
    q = deque()
    for i in range(m):
        for j in range(n):
            if rooms[i][j] == 0:
                q.append((i, j, 0))
    while q:
        r, c, d = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == 2147483647:
                rooms[nr][nc] = d + 1
                q.append((nr, nc, d + 1))
    return rooms


def solve_cheapest_flights(n, flights, src, dst, k):
    dist = [10**9] * n
    dist[src] = 0
    for _ in range(k + 1):
        nd = dist[:]
        for u, v, w in flights:
            if dist[u] != 10**9:
                nd[v] = min(nd[v], dist[u] + w)
        dist = nd
    return dist[dst] if dist[dst] != 10**9 else -1


def solve_network_delay(times, n, k):
    import heapq

    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    dist = {i: 10**9 for i in range(1, n + 1)}
    dist[k] = 0
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    ans = max(dist.values())
    return ans if ans < 10**9 else -1


def solve_alien_dict(words):
    adj = {c: set() for w in words for c in w}
    indeg = {c: 0 for c in adj}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        if len(w2) < len(w1) and w1.startswith(w2):
            return ""
        for a, b in zip(w1, w2):
            if a != b:
                if b not in adj[a]:
                    adj[a].add(b)
                    indeg[b] += 1
                break
    q = deque([c for c in indeg if indeg[c] == 0])
    order = []
    while q:
        c = q.popleft()
        order.append(c)
        for nxt in adj[c]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)
    return "" if len(order) != len(indeg) else "".join(order)


def solve_climbing(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a


def solve_house_robber(nums):
    prev = cur = 0
    for x in nums:
        prev, cur = cur, max(cur, prev + x)
    return cur


def solve_house_robber2(nums):
    if len(nums) == 1:
        return nums[0]
    return max(solve_house_robber(nums[:-1]), solve_house_robber(nums[1:]))


def solve_decode_ways(s):
    if not s or s[0] == "0":
        return 0
    dp = [0] * (len(s) + 1)
    dp[0] = dp[1] = 1
    for i in range(2, len(s) + 1):
        if s[i - 1] != "0":
            dp[i] += dp[i - 1]
        if 10 <= int(s[i - 2 : i]) <= 26:
            dp[i] += dp[i - 2]
    return dp[-1]


def solve_unique_paths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[-1]


def solve_min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            top = grid[i - 1][j] if i else 10**9
            left = grid[i][j - 1] if j else 10**9
            grid[i][j] += min(top, left)
    return grid[-1][-1]


def solve_triangle(tri):
    dp = tri[-1][:]
    for r in range(len(tri) - 2, -1, -1):
        for c in range(len(tri[r])):
            dp[c] = tri[r][c] + min(dp[c], dp[c + 1])
    return dp[0]


def solve_word_break(s, wordDict):
    words = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[-1]


def solve_partition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for j in range(target, x - 1, -1):
            dp[j] = dp[j] or dp[j - x]
    return dp[target]


def solve_lcs(t1, t2):
    dp = [[0] * (len(t2) + 1) for _ in range(len(t1) + 1)]
    for i in range(1, len(t1) + 1):
        for j in range(1, len(t2) + 1):
            if t1[i - 1] == t2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[-1][-1]


def solve_target_sum(nums, target):
    total = sum(nums)
    if (total + target) % 2 or abs(target) > total:
        return 0
    need = (total + target) // 2
    dp = [0] * (need + 1)
    dp[0] = 1
    for x in nums:
        for j in range(need, x - 1, -1):
            dp[j] += dp[j - x]
    return dp[need]


def solve_max_product(nums):
    best = nums[0]
    cur_max = cur_min = 1
    for x in nums:
        if x < 0:
            cur_max, cur_min = cur_min, cur_max
        cur_max = max(x, cur_max * x)
        cur_min = min(x, cur_min * x)
        best = max(best, cur_max)
    return best


def solve_interleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3):
        return False
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    dp[0][0] = True
    for i in range(len(s1) + 1):
        for j in range(len(s2) + 1):
            if i and s1[i - 1] == s3[i + j - 1]:
                dp[i][j] |= dp[i - 1][j]
            if j and s2[j - 1] == s3[i + j - 1]:
                dp[i][j] |= dp[i][j - 1]
    return dp[-1][-1]


def solve_stock3(prices):
    buy1 = buy2 = 10**9
    sell1 = sell2 = 0
    for p in prices:
        buy1 = min(buy1, p)
        sell1 = max(sell1, p - buy1)
        buy2 = min(buy2, p - sell1)
        sell2 = max(sell2, p - buy2)
    return sell2


def solve_burst(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(3, n + 1):
        for l in range(n - length + 1):
            r = l + length - 1
            for k in range(l + 1, r):
                dp[l][r] = max(
                    dp[l][r],
                    nums[l] * nums[k] * nums[r] + dp[l][k] + dp[k][r],
                )
    return dp[0][n - 1]


def solve_reverse_list(head):
    return list(reversed(head))


def solve_merge_lists(l1, l2):
    i = j = 0
    out = []
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            out.append(l1[i])
            i += 1
        else:
            out.append(l2[j])
            j += 1
    out.extend(l1[i:])
    out.extend(l2[j:])
    return out


def solve_has_cycle(head, pos):
    if pos == -1:
        return False
    return True


def solve_remove_nth(head, n):
    dummy = [0] + head
    fast = slow = 0
    for _ in range(n):
        fast += 1
    while fast < len(dummy) - 1:
        fast += 1
        slow += 1
    return dummy[1 : slow] + dummy[slow + 2 :]


def solve_copy_random(head):
    return head


def compute_output(title: str, inp: dict) -> str:
    if title == "Best Time to Buy and Sell Stock":
        return fmt(solve_best_time_1(inp["prices"]))
    if title == "Valid Palindrome":
        return fmt(solve_valid_palindrome(inp["s"]))
    if title == "Contains Duplicate":
        return fmt(solve_contains_duplicate(inp["nums"]))
    if title == "Maximum Subarray":
        return fmt(solve_max_subarray(inp["nums"]))
    if title == "Merge Sorted Array":
        return fmt(solve_merge_sorted(inp["nums1"], inp["m"], inp["nums2"], inp["n"]))
    if title == "Two Sum":
        return fmt(solve_two_sum(inp["nums"], inp["target"]))
    if title == "Longest Substring Without Repeating Characters":
        return fmt(solve_longest_substring(inp["s"]))
    if title == "3Sum":
        return fmt(solve_3sum(inp["nums"][:]))
    if title == "Binary Tree Level Order Traversal":
        root = list_to_tree(inp["root"])
        return fmt(level_order(root))
    if title == "Validate Binary Search Tree":
        return fmt(solve_bst_valid(list_to_tree(inp["root"])))
    if title == "Number of Islands":
        return fmt(solve_num_islands([r[:] for r in inp["grid"]]))
    if title == "Course Schedule":
        return fmt(solve_course_schedule(inp["numCourses"], inp["prerequisites"]))
    if title == "Coin Change":
        return fmt(solve_coin_change(inp["coins"], inp["amount"]))
    if title == "Longest Increasing Subsequence":
        return fmt(solve_lis(inp["nums"]))
    if title == "Group Anagrams":
        return fmt(solve_group_anagrams(inp["strs"]))
    if title == "Trapping Rain Water":
        return fmt(solve_trap(inp["height"]))
    if title == "Serialize and Deserialize Binary Tree":
        root = list_to_tree(inp["root"])
        return fmt(tree_to_list(root))
    if title == "Word Ladder":
        return fmt(solve_word_ladder(inp["beginWord"], inp["endWord"], inp["wordList"]))
    if title == "Edit Distance":
        return fmt(solve_edit_distance(inp["word1"], inp["word2"]))
    if title == "Median of Two Sorted Arrays":
        return solve_median(inp["nums1"], inp["nums2"])
    if title == "Remove Duplicates from Sorted Array":
        nums = inp["nums"][:]
        k, uniq = solve_remove_dups(nums)
        return f"{k}, nums = {json.dumps(uniq, separators=(',', ':'))}"
    if title == "Plus One":
        return fmt(solve_plus_one(inp["digits"][:]))
    if title == "Move Zeroes":
        nums = inp["nums"][:]
        return fmt(solve_move_zeroes(nums))
    if title == "Single Number":
        return fmt(solve_single_number(inp["nums"]))
    if title == "Intersection of Two Arrays II":
        return fmt(solve_intersect(inp["nums1"], inp["nums2"]))
    if title == "Squares of a Sorted Array":
        return fmt(solve_squares(inp["nums"]))
    if title == "Assign Cookies":
        return fmt(solve_assign_cookies(inp["g"][:], inp["s"][:]))
    if title == "Majority Element":
        return fmt(solve_majority(inp["nums"]))
    if title == "Product of Array Except Self":
        return fmt(solve_product_except_self(inp["nums"]))
    if title == "Rotate Array":
        return fmt(solve_rotate(inp["nums"], inp["k"]))
    if title == "Find Minimum in Rotated Sorted Array":
        return fmt(solve_min_rotated(inp["nums"]))
    if title == "Search in Rotated Sorted Array":
        return fmt(solve_search_rotated(inp["nums"], inp["target"]))
    if title == "Container With Most Water":
        return fmt(solve_container(inp["height"]))
    if title == "Next Permutation":
        return fmt(solve_next_perm(inp["nums"]))
    if title == "Spiral Matrix":
        return fmt(solve_spiral([row[:] for row in inp["matrix"]]))
    if title == "Set Matrix Zeroes":
        m = [row[:] for row in inp["matrix"]]
        return fmt(solve_set_zeroes(m))
    if title == "Subarray Sum Equals K":
        return fmt(solve_subarray_sum_k(inp["nums"], inp["k"]))
    if title == "Kth Largest Element in an Array":
        return fmt(solve_kth_largest(inp["nums"], inp["k"]))
    if title == "Find Peak Element":
        return fmt(solve_find_peak(inp["nums"]))
    if title == "First Missing Positive":
        return fmt(solve_first_missing_positive(inp["nums"][:]))
    if title == "Valid Anagram":
        return fmt(solve_valid_anagram(inp["s"], inp["t"]))
    if title == "Reverse String":
        return fmt(solve_reverse_string(inp["s"]))
    if title == "Find the Index of the First Occurrence in a String":
        return fmt(solve_strstr(inp["haystack"], inp["needle"]))
    if title == "Longest Common Prefix":
        return fmt(solve_lcp(inp["strs"]))
    if title == "Reverse Words in a String III":
        return fmt(solve_reverse_words_iii(inp["s"]))
    if title == "Valid Parentheses":
        return fmt(solve_valid_paren(inp["s"]))
    if title == "Longest Palindromic Substring":
        return fmt(solve_longest_palindrome(inp["s"]))
    if title == "String to Integer (atoi)":
        return fmt(solve_atoi(inp["s"]))
    if title == "Zigzag Conversion":
        return fmt(solve_zigzag(inp["s"], inp["numRows"]))
    if title == "Letter Combinations of a Phone Number":
        return fmt(solve_letter_combinations(inp["digits"]))
    if title == "Generate Parentheses":
        return fmt(solve_generate_paren(inp["n"]))
    if title == "Decode String":
        return fmt(solve_decode_string(inp["s"]))
    if title == "Palindromic Substrings":
        return fmt(solve_palindromic_substrings(inp["s"]))
    if title == "Minimum Window Substring":
        return fmt(solve_min_window(inp["s"], inp["t"]))
    if title == "Regular Expression Matching":
        return fmt(solve_regex(inp["s"], inp["p"]))
    if title == "Maximum Depth of Binary Tree":
        return fmt(solve_max_depth(list_to_tree(inp["root"])))
    if title == "Invert Binary Tree":
        return fmt(tree_to_list(solve_invert(list_to_tree(inp["root"]))))
    if title == "Symmetric Tree":
        return fmt(solve_symmetric(list_to_tree(inp["root"])))
    if title == "Diameter of Binary Tree":
        return fmt(solve_diameter(list_to_tree(inp["root"])))
    if title == "Balanced Binary Tree":
        return fmt(solve_balanced(list_to_tree(inp["root"])))
    if title == "Path Sum":
        return fmt(solve_path_sum(list_to_tree(inp["root"]), inp["targetSum"]))
    if title == "Same Tree":
        return fmt(
            solve_same_tree(list_to_tree(inp["p"]), list_to_tree(inp["q"]))
        )
    if title == "Lowest Common Ancestor of a Binary Search Tree":
        root = list_to_tree(inp["root"])
        return fmt(solve_lca_bst(root, inp["p"], inp["q"]))
    if title == "Construct Binary Tree from Preorder and Inorder Traversal":
        root = solve_build_tree(inp["preorder"], inp["inorder"])
        return fmt(tree_to_list(root))
    if title == "Binary Tree Right Side View":
        return fmt(solve_right_side(list_to_tree(inp["root"])))
    if title == "Count Good Nodes in Binary Tree":
        return fmt(solve_good_nodes(list_to_tree(inp["root"])))
    if title == "Kth Smallest Element in a BST":
        return fmt(solve_kth_bst(list_to_tree(inp["root"]), inp["k"]))
    if title == "Flatten Binary Tree to Linked List":
        return fmt(solve_flatten(list_to_tree(inp["root"])))
    if title == "Binary Tree Maximum Path Sum":
        return fmt(solve_max_path_sum(list_to_tree(inp["root"])))
    if title == "Lowest Common Ancestor of a Binary Tree":
        root = list_to_tree(inp["root"])
        return fmt(solve_lca_bt(root, inp["p"], inp["q"]).val)
    if title == "Clone Graph":
        return fmt(solve_clone_graph(inp["adjList"]))
    if title == "Pacific Atlantic Water Flow":
        return fmt(solve_pacific_atlantic([row[:] for row in inp["heights"]]))
    if title == "Redundant Connection":
        return fmt(solve_redundant(inp["edges"]))
    if title == "Graph Valid Tree":
        return fmt(solve_valid_tree(inp["n"], inp["edges"]))
    if title == "Number of Connected Components in an Undirected Graph":
        return fmt(solve_connected(inp["n"], inp["edges"]))
    if title == "Rotting Oranges":
        return fmt(solve_rotting([row[:] for row in inp["grid"]]))
    if title == "Walls and Gates":
        rooms = [row[:] for row in inp["rooms"]]
        return fmt(solve_walls_gates(rooms))
    if title == "Cheapest Flights Within K Stops":
        return fmt(
            solve_cheapest_flights(
                inp["n"], inp["flights"], inp["src"], inp["dst"], inp["k"]
            )
        )
    if title == "Network Delay Time":
        return fmt(solve_network_delay(inp["times"], inp["n"], inp["k"]))
    if title == "Alien Dictionary":
        return fmt(solve_alien_dict(inp["words"]))
    if title == "Climbing Stairs":
        return fmt(solve_climbing(inp["n"]))
    if title == "House Robber":
        return fmt(solve_house_robber(inp["nums"]))
    if title == "House Robber II":
        return fmt(solve_house_robber2(inp["nums"]))
    if title == "Decode Ways":
        return fmt(solve_decode_ways(inp["s"]))
    if title == "Unique Paths":
        return fmt(solve_unique_paths(inp["m"], inp["n"]))
    if title == "Minimum Path Sum":
        return fmt(solve_min_path_sum([row[:] for row in inp["grid"]]))
    if title == "Triangle":
        return fmt(solve_triangle([row[:] for row in inp["triangle"]]))
    if title == "Word Break":
        return fmt(solve_word_break(inp["s"], inp["wordDict"]))
    if title == "Partition Equal Subset Sum":
        return fmt(solve_partition(inp["nums"]))
    if title == "Longest Common Subsequence":
        return fmt(solve_lcs(inp["text1"], inp["text2"]))
    if title == "Target Sum":
        return fmt(solve_target_sum(inp["nums"], inp["target"]))
    if title == "Maximum Product Subarray":
        return fmt(solve_max_product(inp["nums"]))
    if title == "Interleaving String":
        return fmt(solve_interleave(inp["s1"], inp["s2"], inp["s3"]))
    if title == "Best Time to Buy and Sell Stock III":
        return fmt(solve_stock3(inp["prices"]))
    if title == "Burst Balloons":
        return fmt(solve_burst(inp["nums"]))
    if title == "Reverse Linked List":
        return fmt(solve_reverse_list(inp["head"]))
    if title == "Merge Two Sorted Lists":
        return fmt(solve_merge_lists(inp["list1"], inp["list2"]))
    if title == "Linked List Cycle":
        return fmt(solve_has_cycle(inp["head"], inp["pos"]))
    if title == "Remove Nth Node From End of List":
        return fmt(solve_remove_nth(inp["head"], inp["n"]))
    if title == "Copy List with Random Pointer":
        return fmt(solve_copy_random(inp["head"]))
    raise ValueError(f"Unknown title: {title}")


# 10 inputs per question (1000 total)
TEST_INPUTS: dict[str, list[str]] = {}

def add(title, *inputs):
    TEST_INPUTS[title] = list(inputs)

add("Best Time to Buy and Sell Stock",
    'prices = [1,2]', 'prices = [2,4,1]', 'prices = [1]', 'prices = [3,2,6,5,0,3]',
    'prices = [2,1,2,0,1]', 'prices = [7,6,4,3,1]', 'prices = [1,2,3,4,5]',
    'prices = [5,4,3,2,1,0]', 'prices = [10000,9999,9998]', 'prices = [3,3,5,0,0,4,0]')
add("Valid Palindrome",
    's = " "', 's = "0P"', 's = "aba"', 's = ".,;"', 's = "ab_a"',
    's = "A man, a plan, a canal: Panama"', 's = "race a car"', 's = "0P0"',
    's = "a."', 's = "1a1"')
add("Contains Duplicate",
    'nums = [1,1,1,3,3,4,3,2,4,2]', 'nums = [1]', 'nums = [1,5,-4,20,-14,4,6]',
    'nums = [0,4,5,0,3,6]', 'nums = [-1,-2,-3,-4]', 'nums = [1,2,3,4,5]',
    'nums = [0,0]', 'nums = [1000000000,-1000000000,1000000000]',
    'nums = [7,7,7,7,7,7,7,7,7,7]', 'nums = [1,2,3,4,5,6,7,8,9,0,1]')
add("Maximum Subarray",
    'nums = [5,4,-1,7,8]', 'nums = [-1]', 'nums = [-2,-1]', 'nums = [8,-19,5,-4,20]',
    'nums = [-2,1]', 'nums = [-2,1,-3,4,-1,2,1,-5,4]', 'nums = [10000,-10000,10000]',
    'nums = [1,2,3,4,5]', 'nums = [-1,-2,-3,-4,-5]', 'nums = [0,0,0,0,0]')
add("Merge Sorted Array",
    'nums1 = [2,0], m = 1, nums2 = [1], n = 1', 'nums1 = [0], m = 0, nums2 = [1], n = 1',
    'nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3',
    'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [], n = 0',
    'nums1 = [0,0,0,0,0], m = 0, nums2 = [1,2,3,4,5], n = 5',
    'nums1 = [1], m = 1, nums2 = [], n = 0', 'nums1 = [2,0], m = 1, nums2 = [1], n = 1',
    'nums1 = [1,2,4,5,6,0,0,0], m = 5, nums2 = [3,7,8], n = 3',
    'nums1 = [0,0,1], m = 1, nums2 = [0,2], n = 2', 'nums1 = [5,0,0,0,0], m = 1, nums2 = [1,2,3,4], n = 4')
add("Two Sum",
    'nums = [3,3], target = 6', 'nums = [1,2,3,4], target = 7', 'nums = [-1,-2,-3,-4,-5], target = -8',
    'nums = [0,4,3,0], target = 0', 'nums = [5,5], target = 10', 'nums = [2,7,11,15], target = 9',
    'nums = [3,2,4], target = 6', 'nums = [1,1,1,1], target = 2', 'nums = [-3,4,3,90], target = 0',
    'nums = [100,200,300,400,500], target = 600')


def main() -> None:
    import hidden_test_inputs  # noqa: F401

    lines = [
        "-- Hidden test cases for all 100 PeerCode questions",
        "-- Run in Supabase SQL Editor after questions are seeded",
        "ALTER TABLE questions ADD COLUMN IF NOT EXISTS hidden_tests jsonb;",
        "",
    ]
    for title in TITLES:
        inputs = TEST_INPUTS.get(title, [])
        if len(inputs) != 10:
            raise ValueError(f"{title}: expected 10 inputs, got {len(inputs)}")
        cases = []
        for inp_str in inputs:
            out = compute_output(title, parse_input(inp_str))
            cases.append({"input": inp_str, "output": out})
        safe_title = title.replace("'", "''")
        lines.append(f"UPDATE questions SET hidden_tests = $json$")
        lines.append(json.dumps(cases, indent=2))
        lines.append(f"$json$::jsonb WHERE title = '{safe_title}';")
        lines.append("")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    updates = sum(1 for line in lines if line.startswith("UPDATE questions"))
    print(f"Wrote {OUTPUT_PATH} with {updates} UPDATE statements")


if __name__ == "__main__":
    main()
