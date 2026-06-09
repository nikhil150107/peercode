from generate_hidden_tests import add

add("Minimum Path Sum",
    "grid = [[1,3,1],[1,5,1],[4,2,1]]", "grid = [[1,2,3],[4,5,6]]", "grid = [[1]]",
    "grid = [[1,2],[1,1]]", "grid = [[5,3,1],[2,1,3],[1,1,1]]", "grid = [[1,2,3,4],[5,6,7,8]]",
    "grid = [[9,1,1,1],[1,9,1,1],[1,1,9,1],[1,1,1,9]]", "grid = [[1,3,1,2],[2,1,2,1],[1,2,1,2]]",
    "grid = [[1,2],[3,4]]", "grid = [[1,1,1],[1,1,1],[1,1,1]]")
add("Triangle",
    "triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]", "triangle = [[-10]]", "triangle = [[1],[2,3],[4,5,6]]",
    "triangle = [[-1],[2,3],[1,-1,-3]]", "triangle = [[0],[1,1],[1,1,1]]", "triangle = [[1],[1,1],[1,1,1]]",
    "triangle = [[7],[1,2],[3,4,5]]", "triangle = [[1],[2,1],[3,2,1]]", "triangle = [[-1],[2,3],[1,-1,-3]]",
    "triangle = [[2],[3,4],[6,5,7],[4,1,8,3],[1,2,3,4,5]]")
add("Word Break",
    's = "leetcode", wordDict = ["leet","code"]', 's = "applepenapple", wordDict = ["apple","pen"]',
    's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', 's = "a", wordDict = ["a"]',
    's = "abcd", wordDict = ["a","abc","b","cd"]', 's = "cars", wordDict = ["car","ca","rs"]',
    's = "aaaaaaa", wordDict = ["aaaa","aaa"]', 's = "goals", wordDict = ["go","goal","goals"]',
    's = "bb", wordDict = ["a","b","bbb","bbbb"]', 's = "abcd", wordDict = ["a","abc","ab","cd"]')
add("Partition Equal Subset Sum",
    "nums = [1,5,11,5]", "nums = [1,2,3,5]", "nums = [1,1,1,1]", "nums = [2,2,3,5]",
    "nums = [1,2,5]", "nums = [14,9,8,4,3,2]", "nums = [100,100,100,200]", "nums = [3,3,3,4,5]",
    "nums = [2,2,1,1]", "nums = [1,2,3,4,5,6,7]")
add("Longest Common Subsequence",
    'text1 = "abcde", text2 = "ace"', 'text1 = "abc", text2 = "abc"', 'text1 = "abc", text2 = "def"',
    'text1 = "bl", text2 = "yby"', 'text1 = "a", text2 = "a"', 'text1 = "a", text2 = "b"',
    'text1 = "abcba", text2 = "abcbcba"', 'text1 = "oxcpqrsvwf", text2 = "shmtulqrypy"',
    'text1 = "abc", text2 = "acb"', 'text1 = "ezupkr", text2 = "ubmrapg"')
