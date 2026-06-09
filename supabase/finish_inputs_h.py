from generate_hidden_tests import add

add("Path Sum",
    "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", "root = [1,2,3], targetSum = 5",
    "root = [1,2], targetSum = 1", "root = [1], targetSum = 1", "root = [], targetSum = 0",
    "root = [1,2,null,3], targetSum = 3", "root = [1,2,3,4,5], targetSum = 8",
    "root = [1,2,3,4,5,6,7], targetSum = 10", "root = [5,4,11,7,2,8,13,4,5,1,null,4,null,10,null,null,null,1], targetSum = 22",
    "root = [1,2,null,3,null,4], targetSum = 6")
add("Same Tree",
    "p = [1,2,3], q = [1,2,3]", "p = [1,2], q = [1,null,2]", "p = [1,2,1], q = [1,1,2]",
    "p = [1], q = [1]", "p = [1], q = [2]", "p = [], q = []", "p = [1,2], q = [1,2]",
    "p = [1,2,3,4], q = [1,2,3,4]", "p = [1,null,2,3], q = [1,null,2,3]", "p = [1,2,null,3], q = [1,2,null,4]")
add("Lowest Common Ancestor of a Binary Search Tree",
    "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
    "root = [2,1], p = 2, q = 1", "root = [5,3,6,2,4,null,null,1], p = 3, q = 4",
    "root = [5,1,4,null,null,3,6], p = 5, q = 1", "root = [3,1,4,null,2], p = 1, q = 4",
    "root = [6,2,8,0,4,7,9,null,null,3,5], p = 3, q = 5", "root = [2,1,3], p = 1, q = 3",
    "root = [6,2,8,0,4,7,9,null,null,3,5], p = 0, q = 5", "root = [6,2,8,0,4,7,9,null,null,3,5], p = 7, q = 9")
add("Construct Binary Tree from Preorder and Inorder Traversal",
    "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", "preorder = [-1], inorder = [-1]",
    "preorder = [1,2,3], inorder = [2,1,3]", "preorder = [1,2], inorder = [2,1]",
    "preorder = [1,2,4,5,3,6,7], inorder = [4,2,5,1,6,3,7]", "preorder = [1], inorder = [1]",
    "preorder = [1,2,3], inorder = [1,2,3]", "preorder = [5,1,4,3], inorder = [4,3,1,5]",
    "preorder = [1,2,3,4], inorder = [1,2,3,4]", "preorder = [4,2,1,3,6,5,7], inorder = [1,2,3,4,5,6,7]")
add("Binary Tree Right Side View",
    "root = [1,2,3,null,5,null,4]", "root = [1,null,3]", "root = []", "root = [1]",
    "root = [1,2,3,4]", "root = [1,2,3,4,5,null,6,null,7]", "root = [1,2,3,null,5,6,7]",
    "root = [1,2,null,3,null,4]", "root = [5,4,3,null,null,2,null,1]", "root = [1,2,3,4,null,null,null,5]")
