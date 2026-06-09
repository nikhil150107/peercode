from generate_hidden_tests import add

add("Majority Element",
    "nums = [3,2,3]", "nums = [2,2,1,1,1,2,2]", "nums = [1]", "nums = [6,5,5]",
    "nums = [1,1,1,2,2,2,2]", "nums = [100,100,100,200]", "nums = [5,5,5,5,5,1,1]",
    "nums = [10,10,10,10,20,20,20]", "nums = [7,7,7,7,7,7,7,1,2,3]", "nums = [1,2,1,1,1,1,1]")
add("Product of Array Except Self",
    "nums = [1,2,3,4]", "nums = [-1,1,0,-3,3]", "nums = [2,3,4,5]", "nums = [0,0]",
    "nums = [1,0]", "nums = [-1,-1,-1,-1]", "nums = [5,1,1,1]", "nums = [1,2,3]",
    "nums = [2,3,5,7]", "nums = [0,1,2,3,4]")
add("Rotate Array",
    "nums = [1,2,3,4,5,6,7], k = 3", "nums = [-1,-100,3,99], k = 2", "nums = [1,2,3], k = 0",
    "nums = [1], k = 1", "nums = [1,2], k = 1", "nums = [1,2,3,4,5], k = 2",
    "nums = [1,2,3,4,5,6], k = 4", "nums = [1,2,3,4,5,6,7], k = 7", "nums = [2,3,4,5,6], k = 5",
    "nums = [1,2,3,4,5,6,7,8,9,10], k = 3")
add("Find Minimum in Rotated Sorted Array",
    "nums = [3,4,5,1,2]", "nums = [4,5,6,7,0,1,2]", "nums = [11,13,15,17]",
    "nums = [1]", "nums = [2,1]", "nums = [5,1,2,3,4]", "nums = [3,1,2]",
    "nums = [8,9,10,1,2,3,4,5,6,7]", "nums = [10,1,2,3,4,5,6,7,8,9]", "nums = [7,8,9,0,1,2,3,4,5,6]")
add("Search in Rotated Sorted Array",
    "nums = [4,5,6,7,0,1,2], target = 0", "nums = [4,5,6,7,0,1,2], target = 3",
    "nums = [1], target = 0", "nums = [1], target = 1", "nums = [1,3], target = 3",
    "nums = [5,1,3], target = 3", "nums = [3,1], target = 1", "nums = [4,5,6,7,8,1,2,3], target = 8",
    "nums = [6,7,8,9,10,1,2,3,4,5], target = 6", "nums = [3,4,5,6,1,2], target = 1")
add("Container With Most Water",
    "height = [1,8,6,2,5,4,8,3,7]", "height = [1,1]", "height = [4,3,2,1,4]",
    "height = [1,2,1]", "height = [2,3,4,5,18,17,6]", "height = [1,3,2,5,25,24,5]",
    "height = [5,5,5,5,5]", "height = [1,2,4,3]", "height = [2,3,10,5,7,8,9]",
    "height = [1,2,3,4,5,6,7,8,9,10]")
add("Next Permutation",
    "nums = [1,2,3]", "nums = [3,2,1]", "nums = [1,1,5]", "nums = [1,3,2]",
    "nums = [1,2,3,4,5]", "nums = [5,4,3,2,1]", "nums = [1]", "nums = [1,2]",
    "nums = [2,3,1]", "nums = [1,5,1,1]")
add("Spiral Matrix",
    "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
    "matrix = [[1]]", "matrix = [[1,2,3,4]]", "matrix = [[1],[2],[3],[4]]",
    "matrix = [[2,5],[8,4],[0,-1]]", "matrix = [[1,2],[3,4]]", "matrix = [[7],[9],[6]]",
    "matrix = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]", "matrix = [[1,2,3],[4,5,6]]")
