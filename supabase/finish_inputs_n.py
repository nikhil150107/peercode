from generate_hidden_tests import add

add("Target Sum",
    "nums = [1,1,1,1,1], target = 3", "nums = [1], target = 1", "nums = [1,0], target = 1",
    "nums = [1,1,1,1,1], target = 0", "nums = [2,1,0,1,2], target = 3", "nums = [0,0,0,0,1], target = 1",
    "nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], target = 0", "nums = [100], target = -100",
    "nums = [1,2,3,4,5], target = 3", "nums = [0,0,0,0,0,0,0,0,1], target = 1")
add("Maximum Product Subarray",
    "nums = [2,3,-2,4]", "nums = [-2,0,-1]", "nums = [-2]", "nums = [0,2]", "nums = [2,3,-2,4,-1]",
    "nums = [-1,-2,-3,-4]", "nums = [2,-5,-2,-4,3]", "nums = [-1,0,-2,0,-3]", "nums = [3,-1,4]",
    "nums = [1,2,3,4,5]")
add("Interleaving String",
    's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
    's1 = "", s2 = "", s3 = ""', 's1 = "a", s2 = "b", s3 = "ab"', 's1 = "a", s2 = "b", s3 = "ba"',
    's1 = "abc", s2 = "def", s3 = "abcdef"', 's1 = "abc", s2 = "def", s3 = "abdcfe"', 's1 = "a", s2 = "", s3 = "a"',
    's1 = "a", s2 = "b", s3 = "aabb"', 's1 = "abc", s2 = "def", s3 = "adbecf"')
add("Best Time to Buy and Sell Stock III",
    "prices = [3,3,5,0,0,3,1,4]", "prices = [1,2,3,4,5]", "prices = [7,6,4,3,1]",
    "prices = [1,2,3,2,1,0,1,2,3,4,5]", "prices = [1]", "prices = [2,4,1]",
    "prices = [1,2,4,2,5,7,5,5,7,9,9,10,11,12,13,14,15,16,17,18,19,20]", "prices = [6,1,3,2,4,7]",
    "prices = [1,2,3,4,5,6,7,8,9,10]", "prices = [5,5,5,5,5,5,5,5,5,5]")
add("Burst Balloons",
    "nums = [3,1,5,8]", "nums = [1,5]", "nums = [3,1,5]", "nums = [1,3,5,8,3,1]",
    "nums = [9,76,64,21]", "nums = [8,3]", "nums = [1,2,3,4,5]", "nums = [5,1,8,6,3,4,2,7]",
    "nums = [2,3,4,5,6]", "nums = [1,1,1,1]")
