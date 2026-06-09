-- Hidden test cases for all 100 PeerCode questions
-- Run in Supabase SQL Editor after questions are seeded
ALTER TABLE questions ADD COLUMN IF NOT EXISTS hidden_tests jsonb;

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "prices = [1,2]",
    "output": "1"
  },
  {
    "input": "prices = [2,4,1]",
    "output": "2"
  },
  {
    "input": "prices = [1]",
    "output": "0"
  },
  {
    "input": "prices = [3,2,6,5,0,3]",
    "output": "4"
  },
  {
    "input": "prices = [2,1,2,0,1]",
    "output": "1"
  },
  {
    "input": "prices = [7,6,4,3,1]",
    "output": "0"
  },
  {
    "input": "prices = [1,2,3,4,5]",
    "output": "4"
  },
  {
    "input": "prices = [5,4,3,2,1,0]",
    "output": "0"
  },
  {
    "input": "prices = [10000,9999,9998]",
    "output": "0"
  },
  {
    "input": "prices = [3,3,5,0,0,4,0]",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Best Time to Buy and Sell Stock';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \" \"",
    "output": "true"
  },
  {
    "input": "s = \"0P\"",
    "output": "false"
  },
  {
    "input": "s = \"aba\"",
    "output": "true"
  },
  {
    "input": "s = \".,;\"",
    "output": "true"
  },
  {
    "input": "s = \"ab_a\"",
    "output": "true"
  },
  {
    "input": "s = \"A man, a plan, a canal: Panama\"",
    "output": "true"
  },
  {
    "input": "s = \"race a car\"",
    "output": "false"
  },
  {
    "input": "s = \"0P0\"",
    "output": "true"
  },
  {
    "input": "s = \"a.\"",
    "output": "true"
  },
  {
    "input": "s = \"1a1\"",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Valid Palindrome';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,1,1,3,3,4,3,2,4,2]",
    "output": "true"
  },
  {
    "input": "nums = [1]",
    "output": "false"
  },
  {
    "input": "nums = [1,5,-4,20,-14,4,6]",
    "output": "false"
  },
  {
    "input": "nums = [0,4,5,0,3,6]",
    "output": "true"
  },
  {
    "input": "nums = [-1,-2,-3,-4]",
    "output": "false"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "false"
  },
  {
    "input": "nums = [0,0]",
    "output": "true"
  },
  {
    "input": "nums = [1000000000,-1000000000,1000000000]",
    "output": "true"
  },
  {
    "input": "nums = [7,7,7,7,7,7,7,7,7,7]",
    "output": "true"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7,8,9,0,1]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Contains Duplicate';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [5,4,-1,7,8]",
    "output": "23"
  },
  {
    "input": "nums = [-1]",
    "output": "-1"
  },
  {
    "input": "nums = [-2,-1]",
    "output": "-1"
  },
  {
    "input": "nums = [8,-19,5,-4,20]",
    "output": "21"
  },
  {
    "input": "nums = [-2,1]",
    "output": "1"
  },
  {
    "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    "output": "6"
  },
  {
    "input": "nums = [10000,-10000,10000]",
    "output": "10000"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "15"
  },
  {
    "input": "nums = [-1,-2,-3,-4,-5]",
    "output": "-1"
  },
  {
    "input": "nums = [0,0,0,0,0]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Maximum Subarray';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums1 = [2,0], m = 1, nums2 = [1], n = 1",
    "output": "[1,2]"
  },
  {
    "input": "nums1 = [0], m = 0, nums2 = [1], n = 1",
    "output": "[1]"
  },
  {
    "input": "nums1 = [4,5,6,0,0,0], m = 3, nums2 = [1,2,3], n = 3",
    "output": "[1,2,3,4,5,6]"
  },
  {
    "input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [], n = 0",
    "output": "[1,2,3]"
  },
  {
    "input": "nums1 = [0,0,0,0,0], m = 0, nums2 = [1,2,3,4,5], n = 5",
    "output": "[1,2,3,4,5]"
  },
  {
    "input": "nums1 = [1], m = 1, nums2 = [], n = 0",
    "output": "[1]"
  },
  {
    "input": "nums1 = [2,0], m = 1, nums2 = [1], n = 1",
    "output": "[1,2]"
  },
  {
    "input": "nums1 = [1,2,4,5,6,0,0,0], m = 5, nums2 = [3,7,8], n = 3",
    "output": "[1,2,3,4,5,6,7,8]"
  },
  {
    "input": "nums1 = [0,0,1], m = 1, nums2 = [0,2], n = 2",
    "output": "[0,0,2]"
  },
  {
    "input": "nums1 = [5,0,0,0,0], m = 1, nums2 = [1,2,3,4], n = 4",
    "output": "[1,2,3,4,5]"
  }
]
$json$::jsonb WHERE title = 'Merge Sorted Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [3,3], target = 6",
    "output": "[0,1]"
  },
  {
    "input": "nums = [1,2,3,4], target = 7",
    "output": "[2,3]"
  },
  {
    "input": "nums = [-1,-2,-3,-4,-5], target = -8",
    "output": "[2,4]"
  },
  {
    "input": "nums = [0,4,3,0], target = 0",
    "output": "[0,3]"
  },
  {
    "input": "nums = [5,5], target = 10",
    "output": "[0,1]"
  },
  {
    "input": "nums = [2,7,11,15], target = 9",
    "output": "[0,1]"
  },
  {
    "input": "nums = [3,2,4], target = 6",
    "output": "[1,2]"
  },
  {
    "input": "nums = [1,1,1,1], target = 2",
    "output": "[0,1]"
  },
  {
    "input": "nums = [-3,4,3,90], target = 0",
    "output": "[0,2]"
  },
  {
    "input": "nums = [100,200,300,400,500], target = 600",
    "output": "[1,3]"
  }
]
$json$::jsonb WHERE title = 'Two Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"abcabcbb\"",
    "output": "3"
  },
  {
    "input": "s = \"bbbbb\"",
    "output": "1"
  },
  {
    "input": "s = \"pwwkew\"",
    "output": "3"
  },
  {
    "input": "s = \"\"",
    "output": "0"
  },
  {
    "input": "s = \" \"",
    "output": "1"
  },
  {
    "input": "s = \"dvdf\"",
    "output": "3"
  },
  {
    "input": "s = \"anviaj\"",
    "output": "5"
  },
  {
    "input": "s = \"tmmzuxt\"",
    "output": "5"
  },
  {
    "input": "s = \"aab\"",
    "output": "2"
  },
  {
    "input": "s = \"ohvhjdq\"",
    "output": "5"
  }
]
$json$::jsonb WHERE title = 'Longest Substring Without Repeating Characters';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [-1,0,1,2,-1,-4]",
    "output": "[[-1,-1,2],[-1,0,1]]"
  },
  {
    "input": "nums = [0,1,1]",
    "output": "[]"
  },
  {
    "input": "nums = [0,0,0]",
    "output": "[[0,0,0]]"
  },
  {
    "input": "nums = [-2,0,1,1,2]",
    "output": "[[-2,0,2],[-2,1,1]]"
  },
  {
    "input": "nums = [1,2,-2,-1]",
    "output": "[]"
  },
  {
    "input": "nums = [3,0,-2,-1,1,2]",
    "output": "[[-2,-1,3],[-2,0,2],[-1,0,1]]"
  },
  {
    "input": "nums = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]",
    "output": "[[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]"
  },
  {
    "input": "nums = [0,0,0,0]",
    "output": "[[0,0,0]]"
  },
  {
    "input": "nums = [-1,-1,-1,0,1,1,1]",
    "output": "[[-1,0,1]]"
  },
  {
    "input": "nums = [1,-1,-1,0]",
    "output": "[[-1,0,1]]"
  }
]
$json$::jsonb WHERE title = '3Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1,2,3]",
    "output": "[[1],[2,3]]"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "[[1],[2,3],[4,5,6,7]]"
  },
  {
    "input": "root = [1,null,2,null,3]",
    "output": "[[1],[2],[3]]"
  },
  {
    "input": "root = [5,4,3]",
    "output": "[[5],[4,3]]"
  },
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "[[3],[9,20],[15,7]]"
  },
  {
    "input": "root = [1]",
    "output": "[[1]]"
  },
  {
    "input": "root = [1,2,null,3,4]",
    "output": "[[1],[2],[3,4]]"
  },
  {
    "input": "root = [0,2,5,null,null,1,3,null,null,null,4]",
    "output": "[[0],[2,5],[1,3],[4]]"
  },
  {
    "input": "root = [1,2,3,4,null,null,5]",
    "output": "[[1],[2,3],[4,5]]"
  }
]
$json$::jsonb WHERE title = 'Binary Tree Level Order Traversal';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [2,1,3]",
    "output": "true"
  },
  {
    "input": "root = [5,1,4,null,null,3,6]",
    "output": "false"
  },
  {
    "input": "root = [2,2,2]",
    "output": "false"
  },
  {
    "input": "root = [5,4,6,null,null,3,7]",
    "output": "false"
  },
  {
    "input": "root = [1]",
    "output": "true"
  },
  {
    "input": "root = [2147483647]",
    "output": "true"
  },
  {
    "input": "root = [10,5,15,null,null,6,20]",
    "output": "false"
  },
  {
    "input": "root = [3,1,5,null,2,null,4]",
    "output": "false"
  },
  {
    "input": "root = [1,null,1]",
    "output": "false"
  },
  {
    "input": "root = [5,1,4,null,null,null,6]",
    "output": "false"
  }
]
$json$::jsonb WHERE title = 'Validate Binary Search Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "grid = [[\"1\",\"1\"],[\"0\",\"1\"]]",
    "output": "3"
  },
  {
    "input": "grid = [[\"0\",\"0\"],[\"0\",\"0\"]]",
    "output": "0"
  },
  {
    "input": "grid = [[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"0\",\"1\"]]",
    "output": "5"
  },
  {
    "input": "grid = [[\"1\",\"1\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"1\",\"1\"]]",
    "output": "7"
  },
  {
    "input": "grid = [[\"1\"]]",
    "output": "1"
  },
  {
    "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
    "output": "9"
  },
  {
    "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
    "output": "7"
  },
  {
    "input": "grid = [[\"0\",\"1\",\"0\"],[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"]]",
    "output": "4"
  },
  {
    "input": "grid = [[\"1\",\"0\",\"0\",\"1\"],[\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\"],[\"1\",\"0\",\"0\",\"1\"]]",
    "output": "6"
  },
  {
    "input": "grid = [[\"1\",\"1\",\"1\"],[\"1\",\"0\",\"1\"],[\"1\",\"1\",\"1\"]]",
    "output": "8"
  }
]
$json$::jsonb WHERE title = 'Number of Islands';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "numCourses = 2, prerequisites = [[1,0]]",
    "output": "true"
  },
  {
    "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
    "output": "false"
  },
  {
    "input": "numCourses = 1, prerequisites = []",
    "output": "true"
  },
  {
    "input": "numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]",
    "output": "true"
  },
  {
    "input": "numCourses = 3, prerequisites = [[0,1],[0,2],[1,2]]",
    "output": "true"
  },
  {
    "input": "numCourses = 5, prerequisites = [[1,0],[2,1],[3,4],[4,3]]",
    "output": "false"
  },
  {
    "input": "numCourses = 3, prerequisites = [[1,0],[2,0]]",
    "output": "true"
  },
  {
    "input": "numCourses = 6, prerequisites = [[1,0],[2,1],[3,2],[4,3],[5,4]]",
    "output": "true"
  },
  {
    "input": "numCourses = 2, prerequisites = [[0,1]]",
    "output": "true"
  },
  {
    "input": "numCourses = 3, prerequisites = [[1,0],[2,1],[0,2]]",
    "output": "false"
  }
]
$json$::jsonb WHERE title = 'Course Schedule';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "coins = [1], amount = 0",
    "output": "0"
  },
  {
    "input": "coins = [1,5,10], amount = 25",
    "output": "3"
  },
  {
    "input": "coins = [2], amount = 1",
    "output": "-1"
  },
  {
    "input": "coins = [1,2,5], amount = 3",
    "output": "2"
  },
  {
    "input": "coins = [186,419,83,408], amount = 6249",
    "output": "20"
  },
  {
    "input": "coins = [1,2,5], amount = 11",
    "output": "3"
  },
  {
    "input": "coins = [1], amount = 1",
    "output": "1"
  },
  {
    "input": "coins = [1,2,5], amount = 100",
    "output": "20"
  },
  {
    "input": "coins = [2,5,10,1], amount = 27",
    "output": "4"
  },
  {
    "input": "coins = [411,412,413], amount = 9864",
    "output": "24"
  }
]
$json$::jsonb WHERE title = 'Coin Change';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [10,9,2,5,3,7,101,18]",
    "output": "4"
  },
  {
    "input": "nums = [0,1,0,3,2,3]",
    "output": "4"
  },
  {
    "input": "nums = [7,7,7,7,7,7,7]",
    "output": "1"
  },
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [1,3,6,7,9,4,10,5,6]",
    "output": "6"
  },
  {
    "input": "nums = [4,10,4,3,8,9]",
    "output": "3"
  },
  {
    "input": "nums = [3,5,6,2,5,4,19,5,6,7,12]",
    "output": "6"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "5"
  },
  {
    "input": "nums = [5,4,3,2,1]",
    "output": "1"
  },
  {
    "input": "nums = [0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15]",
    "output": "6"
  }
]
$json$::jsonb WHERE title = 'Longest Increasing Subsequence';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
    "output": "[[\"bat\"],[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"]]"
  },
  {
    "input": "strs = [\"\"]",
    "output": "[[\"\"]]"
  },
  {
    "input": "strs = [\"a\"]",
    "output": "[[\"a\"]]"
  },
  {
    "input": "strs = [\"\",\"\"]",
    "output": "[[\"\",\"\"]]"
  },
  {
    "input": "strs = [\"abc\",\"bca\",\"cab\",\"xyz\"]",
    "output": "[[\"abc\",\"bca\",\"cab\"],[\"xyz\"]]"
  },
  {
    "input": "strs = [\"listen\",\"silent\",\"enlist\"]",
    "output": "[[\"listen\",\"silent\",\"enlist\"]]"
  },
  {
    "input": "strs = [\"a\",\"b\",\"c\"]",
    "output": "[[\"a\"],[\"b\"],[\"c\"]]"
  },
  {
    "input": "strs = [\"bdddddddd\",\"bbbbbbbbbbc\"]",
    "output": "[[\"bbbbbbbbbbc\"],[\"bdddddddd\"]]"
  },
  {
    "input": "strs = [\"cab\",\"tin\",\"pew\",\"duh\",\"may\",\"ill\",\"buy\",\"bar\",\"mae\",\"doc\"]",
    "output": "[[\"bar\"],[\"buy\"],[\"cab\"],[\"doc\"],[\"duh\"],[\"ill\"],[\"mae\"],[\"may\"],[\"pew\"],[\"tin\"]]"
  },
  {
    "input": "strs = [\"no\",\"on\",\"stop\",\"pots\",\"tops\"]",
    "output": "[[\"no\",\"on\"],[\"stop\",\"pots\",\"tops\"]]"
  }
]
$json$::jsonb WHERE title = 'Group Anagrams';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    "output": "6"
  },
  {
    "input": "height = [4,2,0,3,2,5]",
    "output": "9"
  },
  {
    "input": "height = [1,0,1]",
    "output": "1"
  },
  {
    "input": "height = [3,0,2,0,4]",
    "output": "7"
  },
  {
    "input": "height = [5,4,1,2]",
    "output": "1"
  },
  {
    "input": "height = [0,2,0]",
    "output": "0"
  },
  {
    "input": "height = [1,2,3,4,5]",
    "output": "0"
  },
  {
    "input": "height = [5,5,5,5]",
    "output": "0"
  },
  {
    "input": "height = [2,0,2]",
    "output": "2"
  },
  {
    "input": "height = [6,8,5,2,4,5,7,3,1,7,4,7]",
    "output": "25"
  }
]
$json$::jsonb WHERE title = 'Trapping Rain Water';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2]",
    "output": "[1,2]"
  },
  {
    "input": "root = [5,2,3,null,null,null,4]",
    "output": "[5,2,3,null,null,null,4]"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "[1,2,3,4,5,6,7]"
  },
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1,null,2,null,3]",
    "output": "[1,null,2,null,3]"
  },
  {
    "input": "root = [1,2,3,null,null,4,5]",
    "output": "[1,2,3,null,null,4,5]"
  },
  {
    "input": "root = [1]",
    "output": "[1]"
  },
  {
    "input": "root = [5,1,4,null,null,3,6]",
    "output": "[5,1,4,null,null,3,6]"
  },
  {
    "input": "root = [10,5,15,null,6,12]",
    "output": "[10,5,15,null,6,12]"
  },
  {
    "input": "root = [0,-1,1]",
    "output": "[0,-1,1]"
  }
]
$json$::jsonb WHERE title = 'Serialize and Deserialize Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "beginWord = \"a\", endWord = \"c\", wordList = [\"a\",\"b\",\"c\"]",
    "output": "2"
  },
  {
    "input": "beginWord = \"hot\", endWord = \"dog\", wordList = [\"hot\",\"dog\"]",
    "output": "0"
  },
  {
    "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "output": "5"
  },
  {
    "input": "beginWord = \"a\", endWord = \"b\", wordList = [\"a\",\"b\",\"c\"]",
    "output": "2"
  },
  {
    "input": "beginWord = \"red\", endWord = \"tax\", wordList = [\"ted\",\"tex\",\"red\",\"tax\",\"tad\",\"den\",\"rex\",\"pee\"]",
    "output": "4"
  },
  {
    "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
    "output": "0"
  },
  {
    "input": "beginWord = \"qa\", endWord = \"sq\", wordList = [\"si\",\"go\",\"se\",\"cm\",\"so\",\"ph\",\"mt\",\"db\",\"mb\",\"sb\",\"kr\",\"ln\",\"tm\",\"le\",\"av\",\"sm\",\"ar\",\"ci\",\"ca\",\"br\",\"ti\",\"ba\",\"to\",\"ra\",\"fa\",\"yo\",\"ow\",\"sn\",\"ya\",\"cr\",\"po\",\"fe\",\"ho\",\"ma\",\"re\",\"or\",\"rn\",\"au\",\"ur\",\"rh\",\"sr\",\"tc\",\"lt\",\"lo\",\"as\",\"fr\",\"nb\",\"yb\",\"if\",\"pb\",\"ge\",\"th\",\"pm\",\"rb\",\"sh\",\"co\",\"ga\",\"li\",\"ha\",\"hz\",\"no\",\"bi\",\"di\",\"hi\",\"qa\",\"pi\",\"os\",\"ul\",\"ni\",\"wa\",\"ae\",\"bf\",\"qr\",\"zr\"]",
    "output": "0"
  },
  {
    "input": "beginWord = \"talk\", endWord = \"tell\", wordList = [\"talk\",\"tons\",\"fall\",\"tail\",\"gale\",\"hall\",\"negs\"]",
    "output": "0"
  },
  {
    "input": "beginWord = \"leet\", endWord = \"code\", wordList = [\"lest\",\"leet\",\"lose\",\"code\",\"lode\",\"robe\",\"lost\"]",
    "output": "6"
  },
  {
    "input": "beginWord = \"ymain\", endWord = \"oecij\", wordList = [\"ymain\",\"ymain\",\"ymain\",\"ymain\",\"ymain\"]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Word Ladder';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "word1 = \"\", word2 = \"\"",
    "output": "0"
  },
  {
    "input": "word1 = \"a\", word2 = \"b\"",
    "output": "1"
  },
  {
    "input": "word1 = \"abc\", word2 = \"abc\"",
    "output": "0"
  },
  {
    "input": "word1 = \"park\", word2 = \"spoon\"",
    "output": "4"
  },
  {
    "input": "word1 = \"\", word2 = \"a\"",
    "output": "1"
  },
  {
    "input": "word1 = \"horse\", word2 = \"ros\"",
    "output": "3"
  },
  {
    "input": "word1 = \"intention\", word2 = \"execution\"",
    "output": "5"
  },
  {
    "input": "word1 = \"abc\", word2 = \"yabd\"",
    "output": "2"
  },
  {
    "input": "word1 = \"z\", word2 = \"z\"",
    "output": "0"
  },
  {
    "input": "word1 = \"algorithm\", word2 = \"altruistic\"",
    "output": "6"
  }
]
$json$::jsonb WHERE title = 'Edit Distance';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums1 = [1], nums2 = [2,3]",
    "output": "2.00000"
  },
  {
    "input": "nums1 = [], nums2 = [1]",
    "output": "1.00000"
  },
  {
    "input": "nums1 = [3,4], nums2 = [1,2]",
    "output": "2.50000"
  },
  {
    "input": "nums1 = [1,3], nums2 = [2]",
    "output": "2.00000"
  },
  {
    "input": "nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10,11,12,13,14,15,16,17]",
    "output": "9.00000"
  },
  {
    "input": "nums1 = [1,3], nums2 = [2]",
    "output": "2.00000"
  },
  {
    "input": "nums1 = [2], nums2 = []",
    "output": "2.00000"
  },
  {
    "input": "nums1 = [1,2], nums2 = [3,4]",
    "output": "2.50000"
  },
  {
    "input": "nums1 = [1000], nums2 = [2000]",
    "output": "1500.00000"
  },
  {
    "input": "nums1 = [1,2,3], nums2 = [4,5,6,7,8]",
    "output": "4.50000"
  }
]
$json$::jsonb WHERE title = 'Median of Two Sorted Arrays';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,2,3]",
    "output": "3, nums = [1,2,3]"
  },
  {
    "input": "nums = [1,1,1]",
    "output": "1, nums = [1]"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "5, nums = [1,2,3,4,5]"
  },
  {
    "input": "nums = [-1,-1,0,0,0,2,2]",
    "output": "3, nums = [-1,0,2]"
  },
  {
    "input": "nums = [2,2,3,3,4,4,5]",
    "output": "4, nums = [2,3,4,5]"
  },
  {
    "input": "nums = [0,0,1,1,2,2,3,3,4]",
    "output": "5, nums = [0,1,2,3,4]"
  },
  {
    "input": "nums = [1]",
    "output": "1, nums = [1]"
  },
  {
    "input": "nums = [1,1]",
    "output": "1, nums = [1]"
  },
  {
    "input": "nums = [0,1,2,2,3]",
    "output": "4, nums = [0,1,2,3]"
  },
  {
    "input": "nums = [1,2,2,3,3,4,4,5]",
    "output": "5, nums = [1,2,3,4,5]"
  }
]
$json$::jsonb WHERE title = 'Remove Duplicates from Sorted Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "digits = [0]",
    "output": "[1]"
  },
  {
    "input": "digits = [1,9]",
    "output": "[2,0]"
  },
  {
    "input": "digits = [4,3,2,1]",
    "output": "[4,3,2,2]"
  },
  {
    "input": "digits = [9]",
    "output": "[1,0]"
  },
  {
    "input": "digits = [1,2,9]",
    "output": "[1,3,0]"
  },
  {
    "input": "digits = [1,2,3]",
    "output": "[1,2,4]"
  },
  {
    "input": "digits = [9,9,9]",
    "output": "[1,0,0,0]"
  },
  {
    "input": "digits = [8,9,9]",
    "output": "[9,0,0]"
  },
  {
    "input": "digits = [1,0,0,0]",
    "output": "[1,0,0,1]"
  },
  {
    "input": "digits = [5,6,7,8]",
    "output": "[5,6,7,9]"
  }
]
$json$::jsonb WHERE title = 'Plus One';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [0,1,0,3,12]",
    "output": "[1,3,12,0,0]"
  },
  {
    "input": "nums = [0]",
    "output": "[0]"
  },
  {
    "input": "nums = [1,0,1]",
    "output": "[1,1,0]"
  },
  {
    "input": "nums = [0,0,1]",
    "output": "[1,0,0]"
  },
  {
    "input": "nums = [1,2,3]",
    "output": "[1,2,3]"
  },
  {
    "input": "nums = [0,0,0,1]",
    "output": "[1,0,0,0]"
  },
  {
    "input": "nums = [1,0,0,3,12,0]",
    "output": "[1,3,12,0,0,0]"
  },
  {
    "input": "nums = [4,2,4,0,0,3]",
    "output": "[4,2,4,3,0,0]"
  },
  {
    "input": "nums = [0,0]",
    "output": "[0,0]"
  },
  {
    "input": "nums = [2,0,0,0,1]",
    "output": "[2,1,0,0,0]"
  }
]
$json$::jsonb WHERE title = 'Move Zeroes';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [2,1,1]",
    "output": "2"
  },
  {
    "input": "nums = [4,1,2,1,2]",
    "output": "4"
  },
  {
    "input": "nums = [7,3,5,3,5]",
    "output": "7"
  },
  {
    "input": "nums = [0,1,0,1,99]",
    "output": "99"
  },
  {
    "input": "nums = [2,2,1]",
    "output": "1"
  },
  {
    "input": "nums = [1,0,1]",
    "output": "0"
  },
  {
    "input": "nums = [5,7,5]",
    "output": "7"
  },
  {
    "input": "nums = [1000000000]",
    "output": "1000000000"
  },
  {
    "input": "nums = [-1,0,-1]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Single Number';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
    "output": "[2,2]"
  },
  {
    "input": "nums1 = [4,9,5], nums2 = [9,4,8,9,1]",
    "output": "[9,4]"
  },
  {
    "input": "nums1 = [1,2], nums2 = [1,1]",
    "output": "[1]"
  },
  {
    "input": "nums1 = [3,3,3], nums2 = [3,3]",
    "output": "[3,3]"
  },
  {
    "input": "nums1 = [1], nums2 = [1,1,1]",
    "output": "[1]"
  },
  {
    "input": "nums1 = [2,2,2], nums2 = [2,2]",
    "output": "[2,2]"
  },
  {
    "input": "nums1 = [61,24,20], nums2 = [61,24,20,58,95,5,46,15,59,104,61,61,4,1,3,61,61]",
    "output": "[61,24,20]"
  },
  {
    "input": "nums1 = [0,0,0,0], nums2 = [0,0,0,0]",
    "output": "[0,0,0,0]"
  },
  {
    "input": "nums1 = [10,10,10], nums2 = [10,10,10,10]",
    "output": "[10,10,10]"
  },
  {
    "input": "nums1 = [1,2,3], nums2 = []",
    "output": "[]"
  }
]
$json$::jsonb WHERE title = 'Intersection of Two Arrays II';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [-4,-1,0,3,10]",
    "output": "[0,1,9,16,100]"
  },
  {
    "input": "nums = [-7,-3,2,3,11]",
    "output": "[4,9,9,49,121]"
  },
  {
    "input": "nums = [-5,-3,-2,-1]",
    "output": "[1,4,9,25]"
  },
  {
    "input": "nums = [0,1,2,3,4]",
    "output": "[0,1,4,9,16]"
  },
  {
    "input": "nums = [-2,-1,0,1,2]",
    "output": "[0,1,1,4,4]"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "[1,4,9,16,25]"
  },
  {
    "input": "nums = [-10,-8,-6,-4,-2,0,2,4,6,8,10]",
    "output": "[0,4,4,16,16,36,36,64,64,100,100]"
  },
  {
    "input": "nums = [0,0,0,1,1,1]",
    "output": "[0,0,0,1,1,1]"
  },
  {
    "input": "nums = [-10000,10000]",
    "output": "[100000000,100000000]"
  },
  {
    "input": "nums = [5]",
    "output": "[25]"
  }
]
$json$::jsonb WHERE title = 'Squares of a Sorted Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "g = [1,2,3], s = [1,1]",
    "output": "1"
  },
  {
    "input": "g = [1,2], s = [1,2,3]",
    "output": "2"
  },
  {
    "input": "g = [10,9,8,7], s = [5,6,7,8]",
    "output": "2"
  },
  {
    "input": "g = [1,1,1], s = [1,1,1,1]",
    "output": "3"
  },
  {
    "input": "g = [2,3,4], s = [1,1,1,1,1]",
    "output": "0"
  },
  {
    "input": "g = [1], s = [1]",
    "output": "1"
  },
  {
    "input": "g = [1,2], s = []",
    "output": "0"
  },
  {
    "input": "g = [3,3,3], s = [2,2,2,2]",
    "output": "0"
  },
  {
    "input": "g = [1,2,3,4,5], s = [1,2,3,4,5,6,7,8,9,10]",
    "output": "5"
  },
  {
    "input": "g = [5,5,5], s = [4,4,4,4,4,5,5,5]",
    "output": "3"
  }
]
$json$::jsonb WHERE title = 'Assign Cookies';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [3,2,3]",
    "output": "3"
  },
  {
    "input": "nums = [2,2,1,1,1,2,2]",
    "output": "2"
  },
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [6,5,5]",
    "output": "5"
  },
  {
    "input": "nums = [1,1,1,2,2,2,2]",
    "output": "2"
  },
  {
    "input": "nums = [100,100,100,200]",
    "output": "100"
  },
  {
    "input": "nums = [5,5,5,5,5,1,1]",
    "output": "5"
  },
  {
    "input": "nums = [10,10,10,10,20,20,20]",
    "output": "10"
  },
  {
    "input": "nums = [7,7,7,7,7,7,7,1,2,3]",
    "output": "7"
  },
  {
    "input": "nums = [1,2,1,1,1,1,1]",
    "output": "1"
  }
]
$json$::jsonb WHERE title = 'Majority Element';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,3,4]",
    "output": "[24,12,8,6]"
  },
  {
    "input": "nums = [-1,1,0,-3,3]",
    "output": "[0,0,9,0,0]"
  },
  {
    "input": "nums = [2,3,4,5]",
    "output": "[60,40,30,24]"
  },
  {
    "input": "nums = [0,0]",
    "output": "[0,0]"
  },
  {
    "input": "nums = [1,0]",
    "output": "[0,1]"
  },
  {
    "input": "nums = [-1,-1,-1,-1]",
    "output": "[-1,-1,-1,-1]"
  },
  {
    "input": "nums = [5,1,1,1]",
    "output": "[1,5,5,5]"
  },
  {
    "input": "nums = [1,2,3]",
    "output": "[6,3,2]"
  },
  {
    "input": "nums = [2,3,5,7]",
    "output": "[105,70,42,30]"
  },
  {
    "input": "nums = [0,1,2,3,4]",
    "output": "[24,0,0,0,0]"
  }
]
$json$::jsonb WHERE title = 'Product of Array Except Self';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,3,4,5,6,7], k = 3",
    "output": "[5,6,7,1,2,3,4]"
  },
  {
    "input": "nums = [-1,-100,3,99], k = 2",
    "output": "[3,99,-1,-100]"
  },
  {
    "input": "nums = [1,2,3], k = 0",
    "output": "[1,2,3]"
  },
  {
    "input": "nums = [1], k = 1",
    "output": "[1]"
  },
  {
    "input": "nums = [1,2], k = 1",
    "output": "[2,1]"
  },
  {
    "input": "nums = [1,2,3,4,5], k = 2",
    "output": "[4,5,1,2,3]"
  },
  {
    "input": "nums = [1,2,3,4,5,6], k = 4",
    "output": "[3,4,5,6,1,2]"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7], k = 7",
    "output": "[1,2,3,4,5,6,7]"
  },
  {
    "input": "nums = [2,3,4,5,6], k = 5",
    "output": "[2,3,4,5,6]"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7,8,9,10], k = 3",
    "output": "[8,9,10,1,2,3,4,5,6,7]"
  }
]
$json$::jsonb WHERE title = 'Rotate Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [3,4,5,1,2]",
    "output": "1"
  },
  {
    "input": "nums = [4,5,6,7,0,1,2]",
    "output": "0"
  },
  {
    "input": "nums = [11,13,15,17]",
    "output": "11"
  },
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [2,1]",
    "output": "1"
  },
  {
    "input": "nums = [5,1,2,3,4]",
    "output": "1"
  },
  {
    "input": "nums = [3,1,2]",
    "output": "1"
  },
  {
    "input": "nums = [8,9,10,1,2,3,4,5,6,7]",
    "output": "1"
  },
  {
    "input": "nums = [10,1,2,3,4,5,6,7,8,9]",
    "output": "1"
  },
  {
    "input": "nums = [7,8,9,0,1,2,3,4,5,6]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Find Minimum in Rotated Sorted Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [4,5,6,7,0,1,2], target = 0",
    "output": "4"
  },
  {
    "input": "nums = [4,5,6,7,0,1,2], target = 3",
    "output": "-1"
  },
  {
    "input": "nums = [1], target = 0",
    "output": "-1"
  },
  {
    "input": "nums = [1], target = 1",
    "output": "0"
  },
  {
    "input": "nums = [1,3], target = 3",
    "output": "1"
  },
  {
    "input": "nums = [5,1,3], target = 3",
    "output": "2"
  },
  {
    "input": "nums = [3,1], target = 1",
    "output": "1"
  },
  {
    "input": "nums = [4,5,6,7,8,1,2,3], target = 8",
    "output": "4"
  },
  {
    "input": "nums = [6,7,8,9,10,1,2,3,4,5], target = 6",
    "output": "0"
  },
  {
    "input": "nums = [3,4,5,6,1,2], target = 1",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Search in Rotated Sorted Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "height = [1,8,6,2,5,4,8,3,7]",
    "output": "49"
  },
  {
    "input": "height = [1,1]",
    "output": "1"
  },
  {
    "input": "height = [4,3,2,1,4]",
    "output": "16"
  },
  {
    "input": "height = [1,2,1]",
    "output": "2"
  },
  {
    "input": "height = [2,3,4,5,18,17,6]",
    "output": "17"
  },
  {
    "input": "height = [1,3,2,5,25,24,5]",
    "output": "24"
  },
  {
    "input": "height = [5,5,5,5,5]",
    "output": "20"
  },
  {
    "input": "height = [1,2,4,3]",
    "output": "4"
  },
  {
    "input": "height = [2,3,10,5,7,8,9]",
    "output": "36"
  },
  {
    "input": "height = [1,2,3,4,5,6,7,8,9,10]",
    "output": "25"
  }
]
$json$::jsonb WHERE title = 'Container With Most Water';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,3]",
    "output": "[1,3,2]"
  },
  {
    "input": "nums = [3,2,1]",
    "output": "[1,2,3]"
  },
  {
    "input": "nums = [1,1,5]",
    "output": "[1,5,1]"
  },
  {
    "input": "nums = [1,3,2]",
    "output": "[2,1,3]"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "[1,2,3,5,4]"
  },
  {
    "input": "nums = [5,4,3,2,1]",
    "output": "[1,2,3,4,5]"
  },
  {
    "input": "nums = [1]",
    "output": "[1]"
  },
  {
    "input": "nums = [1,2]",
    "output": "[2,1]"
  },
  {
    "input": "nums = [2,3,1]",
    "output": "[3,1,2]"
  },
  {
    "input": "nums = [1,5,1,1]",
    "output": "[5,1,1,1]"
  }
]
$json$::jsonb WHERE title = 'Next Permutation';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
    "output": "[1,2,3,6,9,8,7,4,5]"
  },
  {
    "input": "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
    "output": "[1,2,3,4,8,12,11,10,9,5,6,7]"
  },
  {
    "input": "matrix = [[1]]",
    "output": "[1]"
  },
  {
    "input": "matrix = [[1,2,3,4]]",
    "output": "[1,2,3,4]"
  },
  {
    "input": "matrix = [[1],[2],[3],[4]]",
    "output": "[1,2,3,4]"
  },
  {
    "input": "matrix = [[2,5],[8,4],[0,-1]]",
    "output": "[2,5,4,-1,0,8]"
  },
  {
    "input": "matrix = [[1,2],[3,4]]",
    "output": "[1,2,4,3]"
  },
  {
    "input": "matrix = [[7],[9],[6]]",
    "output": "[7,9,6]"
  },
  {
    "input": "matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]",
    "output": "[1,2,3,4,5,10,15,14,13,12,11,6,7,8,9]"
  },
  {
    "input": "matrix = [[1,2,3],[4,5,6]]",
    "output": "[1,2,3,6,5,4]"
  }
]
$json$::jsonb WHERE title = 'Spiral Matrix';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
    "output": "[[1,0,1],[0,0,0],[1,0,1]]"
  },
  {
    "input": "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
    "output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]"
  },
  {
    "input": "matrix = [[0]]",
    "output": "[[0]]"
  },
  {
    "input": "matrix = [[1,0,1]]",
    "output": "[[0,0,0]]"
  },
  {
    "input": "matrix = [[1,2,3,4],[5,0,7,8],[9,10,11,12],[13,14,15,16]]",
    "output": "[[1,0,3,4],[0,0,0,0],[9,0,11,12],[13,0,15,16]]"
  },
  {
    "input": "matrix = [[1,0,3],[4,5,6],[7,8,9]]",
    "output": "[[0,0,0],[4,0,6],[7,0,9]]"
  },
  {
    "input": "matrix = [[0,0,0],[0,0,0],[0,0,0]]",
    "output": "[[0,0,0],[0,0,0],[0,0,0]]"
  },
  {
    "input": "matrix = [[1,2,3],[4,5,6],[7,8,0]]",
    "output": "[[1,2,0],[4,5,0],[0,0,0]]"
  },
  {
    "input": "matrix = [[1,1,1,1],[1,0,1,1],[1,1,1,1],[1,1,1,1]]",
    "output": "[[1,0,1,1],[0,0,0,0],[1,0,1,1],[1,0,1,1]]"
  },
  {
    "input": "matrix = [[-1,0,1],[2,3,4],[5,6,7]]",
    "output": "[[0,0,0],[2,0,4],[5,0,7]]"
  }
]
$json$::jsonb WHERE title = 'Set Matrix Zeroes';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,1,1], k = 2",
    "output": "2"
  },
  {
    "input": "nums = [1,2,3], k = 3",
    "output": "2"
  },
  {
    "input": "nums = [1], k = 0",
    "output": "0"
  },
  {
    "input": "nums = [1,-1,0], k = 0",
    "output": "3"
  },
  {
    "input": "nums = [3,4,7,2,-3,1,4,2], k = 7",
    "output": "4"
  },
  {
    "input": "nums = [0,0,0,0,0,0,0,0,0,0], k = 0",
    "output": "55"
  },
  {
    "input": "nums = [1,2,1,2,1], k = 3",
    "output": "4"
  },
  {
    "input": "nums = [-1,-1,1], k = 0",
    "output": "1"
  },
  {
    "input": "nums = [10,2,-2,-20,10], k = -10",
    "output": "3"
  },
  {
    "input": "nums = [9,4,20,3,10,5], k = 33",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Subarray Sum Equals K';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [3,2,1,5,6,4], k = 2",
    "output": "5"
  },
  {
    "input": "nums = [3,2,3,1,2,4,5,5,6], k = 4",
    "output": "4"
  },
  {
    "input": "nums = [1], k = 1",
    "output": "1"
  },
  {
    "input": "nums = [7,10,4,3,20,15], k = 3",
    "output": "10"
  },
  {
    "input": "nums = [2,2,3,1], k = 2",
    "output": "2"
  },
  {
    "input": "nums = [5,5,5,5,5], k = 1",
    "output": "5"
  },
  {
    "input": "nums = [99,99,99,1,2,3], k = 3",
    "output": "99"
  },
  {
    "input": "nums = [10,9,8,7,6,5,4,3,2,1], k = 5",
    "output": "6"
  },
  {
    "input": "nums = [-1,-2,-3,-4,-5], k = 2",
    "output": "-2"
  },
  {
    "input": "nums = [10000,10000,10000,1], k = 2",
    "output": "10000"
  }
]
$json$::jsonb WHERE title = 'Kth Largest Element in an Array';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,3,1]",
    "output": "2"
  },
  {
    "input": "nums = [1,2,1,3,5,6,4]",
    "output": "5"
  },
  {
    "input": "nums = [1]",
    "output": "0"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "4"
  },
  {
    "input": "nums = [5,4,3,2,1]",
    "output": "0"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,1]",
    "output": "99"
  },
  {
    "input": "nums = [2,1]",
    "output": "0"
  },
  {
    "input": "nums = [1,2,3,2,1]",
    "output": "2"
  },
  {
    "input": "nums = [3,2,1,4,5,6,7,8,9,10]",
    "output": "9"
  },
  {
    "input": "nums = [1,2,3,1,2]",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Find Peak Element';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,0]",
    "output": "3"
  },
  {
    "input": "nums = [3,4,-1,1]",
    "output": "2"
  },
  {
    "input": "nums = [7,8,9,11,12]",
    "output": "1"
  },
  {
    "input": "nums = [1]",
    "output": "2"
  },
  {
    "input": "nums = [2,1]",
    "output": "3"
  },
  {
    "input": "nums = [1,2,3,4]",
    "output": "5"
  },
  {
    "input": "nums = [0,1,2]",
    "output": "3"
  },
  {
    "input": "nums = [100000,99999,1000000,999999,1000000000]",
    "output": "1"
  },
  {
    "input": "nums = [3,2,1,0]",
    "output": "4"
  },
  {
    "input": "nums = [1,1,1,1]",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'First Missing Positive';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"anagram\", t = \"nagaram\"",
    "output": "true"
  },
  {
    "input": "s = \"rat\", t = \"car\"",
    "output": "false"
  },
  {
    "input": "s = \"a\", t = \"a\"",
    "output": "true"
  },
  {
    "input": "s = \"ab\", t = \"ba\"",
    "output": "true"
  },
  {
    "input": "s = \"abc\", t = \"cba\"",
    "output": "true"
  },
  {
    "input": "s = \"listen\", t = \"silent\"",
    "output": "true"
  },
  {
    "input": "s = \"hello\", t = \"bello\"",
    "output": "false"
  },
  {
    "input": "s = \"aa\", t = \"a\"",
    "output": "false"
  },
  {
    "input": "s = \"aacc\", t = \"ccac\"",
    "output": "false"
  },
  {
    "input": "s = \"abcdefghijklmnopqrstuvwxyz\", t = \"zyxwvutsrqponmlkjihgfedcba\"",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Valid Anagram';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
    "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
  },
  {
    "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
    "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
  },
  {
    "input": "s = [\"a\"]",
    "output": "[\"a\"]"
  },
  {
    "input": "s = [\"a\",\"b\"]",
    "output": "[\"b\",\"a\"]"
  },
  {
    "input": "s = [\"a\",\"b\",\"c\",\"d\",\"e\"]",
    "output": "[\"e\",\"d\",\"c\",\"b\",\"a\"]"
  },
  {
    "input": "s = [\"z\",\"y\",\"x\"]",
    "output": "[\"x\",\"y\",\"z\"]"
  },
  {
    "input": "s = [\"1\",\"2\",\"3\"]",
    "output": "[\"3\",\"2\",\"1\"]"
  },
  {
    "input": "s = [\"A\",\" \",\"B\"]",
    "output": "[\"B\",\" \",\"A\"]"
  },
  {
    "input": "s = [\"r\",\"a\",\"c\",\"e\",\"c\",\"a\",\"r\"]",
    "output": "[\"r\",\"a\",\"c\",\"e\",\"c\",\"a\",\"r\"]"
  },
  {
    "input": "s = [\"p\",\"e\",\"e\",\"r\",\"c\",\"o\",\"d\",\"e\"]",
    "output": "[\"e\",\"d\",\"o\",\"c\",\"r\",\"e\",\"e\",\"p\"]"
  }
]
$json$::jsonb WHERE title = 'Reverse String';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "haystack = \"sadbutsad\", needle = \"sad\"",
    "output": "0"
  },
  {
    "input": "haystack = \"leetcode\", needle = \"leeto\"",
    "output": "-1"
  },
  {
    "input": "haystack = \"hello\", needle = \"ll\"",
    "output": "2"
  },
  {
    "input": "haystack = \"aaaaa\", needle = \"bba\"",
    "output": "-1"
  },
  {
    "input": "haystack = \"mississippi\", needle = \"issip\"",
    "output": "4"
  },
  {
    "input": "haystack = \"a\", needle = \"a\"",
    "output": "0"
  },
  {
    "input": "haystack = \"abc\", needle = \"c\"",
    "output": "2"
  },
  {
    "input": "haystack = \"abc\", needle = \"abcd\"",
    "output": "-1"
  },
  {
    "input": "haystack = \"aaa\", needle = \"aaaa\"",
    "output": "-1"
  },
  {
    "input": "haystack = \"abcabcabc\", needle = \"cab\"",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Find the Index of the First Occurrence in a String';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "strs = [\"flower\",\"flow\",\"flight\"]",
    "output": "\"fl\""
  },
  {
    "input": "strs = [\"dog\",\"racecar\",\"car\"]",
    "output": "\"\""
  },
  {
    "input": "strs = [\"a\"]",
    "output": "\"a\""
  },
  {
    "input": "strs = [\"ab\",\"a\"]",
    "output": "\"a\""
  },
  {
    "input": "strs = [\"\",\"b\"]",
    "output": "\"\""
  },
  {
    "input": "strs = [\"c\",\"c\"]",
    "output": "\"c\""
  },
  {
    "input": "strs = [\"interspecies\",\"interstellar\",\"interstate\"]",
    "output": "\"inters\""
  },
  {
    "input": "strs = [\"throne\",\"throne\"]",
    "output": "\"throne\""
  },
  {
    "input": "strs = [\"abab\",\"aba\",\"\"]",
    "output": "\"\""
  },
  {
    "input": "strs = [\"a\",\"ab\",\"abc\"]",
    "output": "\"a\""
  }
]
$json$::jsonb WHERE title = 'Longest Common Prefix';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"Lets take LeetCode contest\"",
    "output": "\"steL ekat edoCteeL tsetnoc\""
  },
  {
    "input": "s = \"God Ding\"",
    "output": "\"doG gniD\""
  },
  {
    "input": "s = \"a good   example\"",
    "output": "\"a doog   elpmaxe\""
  },
  {
    "input": "s = \"hello\"",
    "output": "\"olleh\""
  },
  {
    "input": "s = \"a b c\"",
    "output": "\"a b c\""
  },
  {
    "input": "s = \"Alice   Bob  Charlie\"",
    "output": "\"ecilA   boB  eilrahC\""
  },
  {
    "input": "s = \"peer code rocks\"",
    "output": "\"reep edoc skcor\""
  },
  {
    "input": "s = \"One Two Three\"",
    "output": "\"enO owT eerhT\""
  },
  {
    "input": "s = \"a\"",
    "output": "\"a\""
  },
  {
    "input": "s = \"ab cd ef\"",
    "output": "\"ba dc fe\""
  }
]
$json$::jsonb WHERE title = 'Reverse Words in a String III';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"[]\"",
    "output": "true"
  },
  {
    "input": "s = \"(]\"",
    "output": "false"
  },
  {
    "input": "s = \"([)]\"",
    "output": "false"
  },
  {
    "input": "s = \"{[]}\"",
    "output": "true"
  },
  {
    "input": "s = \"(((((((()\"",
    "output": "false"
  },
  {
    "input": "s = \"()[]{}\"",
    "output": "true"
  },
  {
    "input": "s = \"()\"",
    "output": "true"
  },
  {
    "input": "s = \"({[]})\"",
    "output": "true"
  },
  {
    "input": "s = \"]\"",
    "output": "false"
  },
  {
    "input": "s = \"([{}])\"",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Valid Parentheses';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"babad\"",
    "output": "\"bab\""
  },
  {
    "input": "s = \"cbbd\"",
    "output": "\"bb\""
  },
  {
    "input": "s = \"a\"",
    "output": "\"a\""
  },
  {
    "input": "s = \"ac\"",
    "output": "\"a\""
  },
  {
    "input": "s = \"bb\"",
    "output": "\"bb\""
  },
  {
    "input": "s = \"ccc\"",
    "output": "\"ccc\""
  },
  {
    "input": "s = \"bananas\"",
    "output": "\"anana\""
  },
  {
    "input": "s = \"forgeeksskeegfor\"",
    "output": "\"geeksskeeg\""
  },
  {
    "input": "s = \"abcba\"",
    "output": "\"abcba\""
  },
  {
    "input": "s = \"xaabacxcabaaxcabaax\"",
    "output": "\"xaabacxcabaax\""
  }
]
$json$::jsonb WHERE title = 'Longest Palindromic Substring';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"42\"",
    "output": "42"
  },
  {
    "input": "s = \"   -42\"",
    "output": "-42"
  },
  {
    "input": "s = \"4193 with words\"",
    "output": "4193"
  },
  {
    "input": "s = \"words and 987\"",
    "output": "0"
  },
  {
    "input": "s = \"-91283472332\"",
    "output": "-2147483648"
  },
  {
    "input": "s = \"91283472332\"",
    "output": "2147483647"
  },
  {
    "input": "s = \"0-1\"",
    "output": "0"
  },
  {
    "input": "s = \"  +0 123\"",
    "output": "0"
  },
  {
    "input": "s = \"   +0 123\"",
    "output": "0"
  },
  {
    "input": "s = \"+1\"",
    "output": "1"
  }
]
$json$::jsonb WHERE title = 'String to Integer (atoi)';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"PAYPALISHIRING\", numRows = 3",
    "output": "\"PAHNAPLSIIGYIR\""
  },
  {
    "input": "s = \"PAYPALISHIRING\", numRows = 4",
    "output": "\"PINALSIGYAHRPI\""
  },
  {
    "input": "s = \"A\", numRows = 1",
    "output": "\"A\""
  },
  {
    "input": "s = \"AB\", numRows = 1",
    "output": "\"AB\""
  },
  {
    "input": "s = \"ABC\", numRows = 2",
    "output": "\"ACB\""
  },
  {
    "input": "s = \"ABCDEF\", numRows = 5",
    "output": "\"ABCDFE\""
  },
  {
    "input": "s = \"ABCDEFGHI\", numRows = 4",
    "output": "\"AGBFHCEID\""
  },
  {
    "input": "s = \"ABCD\", numRows = 2",
    "output": "\"ACBD\""
  },
  {
    "input": "s = \"ABCDE\", numRows = 4",
    "output": "\"ABCED\""
  },
  {
    "input": "s = \"A,B,C\", numRows = 2",
    "output": "\"ABC,,\""
  }
]
$json$::jsonb WHERE title = 'Zigzag Conversion';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "digits = \"23\"",
    "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
  },
  {
    "input": "digits = \"\"",
    "output": "[]"
  },
  {
    "input": "digits = \"2\"",
    "output": "[\"a\",\"b\",\"c\"]"
  },
  {
    "input": "digits = \"9\"",
    "output": "[\"w\",\"x\",\"y\",\"z\"]"
  },
  {
    "input": "digits = \"79\"",
    "output": "[\"pw\",\"px\",\"py\",\"pz\",\"qw\",\"qx\",\"qy\",\"qz\",\"rw\",\"rx\",\"ry\",\"rz\",\"sw\",\"sx\",\"sy\",\"sz\"]"
  },
  {
    "input": "digits = \"234\"",
    "output": "[\"adg\",\"adh\",\"adi\",\"aeg\",\"aeh\",\"aei\",\"afg\",\"afh\",\"afi\",\"bdg\",\"bdh\",\"bdi\",\"beg\",\"beh\",\"bei\",\"bfg\",\"bfh\",\"bfi\",\"cdg\",\"cdh\",\"cdi\",\"ceg\",\"ceh\",\"cei\",\"cfg\",\"cfh\",\"cfi\"]"
  },
  {
    "input": "digits = \"22\"",
    "output": "[\"aa\",\"ab\",\"ac\",\"ba\",\"bb\",\"bc\",\"ca\",\"cb\",\"cc\"]"
  },
  {
    "input": "digits = \"56\"",
    "output": "[\"jm\",\"jn\",\"jo\",\"km\",\"kn\",\"ko\",\"lm\",\"ln\",\"lo\"]"
  },
  {
    "input": "digits = \"8\"",
    "output": "[\"t\",\"u\",\"v\"]"
  },
  {
    "input": "digits = \"47\"",
    "output": "[\"gp\",\"gq\",\"gr\",\"gs\",\"hp\",\"hq\",\"hr\",\"hs\",\"ip\",\"iq\",\"ir\",\"is\"]"
  }
]
$json$::jsonb WHERE title = 'Letter Combinations of a Phone Number';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "n = 3",
    "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
  },
  {
    "input": "n = 1",
    "output": "[\"()\"]"
  },
  {
    "input": "n = 2",
    "output": "[\"(())\",\"()()\"]"
  },
  {
    "input": "n = 4",
    "output": "[\"(((())))\",\"((()()))\",\"((())())\",\"((()))()\",\"(()(()))\",\"(()()())\",\"(()())()\",\"(())(())\",\"(())()()\",\"()((()))\",\"()(()())\",\"()(())()\",\"()()(())\",\"()()()()\"]"
  },
  {
    "input": "n = 5",
    "output": "[\"((((()))))\",\"(((()())))\",\"(((())()))\",\"(((()))())\",\"(((())))()\",\"((()(())))\",\"((()()()))\",\"((()())())\",\"((()()))()\",\"((())(()))\",\"((())()())\",\"((())())()\",\"((()))(())\",\"((()))()()\",\"(()((())))\",\"(()(()()))\",\"(()(())())\",\"(()(()))()\",\"(()()(()))\",\"(()()()())\",\"(()()())()\",\"(()())(())\",\"(()())()()\",\"(())((()))\",\"(())(()())\",\"(())(())()\",\"(())()(())\",\"(())()()()\",\"()(((())))\",\"()((()()))\",\"()((())())\",\"()((()))()\",\"()(()(()))\",\"()(()()())\",\"()(()())()\",\"()(())(())\",\"()(())()()\",\"()()((()))\",\"()()(()())\",\"()()(())()\",\"()()()(())\",\"()()()()()\"]"
  },
  {
    "input": "n = 6",
    "output": "[\"(((((())))))\",\"((((()()))))\",\"((((())())))\",\"((((()))()))\",\"((((())))())\",\"((((()))))()\",\"(((()(()))))\",\"(((()()())))\",\"(((()())()))\",\"(((()()))())\",\"(((()())))()\",\"(((())(())))\",\"(((())()()))\",\"(((())())())\",\"(((())()))()\",\"(((()))(()))\",\"(((()))()())\",\"(((()))())()\",\"(((())))(())\",\"(((())))()()\",\"((()((()))))\",\"((()(()())))\",\"((()(())()))\",\"((()(()))())\",\"((()(())))()\",\"((()()(())))\",\"((()()()()))\",\"((()()())())\",\"((()()()))()\",\"((()())(()))\",\"((()())()())\",\"((()())())()\",\"((()()))(())\",\"((()()))()()\",\"((())((())))\",\"((())(()()))\",\"((())(())())\",\"((())(()))()\",\"((())()(()))\",\"((())()()())\",\"((())()())()\",\"((())())(())\",\"((())())()()\",\"((()))((()))\",\"((()))(()())\",\"((()))(())()\",\"((()))()(())\",\"((()))()()()\",\"(()(((()))))\",\"(()((()())))\",\"(()((())()))\",\"(()((()))())\",\"(()((())))()\",\"(()(()(())))\",\"(()(()()()))\",\"(()(()())())\",\"(()(()()))()\",\"(()(())(()))\",\"(()(())()())\",\"(()(())())()\",\"(()(()))(())\",\"(()(()))()()\",\"(()()((())))\",\"(()()(()()))\",\"(()()(())())\",\"(()()(()))()\",\"(()()()(()))\",\"(()()()()())\",\"(()()()())()\",\"(()()())(())\",\"(()()())()()\",\"(()())((()))\",\"(()())(()())\",\"(()())(())()\",\"(()())()(())\",\"(()())()()()\",\"(())(((())))\",\"(())((()()))\",\"(())((())())\",\"(())((()))()\",\"(())(()(()))\",\"(())(()()())\",\"(())(()())()\",\"(())(())(())\",\"(())(())()()\",\"(())()((()))\",\"(())()(()())\",\"(())()(())()\",\"(())()()(())\",\"(())()()()()\",\"()((((()))))\",\"()(((()())))\",\"()(((())()))\",\"()(((()))())\",\"()(((())))()\",\"()((()(())))\",\"()((()()()))\",\"()((()())())\",\"()((()()))()\",\"()((())(()))\",\"()((())()())\",\"()((())())()\",\"()((()))(())\",\"()((()))()()\",\"()(()((())))\",\"()(()(()()))\",\"()(()(())())\",\"()(()(()))()\",\"()(()()(()))\",\"()(()()()())\",\"()(()()())()\",\"()(()())(())\",\"()(()())()()\",\"()(())((()))\",\"()(())(()())\",\"()(())(())()\",\"()(())()(())\",\"()(())()()()\",\"()()(((())))\",\"()()((()()))\",\"()()((())())\",\"()()((()))()\",\"()()(()(()))\",\"()()(()()())\",\"()()(()())()\",\"()()(())(())\",\"()()(())()()\",\"()()()((()))\",\"()()()(()())\",\"()()()(())()\",\"()()()()(())\",\"()()()()()()\"]"
  },
  {
    "input": "n = 7",
    "output": "[\"((((((()))))))\",\"(((((()())))))\",\"(((((())()))))\",\"(((((()))())))\",\"(((((())))()))\",\"(((((()))))())\",\"(((((())))))()\",\"((((()(())))))\",\"((((()()()))))\",\"((((()())())))\",\"((((()()))()))\",\"((((()())))())\",\"((((()()))))()\",\"((((())(()))))\",\"((((())()())))\",\"((((())())()))\",\"((((())()))())\",\"((((())())))()\",\"((((()))(())))\",\"((((()))()()))\",\"((((()))())())\",\"((((()))()))()\",\"((((())))(()))\",\"((((())))()())\",\"((((())))())()\",\"((((()))))(())\",\"((((()))))()()\",\"(((()((())))))\",\"(((()(()()))))\",\"(((()(())())))\",\"(((()(()))()))\",\"(((()(())))())\",\"(((()(()))))()\",\"(((()()(()))))\",\"(((()()()())))\",\"(((()()())()))\",\"(((()()()))())\",\"(((()()())))()\",\"(((()())(())))\",\"(((()())()()))\",\"(((()())())())\",\"(((()())()))()\",\"(((()()))(()))\",\"(((()()))()())\",\"(((()()))())()\",\"(((()())))(())\",\"(((()())))()()\",\"(((())((()))))\",\"(((())(()())))\",\"(((())(())()))\",\"(((())(()))())\",\"(((())(())))()\",\"(((())()(())))\",\"(((())()()()))\",\"(((())()())())\",\"(((())()()))()\",\"(((())())(()))\",\"(((())())()())\",\"(((())())())()\",\"(((())()))(())\",\"(((())()))()()\",\"(((()))((())))\",\"(((()))(()()))\",\"(((()))(())())\",\"(((()))(()))()\",\"(((()))()(()))\",\"(((()))()()())\",\"(((()))()())()\",\"(((()))())(())\",\"(((()))())()()\",\"(((())))((()))\",\"(((())))(()())\",\"(((())))(())()\",\"(((())))()(())\",\"(((())))()()()\",\"((()(((())))))\",\"((()((()()))))\",\"((()((())())))\",\"((()((()))()))\",\"((()((())))())\",\"((()((()))))()\",\"((()(()(()))))\",\"((()(()()())))\",\"((()(()())()))\",\"((()(()()))())\",\"((()(()())))()\",\"((()(())(())))\",\"((()(())()()))\",\"((()(())())())\",\"((()(())()))()\",\"((()(()))(()))\",\"((()(()))()())\",\"((()(()))())()\",\"((()(())))(())\",\"((()(())))()()\",\"((()()((()))))\",\"((()()(()())))\",\"((()()(())()))\",\"((()()(()))())\",\"((()()(())))()\",\"((()()()(())))\",\"((()()()()()))\",\"((()()()())())\",\"((()()()()))()\",\"((()()())(()))\",\"((()()())()())\",\"((()()())())()\",\"((()()()))(())\",\"((()()()))()()\",\"((()())((())))\",\"((()())(()()))\",\"((()())(())())\",\"((()())(()))()\",\"((()())()(()))\",\"((()())()()())\",\"((()())()())()\",\"((()())())(())\",\"((()())())()()\",\"((()()))((()))\",\"((()()))(()())\",\"((()()))(())()\",\"((()()))()(())\",\"((()()))()()()\",\"((())(((()))))\",\"((())((()())))\",\"((())((())()))\",\"((())((()))())\",\"((())((())))()\",\"((())(()(())))\",\"((())(()()()))\",\"((())(()())())\",\"((())(()()))()\",\"((())(())(()))\",\"((())(())()())\",\"((())(())())()\",\"((())(()))(())\",\"((())(()))()()\",\"((())()((())))\",\"((())()(()()))\",\"((())()(())())\",\"((())()(()))()\",\"((())()()(()))\",\"((())()()()())\",\"((())()()())()\",\"((())()())(())\",\"((())()())()()\",\"((())())((()))\",\"((())())(()())\",\"((())())(())()\",\"((())())()(())\",\"((())())()()()\",\"((()))(((())))\",\"((()))((()()))\",\"((()))((())())\",\"((()))((()))()\",\"((()))(()(()))\",\"((()))(()()())\",\"((()))(()())()\",\"((()))(())(())\",\"((()))(())()()\",\"((()))()((()))\",\"((()))()(()())\",\"((()))()(())()\",\"((()))()()(())\",\"((()))()()()()\",\"(()((((())))))\",\"(()(((()()))))\",\"(()(((())())))\",\"(()(((()))()))\",\"(()(((())))())\",\"(()(((()))))()\",\"(()((()(()))))\",\"(()((()()())))\",\"(()((()())()))\",\"(()((()()))())\",\"(()((()())))()\",\"(()((())(())))\",\"(()((())()()))\",\"(()((())())())\",\"(()((())()))()\",\"(()((()))(()))\",\"(()((()))()())\",\"(()((()))())()\",\"(()((())))(())\",\"(()((())))()()\",\"(()(()((()))))\",\"(()(()(()())))\",\"(()(()(())()))\",\"(()(()(()))())\",\"(()(()(())))()\",\"(()(()()(())))\",\"(()(()()()()))\",\"(()(()()())())\",\"(()(()()()))()\",\"(()(()())(()))\",\"(()(()())()())\",\"(()(()())())()\",\"(()(()()))(())\",\"(()(()()))()()\",\"(()(())((())))\",\"(()(())(()()))\",\"(()(())(())())\",\"(()(())(()))()\",\"(()(())()(()))\",\"(()(())()()())\",\"(()(())()())()\",\"(()(())())(())\",\"(()(())())()()\",\"(()(()))((()))\",\"(()(()))(()())\",\"(()(()))(())()\",\"(()(()))()(())\",\"(()(()))()()()\",\"(()()(((()))))\",\"(()()((()())))\",\"(()()((())()))\",\"(()()((()))())\",\"(()()((())))()\",\"(()()(()(())))\",\"(()()(()()()))\",\"(()()(()())())\",\"(()()(()()))()\",\"(()()(())(()))\",\"(()()(())()())\",\"(()()(())())()\",\"(()()(()))(())\",\"(()()(()))()()\",\"(()()()((())))\",\"(()()()(()()))\",\"(()()()(())())\",\"(()()()(()))()\",\"(()()()()(()))\",\"(()()()()()())\",\"(()()()()())()\",\"(()()()())(())\",\"(()()()())()()\",\"(()()())((()))\",\"(()()())(()())\",\"(()()())(())()\",\"(()()())()(())\",\"(()()())()()()\",\"(()())(((())))\",\"(()())((()()))\",\"(()())((())())\",\"(()())((()))()\",\"(()())(()(()))\",\"(()())(()()())\",\"(()())(()())()\",\"(()())(())(())\",\"(()())(())()()\",\"(()())()((()))\",\"(()())()(()())\",\"(()())()(())()\",\"(()())()()(())\",\"(()())()()()()\",\"(())((((()))))\",\"(())(((()())))\",\"(())(((())()))\",\"(())(((()))())\",\"(())(((())))()\",\"(())((()(())))\",\"(())((()()()))\",\"(())((()())())\",\"(())((()()))()\",\"(())((())(()))\",\"(())((())()())\",\"(())((())())()\",\"(())((()))(())\",\"(())((()))()()\",\"(())(()((())))\",\"(())(()(()()))\",\"(())(()(())())\",\"(())(()(()))()\",\"(())(()()(()))\",\"(())(()()()())\",\"(())(()()())()\",\"(())(()())(())\",\"(())(()())()()\",\"(())(())((()))\",\"(())(())(()())\",\"(())(())(())()\",\"(())(())()(())\",\"(())(())()()()\",\"(())()(((())))\",\"(())()((()()))\",\"(())()((())())\",\"(())()((()))()\",\"(())()(()(()))\",\"(())()(()()())\",\"(())()(()())()\",\"(())()(())(())\",\"(())()(())()()\",\"(())()()((()))\",\"(())()()(()())\",\"(())()()(())()\",\"(())()()()(())\",\"(())()()()()()\",\"()(((((())))))\",\"()((((()()))))\",\"()((((())())))\",\"()((((()))()))\",\"()((((())))())\",\"()((((()))))()\",\"()(((()(()))))\",\"()(((()()())))\",\"()(((()())()))\",\"()(((()()))())\",\"()(((()())))()\",\"()(((())(())))\",\"()(((())()()))\",\"()(((())())())\",\"()(((())()))()\",\"()(((()))(()))\",\"()(((()))()())\",\"()(((()))())()\",\"()(((())))(())\",\"()(((())))()()\",\"()((()((()))))\",\"()((()(()())))\",\"()((()(())()))\",\"()((()(()))())\",\"()((()(())))()\",\"()((()()(())))\",\"()((()()()()))\",\"()((()()())())\",\"()((()()()))()\",\"()((()())(()))\",\"()((()())()())\",\"()((()())())()\",\"()((()()))(())\",\"()((()()))()()\",\"()((())((())))\",\"()((())(()()))\",\"()((())(())())\",\"()((())(()))()\",\"()((())()(()))\",\"()((())()()())\",\"()((())()())()\",\"()((())())(())\",\"()((())())()()\",\"()((()))((()))\",\"()((()))(()())\",\"()((()))(())()\",\"()((()))()(())\",\"()((()))()()()\",\"()(()(((()))))\",\"()(()((()())))\",\"()(()((())()))\",\"()(()((()))())\",\"()(()((())))()\",\"()(()(()(())))\",\"()(()(()()()))\",\"()(()(()())())\",\"()(()(()()))()\",\"()(()(())(()))\",\"()(()(())()())\",\"()(()(())())()\",\"()(()(()))(())\",\"()(()(()))()()\",\"()(()()((())))\",\"()(()()(()()))\",\"()(()()(())())\",\"()(()()(()))()\",\"()(()()()(()))\",\"()(()()()()())\",\"()(()()()())()\",\"()(()()())(())\",\"()(()()())()()\",\"()(()())((()))\",\"()(()())(()())\",\"()(()())(())()\",\"()(()())()(())\",\"()(()())()()()\",\"()(())(((())))\",\"()(())((()()))\",\"()(())((())())\",\"()(())((()))()\",\"()(())(()(()))\",\"()(())(()()())\",\"()(())(()())()\",\"()(())(())(())\",\"()(())(())()()\",\"()(())()((()))\",\"()(())()(()())\",\"()(())()(())()\",\"()(())()()(())\",\"()(())()()()()\",\"()()((((()))))\",\"()()(((()())))\",\"()()(((())()))\",\"()()(((()))())\",\"()()(((())))()\",\"()()((()(())))\",\"()()((()()()))\",\"()()((()())())\",\"()()((()()))()\",\"()()((())(()))\",\"()()((())()())\",\"()()((())())()\",\"()()((()))(())\",\"()()((()))()()\",\"()()(()((())))\",\"()()(()(()()))\",\"()()(()(())())\",\"()()(()(()))()\",\"()()(()()(()))\",\"()()(()()()())\",\"()()(()()())()\",\"()()(()())(())\",\"()()(()())()()\",\"()()(())((()))\",\"()()(())(()())\",\"()()(())(())()\",\"()()(())()(())\",\"()()(())()()()\",\"()()()(((())))\",\"()()()((()()))\",\"()()()((())())\",\"()()()((()))()\",\"()()()(()(()))\",\"()()()(()()())\",\"()()()(()())()\",\"()()()(())(())\",\"()()()(())()()\",\"()()()()((()))\",\"()()()()(()())\",\"()()()()(())()\",\"()()()()()(())\",\"()()()()()()()\"]"
  },
  {
    "input": "n = 8",
    "output": "[\"(((((((())))))))\",\"((((((()()))))))\",\"((((((())())))))\",\"((((((()))()))))\",\"((((((())))())))\",\"((((((()))))()))\",\"((((((())))))())\",\"((((((()))))))()\",\"(((((()(()))))))\",\"(((((()()())))))\",\"(((((()())()))))\",\"(((((()()))())))\",\"(((((()())))()))\",\"(((((()()))))())\",\"(((((()())))))()\",\"(((((())(())))))\",\"(((((())()()))))\",\"(((((())())())))\",\"(((((())()))()))\",\"(((((())())))())\",\"(((((())()))))()\",\"(((((()))(()))))\",\"(((((()))()())))\",\"(((((()))())()))\",\"(((((()))()))())\",\"(((((()))())))()\",\"(((((())))(())))\",\"(((((())))()()))\",\"(((((())))())())\",\"(((((())))()))()\",\"(((((()))))(()))\",\"(((((()))))()())\",\"(((((()))))())()\",\"(((((())))))(())\",\"(((((())))))()()\",\"((((()((()))))))\",\"((((()(()())))))\",\"((((()(())()))))\",\"((((()(()))())))\",\"((((()(())))()))\",\"((((()(()))))())\",\"((((()(())))))()\",\"((((()()(())))))\",\"((((()()()()))))\",\"((((()()())())))\",\"((((()()()))()))\",\"((((()()())))())\",\"((((()()()))))()\",\"((((()())(()))))\",\"((((()())()())))\",\"((((()())())()))\",\"((((()())()))())\",\"((((()())())))()\",\"((((()()))(())))\",\"((((()()))()()))\",\"((((()()))())())\",\"((((()()))()))()\",\"((((()())))(()))\",\"((((()())))()())\",\"((((()())))())()\",\"((((()()))))(())\",\"((((()()))))()()\",\"((((())((())))))\",\"((((())(()()))))\",\"((((())(())())))\",\"((((())(()))()))\",\"((((())(())))())\",\"((((())(()))))()\",\"((((())()(()))))\",\"((((())()()())))\",\"((((())()())()))\",\"((((())()()))())\",\"((((())()())))()\",\"((((())())(())))\",\"((((())())()()))\",\"((((())())())())\",\"((((())())()))()\",\"((((())()))(()))\",\"((((())()))()())\",\"((((())()))())()\",\"((((())())))(())\",\"((((())())))()()\",\"((((()))((()))))\",\"((((()))(()())))\",\"((((()))(())()))\",\"((((()))(()))())\",\"((((()))(())))()\",\"((((()))()(())))\",\"((((()))()()()))\",\"((((()))()())())\",\"((((()))()()))()\",\"((((()))())(()))\",\"((((()))())()())\",\"((((()))())())()\",\"((((()))()))(())\",\"((((()))()))()()\",\"((((())))((())))\",\"((((())))(()()))\",\"((((())))(())())\",\"((((())))(()))()\",\"((((())))()(()))\",\"((((())))()()())\",\"((((())))()())()\",\"((((())))())(())\",\"((((())))())()()\",\"((((()))))((()))\",\"((((()))))(()())\",\"((((()))))(())()\",\"((((()))))()(())\",\"((((()))))()()()\",\"(((()(((()))))))\",\"(((()((()())))))\",\"(((()((())()))))\",\"(((()((()))())))\",\"(((()((())))()))\",\"(((()((()))))())\",\"(((()((())))))()\",\"(((()(()(())))))\",\"(((()(()()()))))\",\"(((()(()())())))\",\"(((()(()()))()))\",\"(((()(()())))())\",\"(((()(()()))))()\",\"(((()(())(()))))\",\"(((()(())()())))\",\"(((()(())())()))\",\"(((()(())()))())\",\"(((()(())())))()\",\"(((()(()))(())))\",\"(((()(()))()()))\",\"(((()(()))())())\",\"(((()(()))()))()\",\"(((()(())))(()))\",\"(((()(())))()())\",\"(((()(())))())()\",\"(((()(()))))(())\",\"(((()(()))))()()\",\"(((()()((())))))\",\"(((()()(()()))))\",\"(((()()(())())))\",\"(((()()(()))()))\",\"(((()()(())))())\",\"(((()()(()))))()\",\"(((()()()(()))))\",\"(((()()()()())))\",\"(((()()()())()))\",\"(((()()()()))())\",\"(((()()()())))()\",\"(((()()())(())))\",\"(((()()())()()))\",\"(((()()())())())\",\"(((()()())()))()\",\"(((()()()))(()))\",\"(((()()()))()())\",\"(((()()()))())()\",\"(((()()())))(())\",\"(((()()())))()()\",\"(((()())((()))))\",\"(((()())(()())))\",\"(((()())(())()))\",\"(((()())(()))())\",\"(((()())(())))()\",\"(((()())()(())))\",\"(((()())()()()))\",\"(((()())()())())\",\"(((()())()()))()\",\"(((()())())(()))\",\"(((()())())()())\",\"(((()())())())()\",\"(((()())()))(())\",\"(((()())()))()()\",\"(((()()))((())))\",\"(((()()))(()()))\",\"(((()()))(())())\",\"(((()()))(()))()\",\"(((()()))()(()))\",\"(((()()))()()())\",\"(((()()))()())()\",\"(((()()))())(())\",\"(((()()))())()()\",\"(((()())))((()))\",\"(((()())))(()())\",\"(((()())))(())()\",\"(((()())))()(())\",\"(((()())))()()()\",\"(((())(((())))))\",\"(((())((()()))))\",\"(((())((())())))\",\"(((())((()))()))\",\"(((())((())))())\",\"(((())((()))))()\",\"(((())(()(()))))\",\"(((())(()()())))\",\"(((())(()())()))\",\"(((())(()()))())\",\"(((())(()())))()\",\"(((())(())(())))\",\"(((())(())()()))\",\"(((())(())())())\",\"(((())(())()))()\",\"(((())(()))(()))\",\"(((())(()))()())\",\"(((())(()))())()\",\"(((())(())))(())\",\"(((())(())))()()\",\"(((())()((()))))\",\"(((())()(()())))\",\"(((())()(())()))\",\"(((())()(()))())\",\"(((())()(())))()\",\"(((())()()(())))\",\"(((())()()()()))\",\"(((())()()())())\",\"(((())()()()))()\",\"(((())()())(()))\",\"(((())()())()())\",\"(((())()())())()\",\"(((())()()))(())\",\"(((())()()))()()\",\"(((())())((())))\",\"(((())())(()()))\",\"(((())())(())())\",\"(((())())(()))()\",\"(((())())()(()))\",\"(((())())()()())\",\"(((())())()())()\",\"(((())())())(())\",\"(((())())())()()\",\"(((())()))((()))\",\"(((())()))(()())\",\"(((())()))(())()\",\"(((())()))()(())\",\"(((())()))()()()\",\"(((()))(((()))))\",\"(((()))((()())))\",\"(((()))((())()))\",\"(((()))((()))())\",\"(((()))((())))()\",\"(((()))(()(())))\",\"(((()))(()()()))\",\"(((()))(()())())\",\"(((()))(()()))()\",\"(((()))(())(()))\",\"(((()))(())()())\",\"(((()))(())())()\",\"(((()))(()))(())\",\"(((()))(()))()()\",\"(((()))()((())))\",\"(((()))()(()()))\",\"(((()))()(())())\",\"(((()))()(()))()\",\"(((()))()()(()))\",\"(((()))()()()())\",\"(((()))()()())()\",\"(((()))()())(())\",\"(((()))()())()()\",\"(((()))())((()))\",\"(((()))())(()())\",\"(((()))())(())()\",\"(((()))())()(())\",\"(((()))())()()()\",\"(((())))(((())))\",\"(((())))((()()))\",\"(((())))((())())\",\"(((())))((()))()\",\"(((())))(()(()))\",\"(((())))(()()())\",\"(((())))(()())()\",\"(((())))(())(())\",\"(((())))(())()()\",\"(((())))()((()))\",\"(((())))()(()())\",\"(((())))()(())()\",\"(((())))()()(())\",\"(((())))()()()()\",\"((()((((()))))))\",\"((()(((()())))))\",\"((()(((())()))))\",\"((()(((()))())))\",\"((()(((())))()))\",\"((()(((()))))())\",\"((()(((())))))()\",\"((()((()(())))))\",\"((()((()()()))))\",\"((()((()())())))\",\"((()((()()))()))\",\"((()((()())))())\",\"((()((()()))))()\",\"((()((())(()))))\",\"((()((())()())))\",\"((()((())())()))\",\"((()((())()))())\",\"((()((())())))()\",\"((()((()))(())))\",\"((()((()))()()))\",\"((()((()))())())\",\"((()((()))()))()\",\"((()((())))(()))\",\"((()((())))()())\",\"((()((())))())()\",\"((()((()))))(())\",\"((()((()))))()()\",\"((()(()((())))))\",\"((()(()(()()))))\",\"((()(()(())())))\",\"((()(()(()))()))\",\"((()(()(())))())\",\"((()(()(()))))()\",\"((()(()()(()))))\",\"((()(()()()())))\",\"((()(()()())()))\",\"((()(()()()))())\",\"((()(()()())))()\",\"((()(()())(())))\",\"((()(()())()()))\",\"((()(()())())())\",\"((()(()())()))()\",\"((()(()()))(()))\",\"((()(()()))()())\",\"((()(()()))())()\",\"((()(()())))(())\",\"((()(()())))()()\",\"((()(())((()))))\",\"((()(())(()())))\",\"((()(())(())()))\",\"((()(())(()))())\",\"((()(())(())))()\",\"((()(())()(())))\",\"((()(())()()()))\",\"((()(())()())())\",\"((()(())()()))()\",\"((()(())())(()))\",\"((()(())())()())\",\"((()(())())())()\",\"((()(())()))(())\",\"((()(())()))()()\",\"((()(()))((())))\",\"((()(()))(()()))\",\"((()(()))(())())\",\"((()(()))(()))()\",\"((()(()))()(()))\",\"((()(()))()()())\",\"((()(()))()())()\",\"((()(()))())(())\",\"((()(()))())()()\",\"((()(())))((()))\",\"((()(())))(()())\",\"((()(())))(())()\",\"((()(())))()(())\",\"((()(())))()()()\",\"((()()(((())))))\",\"((()()((()()))))\",\"((()()((())())))\",\"((()()((()))()))\",\"((()()((())))())\",\"((()()((()))))()\",\"((()()(()(()))))\",\"((()()(()()())))\",\"((()()(()())()))\",\"((()()(()()))())\",\"((()()(()())))()\",\"((()()(())(())))\",\"((()()(())()()))\",\"((()()(())())())\",\"((()()(())()))()\",\"((()()(()))(()))\",\"((()()(()))()())\",\"((()()(()))())()\",\"((()()(())))(())\",\"((()()(())))()()\",\"((()()()((()))))\",\"((()()()(()())))\",\"((()()()(())()))\",\"((()()()(()))())\",\"((()()()(())))()\",\"((()()()()(())))\",\"((()()()()()()))\",\"((()()()()())())\",\"((()()()()()))()\",\"((()()()())(()))\",\"((()()()())()())\",\"((()()()())())()\",\"((()()()()))(())\",\"((()()()()))()()\",\"((()()())((())))\",\"((()()())(()()))\",\"((()()())(())())\",\"((()()())(()))()\",\"((()()())()(()))\",\"((()()())()()())\",\"((()()())()())()\",\"((()()())())(())\",\"((()()())())()()\",\"((()()()))((()))\",\"((()()()))(()())\",\"((()()()))(())()\",\"((()()()))()(())\",\"((()()()))()()()\",\"((()())(((()))))\",\"((()())((()())))\",\"((()())((())()))\",\"((()())((()))())\",\"((()())((())))()\",\"((()())(()(())))\",\"((()())(()()()))\",\"((()())(()())())\",\"((()())(()()))()\",\"((()())(())(()))\",\"((()())(())()())\",\"((()())(())())()\",\"((()())(()))(())\",\"((()())(()))()()\",\"((()())()((())))\",\"((()())()(()()))\",\"((()())()(())())\",\"((()())()(()))()\",\"((()())()()(()))\",\"((()())()()()())\",\"((()())()()())()\",\"((()())()())(())\",\"((()())()())()()\",\"((()())())((()))\",\"((()())())(()())\",\"((()())())(())()\",\"((()())())()(())\",\"((()())())()()()\",\"((()()))(((())))\",\"((()()))((()()))\",\"((()()))((())())\",\"((()()))((()))()\",\"((()()))(()(()))\",\"((()()))(()()())\",\"((()()))(()())()\",\"((()()))(())(())\",\"((()()))(())()()\",\"((()()))()((()))\",\"((()()))()(()())\",\"((()()))()(())()\",\"((()()))()()(())\",\"((()()))()()()()\",\"((())((((())))))\",\"((())(((()()))))\",\"((())(((())())))\",\"((())(((()))()))\",\"((())(((())))())\",\"((())(((()))))()\",\"((())((()(()))))\",\"((())((()()())))\",\"((())((()())()))\",\"((())((()()))())\",\"((())((()())))()\",\"((())((())(())))\",\"((())((())()()))\",\"((())((())())())\",\"((())((())()))()\",\"((())((()))(()))\",\"((())((()))()())\",\"((())((()))())()\",\"((())((())))(())\",\"((())((())))()()\",\"((())(()((()))))\",\"((())(()(()())))\",\"((())(()(())()))\",\"((())(()(()))())\",\"((())(()(())))()\",\"((())(()()(())))\",\"((())(()()()()))\",\"((())(()()())())\",\"((())(()()()))()\",\"((())(()())(()))\",\"((())(()())()())\",\"((())(()())())()\",\"((())(()()))(())\",\"((())(()()))()()\",\"((())(())((())))\",\"((())(())(()()))\",\"((())(())(())())\",\"((())(())(()))()\",\"((())(())()(()))\",\"((())(())()()())\",\"((())(())()())()\",\"((())(())())(())\",\"((())(())())()()\",\"((())(()))((()))\",\"((())(()))(()())\",\"((())(()))(())()\",\"((())(()))()(())\",\"((())(()))()()()\",\"((())()(((()))))\",\"((())()((()())))\",\"((())()((())()))\",\"((())()((()))())\",\"((())()((())))()\",\"((())()(()(())))\",\"((())()(()()()))\",\"((())()(()())())\",\"((())()(()()))()\",\"((())()(())(()))\",\"((())()(())()())\",\"((())()(())())()\",\"((())()(()))(())\",\"((())()(()))()()\",\"((())()()((())))\",\"((())()()(()()))\",\"((())()()(())())\",\"((())()()(()))()\",\"((())()()()(()))\",\"((())()()()()())\",\"((())()()()())()\",\"((())()()())(())\",\"((())()()())()()\",\"((())()())((()))\",\"((())()())(()())\",\"((())()())(())()\",\"((())()())()(())\",\"((())()())()()()\",\"((())())(((())))\",\"((())())((()()))\",\"((())())((())())\",\"((())())((()))()\",\"((())())(()(()))\",\"((())())(()()())\",\"((())())(()())()\",\"((())())(())(())\",\"((())())(())()()\",\"((())())()((()))\",\"((())())()(()())\",\"((())())()(())()\",\"((())())()()(())\",\"((())())()()()()\",\"((()))((((()))))\",\"((()))(((()())))\",\"((()))(((())()))\",\"((()))(((()))())\",\"((()))(((())))()\",\"((()))((()(())))\",\"((()))((()()()))\",\"((()))((()())())\",\"((()))((()()))()\",\"((()))((())(()))\",\"((()))((())()())\",\"((()))((())())()\",\"((()))((()))(())\",\"((()))((()))()()\",\"((()))(()((())))\",\"((()))(()(()()))\",\"((()))(()(())())\",\"((()))(()(()))()\",\"((()))(()()(()))\",\"((()))(()()()())\",\"((()))(()()())()\",\"((()))(()())(())\",\"((()))(()())()()\",\"((()))(())((()))\",\"((()))(())(()())\",\"((()))(())(())()\",\"((()))(())()(())\",\"((()))(())()()()\",\"((()))()(((())))\",\"((()))()((()()))\",\"((()))()((())())\",\"((()))()((()))()\",\"((()))()(()(()))\",\"((()))()(()()())\",\"((()))()(()())()\",\"((()))()(())(())\",\"((()))()(())()()\",\"((()))()()((()))\",\"((()))()()(()())\",\"((()))()()(())()\",\"((()))()()()(())\",\"((()))()()()()()\",\"(()(((((()))))))\",\"(()((((()())))))\",\"(()((((())()))))\",\"(()((((()))())))\",\"(()((((())))()))\",\"(()((((()))))())\",\"(()((((())))))()\",\"(()(((()(())))))\",\"(()(((()()()))))\",\"(()(((()())())))\",\"(()(((()()))()))\",\"(()(((()())))())\",\"(()(((()()))))()\",\"(()(((())(()))))\",\"(()(((())()())))\",\"(()(((())())()))\",\"(()(((())()))())\",\"(()(((())())))()\",\"(()(((()))(())))\",\"(()(((()))()()))\",\"(()(((()))())())\",\"(()(((()))()))()\",\"(()(((())))(()))\",\"(()(((())))()())\",\"(()(((())))())()\",\"(()(((()))))(())\",\"(()(((()))))()()\",\"(()((()((())))))\",\"(()((()(()()))))\",\"(()((()(())())))\",\"(()((()(()))()))\",\"(()((()(())))())\",\"(()((()(()))))()\",\"(()((()()(()))))\",\"(()((()()()())))\",\"(()((()()())()))\",\"(()((()()()))())\",\"(()((()()())))()\",\"(()((()())(())))\",\"(()((()())()()))\",\"(()((()())())())\",\"(()((()())()))()\",\"(()((()()))(()))\",\"(()((()()))()())\",\"(()((()()))())()\",\"(()((()())))(())\",\"(()((()())))()()\",\"(()((())((()))))\",\"(()((())(()())))\",\"(()((())(())()))\",\"(()((())(()))())\",\"(()((())(())))()\",\"(()((())()(())))\",\"(()((())()()()))\",\"(()((())()())())\",\"(()((())()()))()\",\"(()((())())(()))\",\"(()((())())()())\",\"(()((())())())()\",\"(()((())()))(())\",\"(()((())()))()()\",\"(()((()))((())))\",\"(()((()))(()()))\",\"(()((()))(())())\",\"(()((()))(()))()\",\"(()((()))()(()))\",\"(()((()))()()())\",\"(()((()))()())()\",\"(()((()))())(())\",\"(()((()))())()()\",\"(()((())))((()))\",\"(()((())))(()())\",\"(()((())))(())()\",\"(()((())))()(())\",\"(()((())))()()()\",\"(()(()(((())))))\",\"(()(()((()()))))\",\"(()(()((())())))\",\"(()(()((()))()))\",\"(()(()((())))())\",\"(()(()((()))))()\",\"(()(()(()(()))))\",\"(()(()(()()())))\",\"(()(()(()())()))\",\"(()(()(()()))())\",\"(()(()(()())))()\",\"(()(()(())(())))\",\"(()(()(())()()))\",\"(()(()(())())())\",\"(()(()(())()))()\",\"(()(()(()))(()))\",\"(()(()(()))()())\",\"(()(()(()))())()\",\"(()(()(())))(())\",\"(()(()(())))()()\",\"(()(()()((()))))\",\"(()(()()(()())))\",\"(()(()()(())()))\",\"(()(()()(()))())\",\"(()(()()(())))()\",\"(()(()()()(())))\",\"(()(()()()()()))\",\"(()(()()()())())\",\"(()(()()()()))()\",\"(()(()()())(()))\",\"(()(()()())()())\",\"(()(()()())())()\",\"(()(()()()))(())\",\"(()(()()()))()()\",\"(()(()())((())))\",\"(()(()())(()()))\",\"(()(()())(())())\",\"(()(()())(()))()\",\"(()(()())()(()))\",\"(()(()())()()())\",\"(()(()())()())()\",\"(()(()())())(())\",\"(()(()())())()()\",\"(()(()()))((()))\",\"(()(()()))(()())\",\"(()(()()))(())()\",\"(()(()()))()(())\",\"(()(()()))()()()\",\"(()(())(((()))))\",\"(()(())((()())))\",\"(()(())((())()))\",\"(()(())((()))())\",\"(()(())((())))()\",\"(()(())(()(())))\",\"(()(())(()()()))\",\"(()(())(()())())\",\"(()(())(()()))()\",\"(()(())(())(()))\",\"(()(())(())()())\",\"(()(())(())())()\",\"(()(())(()))(())\",\"(()(())(()))()()\",\"(()(())()((())))\",\"(()(())()(()()))\",\"(()(())()(())())\",\"(()(())()(()))()\",\"(()(())()()(()))\",\"(()(())()()()())\",\"(()(())()()())()\",\"(()(())()())(())\",\"(()(())()())()()\",\"(()(())())((()))\",\"(()(())())(()())\",\"(()(())())(())()\",\"(()(())())()(())\",\"(()(())())()()()\",\"(()(()))(((())))\",\"(()(()))((()()))\",\"(()(()))((())())\",\"(()(()))((()))()\",\"(()(()))(()(()))\",\"(()(()))(()()())\",\"(()(()))(()())()\",\"(()(()))(())(())\",\"(()(()))(())()()\",\"(()(()))()((()))\",\"(()(()))()(()())\",\"(()(()))()(())()\",\"(()(()))()()(())\",\"(()(()))()()()()\",\"(()()((((())))))\",\"(()()(((()()))))\",\"(()()(((())())))\",\"(()()(((()))()))\",\"(()()(((())))())\",\"(()()(((()))))()\",\"(()()((()(()))))\",\"(()()((()()())))\",\"(()()((()())()))\",\"(()()((()()))())\",\"(()()((()())))()\",\"(()()((())(())))\",\"(()()((())()()))\",\"(()()((())())())\",\"(()()((())()))()\",\"(()()((()))(()))\",\"(()()((()))()())\",\"(()()((()))())()\",\"(()()((())))(())\",\"(()()((())))()()\",\"(()()(()((()))))\",\"(()()(()(()())))\",\"(()()(()(())()))\",\"(()()(()(()))())\",\"(()()(()(())))()\",\"(()()(()()(())))\",\"(()()(()()()()))\",\"(()()(()()())())\",\"(()()(()()()))()\",\"(()()(()())(()))\",\"(()()(()())()())\",\"(()()(()())())()\",\"(()()(()()))(())\",\"(()()(()()))()()\",\"(()()(())((())))\",\"(()()(())(()()))\",\"(()()(())(())())\",\"(()()(())(()))()\",\"(()()(())()(()))\",\"(()()(())()()())\",\"(()()(())()())()\",\"(()()(())())(())\",\"(()()(())())()()\",\"(()()(()))((()))\",\"(()()(()))(()())\",\"(()()(()))(())()\",\"(()()(()))()(())\",\"(()()(()))()()()\",\"(()()()(((()))))\",\"(()()()((()())))\",\"(()()()((())()))\",\"(()()()((()))())\",\"(()()()((())))()\",\"(()()()(()(())))\",\"(()()()(()()()))\",\"(()()()(()())())\",\"(()()()(()()))()\",\"(()()()(())(()))\",\"(()()()(())()())\",\"(()()()(())())()\",\"(()()()(()))(())\",\"(()()()(()))()()\",\"(()()()()((())))\",\"(()()()()(()()))\",\"(()()()()(())())\",\"(()()()()(()))()\",\"(()()()()()(()))\",\"(()()()()()()())\",\"(()()()()()())()\",\"(()()()()())(())\",\"(()()()()())()()\",\"(()()()())((()))\",\"(()()()())(()())\",\"(()()()())(())()\",\"(()()()())()(())\",\"(()()()())()()()\",\"(()()())(((())))\",\"(()()())((()()))\",\"(()()())((())())\",\"(()()())((()))()\",\"(()()())(()(()))\",\"(()()())(()()())\",\"(()()())(()())()\",\"(()()())(())(())\",\"(()()())(())()()\",\"(()()())()((()))\",\"(()()())()(()())\",\"(()()())()(())()\",\"(()()())()()(())\",\"(()()())()()()()\",\"(()())((((()))))\",\"(()())(((()())))\",\"(()())(((())()))\",\"(()())(((()))())\",\"(()())(((())))()\",\"(()())((()(())))\",\"(()())((()()()))\",\"(()())((()())())\",\"(()())((()()))()\",\"(()())((())(()))\",\"(()())((())()())\",\"(()())((())())()\",\"(()())((()))(())\",\"(()())((()))()()\",\"(()())(()((())))\",\"(()())(()(()()))\",\"(()())(()(())())\",\"(()())(()(()))()\",\"(()())(()()(()))\",\"(()())(()()()())\",\"(()())(()()())()\",\"(()())(()())(())\",\"(()())(()())()()\",\"(()())(())((()))\",\"(()())(())(()())\",\"(()())(())(())()\",\"(()())(())()(())\",\"(()())(())()()()\",\"(()())()(((())))\",\"(()())()((()()))\",\"(()())()((())())\",\"(()())()((()))()\",\"(()())()(()(()))\",\"(()())()(()()())\",\"(()())()(()())()\",\"(()())()(())(())\",\"(()())()(())()()\",\"(()())()()((()))\",\"(()())()()(()())\",\"(()())()()(())()\",\"(()())()()()(())\",\"(()())()()()()()\",\"(())(((((())))))\",\"(())((((()()))))\",\"(())((((())())))\",\"(())((((()))()))\",\"(())((((())))())\",\"(())((((()))))()\",\"(())(((()(()))))\",\"(())(((()()())))\",\"(())(((()())()))\",\"(())(((()()))())\",\"(())(((()())))()\",\"(())(((())(())))\",\"(())(((())()()))\",\"(())(((())())())\",\"(())(((())()))()\",\"(())(((()))(()))\",\"(())(((()))()())\",\"(())(((()))())()\",\"(())(((())))(())\",\"(())(((())))()()\",\"(())((()((()))))\",\"(())((()(()())))\",\"(())((()(())()))\",\"(())((()(()))())\",\"(())((()(())))()\",\"(())((()()(())))\",\"(())((()()()()))\",\"(())((()()())())\",\"(())((()()()))()\",\"(())((()())(()))\",\"(())((()())()())\",\"(())((()())())()\",\"(())((()()))(())\",\"(())((()()))()()\",\"(())((())((())))\",\"(())((())(()()))\",\"(())((())(())())\",\"(())((())(()))()\",\"(())((())()(()))\",\"(())((())()()())\",\"(())((())()())()\",\"(())((())())(())\",\"(())((())())()()\",\"(())((()))((()))\",\"(())((()))(()())\",\"(())((()))(())()\",\"(())((()))()(())\",\"(())((()))()()()\",\"(())(()(((()))))\",\"(())(()((()())))\",\"(())(()((())()))\",\"(())(()((()))())\",\"(())(()((())))()\",\"(())(()(()(())))\",\"(())(()(()()()))\",\"(())(()(()())())\",\"(())(()(()()))()\",\"(())(()(())(()))\",\"(())(()(())()())\",\"(())(()(())())()\",\"(())(()(()))(())\",\"(())(()(()))()()\",\"(())(()()((())))\",\"(())(()()(()()))\",\"(())(()()(())())\",\"(())(()()(()))()\",\"(())(()()()(()))\",\"(())(()()()()())\",\"(())(()()()())()\",\"(())(()()())(())\",\"(())(()()())()()\",\"(())(()())((()))\",\"(())(()())(()())\",\"(())(()())(())()\",\"(())(()())()(())\",\"(())(()())()()()\",\"(())(())(((())))\",\"(())(())((()()))\",\"(())(())((())())\",\"(())(())((()))()\",\"(())(())(()(()))\",\"(())(())(()()())\",\"(())(())(()())()\",\"(())(())(())(())\",\"(())(())(())()()\",\"(())(())()((()))\",\"(())(())()(()())\",\"(())(())()(())()\",\"(())(())()()(())\",\"(())(())()()()()\",\"(())()((((()))))\",\"(())()(((()())))\",\"(())()(((())()))\",\"(())()(((()))())\",\"(())()(((())))()\",\"(())()((()(())))\",\"(())()((()()()))\",\"(())()((()())())\",\"(())()((()()))()\",\"(())()((())(()))\",\"(())()((())()())\",\"(())()((())())()\",\"(())()((()))(())\",\"(())()((()))()()\",\"(())()(()((())))\",\"(())()(()(()()))\",\"(())()(()(())())\",\"(())()(()(()))()\",\"(())()(()()(()))\",\"(())()(()()()())\",\"(())()(()()())()\",\"(())()(()())(())\",\"(())()(()())()()\",\"(())()(())((()))\",\"(())()(())(()())\",\"(())()(())(())()\",\"(())()(())()(())\",\"(())()(())()()()\",\"(())()()(((())))\",\"(())()()((()()))\",\"(())()()((())())\",\"(())()()((()))()\",\"(())()()(()(()))\",\"(())()()(()()())\",\"(())()()(()())()\",\"(())()()(())(())\",\"(())()()(())()()\",\"(())()()()((()))\",\"(())()()()(()())\",\"(())()()()(())()\",\"(())()()()()(())\",\"(())()()()()()()\",\"()((((((()))))))\",\"()(((((()())))))\",\"()(((((())()))))\",\"()(((((()))())))\",\"()(((((())))()))\",\"()(((((()))))())\",\"()(((((())))))()\",\"()((((()(())))))\",\"()((((()()()))))\",\"()((((()())())))\",\"()((((()()))()))\",\"()((((()())))())\",\"()((((()()))))()\",\"()((((())(()))))\",\"()((((())()())))\",\"()((((())())()))\",\"()((((())()))())\",\"()((((())())))()\",\"()((((()))(())))\",\"()((((()))()()))\",\"()((((()))())())\",\"()((((()))()))()\",\"()((((())))(()))\",\"()((((())))()())\",\"()((((())))())()\",\"()((((()))))(())\",\"()((((()))))()()\",\"()(((()((())))))\",\"()(((()(()()))))\",\"()(((()(())())))\",\"()(((()(()))()))\",\"()(((()(())))())\",\"()(((()(()))))()\",\"()(((()()(()))))\",\"()(((()()()())))\",\"()(((()()())()))\",\"()(((()()()))())\",\"()(((()()())))()\",\"()(((()())(())))\",\"()(((()())()()))\",\"()(((()())())())\",\"()(((()())()))()\",\"()(((()()))(()))\",\"()(((()()))()())\",\"()(((()()))())()\",\"()(((()())))(())\",\"()(((()())))()()\",\"()(((())((()))))\",\"()(((())(()())))\",\"()(((())(())()))\",\"()(((())(()))())\",\"()(((())(())))()\",\"()(((())()(())))\",\"()(((())()()()))\",\"()(((())()())())\",\"()(((())()()))()\",\"()(((())())(()))\",\"()(((())())()())\",\"()(((())())())()\",\"()(((())()))(())\",\"()(((())()))()()\",\"()(((()))((())))\",\"()(((()))(()()))\",\"()(((()))(())())\",\"()(((()))(()))()\",\"()(((()))()(()))\",\"()(((()))()()())\",\"()(((()))()())()\",\"()(((()))())(())\",\"()(((()))())()()\",\"()(((())))((()))\",\"()(((())))(()())\",\"()(((())))(())()\",\"()(((())))()(())\",\"()(((())))()()()\",\"()((()(((())))))\",\"()((()((()()))))\",\"()((()((())())))\",\"()((()((()))()))\",\"()((()((())))())\",\"()((()((()))))()\",\"()((()(()(()))))\",\"()((()(()()())))\",\"()((()(()())()))\",\"()((()(()()))())\",\"()((()(()())))()\",\"()((()(())(())))\",\"()((()(())()()))\",\"()((()(())())())\",\"()((()(())()))()\",\"()((()(()))(()))\",\"()((()(()))()())\",\"()((()(()))())()\",\"()((()(())))(())\",\"()((()(())))()()\",\"()((()()((()))))\",\"()((()()(()())))\",\"()((()()(())()))\",\"()((()()(()))())\",\"()((()()(())))()\",\"()((()()()(())))\",\"()((()()()()()))\",\"()((()()()())())\",\"()((()()()()))()\",\"()((()()())(()))\",\"()((()()())()())\",\"()((()()())())()\",\"()((()()()))(())\",\"()((()()()))()()\",\"()((()())((())))\",\"()((()())(()()))\",\"()((()())(())())\",\"()((()())(()))()\",\"()((()())()(()))\",\"()((()())()()())\",\"()((()())()())()\",\"()((()())())(())\",\"()((()())())()()\",\"()((()()))((()))\",\"()((()()))(()())\",\"()((()()))(())()\",\"()((()()))()(())\",\"()((()()))()()()\",\"()((())(((()))))\",\"()((())((()())))\",\"()((())((())()))\",\"()((())((()))())\",\"()((())((())))()\",\"()((())(()(())))\",\"()((())(()()()))\",\"()((())(()())())\",\"()((())(()()))()\",\"()((())(())(()))\",\"()((())(())()())\",\"()((())(())())()\",\"()((())(()))(())\",\"()((())(()))()()\",\"()((())()((())))\",\"()((())()(()()))\",\"()((())()(())())\",\"()((())()(()))()\",\"()((())()()(()))\",\"()((())()()()())\",\"()((())()()())()\",\"()((())()())(())\",\"()((())()())()()\",\"()((())())((()))\",\"()((())())(()())\",\"()((())())(())()\",\"()((())())()(())\",\"()((())())()()()\",\"()((()))(((())))\",\"()((()))((()()))\",\"()((()))((())())\",\"()((()))((()))()\",\"()((()))(()(()))\",\"()((()))(()()())\",\"()((()))(()())()\",\"()((()))(())(())\",\"()((()))(())()()\",\"()((()))()((()))\",\"()((()))()(()())\",\"()((()))()(())()\",\"()((()))()()(())\",\"()((()))()()()()\",\"()(()((((())))))\",\"()(()(((()()))))\",\"()(()(((())())))\",\"()(()(((()))()))\",\"()(()(((())))())\",\"()(()(((()))))()\",\"()(()((()(()))))\",\"()(()((()()())))\",\"()(()((()())()))\",\"()(()((()()))())\",\"()(()((()())))()\",\"()(()((())(())))\",\"()(()((())()()))\",\"()(()((())())())\",\"()(()((())()))()\",\"()(()((()))(()))\",\"()(()((()))()())\",\"()(()((()))())()\",\"()(()((())))(())\",\"()(()((())))()()\",\"()(()(()((()))))\",\"()(()(()(()())))\",\"()(()(()(())()))\",\"()(()(()(()))())\",\"()(()(()(())))()\",\"()(()(()()(())))\",\"()(()(()()()()))\",\"()(()(()()())())\",\"()(()(()()()))()\",\"()(()(()())(()))\",\"()(()(()())()())\",\"()(()(()())())()\",\"()(()(()()))(())\",\"()(()(()()))()()\",\"()(()(())((())))\",\"()(()(())(()()))\",\"()(()(())(())())\",\"()(()(())(()))()\",\"()(()(())()(()))\",\"()(()(())()()())\",\"()(()(())()())()\",\"()(()(())())(())\",\"()(()(())())()()\",\"()(()(()))((()))\",\"()(()(()))(()())\",\"()(()(()))(())()\",\"()(()(()))()(())\",\"()(()(()))()()()\",\"()(()()(((()))))\",\"()(()()((()())))\",\"()(()()((())()))\",\"()(()()((()))())\",\"()(()()((())))()\",\"()(()()(()(())))\",\"()(()()(()()()))\",\"()(()()(()())())\",\"()(()()(()()))()\",\"()(()()(())(()))\",\"()(()()(())()())\",\"()(()()(())())()\",\"()(()()(()))(())\",\"()(()()(()))()()\",\"()(()()()((())))\",\"()(()()()(()()))\",\"()(()()()(())())\",\"()(()()()(()))()\",\"()(()()()()(()))\",\"()(()()()()()())\",\"()(()()()()())()\",\"()(()()()())(())\",\"()(()()()())()()\",\"()(()()())((()))\",\"()(()()())(()())\",\"()(()()())(())()\",\"()(()()())()(())\",\"()(()()())()()()\",\"()(()())(((())))\",\"()(()())((()()))\",\"()(()())((())())\",\"()(()())((()))()\",\"()(()())(()(()))\",\"()(()())(()()())\",\"()(()())(()())()\",\"()(()())(())(())\",\"()(()())(())()()\",\"()(()())()((()))\",\"()(()())()(()())\",\"()(()())()(())()\",\"()(()())()()(())\",\"()(()())()()()()\",\"()(())((((()))))\",\"()(())(((()())))\",\"()(())(((())()))\",\"()(())(((()))())\",\"()(())(((())))()\",\"()(())((()(())))\",\"()(())((()()()))\",\"()(())((()())())\",\"()(())((()()))()\",\"()(())((())(()))\",\"()(())((())()())\",\"()(())((())())()\",\"()(())((()))(())\",\"()(())((()))()()\",\"()(())(()((())))\",\"()(())(()(()()))\",\"()(())(()(())())\",\"()(())(()(()))()\",\"()(())(()()(()))\",\"()(())(()()()())\",\"()(())(()()())()\",\"()(())(()())(())\",\"()(())(()())()()\",\"()(())(())((()))\",\"()(())(())(()())\",\"()(())(())(())()\",\"()(())(())()(())\",\"()(())(())()()()\",\"()(())()(((())))\",\"()(())()((()()))\",\"()(())()((())())\",\"()(())()((()))()\",\"()(())()(()(()))\",\"()(())()(()()())\",\"()(())()(()())()\",\"()(())()(())(())\",\"()(())()(())()()\",\"()(())()()((()))\",\"()(())()()(()())\",\"()(())()()(())()\",\"()(())()()()(())\",\"()(())()()()()()\",\"()()(((((())))))\",\"()()((((()()))))\",\"()()((((())())))\",\"()()((((()))()))\",\"()()((((())))())\",\"()()((((()))))()\",\"()()(((()(()))))\",\"()()(((()()())))\",\"()()(((()())()))\",\"()()(((()()))())\",\"()()(((()())))()\",\"()()(((())(())))\",\"()()(((())()()))\",\"()()(((())())())\",\"()()(((())()))()\",\"()()(((()))(()))\",\"()()(((()))()())\",\"()()(((()))())()\",\"()()(((())))(())\",\"()()(((())))()()\",\"()()((()((()))))\",\"()()((()(()())))\",\"()()((()(())()))\",\"()()((()(()))())\",\"()()((()(())))()\",\"()()((()()(())))\",\"()()((()()()()))\",\"()()((()()())())\",\"()()((()()()))()\",\"()()((()())(()))\",\"()()((()())()())\",\"()()((()())())()\",\"()()((()()))(())\",\"()()((()()))()()\",\"()()((())((())))\",\"()()((())(()()))\",\"()()((())(())())\",\"()()((())(()))()\",\"()()((())()(()))\",\"()()((())()()())\",\"()()((())()())()\",\"()()((())())(())\",\"()()((())())()()\",\"()()((()))((()))\",\"()()((()))(()())\",\"()()((()))(())()\",\"()()((()))()(())\",\"()()((()))()()()\",\"()()(()(((()))))\",\"()()(()((()())))\",\"()()(()((())()))\",\"()()(()((()))())\",\"()()(()((())))()\",\"()()(()(()(())))\",\"()()(()(()()()))\",\"()()(()(()())())\",\"()()(()(()()))()\",\"()()(()(())(()))\",\"()()(()(())()())\",\"()()(()(())())()\",\"()()(()(()))(())\",\"()()(()(()))()()\",\"()()(()()((())))\",\"()()(()()(()()))\",\"()()(()()(())())\",\"()()(()()(()))()\",\"()()(()()()(()))\",\"()()(()()()()())\",\"()()(()()()())()\",\"()()(()()())(())\",\"()()(()()())()()\",\"()()(()())((()))\",\"()()(()())(()())\",\"()()(()())(())()\",\"()()(()())()(())\",\"()()(()())()()()\",\"()()(())(((())))\",\"()()(())((()()))\",\"()()(())((())())\",\"()()(())((()))()\",\"()()(())(()(()))\",\"()()(())(()()())\",\"()()(())(()())()\",\"()()(())(())(())\",\"()()(())(())()()\",\"()()(())()((()))\",\"()()(())()(()())\",\"()()(())()(())()\",\"()()(())()()(())\",\"()()(())()()()()\",\"()()()((((()))))\",\"()()()(((()())))\",\"()()()(((())()))\",\"()()()(((()))())\",\"()()()(((())))()\",\"()()()((()(())))\",\"()()()((()()()))\",\"()()()((()())())\",\"()()()((()()))()\",\"()()()((())(()))\",\"()()()((())()())\",\"()()()((())())()\",\"()()()((()))(())\",\"()()()((()))()()\",\"()()()(()((())))\",\"()()()(()(()()))\",\"()()()(()(())())\",\"()()()(()(()))()\",\"()()()(()()(()))\",\"()()()(()()()())\",\"()()()(()()())()\",\"()()()(()())(())\",\"()()()(()())()()\",\"()()()(())((()))\",\"()()()(())(()())\",\"()()()(())(())()\",\"()()()(())()(())\",\"()()()(())()()()\",\"()()()()(((())))\",\"()()()()((()()))\",\"()()()()((())())\",\"()()()()((()))()\",\"()()()()(()(()))\",\"()()()()(()()())\",\"()()()()(()())()\",\"()()()()(())(())\",\"()()()()(())()()\",\"()()()()()((()))\",\"()()()()()(()())\",\"()()()()()(())()\",\"()()()()()()(())\",\"()()()()()()()()\"]"
  },
  {
    "input": "n = 2",
    "output": "[\"(())\",\"()()\"]"
  },
  {
    "input": "n = 3",
    "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
  }
]
$json$::jsonb WHERE title = 'Generate Parentheses';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"3[a]2[bc]\"",
    "output": "\"aaabcbc\""
  },
  {
    "input": "s = \"3[a2[c]]\"",
    "output": "\"accaccacc\""
  },
  {
    "input": "s = \"2[abc]3[cd]ef\"",
    "output": "\"abcabccdcdcdef\""
  },
  {
    "input": "s = \"abc3[cd]xyz\"",
    "output": "\"abccdcdcdxyz\""
  },
  {
    "input": "s = \"10[a]\"",
    "output": "\"aaaaaaaaaa\""
  },
  {
    "input": "s = \"100[leetcode]\"",
    "output": "\"leetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcodeleetcode\""
  },
  {
    "input": "s = \"3[z]2[2[y]pq4[2[jk]e1[f]]]ef\"",
    "output": "\"zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef\""
  },
  {
    "input": "s = \"2[2[a]]\"",
    "output": "\"aaaa\""
  },
  {
    "input": "s = \"1[a]\"",
    "output": "\"a\""
  },
  {
    "input": "s = \"2[a2[b2[c]]]\"",
    "output": "\"abccbccabccbcc\""
  }
]
$json$::jsonb WHERE title = 'Decode String';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"abc\"",
    "output": "3"
  },
  {
    "input": "s = \"aaa\"",
    "output": "6"
  },
  {
    "input": "s = \"a\"",
    "output": "1"
  },
  {
    "input": "s = \"aa\"",
    "output": "3"
  },
  {
    "input": "s = \"aba\"",
    "output": "4"
  },
  {
    "input": "s = \"abcba\"",
    "output": "7"
  },
  {
    "input": "s = \"fdsklf\"",
    "output": "6"
  },
  {
    "input": "s = \"aaaaa\"",
    "output": "15"
  },
  {
    "input": "s = \"abba\"",
    "output": "6"
  },
  {
    "input": "s = \"xxyyyxyxyxx\"",
    "output": "23"
  }
]
$json$::jsonb WHERE title = 'Palindromic Substrings';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
    "output": "\"BANC\""
  },
  {
    "input": "s = \"a\", t = \"a\"",
    "output": "\"a\""
  },
  {
    "input": "s = \"a\", t = \"aa\"",
    "output": "\"\""
  },
  {
    "input": "s = \"ab\", t = \"b\"",
    "output": "\"b\""
  },
  {
    "input": "s = \"bba\", t = \"ab\"",
    "output": "\"ba\""
  },
  {
    "input": "s = \"cabwefgewcwaefgcf\", t = \"cae\"",
    "output": "\"cwae\""
  },
  {
    "input": "s = \"abc\", t = \"ac\"",
    "output": "\"abc\""
  },
  {
    "input": "s = \"aaflslflsldkalskaaa\", t = \"aaa\"",
    "output": "\"aaa\""
  },
  {
    "input": "s = \"abcabdebac\", t = \"abcde\"",
    "output": "\"cabde\""
  },
  {
    "input": "s = \"aa\", t = \"aa\"",
    "output": "\"aa\""
  }
]
$json$::jsonb WHERE title = 'Minimum Window Substring';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"aa\", p = \"a\"",
    "output": "false"
  },
  {
    "input": "s = \"aa\", p = \"a*\"",
    "output": "true"
  },
  {
    "input": "s = \"ab\", p = \".*\"",
    "output": "true"
  },
  {
    "input": "s = \"aab\", p = \"c*a*b\"",
    "output": "true"
  },
  {
    "input": "s = \"mississippi\", p = \"mis*is*p*.\"",
    "output": "false"
  },
  {
    "input": "s = \"ab\", p = \".*c\"",
    "output": "false"
  },
  {
    "input": "s = \"aaa\", p = \"a*a\"",
    "output": "true"
  },
  {
    "input": "s = \"a\", p = \"ab*\"",
    "output": "true"
  },
  {
    "input": "s = \"bbbba\", p = \"aaaa*b*\"",
    "output": "false"
  },
  {
    "input": "s = \"abc\", p = \"abc*\"",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Regular Expression Matching';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "3"
  },
  {
    "input": "root = [1,null,2]",
    "output": "2"
  },
  {
    "input": "root = []",
    "output": "0"
  },
  {
    "input": "root = [0]",
    "output": "1"
  },
  {
    "input": "root = [1,2,3,4,5,6,7,8,9,10]",
    "output": "4"
  },
  {
    "input": "root = [1,2,3,4,5,null,null,6]",
    "output": "4"
  },
  {
    "input": "root = [1,2,3]",
    "output": "2"
  },
  {
    "input": "root = [1,null,2,null,3,null,4]",
    "output": "4"
  },
  {
    "input": "root = [5,4,3,null,null,2,null,1]",
    "output": "4"
  },
  {
    "input": "root = [1,2]",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Maximum Depth of Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [4,2,7,1,3,6,9]",
    "output": "[4,7,2,9,6,3,1]"
  },
  {
    "input": "root = [2,1,3]",
    "output": "[2,3,1]"
  },
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1]",
    "output": "[1]"
  },
  {
    "input": "root = [1,2,3,4,5]",
    "output": "[1,3,2,null,null,5,4]"
  },
  {
    "input": "root = [5,3,6,2,4,null,7,1]",
    "output": "[5,6,3,7,null,4,2,null,null,null,null,null,1]"
  },
  {
    "input": "root = [1,null,2]",
    "output": "[1,2]"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "[1,3,2,7,6,5,4]"
  },
  {
    "input": "root = [0]",
    "output": "[0]"
  },
  {
    "input": "root = [10,5,15,null,6,12]",
    "output": "[10,15,5,null,12,6]"
  }
]
$json$::jsonb WHERE title = 'Invert Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2,2,3,4,4,3]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,null,3,null,3]",
    "output": "false"
  },
  {
    "input": "root = [1]",
    "output": "true"
  },
  {
    "input": "root = [1,2,3]",
    "output": "false"
  },
  {
    "input": "root = [1,2,2,2,null,2]",
    "output": "false"
  },
  {
    "input": "root = [1,2,2,null,3,3,null,4]",
    "output": "false"
  },
  {
    "input": "root = []",
    "output": "true"
  },
  {
    "input": "root = [2,3,3,4,5,5,4]",
    "output": "true"
  },
  {
    "input": "root = [1,0,0]",
    "output": "true"
  },
  {
    "input": "root = [5,1,1,null,2,2,null,3,3,3,3]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Symmetric Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2,3,4,5]",
    "output": "3"
  },
  {
    "input": "root = [1,2]",
    "output": "1"
  },
  {
    "input": "root = [1]",
    "output": "0"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "4"
  },
  {
    "input": "root = [1,2,3,null,4]",
    "output": "3"
  },
  {
    "input": "root = [2,3,4,5]",
    "output": "3"
  },
  {
    "input": "root = [1,2,3,4,5,null,6,null,7]",
    "output": "5"
  },
  {
    "input": "root = [1,2,3,4,5,6,7,8,9,10]",
    "output": "5"
  },
  {
    "input": "root = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-4,null,5,null,null,null,6,-3]",
    "output": "7"
  },
  {
    "input": "root = [1,2,3,null,4,5]",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Diameter of Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,3,null,null,4,4]",
    "output": "false"
  },
  {
    "input": "root = [1]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,3,4,4]",
    "output": "true"
  },
  {
    "input": "root = []",
    "output": "true"
  },
  {
    "input": "root = [1,2,3,4,5,6,7,8,9]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,null,null,3,4]",
    "output": "false"
  },
  {
    "input": "root = [1,2,3,4]",
    "output": "true"
  },
  {
    "input": "root = [2,1,3,4,5,6,7]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,3,3,3,4,4,4,4,5,5]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Balanced Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22",
    "output": "true"
  },
  {
    "input": "root = [1,2,3], targetSum = 5",
    "output": "false"
  },
  {
    "input": "root = [1,2], targetSum = 1",
    "output": "false"
  },
  {
    "input": "root = [1], targetSum = 1",
    "output": "true"
  },
  {
    "input": "root = [], targetSum = 0",
    "output": "false"
  },
  {
    "input": "root = [1,2,null,3], targetSum = 3",
    "output": "false"
  },
  {
    "input": "root = [1,2,3,4,5], targetSum = 8",
    "output": "true"
  },
  {
    "input": "root = [1,2,3,4,5,6,7], targetSum = 10",
    "output": "true"
  },
  {
    "input": "root = [5,4,11,7,2,8,13,4,5,1,null,4,null,10,null,null,null,1], targetSum = 22",
    "output": "true"
  },
  {
    "input": "root = [1,2,null,3,null,4], targetSum = 6",
    "output": "false"
  }
]
$json$::jsonb WHERE title = 'Path Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "p = [1,2,3], q = [1,2,3]",
    "output": "true"
  },
  {
    "input": "p = [1,2], q = [1,null,2]",
    "output": "false"
  },
  {
    "input": "p = [1,2,1], q = [1,1,2]",
    "output": "false"
  },
  {
    "input": "p = [1], q = [1]",
    "output": "true"
  },
  {
    "input": "p = [1], q = [2]",
    "output": "false"
  },
  {
    "input": "p = [], q = []",
    "output": "true"
  },
  {
    "input": "p = [1,2], q = [1,2]",
    "output": "true"
  },
  {
    "input": "p = [1,2,3,4], q = [1,2,3,4]",
    "output": "true"
  },
  {
    "input": "p = [1,null,2,3], q = [1,null,2,3]",
    "output": "true"
  },
  {
    "input": "p = [1,2,null,3], q = [1,2,null,4]",
    "output": "false"
  }
]
$json$::jsonb WHERE title = 'Same Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
    "output": "6"
  },
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
    "output": "2"
  },
  {
    "input": "root = [2,1], p = 2, q = 1",
    "output": "2"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], p = 3, q = 4",
    "output": "3"
  },
  {
    "input": "root = [5,1,4,null,null,3,6], p = 5, q = 1",
    "output": "5"
  },
  {
    "input": "root = [3,1,4,null,2], p = 1, q = 4",
    "output": "3"
  },
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 3, q = 5",
    "output": "4"
  },
  {
    "input": "root = [2,1,3], p = 1, q = 3",
    "output": "2"
  },
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 0, q = 5",
    "output": "2"
  },
  {
    "input": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 7, q = 9",
    "output": "8"
  }
]
$json$::jsonb WHERE title = 'Lowest Common Ancestor of a Binary Search Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
    "output": "[3,9,20,null,null,15,7]"
  },
  {
    "input": "preorder = [-1], inorder = [-1]",
    "output": "[-1]"
  },
  {
    "input": "preorder = [1,2,3], inorder = [2,1,3]",
    "output": "[1,2,3]"
  },
  {
    "input": "preorder = [1,2], inorder = [2,1]",
    "output": "[1,2]"
  },
  {
    "input": "preorder = [1,2,4,5,3,6,7], inorder = [4,2,5,1,6,3,7]",
    "output": "[1,2,3,4,5,6,7]"
  },
  {
    "input": "preorder = [1], inorder = [1]",
    "output": "[1]"
  },
  {
    "input": "preorder = [1,2,3], inorder = [1,2,3]",
    "output": "[1,null,2,null,3]"
  },
  {
    "input": "preorder = [5,1,4,3], inorder = [4,3,1,5]",
    "output": "[5,1,null,4,null,null,3]"
  },
  {
    "input": "preorder = [1,2,3,4], inorder = [1,2,3,4]",
    "output": "[1,null,2,null,3,null,4]"
  },
  {
    "input": "preorder = [4,2,1,3,6,5,7], inorder = [1,2,3,4,5,6,7]",
    "output": "[4,2,6,1,3,5,7]"
  }
]
$json$::jsonb WHERE title = 'Construct Binary Tree from Preorder and Inorder Traversal';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2,3,null,5,null,4]",
    "output": "[1,3,4]"
  },
  {
    "input": "root = [1,null,3]",
    "output": "[1,3]"
  },
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1]",
    "output": "[1]"
  },
  {
    "input": "root = [1,2,3,4]",
    "output": "[1,3,4]"
  },
  {
    "input": "root = [1,2,3,4,5,null,6,null,7]",
    "output": "[1,3,6,7]"
  },
  {
    "input": "root = [1,2,3,null,5,6,7]",
    "output": "[1,3,7]"
  },
  {
    "input": "root = [1,2,null,3,null,4]",
    "output": "[1,2,3,4]"
  },
  {
    "input": "root = [5,4,3,null,null,2,null,1]",
    "output": "[5,3,2,1]"
  },
  {
    "input": "root = [1,2,3,4,null,null,null,5]",
    "output": "[1,3,4,5]"
  }
]
$json$::jsonb WHERE title = 'Binary Tree Right Side View';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [3,1,4,3,null,1,5]",
    "output": "4"
  },
  {
    "input": "root = [3,3,null,4,2]",
    "output": "3"
  },
  {
    "input": "root = [1]",
    "output": "1"
  },
  {
    "input": "root = [2,null,4,10,8,null,null,4]",
    "output": "4"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "7"
  },
  {
    "input": "root = [9,4,1,-1,null,5,2,null,3,null,6,null,7]",
    "output": "1"
  },
  {
    "input": "root = [2,2,2,2,2]",
    "output": "5"
  },
  {
    "input": "root = [1,2,null,3]",
    "output": "3"
  },
  {
    "input": "root = [5,4,3,2,1]",
    "output": "1"
  },
  {
    "input": "root = [10,5,15,null,6,12]",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Count Good Nodes in Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [3,1,4,null,2], k = 1",
    "output": "1"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 3",
    "output": "3"
  },
  {
    "input": "root = [1], k = 1",
    "output": "1"
  },
  {
    "input": "root = [2,1,3], k = 2",
    "output": "2"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 4",
    "output": "4"
  },
  {
    "input": "root = [3,1,4,null,2], k = 2",
    "output": "2"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 1",
    "output": "1"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 6",
    "output": "6"
  },
  {
    "input": "root = [4,2,6,1,3,5,7], k = 5",
    "output": "5"
  },
  {
    "input": "root = [3,1,4,null,2], k = 4",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Kth Smallest Element in a BST';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2,5,3,4,null,6]",
    "output": "[1,null,2,null,3,null,4,null,5,null,6]"
  },
  {
    "input": "root = []",
    "output": "[]"
  },
  {
    "input": "root = [1]",
    "output": "[1]"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "[1,null,2,null,4,null,5,null,3,null,6,null,7]"
  },
  {
    "input": "root = [1,2,3,4,5,6]",
    "output": "[1,null,2,null,4,null,5,null,3,null,6]"
  },
  {
    "input": "root = [1,null,2]",
    "output": "[1,null,2]"
  },
  {
    "input": "root = [1,2,3]",
    "output": "[1,null,2,null,3]"
  },
  {
    "input": "root = [1,2,5,3,4,null,6,7]",
    "output": "[1,null,2,null,3,null,7,null,4,null,5,null,6]"
  },
  {
    "input": "root = [5,3,6,2,4,null,7,1]",
    "output": "[5,null,3,null,2,null,1,null,4,null,6,null,7]"
  },
  {
    "input": "root = [1,2,3,4]",
    "output": "[1,null,2,null,4,null,3]"
  }
]
$json$::jsonb WHERE title = 'Flatten Binary Tree to Linked List';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [1,2,3]",
    "output": "6"
  },
  {
    "input": "root = [-10,9,20,null,null,15,7]",
    "output": "42"
  },
  {
    "input": "root = [1]",
    "output": "1"
  },
  {
    "input": "root = [-3]",
    "output": "-3"
  },
  {
    "input": "root = [5,4,8,11,null,13,4,7,2,null,null,null,1]",
    "output": "48"
  },
  {
    "input": "root = [1,2,3,4,5,6,7]",
    "output": "18"
  },
  {
    "input": "root = [-2,1]",
    "output": "1"
  },
  {
    "input": "root = [9,6,-3,null,null,-1,2,-2,2]",
    "output": "15"
  },
  {
    "input": "root = [2,-1]",
    "output": "2"
  },
  {
    "input": "root = [1,-2,3]",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Binary Tree Maximum Path Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
    "output": "3"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
    "output": "5"
  },
  {
    "input": "root = [1,2], p = 1, q = 2",
    "output": "1"
  },
  {
    "input": "root = [1,2,3], p = 2, q = 3",
    "output": "1"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 6, q = 4",
    "output": "5"
  },
  {
    "input": "root = [1], p = 1, q = 1",
    "output": "1"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 7, q = 4",
    "output": "2"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 0, q = 8",
    "output": "1"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 2, q = 7",
    "output": "2"
  },
  {
    "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 3, q = 5",
    "output": "3"
  }
]
$json$::jsonb WHERE title = 'Lowest Common Ancestor of a Binary Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
    "output": "[[2,4],[1,3],[2,4],[1,3]]"
  },
  {
    "input": "adjList = [[]]",
    "output": "[[]]"
  },
  {
    "input": "adjList = [[2],[1]]",
    "output": "[[2],[1]]"
  },
  {
    "input": "adjList = [[2,3],[1,3],[1,2]]",
    "output": "[[2,3],[1,3],[1,2]]"
  },
  {
    "input": "adjList = [[2],[1,3],[2]]",
    "output": "[[2],[1,3],[2]]"
  },
  {
    "input": "adjList = [[2,3,4],[1,3,4],[1,2,4],[1,2,3]]",
    "output": "[[2,3,4],[1,3,4],[1,2,4],[1,2,3]]"
  },
  {
    "input": "adjList = [[2,3],[1,3],[1,2,4],[3]]",
    "output": "[[2,3],[1,3],[1,2,4],[3]]"
  },
  {
    "input": "adjList = [[2],[3],[1]]",
    "output": "[[2],[3],[1]]"
  },
  {
    "input": "adjList = [[2,3,4,5],[1,3,4,5],[1,2,4,5],[1,2,3,5],[1,2,3,4]]",
    "output": "[[2,3,4,5],[1,3,4,5],[1,2,4,5],[1,2,3,5],[1,2,3,4]]"
  },
  {
    "input": "adjList = [[2],[1,3],[2]]",
    "output": "[[2],[1,3],[2]]"
  }
]
$json$::jsonb WHERE title = 'Clone Graph';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
    "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
  },
  {
    "input": "heights = [[2,1],[1,2]]",
    "output": "[[0,0],[0,1],[1,0],[1,1]]"
  },
  {
    "input": "heights = [[1]]",
    "output": "[[0,0]]"
  },
  {
    "input": "heights = [[1,2,3],[3,2,1],[1,1,1]]",
    "output": "[[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]"
  },
  {
    "input": "heights = [[5,5,5],[5,1,5],[5,5,5]]",
    "output": "[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]"
  },
  {
    "input": "heights = [[1,2],[2,1]]",
    "output": "[[0,1],[1,0]]"
  },
  {
    "input": "heights = [[10,10,10],[10,1,10],[10,10,10]]",
    "output": "[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]"
  },
  {
    "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
    "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]"
  },
  {
    "input": "heights = [[3,3,3],[3,1,3],[3,3,3]]",
    "output": "[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]"
  },
  {
    "input": "heights = [[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7],[4,5,6,7,8],[5,6,7,8,9]]",
    "output": "[[0,4],[1,4],[2,4],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4]]"
  }
]
$json$::jsonb WHERE title = 'Pacific Atlantic Water Flow';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "edges = [[1,2],[1,3],[2,3]]",
    "output": "[2,3]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
    "output": "[1,4]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]",
    "output": "[4,1]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,2],[1,5]]",
    "output": "[4,2]"
  },
  {
    "input": "edges = [[1,2],[3,4],[1,4]]",
    "output": "[]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,5],[5,2]]",
    "output": "[5,2]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]",
    "output": "[6,3]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,5],[5,1]]",
    "output": "[5,1]"
  },
  {
    "input": "edges = [[1,2],[2,3],[4,5],[5,6],[3,4]]",
    "output": "[]"
  },
  {
    "input": "edges = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29],[29,30],[30,31],[31,32],[32,33],[33,34],[34,35],[35,36],[36,37],[37,38],[38,39],[39,40],[40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,47],[47,48],[48,49],[49,50],[50,1]]",
    "output": "[50,1]"
  }
]
$json$::jsonb WHERE title = 'Redundant Connection';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
    "output": "true"
  },
  {
    "input": "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
    "output": "false"
  },
  {
    "input": "n = 1, edges = []",
    "output": "true"
  },
  {
    "input": "n = 2, edges = [[0,1]]",
    "output": "true"
  },
  {
    "input": "n = 4, edges = [[0,1],[2,3]]",
    "output": "false"
  },
  {
    "input": "n = 4, edges = [[0,1],[1,2],[2,3]]",
    "output": "true"
  },
  {
    "input": "n = 3, edges = [[0,1],[1,2],[2,0]]",
    "output": "false"
  },
  {
    "input": "n = 6, edges = [[0,1],[0,2],[0,3],[3,4],[3,5]]",
    "output": "true"
  },
  {
    "input": "n = 3, edges = [[0,1],[0,2]]",
    "output": "true"
  },
  {
    "input": "n = 4, edges = [[0,1],[2,3],[1,2]]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Graph Valid Tree';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "n = 5, edges = [[0,1],[1,2],[3,4]]",
    "output": "2"
  },
  {
    "input": "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
    "output": "1"
  },
  {
    "input": "n = 1, edges = []",
    "output": "1"
  },
  {
    "input": "n = 4, edges = [[0,1],[2,3]]",
    "output": "2"
  },
  {
    "input": "n = 6, edges = [[0,1],[1,2],[3,4],[5,0]]",
    "output": "2"
  },
  {
    "input": "n = 3, edges = [[0,1],[1,2]]",
    "output": "1"
  },
  {
    "input": "n = 8, edges = [[0,1],[1,2],[3,4],[5,6],[7,5]]",
    "output": "3"
  },
  {
    "input": "n = 10, edges = [[0,1],[2,3],[4,5],[6,7],[8,9]]",
    "output": "5"
  },
  {
    "input": "n = 7, edges = [[0,1],[1,2],[3,4],[5,6],[2,3]]",
    "output": "2"
  },
  {
    "input": "n = 5, edges = [[0,1],[0,2],[0,3],[0,4]]",
    "output": "1"
  }
]
$json$::jsonb WHERE title = 'Number of Connected Components in an Undirected Graph';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
    "output": "4"
  },
  {
    "input": "grid = [[2,1,1],[0,1,1],[1,0,1]]",
    "output": "-1"
  },
  {
    "input": "grid = [[0,2]]",
    "output": "0"
  },
  {
    "input": "grid = [[1]]",
    "output": "-1"
  },
  {
    "input": "grid = [[2,1,1],[1,0,1],[0,1,1]]",
    "output": "5"
  },
  {
    "input": "grid = [[2,2],[1,1],[0,0],[2,0]]",
    "output": "1"
  },
  {
    "input": "grid = [[2,1,1],[0,0,1],[1,1,0]]",
    "output": "-1"
  },
  {
    "input": "grid = [[0]]",
    "output": "0"
  },
  {
    "input": "grid = [[2,1,1],[1,1,1],[0,1,2]]",
    "output": "2"
  },
  {
    "input": "grid = [[2,1,1],[1,1,1],[1,1,1]]",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Rotting Oranges';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
    "output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]"
  },
  {
    "input": "rooms = [[-1]]",
    "output": "[[-1]]"
  },
  {
    "input": "rooms = [[0]]",
    "output": "[[0]]"
  },
  {
    "input": "rooms = [[2147483647,0],[0,2147483647]]",
    "output": "[[1,0],[0,1]]"
  },
  {
    "input": "rooms = [[2147483647,2147483647,2147483647],[2147483647,-1,2147483647],[0,2147483647,2147483647]]",
    "output": "[[2,3,4],[1,-1,3],[0,1,2]]"
  },
  {
    "input": "rooms = [[2147483647,-1],[0,2147483647]]",
    "output": "[[1,-1],[0,1]]"
  },
  {
    "input": "rooms = [[0,-1],[2147483647,2147483647]]",
    "output": "[[0,-1],[1,2]]"
  },
  {
    "input": "rooms = [[2147483647,2147483647,2147483647,2147483647],[2147483647,-1,2147483647,-1],[2147483647,2147483647,2147483647,-1],[0,-1,2147483647,2147483647]]",
    "output": "[[3,4,5,6],[2,-1,4,-1],[1,2,3,-1],[0,-1,4,5]]"
  },
  {
    "input": "rooms = [[2147483647,2147483647],[2147483647,0]]",
    "output": "[[2,1],[1,0]]"
  },
  {
    "input": "rooms = [[2147483647,2147483647,2147483647],[2147483647,2147483647,0],[2147483647,2147483647,2147483647]]",
    "output": "[[3,2,1],[2,1,0],[3,2,1]]"
  }
]
$json$::jsonb WHERE title = 'Walls and Gates';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
    "output": "700"
  },
  {
    "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
    "output": "200"
  },
  {
    "input": "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0",
    "output": "500"
  },
  {
    "input": "n = 4, flights = [[0,1,1],[1,2,1],[2,3,1],[0,3,100]], src = 0, dst = 3, k = 2",
    "output": "3"
  },
  {
    "input": "n = 5, flights = [[0,1,5],[1,2,5],[2,3,5],[3,4,5],[0,4,25]], src = 0, dst = 4, k = 2",
    "output": "25"
  },
  {
    "input": "n = 4, flights = [[0,1,1],[0,2,5],[1,2,1],[2,3,1]], src = 0, dst = 3, k = 1",
    "output": "6"
  },
  {
    "input": "n = 3, flights = [[0,1,2],[1,2,1]], src = 0, dst = 2, k = 1",
    "output": "3"
  },
  {
    "input": "n = 2, flights = [[0,1,1]], src = 0, dst = 1, k = 0",
    "output": "1"
  },
  {
    "input": "n = 4, flights = [[0,1,1],[1,2,1],[2,3,1]], src = 0, dst = 3, k = 3",
    "output": "3"
  },
  {
    "input": "n = 3, flights = [[0,1,100],[0,2,100]], src = 0, dst = 2, k = 0",
    "output": "100"
  }
]
$json$::jsonb WHERE title = 'Cheapest Flights Within K Stops';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
    "output": "2"
  },
  {
    "input": "times = [[1,2,1]], n = 2, k = 1",
    "output": "1"
  },
  {
    "input": "times = [[1,2,1],[2,3,2],[3,4,1]], n = 4, k = 1",
    "output": "4"
  },
  {
    "input": "times = [[1,2,1],[2,3,1],[3,4,1],[1,4,3]], n = 4, k = 1",
    "output": "3"
  },
  {
    "input": "times = [[1,2,1],[2,3,7],[3,4,3],[2,4,1]], n = 4, k = 1",
    "output": "8"
  },
  {
    "input": "times = [[1,2,1],[2,3,2],[3,1,1]], n = 3, k = 1",
    "output": "3"
  },
  {
    "input": "times = [[1,2,1],[2,3,1],[3,1,1],[2,4,1]], n = 4, k = 2",
    "output": "2"
  },
  {
    "input": "times = [[1,2,1]], n = 2, k = 2",
    "output": "-1"
  },
  {
    "input": "times = [[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1]], n = 6, k = 1",
    "output": "5"
  },
  {
    "input": "times = [[1,2,1],[2,3,1],[3,4,1],[4,1,1]], n = 4, k = 1",
    "output": "3"
  }
]
$json$::jsonb WHERE title = 'Network Delay Time';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
    "output": "\"wertf\""
  },
  {
    "input": "words = [\"z\",\"x\"]",
    "output": "\"zx\""
  },
  {
    "input": "words = [\"z\",\"x\",\"z\"]",
    "output": "\"\""
  },
  {
    "input": "words = [\"abc\",\"ab\"]",
    "output": "\"\""
  },
  {
    "input": "words = [\"ac\",\"ab\",\"zc\",\"zb\"]",
    "output": "\"aczb\""
  },
  {
    "input": "words = [\"a\",\"b\",\"ca\",\"cc\",\"cb\"]",
    "output": "\"\""
  },
  {
    "input": "words = [\"a\",\"b\",\"c\"]",
    "output": "\"abc\""
  },
  {
    "input": "words = [\"baa\",\"ba\",\"bc\",\"b\"]",
    "output": "\"\""
  },
  {
    "input": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\",\"te\"]",
    "output": "\"wertf\""
  },
  {
    "input": "words = [\"z\",\"z\"]",
    "output": "\"z\""
  }
]
$json$::jsonb WHERE title = 'Alien Dictionary';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "n = 1",
    "output": "1"
  },
  {
    "input": "n = 5",
    "output": "8"
  },
  {
    "input": "n = 4",
    "output": "5"
  },
  {
    "input": "n = 10",
    "output": "89"
  },
  {
    "input": "n = 6",
    "output": "13"
  },
  {
    "input": "n = 2",
    "output": "2"
  },
  {
    "input": "n = 3",
    "output": "3"
  },
  {
    "input": "n = 8",
    "output": "34"
  },
  {
    "input": "n = 15",
    "output": "987"
  },
  {
    "input": "n = 20",
    "output": "10946"
  }
]
$json$::jsonb WHERE title = 'Climbing Stairs';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,2,3,1]",
    "output": "4"
  },
  {
    "input": "nums = [2,7,9,3,1]",
    "output": "12"
  },
  {
    "input": "nums = [2,1,1,2]",
    "output": "4"
  },
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [5,5,5,5]",
    "output": "10"
  },
  {
    "input": "nums = [2,1,1,2,1,1,2]",
    "output": "6"
  },
  {
    "input": "nums = [100,1,1,100]",
    "output": "200"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7,8,9,10]",
    "output": "30"
  },
  {
    "input": "nums = [0,0,0,0,0]",
    "output": "0"
  },
  {
    "input": "nums = [200,3,140,20,10]",
    "output": "350"
  }
]
$json$::jsonb WHERE title = 'House Robber';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [2,3,2]",
    "output": "3"
  },
  {
    "input": "nums = [1,2,3,1]",
    "output": "4"
  },
  {
    "input": "nums = [1,2,3]",
    "output": "3"
  },
  {
    "input": "nums = [1]",
    "output": "1"
  },
  {
    "input": "nums = [1,2]",
    "output": "2"
  },
  {
    "input": "nums = [5,1,1,5]",
    "output": "6"
  },
  {
    "input": "nums = [2,3,2,3,2,3]",
    "output": "9"
  },
  {
    "input": "nums = [1,2,3,4,5,6]",
    "output": "12"
  },
  {
    "input": "nums = [10,2,2,10]",
    "output": "12"
  },
  {
    "input": "nums = [0,0,0,0,0]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'House Robber II';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"12\"",
    "output": "2"
  },
  {
    "input": "s = \"226\"",
    "output": "3"
  },
  {
    "input": "s = \"06\"",
    "output": "0"
  },
  {
    "input": "s = \"11106\"",
    "output": "2"
  },
  {
    "input": "s = \"1\"",
    "output": "1"
  },
  {
    "input": "s = \"10\"",
    "output": "1"
  },
  {
    "input": "s = \"27\"",
    "output": "1"
  },
  {
    "input": "s = \"2101\"",
    "output": "1"
  },
  {
    "input": "s = \"011\"",
    "output": "0"
  },
  {
    "input": "s = \"100\"",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Decode Ways';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "m = 3, n = 7",
    "output": "28"
  },
  {
    "input": "m = 3, n = 2",
    "output": "3"
  },
  {
    "input": "m = 1, n = 1",
    "output": "1"
  },
  {
    "input": "m = 7, n = 3",
    "output": "28"
  },
  {
    "input": "m = 3, n = 3",
    "output": "6"
  },
  {
    "input": "m = 10, n = 10",
    "output": "48620"
  },
  {
    "input": "m = 1, n = 10",
    "output": "1"
  },
  {
    "input": "m = 10, n = 1",
    "output": "1"
  },
  {
    "input": "m = 5, n = 5",
    "output": "70"
  },
  {
    "input": "m = 4, n = 6",
    "output": "56"
  }
]
$json$::jsonb WHERE title = 'Unique Paths';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "grid = [[1,3,1],[1,5,1],[4,2,1]]",
    "output": "7"
  },
  {
    "input": "grid = [[1,2,3],[4,5,6]]",
    "output": "12"
  },
  {
    "input": "grid = [[1]]",
    "output": "1"
  },
  {
    "input": "grid = [[1,2],[1,1]]",
    "output": "3"
  },
  {
    "input": "grid = [[5,3,1],[2,1,3],[1,1,1]]",
    "output": "10"
  },
  {
    "input": "grid = [[1,2,3,4],[5,6,7,8]]",
    "output": "18"
  },
  {
    "input": "grid = [[9,1,1,1],[1,9,1,1],[1,1,9,1],[1,1,1,9]]",
    "output": "23"
  },
  {
    "input": "grid = [[1,3,1,2],[2,1,2,1],[1,2,1,2]]",
    "output": "9"
  },
  {
    "input": "grid = [[1,2],[3,4]]",
    "output": "7"
  },
  {
    "input": "grid = [[1,1,1],[1,1,1],[1,1,1]]",
    "output": "5"
  }
]
$json$::jsonb WHERE title = 'Minimum Path Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]",
    "output": "11"
  },
  {
    "input": "triangle = [[-10]]",
    "output": "-10"
  },
  {
    "input": "triangle = [[1],[2,3],[4,5,6]]",
    "output": "7"
  },
  {
    "input": "triangle = [[-1],[2,3],[1,-1,-3]]",
    "output": "-1"
  },
  {
    "input": "triangle = [[0],[1,1],[1,1,1]]",
    "output": "2"
  },
  {
    "input": "triangle = [[1],[1,1],[1,1,1]]",
    "output": "3"
  },
  {
    "input": "triangle = [[7],[1,2],[3,4,5]]",
    "output": "11"
  },
  {
    "input": "triangle = [[1],[2,1],[3,2,1]]",
    "output": "3"
  },
  {
    "input": "triangle = [[-1],[2,3],[1,-1,-3]]",
    "output": "-1"
  },
  {
    "input": "triangle = [[2],[3,4],[6,5,7],[4,1,8,3],[1,2,3,4,5]]",
    "output": "13"
  }
]
$json$::jsonb WHERE title = 'Triangle';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
    "output": "true"
  },
  {
    "input": "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]",
    "output": "true"
  },
  {
    "input": "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
    "output": "false"
  },
  {
    "input": "s = \"a\", wordDict = [\"a\"]",
    "output": "true"
  },
  {
    "input": "s = \"abcd\", wordDict = [\"a\",\"abc\",\"b\",\"cd\"]",
    "output": "true"
  },
  {
    "input": "s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"]",
    "output": "true"
  },
  {
    "input": "s = \"aaaaaaa\", wordDict = [\"aaaa\",\"aaa\"]",
    "output": "true"
  },
  {
    "input": "s = \"goals\", wordDict = [\"go\",\"goal\",\"goals\"]",
    "output": "true"
  },
  {
    "input": "s = \"bb\", wordDict = [\"a\",\"b\",\"bbb\",\"bbbb\"]",
    "output": "true"
  },
  {
    "input": "s = \"abcd\", wordDict = [\"a\",\"abc\",\"ab\",\"cd\"]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Word Break';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,5,11,5]",
    "output": "true"
  },
  {
    "input": "nums = [1,2,3,5]",
    "output": "false"
  },
  {
    "input": "nums = [1,1,1,1]",
    "output": "true"
  },
  {
    "input": "nums = [2,2,3,5]",
    "output": "false"
  },
  {
    "input": "nums = [1,2,5]",
    "output": "false"
  },
  {
    "input": "nums = [14,9,8,4,3,2]",
    "output": "true"
  },
  {
    "input": "nums = [100,100,100,200]",
    "output": "false"
  },
  {
    "input": "nums = [3,3,3,4,5]",
    "output": "true"
  },
  {
    "input": "nums = [2,2,1,1]",
    "output": "true"
  },
  {
    "input": "nums = [1,2,3,4,5,6,7]",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Partition Equal Subset Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "text1 = \"abcde\", text2 = \"ace\"",
    "output": "3"
  },
  {
    "input": "text1 = \"abc\", text2 = \"abc\"",
    "output": "3"
  },
  {
    "input": "text1 = \"abc\", text2 = \"def\"",
    "output": "0"
  },
  {
    "input": "text1 = \"bl\", text2 = \"yby\"",
    "output": "1"
  },
  {
    "input": "text1 = \"a\", text2 = \"a\"",
    "output": "1"
  },
  {
    "input": "text1 = \"a\", text2 = \"b\"",
    "output": "0"
  },
  {
    "input": "text1 = \"abcba\", text2 = \"abcbcba\"",
    "output": "5"
  },
  {
    "input": "text1 = \"oxcpqrsvwf\", text2 = \"shmtulqrypy\"",
    "output": "2"
  },
  {
    "input": "text1 = \"abc\", text2 = \"acb\"",
    "output": "2"
  },
  {
    "input": "text1 = \"ezupkr\", text2 = \"ubmrapg\"",
    "output": "2"
  }
]
$json$::jsonb WHERE title = 'Longest Common Subsequence';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [1,1,1,1,1], target = 3",
    "output": "5"
  },
  {
    "input": "nums = [1], target = 1",
    "output": "1"
  },
  {
    "input": "nums = [1,0], target = 1",
    "output": "2"
  },
  {
    "input": "nums = [1,1,1,1,1], target = 0",
    "output": "0"
  },
  {
    "input": "nums = [2,1,0,1,2], target = 3",
    "output": "0"
  },
  {
    "input": "nums = [0,0,0,0,1], target = 1",
    "output": "16"
  },
  {
    "input": "nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], target = 0",
    "output": "184756"
  },
  {
    "input": "nums = [100], target = -100",
    "output": "1"
  },
  {
    "input": "nums = [1,2,3,4,5], target = 3",
    "output": "3"
  },
  {
    "input": "nums = [0,0,0,0,0,0,0,0,1], target = 1",
    "output": "256"
  }
]
$json$::jsonb WHERE title = 'Target Sum';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [2,3,-2,4]",
    "output": "6"
  },
  {
    "input": "nums = [-2,0,-1]",
    "output": "0"
  },
  {
    "input": "nums = [-2]",
    "output": "-2"
  },
  {
    "input": "nums = [0,2]",
    "output": "2"
  },
  {
    "input": "nums = [2,3,-2,4,-1]",
    "output": "48"
  },
  {
    "input": "nums = [-1,-2,-3,-4]",
    "output": "24"
  },
  {
    "input": "nums = [2,-5,-2,-4,3]",
    "output": "24"
  },
  {
    "input": "nums = [-1,0,-2,0,-3]",
    "output": "0"
  },
  {
    "input": "nums = [3,-1,4]",
    "output": "4"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "120"
  }
]
$json$::jsonb WHERE title = 'Maximum Product Subarray';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
    "output": "true"
  },
  {
    "input": "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"",
    "output": "false"
  },
  {
    "input": "s1 = \"\", s2 = \"\", s3 = \"\"",
    "output": "true"
  },
  {
    "input": "s1 = \"a\", s2 = \"b\", s3 = \"ab\"",
    "output": "true"
  },
  {
    "input": "s1 = \"a\", s2 = \"b\", s3 = \"ba\"",
    "output": "true"
  },
  {
    "input": "s1 = \"abc\", s2 = \"def\", s3 = \"abcdef\"",
    "output": "true"
  },
  {
    "input": "s1 = \"abc\", s2 = \"def\", s3 = \"abdcfe\"",
    "output": "false"
  },
  {
    "input": "s1 = \"a\", s2 = \"\", s3 = \"a\"",
    "output": "true"
  },
  {
    "input": "s1 = \"a\", s2 = \"b\", s3 = \"aabb\"",
    "output": "false"
  },
  {
    "input": "s1 = \"abc\", s2 = \"def\", s3 = \"adbecf\"",
    "output": "true"
  }
]
$json$::jsonb WHERE title = 'Interleaving String';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "prices = [3,3,5,0,0,3,1,4]",
    "output": "6"
  },
  {
    "input": "prices = [1,2,3,4,5]",
    "output": "4"
  },
  {
    "input": "prices = [7,6,4,3,1]",
    "output": "0"
  },
  {
    "input": "prices = [1,2,3,2,1,0,1,2,3,4,5]",
    "output": "7"
  },
  {
    "input": "prices = [1]",
    "output": "0"
  },
  {
    "input": "prices = [2,4,1]",
    "output": "2"
  },
  {
    "input": "prices = [1,2,4,2,5,7,5,5,7,9,9,10,11,12,13,14,15,16,17,18,19,20]",
    "output": "21"
  },
  {
    "input": "prices = [6,1,3,2,4,7]",
    "output": "7"
  },
  {
    "input": "prices = [1,2,3,4,5,6,7,8,9,10]",
    "output": "9"
  },
  {
    "input": "prices = [5,5,5,5,5,5,5,5,5,5]",
    "output": "0"
  }
]
$json$::jsonb WHERE title = 'Best Time to Buy and Sell Stock III';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "nums = [3,1,5,8]",
    "output": "167"
  },
  {
    "input": "nums = [1,5]",
    "output": "10"
  },
  {
    "input": "nums = [3,1,5]",
    "output": "35"
  },
  {
    "input": "nums = [1,3,5,8,3,1]",
    "output": "210"
  },
  {
    "input": "nums = [9,76,64,21]",
    "output": "116718"
  },
  {
    "input": "nums = [8,3]",
    "output": "32"
  },
  {
    "input": "nums = [1,2,3,4,5]",
    "output": "110"
  },
  {
    "input": "nums = [5,1,8,6,3,4,2,7]",
    "output": "994"
  },
  {
    "input": "nums = [2,3,4,5,6]",
    "output": "246"
  },
  {
    "input": "nums = [1,1,1,1]",
    "output": "4"
  }
]
$json$::jsonb WHERE title = 'Burst Balloons';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "head = [1]",
    "output": "[1]"
  },
  {
    "input": "head = [2,1]",
    "output": "[1,2]"
  },
  {
    "input": "head = [3,2,1]",
    "output": "[1,2,3]"
  },
  {
    "input": "head = []",
    "output": "[]"
  },
  {
    "input": "head = [1,2,3,4,5,6,7,8,9,10]",
    "output": "[10,9,8,7,6,5,4,3,2,1]"
  },
  {
    "input": "head = [1,2,3,4,5]",
    "output": "[5,4,3,2,1]"
  },
  {
    "input": "head = [5,4,3,2,1]",
    "output": "[1,2,3,4,5]"
  },
  {
    "input": "head = [1,2]",
    "output": "[2,1]"
  },
  {
    "input": "head = [10,20,30]",
    "output": "[30,20,10]"
  },
  {
    "input": "head = [1,1,1,1]",
    "output": "[1,1,1,1]"
  }
]
$json$::jsonb WHERE title = 'Reverse Linked List';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "list1 = [1], list2 = [2]",
    "output": "[1,2]"
  },
  {
    "input": "list1 = [1,2,3], list2 = []",
    "output": "[1,2,3]"
  },
  {
    "input": "list1 = [], list2 = [1,2,3]",
    "output": "[1,2,3]"
  },
  {
    "input": "list1 = [2], list2 = [1]",
    "output": "[1,2]"
  },
  {
    "input": "list1 = [1,3,5], list2 = [2,4,6]",
    "output": "[1,2,3,4,5,6]"
  },
  {
    "input": "list1 = [1,2,4], list2 = [1,3,4]",
    "output": "[1,1,2,3,4,4]"
  },
  {
    "input": "list1 = [], list2 = []",
    "output": "[]"
  },
  {
    "input": "list1 = [1,1,1], list2 = [2,2,2]",
    "output": "[1,1,1,2,2,2]"
  },
  {
    "input": "list1 = [5], list2 = [1,2,3,4,6]",
    "output": "[1,2,3,4,5,6]"
  },
  {
    "input": "list1 = [1,2,3,4,5], list2 = [6,7,8,9,10]",
    "output": "[1,2,3,4,5,6,7,8,9,10]"
  }
]
$json$::jsonb WHERE title = 'Merge Two Sorted Lists';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "head = [3,2,0,-4], pos = 1",
    "output": "true"
  },
  {
    "input": "head = [1,2], pos = 0",
    "output": "true"
  },
  {
    "input": "head = [1], pos = -1",
    "output": "false"
  },
  {
    "input": "head = [1,2,3,4,5], pos = -1",
    "output": "false"
  },
  {
    "input": "head = [1,2,3,4], pos = 2",
    "output": "true"
  },
  {
    "input": "head = [1], pos = 0",
    "output": "true"
  },
  {
    "input": "head = [1,2,3], pos = -1",
    "output": "false"
  },
  {
    "input": "head = [1,2,3,4,5,6,7,8,9,10], pos = 5",
    "output": "true"
  },
  {
    "input": "head = [], pos = -1",
    "output": "false"
  },
  {
    "input": "head = [1,2], pos = -1",
    "output": "false"
  }
]
$json$::jsonb WHERE title = 'Linked List Cycle';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "head = [1,2,3,4,5], n = 2",
    "output": "[1,2,5]"
  },
  {
    "input": "head = [1], n = 1",
    "output": "[]"
  },
  {
    "input": "head = [1,2], n = 1",
    "output": "[]"
  },
  {
    "input": "head = [1,2,3], n = 3",
    "output": "[2,3]"
  },
  {
    "input": "head = [1,2,3,4,5], n = 5",
    "output": "[2,3,4,5]"
  },
  {
    "input": "head = [1,2,3,4,5], n = 1",
    "output": "[1,2,3]"
  },
  {
    "input": "head = [1,2,3,4,5,6,7,8,9,10], n = 10",
    "output": "[2,3,4,5,6,7,8,9,10]"
  },
  {
    "input": "head = [1,2,3,4,5,6], n = 3",
    "output": "[1,2,5,6]"
  },
  {
    "input": "head = [1,2], n = 2",
    "output": "[2]"
  },
  {
    "input": "head = [1,2,3,4], n = 4",
    "output": "[2,3,4]"
  }
]
$json$::jsonb WHERE title = 'Remove Nth Node From End of List';

UPDATE questions SET hidden_tests = $json$
[
  {
    "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
    "output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]"
  },
  {
    "input": "head = [[1,1],[2,1]]",
    "output": "[[1,1],[2,1]]"
  },
  {
    "input": "head = [[3,null],[3,0],[3,null]]",
    "output": "[[3,null],[3,0],[3,null]]"
  },
  {
    "input": "head = []",
    "output": "[]"
  },
  {
    "input": "head = [[1,null]]",
    "output": "[[1,null]]"
  },
  {
    "input": "head = [[1,0],[2,1],[3,2]]",
    "output": "[[1,0],[2,1],[3,2]]"
  },
  {
    "input": "head = [[1,null],[2,null],[3,null]]",
    "output": "[[1,null],[2,null],[3,null]]"
  },
  {
    "input": "head = [[1,1],[2,0]]",
    "output": "[[1,1],[2,0]]"
  },
  {
    "input": "head = [[7,null],[13,0],[11,4],[10,2],[1,0],[8,5]]",
    "output": "[[7,null],[13,0],[11,4],[10,2],[1,0],[8,5]]"
  },
  {
    "input": "head = [[1,0],[1,0],[1,0]]",
    "output": "[[1,0],[1,0],[1,0]]"
  }
]
$json$::jsonb WHERE title = 'Copy List with Random Pointer';
