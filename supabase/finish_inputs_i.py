from generate_hidden_tests import add

add("Count Good Nodes in Binary Tree",
    "root = [3,1,4,3,null,1,5]", "root = [3,3,null,4,2]", "root = [1]", "root = [2,null,4,10,8,null,null,4]",
    "root = [1,2,3,4,5,6,7]", "root = [9,4,1,-1,null,5,2,null,3,null,6,null,7]", "root = [2,2,2,2,2]",
    "root = [1,2,null,3]", "root = [5,4,3,2,1]", "root = [10,5,15,null,6,12]")
add("Kth Smallest Element in a BST",
    "root = [3,1,4,null,2], k = 1", "root = [5,3,6,2,4,null,null,1], k = 3", "root = [1], k = 1",
    "root = [2,1,3], k = 2", "root = [5,3,6,2,4,null,null,1], k = 4", "root = [3,1,4,null,2], k = 2",
    "root = [5,3,6,2,4,null,null,1], k = 1", "root = [5,3,6,2,4,null,null,1], k = 6",
    "root = [4,2,6,1,3,5,7], k = 5", "root = [3,1,4,null,2], k = 4")
add("Flatten Binary Tree to Linked List",
    "root = [1,2,5,3,4,null,6]", "root = []", "root = [1]", "root = [1,2,3,4,5,6,7]",
    "root = [1,2,3,4,5,6]", "root = [1,null,2]", "root = [1,2,3]", "root = [1,2,5,3,4,null,6,7]",
    "root = [5,3,6,2,4,null,7,1]", "root = [1,2,3,4]")
add("Binary Tree Maximum Path Sum",
    "root = [1,2,3]", "root = [-10,9,20,null,null,15,7]", "root = [1]", "root = [-3]",
    "root = [5,4,8,11,null,13,4,7,2,null,null,null,1]", "root = [1,2,3,4,5,6,7]",
    "root = [-2,1]", "root = [9,6,-3,null,null,-1,2,-2,2]", "root = [2,-1]", "root = [1,-2,3]")
add("Lowest Common Ancestor of a Binary Tree",
    "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
    "root = [1,2], p = 1, q = 2", "root = [1,2,3], p = 2, q = 3", "root = [3,5,1,6,2,0,8,null,null,7,4], p = 6, q = 4",
    "root = [1], p = 1, q = 1", "root = [3,5,1,6,2,0,8,null,null,7,4], p = 7, q = 4",
    "root = [3,5,1,6,2,0,8,null,null,7,4], p = 0, q = 8", "root = [3,5,1,6,2,0,8,null,null,7,4], p = 2, q = 7",
    "root = [3,5,1,6,2,0,8,null,null,7,4], p = 3, q = 5")
