-- Run in Supabase SQL Editor after schema migration

ALTER TABLE questions ADD COLUMN IF NOT EXISTS hidden_tests jsonb;

UPDATE questions SET hidden_tests = '[
  {"input": "nums = [3,3], target = 6", "output": "[0,1]"},
  {"input": "nums = [1,2,3,4], target = 7", "output": "[2,3]"},
  {"input": "nums = [-1,-2,-3,-4,-5], target = -8", "output": "[2,4]"},
  {"input": "nums = [0,4,3,0], target = 0", "output": "[0,3]"},
  {"input": "nums = [5,5], target = 10", "output": "[0,1]"}
]'::jsonb WHERE title = 'Two Sum';

UPDATE questions SET hidden_tests = '[
  {"input": "s = \" \"", "output": "true"},
  {"input": "s = \"0P\"", "output": "false"},
  {"input": "s = \"aba\"", "output": "true"},
  {"input": "s = \".,;\"", "output": "true"},
  {"input": "s = \"ab_a\"", "output": "false"}
]'::jsonb WHERE title = 'Valid Palindrome';

UPDATE questions SET hidden_tests = '[
  {"input": "prices = [1,2]", "output": "1"},
  {"input": "prices = [2,4,1]", "output": "2"},
  {"input": "prices = [1]", "output": "0"},
  {"input": "prices = [3,2,6,5,0,3]", "output": "4"},
  {"input": "prices = [2,1,2,0,1]", "output": "1"}
]'::jsonb WHERE title = 'Best Time to Buy and Sell Stock';

UPDATE questions SET hidden_tests = '[
  {"input": "nums = [1,1,1,3,3,4,3,2,4,2]", "output": "true"},
  {"input": "nums = [1]", "output": "false"},
  {"input": "nums = [1,5,-4,20,-14,4,6]", "output": "false"},
  {"input": "nums = [0,4,5,0,3,6]", "output": "true"},
  {"input": "nums = [-1,-2,-3,-4]", "output": "false"}
]'::jsonb WHERE title = 'Contains Duplicate';

UPDATE questions SET hidden_tests = '[
  {"input": "nums = [5,4,-1,7,8]", "output": "23"},
  {"input": "nums = [-1]", "output": "-1"},
  {"input": "nums = [-2,-1]", "output": "-1"},
  {"input": "nums = [8,-19,5,-4,20]", "output": "21"},
  {"input": "nums = [-2,1]", "output": "1"}
]'::jsonb WHERE title = 'Maximum Subarray';

UPDATE questions SET hidden_tests = '[
  {"input": "nums1 = [2,0], m = 1, nums2 = [1], n = 1", "output": "[1,2]"},
  {"input": "nums1 = [0], m = 0, nums2 = [1], n = 1", "output": "[1]"},
  {"input": "nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3", "output": "[1,2,3,4,5,6]"},
  {"input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [], n = 0", "output": "[1,2,3]"},
  {"input": "nums1 = [0,0,0,0,0], m = 0, nums2 = [1,2,3,4,5], n = 5", "output": "[1,2,3,4,5]"}
]'::jsonb WHERE title = 'Merge Sorted Array';

UPDATE questions SET hidden_tests = '[
  {"input": "nums = [1]", "output": "1"},
  {"input": "nums = [2,1,1]", "output": "2"},
  {"input": "nums = [4,1,2,1,2]", "output": "4"},
  {"input": "nums = [0,1,0,1]", "output": "1"},
  {"input": "nums = [7,3,5,3,5]", "output": "7"}
]'::jsonb WHERE title = 'Single Number';

UPDATE questions SET hidden_tests = '[
  {"input": "digits = [0]", "output": "[1]"},
  {"input": "digits = [1,9]", "output": "[2,0]"},
  {"input": "digits = [4,3,2,1]", "output": "[4,3,2,2]"},
  {"input": "digits = [9]", "output": "[1,0]"},
  {"input": "digits = [1,2,9]", "output": "[1,3,0]"}
]'::jsonb WHERE title = 'Plus One';

UPDATE questions SET hidden_tests = '[
  {"input": "nums = [1,2,2,3]", "output": "3"},
  {"input": "nums = [1,1,1]", "output": "1"},
  {"input": "nums = [1,2,3,4,5]", "output": "5"},
  {"input": "nums = [-1,-1,0,0,0,2,2]", "output": "3"},
  {"input": "nums = [2,2,3,3,4,4,5]", "output": "4"}
]'::jsonb WHERE title = 'Remove Duplicates from Sorted Array';

UPDATE questions SET hidden_tests = '[
  {"input": "root = []", "output": "[]"},
  {"input": "root = [1,2,3]", "output": "[[1],[2,3]]"},
  {"input": "root = [1,2,3,4,5,6,7]", "output": "[[1],[2,4],[3,5,6,7]]"},
  {"input": "root = [1,null,2,null,3]", "output": "[[1],[2],[3]]"},
  {"input": "root = [5,4,3]", "output": "[[5],[4],[3]]"}
]'::jsonb WHERE title = 'Binary Tree Level Order Traversal';

UPDATE questions SET hidden_tests = '[
  {"input": "word1 = \"\", word2 = \"\"", "output": "0"},
  {"input": "word1 = \"a\", word2 = \"b\"", "output": "1"},
  {"input": "word1 = \"abc\", word2 = \"abc\"", "output": "0"},
  {"input": "word1 = \"park\", word2 = \"spoon\"", "output": "3"},
  {"input": "word1 = \"\", word2 = \"a\"", "output": "1"}
]'::jsonb WHERE title = 'Edit Distance';

UPDATE questions SET hidden_tests = '[
  {"input": "beginWord = \"a\", endWord = \"c\", wordList = [\"a\",\"b\",\"c\"]", "output": "2"},
  {"input": "beginWord = \"hot\", endWord = \"dog\", wordList = [\"hot\",\"dog\"]", "output": "0"},
  {"input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "output": "5"},
  {"input": "beginWord = \"a\", endWord = \"b\", wordList = [\"a\",\"b\",\"c\"]", "output": "1"},
  {"input": "beginWord = \"red\", endWord = \"tax\", wordList = [\"ted\",\"tex\",\"red\",\"tax\",\"tad\",\"den\",\"rex\",\"pee\"]", "output": "4"}
]'::jsonb WHERE title = 'Word Ladder';

UPDATE questions SET hidden_tests = '[
  {"input": "coins = [1], amount = 0", "output": "0"},
  {"input": "coins = [1,5,10], amount = 25", "output": "3"},
  {"input": "coins = [2], amount = 1", "output": "-1"},
  {"input": "coins = [1,2,5], amount = 3", "output": "2"},
  {"input": "coins = [186,419,83,408], amount = 6249", "output": "20"}
]'::jsonb WHERE title = 'Coin Change';

UPDATE questions SET hidden_tests = '[
  {"input": "grid = [[\"1\",\"1\"],[\"0\",\"1\"]]", "output": "1"},
  {"input": "grid = [[\"0\",\"0\"],[\"0\",\"0\"]]", "output": "0"},
  {"input": "grid = [[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"0\",\"1\"]]", "output": "5"},
  {"input": "grid = [[\"1\",\"1\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"1\",\"1\"]]", "output": "1"},
  {"input": "grid = [[\"1\"]]", "output": "1"}
]'::jsonb WHERE title = 'Number of Islands';

UPDATE questions SET hidden_tests = '[
  {"input": "root = [1,2]", "output": "[1,2]"},
  {"input": "root = [5,2,3,null,null,null,4]", "output": "[5,2,3,null,null,null,4]"},
  {"input": "root = [1,2,3,4,5,6,7]", "output": "[1,2,3,4,5,6,7]"},
  {"input": "root = []", "output": "[]"},
  {"input": "root = [1,null,2,null,3]", "output": "[1,null,2,null,3]"}
]'::jsonb WHERE title = 'Serialize and Deserialize Binary Tree';

UPDATE questions SET hidden_tests = '[
  {"input": "nums1 = [1], nums2 = [2,3]", "output": "2.5"},
  {"input": "nums1 = [], nums2 = [1]", "output": "1.00000"},
  {"input": "nums1 = [3,4], nums2 = [1,2]", "output": "2.5"},
  {"input": "nums1 = [1,3], nums2 = [2]", "output": "2.00000"},
  {"input": "nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10,11,12,13,14,15,16,17]", "output": "9"}
]'::jsonb WHERE title = 'Median of Two Sorted Arrays';

UPDATE questions SET hidden_tests = '[
  {"input": "s = \"[]\"", "output": "true"},
  {"input": "s = \"(]\"", "output": "false"},
  {"input": "s = \"([)]\"", "output": "false"},
  {"input": "s = \"{[]}\"", "output": "true"},
  {"input": "s = \"(((((((()\"", "output": "false"}
]'::jsonb WHERE title = 'Valid Parentheses';

UPDATE questions SET hidden_tests = '[
  {"input": "n = 1", "output": "1"},
  {"input": "n = 5", "output": "8"},
  {"input": "n = 4", "output": "5"},
  {"input": "n = 10", "output": "89"},
  {"input": "n = 6", "output": "13"}
]'::jsonb WHERE title = 'Climbing Stairs';

UPDATE questions SET hidden_tests = '[
  {"input": "head = [1]", "output": "[1]"},
  {"input": "head = [2,1]", "output": "[1,2]"},
  {"input": "head = [3,2,1]", "output": "[1,2,3]"},
  {"input": "head = []", "output": "[]"},
  {"input": "head = [1,2,3,4,5,6,7,8,9,10]", "output": "[10,9,8,7,6,5,4,3,2,1]"}
]'::jsonb WHERE title = 'Reverse Linked List';

UPDATE questions SET hidden_tests = '[
  {"input": "list1 = [1], list2 = [2]", "output": "[1,2]"},
  {"input": "list1 = [1,2,3], list2 = []", "output": "[1,2,3]"},
  {"input": "list1 = [], list2 = [1,2,3]", "output": "[1,2,3]"},
  {"input": "list1 = [2], list2 = [1]", "output": "[1,2]"},
  {"input": "list1 = [1,3,5], list2 = [2,4,6]", "output": "[1,2,3,4,5,6]"}
]'::jsonb WHERE title = 'Merge Two Sorted Lists';
