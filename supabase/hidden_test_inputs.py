"""Test input strings for all 100 PeerCode questions (10 each)."""

from generate_hidden_tests import add

add("Longest Substring Without Repeating Characters",
    's = "abcabcbb"', 's = "bbbbb"', 's = "pwwkew"', 's = ""', 's = " "',
    's = "dvdf"', 's = "anviaj"', 's = "tmmzuxt"', 's = "aab"', 's = "ohvhjdq"')
add("3Sum",
    'nums = [-1,0,1,2,-1,-4]', 'nums = [0,1,1]', 'nums = [0,0,0]', 'nums = [-2,0,1,1,2]',
    'nums = [1,2,-2,-1]', 'nums = [3,0,-2,-1,1,2]', 'nums = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]',
    'nums = [0,0,0,0]', 'nums = [-1,-1,-1,0,1,1,1]', 'nums = [1,-1,-1,0]')
add("Binary Tree Level Order Traversal",
    'root = []', 'root = [1,2,3]', 'root = [1,2,3,4,5,6,7]', 'root = [1,null,2,null,3]',
    'root = [5,4,3]', 'root = [3,9,20,null,null,15,7]', 'root = [1]', 'root = [1,2,null,3,4]',
    'root = [0,2,5,null,null,1,3,null,null,null,4]', 'root = [1,2,3,4,null,null,5]')
add("Validate Binary Search Tree",
    'root = [2,1,3]', 'root = [5,1,4,null,null,3,6]', 'root = [2,2,2]', 'root = [5,4,6,null,null,3,7]',
    'root = [1]', 'root = [2147483647]', 'root = [10,5,15,null,null,6,20]', 'root = [3,1,5,null,2,null,4]',
    'root = [1,null,1]', 'root = [5,1,4,null,null,null,6]')
add("Number of Islands",
    'grid = [["1","1"],["0","1"]]', 'grid = [["0","0"],["0","0"]]', 'grid = [["1","0","1"],["0","1","0"],["1","0","1"]]',
    'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]', 'grid = [["1"]]', 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
    'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
    'grid = [["0","1","0"],["1","0","1"],["0","1","0"]]', 'grid = [["1","0","0","1"],["0","1","0","0"],["0","0","1","0"],["1","0","0","1"]]',
    'grid = [["1","1","1"],["1","0","1"],["1","1","1"]]')
add("Course Schedule",
    'numCourses = 2, prerequisites = [[1,0]]', 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
    'numCourses = 1, prerequisites = []', 'numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]',
    'numCourses = 3, prerequisites = [[0,1],[0,2],[1,2]]', 'numCourses = 5, prerequisites = [[1,0],[2,1],[3,4],[4,3]]',
    'numCourses = 3, prerequisites = [[1,0],[2,0]]', 'numCourses = 6, prerequisites = [[1,0],[2,1],[3,2],[4,3],[5,4]]',
    'numCourses = 2, prerequisites = [[0,1]]', 'numCourses = 3, prerequisites = [[1,0],[2,1],[0,2]]')
add("Coin Change",
    'coins = [1], amount = 0', 'coins = [1,5,10], amount = 25', 'coins = [2], amount = 1',
    'coins = [1,2,5], amount = 3', 'coins = [186,419,83,408], amount = 6249', 'coins = [1,2,5], amount = 11',
    'coins = [1], amount = 1', 'coins = [1,2,5], amount = 100', 'coins = [2,5,10,1], amount = 27',
    'coins = [411,412,413], amount = 9864')
add("Longest Increasing Subsequence",
    'nums = [10,9,2,5,3,7,101,18]', 'nums = [0,1,0,3,2,3]', 'nums = [7,7,7,7,7,7,7]',
    'nums = [1]', 'nums = [1,3,6,7,9,4,10,5,6]', 'nums = [4,10,4,3,8,9]',
    'nums = [3,5,6,2,5,4,19,5,6,7,12]', 'nums = [1,2,3,4,5]', 'nums = [5,4,3,2,1]',
    'nums = [0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15]')
add("Group Anagrams",
    'strs = ["eat","tea","tan","ate","nat","bat"]', 'strs = [""]', 'strs = ["a"]',
    'strs = ["",""]', 'strs = ["abc","bca","cab","xyz"]', 'strs = ["listen","silent","enlist"]',
    'strs = ["a","b","c"]', 'strs = ["bdddddddd","bbbbbbbbbbc"]', 'strs = ["cab","tin","pew","duh","may","ill","buy","bar","mae","doc"]',
    'strs = ["no","on","stop","pots","tops"]')
add("Trapping Rain Water",
    'height = [0,1,0,2,1,0,1,3,2,1,2,1]', 'height = [4,2,0,3,2,5]', 'height = [1,0,1]',
    'height = [3,0,2,0,4]', 'height = [5,4,1,2]', 'height = [0,2,0]', 'height = [1,2,3,4,5]',
    'height = [5,5,5,5]', 'height = [2,0,2]', 'height = [6,8,5,2,4,5,7,3,1,7,4,7]')
add("Serialize and Deserialize Binary Tree",
    'root = [1,2]', 'root = [5,2,3,null,null,null,4]', 'root = [1,2,3,4,5,6,7]', 'root = []',
    'root = [1,null,2,null,3]', 'root = [1,2,3,null,null,4,5]', 'root = [1]', 'root = [5,1,4,null,null,3,6]',
    'root = [10,5,15,null,6,12]', 'root = [0,-1,1]')
add("Word Ladder",
    'beginWord = "a", endWord = "c", wordList = ["a","b","c"]', 'beginWord = "hot", endWord = "dog", wordList = ["hot","dog"]',
    'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
    'beginWord = "a", endWord = "b", wordList = ["a","b","c"]',
    'beginWord = "red", endWord = "tax", wordList = ["ted","tex","red","tax","tad","den","rex","pee"]',
    'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
    'beginWord = "qa", endWord = "sq", wordList = ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","ul","ni","wa","ae","bf","qr","zr"]',
    'beginWord = "talk", endWord = "tell", wordList = ["talk","tons","fall","tail","gale","hall","negs"]',
    'beginWord = "leet", endWord = "code", wordList = ["lest","leet","lose","code","lode","robe","lost"]',
    'beginWord = "ymain", endWord = "oecij", wordList = ["ymain","ymain","ymain","ymain","ymain"]')
add("Edit Distance",
    'word1 = "", word2 = ""', 'word1 = "a", word2 = "b"', 'word1 = "abc", word2 = "abc"',
    'word1 = "park", word2 = "spoon"', 'word1 = "", word2 = "a"', 'word1 = "horse", word2 = "ros"',
    'word1 = "intention", word2 = "execution"', 'word1 = "abc", word2 = "yabd"', 'word1 = "z", word2 = "z"',
    'word1 = "algorithm", word2 = "altruistic"')
add("Median of Two Sorted Arrays",
    'nums1 = [1], nums2 = [2,3]', 'nums1 = [], nums2 = [1]', 'nums1 = [3,4], nums2 = [1,2]',
    'nums1 = [1,3], nums2 = [2]', 'nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10,11,12,13,14,15,16,17]',
    'nums1 = [1,3], nums2 = [2]', 'nums1 = [2], nums2 = []', 'nums1 = [1,2], nums2 = [3,4]',
    'nums1 = [1000], nums2 = [2000]', 'nums1 = [1,2,3], nums2 = [4,5,6,7,8]')
add("Remove Duplicates from Sorted Array",
    'nums = [1,2,2,3]', 'nums = [1,1,1]', 'nums = [1,2,3,4,5]', 'nums = [-1,-1,0,0,0,2,2]',
    'nums = [2,2,3,3,4,4,5]', 'nums = [0,0,1,1,2,2,3,3,4]', 'nums = [1]', 'nums = [1,1]',
    'nums = [0,1,2,2,3]', 'nums = [1,2,2,3,3,4,4,5]')
add("Plus One",
    'digits = [0]', 'digits = [1,9]', 'digits = [4,3,2,1]', 'digits = [9]', 'digits = [1,2,9]',
    'digits = [1,2,3]', 'digits = [9,9,9]', 'digits = [8,9,9]', 'digits = [1,0,0,0]', 'digits = [5,6,7,8]')
add("Move Zeroes",
    'nums = [0,1,0,3,12]', 'nums = [0]', 'nums = [1,0,1]', 'nums = [0,0,1]', 'nums = [1,2,3]',
    'nums = [0,0,0,1]', 'nums = [1,0,0,3,12,0]', 'nums = [4,2,4,0,0,3]', 'nums = [0,0]', 'nums = [2,0,0,0,1]')
add("Single Number",
    'nums = [1]', 'nums = [2,1,1]', 'nums = [4,1,2,1,2]', 'nums = [7,3,5,3,5]', 'nums = [0,1,0,1,99]',
    'nums = [2,2,1]', 'nums = [1,0,1]', 'nums = [5,7,5]', 'nums = [1000000000]', 'nums = [-1,0,-1]')
