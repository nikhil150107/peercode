from generate_hidden_tests import add

add("Maximum Depth of Binary Tree",
    "root = [3,9,20,null,null,15,7]", "root = [1,null,2]", "root = []", "root = [0]",
    "root = [1,2,3,4,5,6,7,8,9,10]", "root = [1,2,3,4,5,null,null,6]", "root = [1,2,3]",
    "root = [1,null,2,null,3,null,4]", "root = [5,4,3,null,null,2,null,1]", "root = [1,2]")
add("Invert Binary Tree",
    "root = [4,2,7,1,3,6,9]", "root = [2,1,3]", "root = []", "root = [1]",
    "root = [1,2,3,4,5]", "root = [5,3,6,2,4,null,7,1]", "root = [1,null,2]",
    "root = [1,2,3,4,5,6,7]", "root = [0]", "root = [10,5,15,null,6,12]")
add("Symmetric Tree",
    "root = [1,2,2,3,4,4,3]", "root = [1,2,2,null,3,null,3]", "root = [1]", "root = [1,2,3]",
    "root = [1,2,2,2,null,2]", "root = [1,2,2,null,3,3,null,4]", "root = []",
    "root = [2,3,3,4,5,5,4]", "root = [1,0,0]", "root = [5,1,1,null,2,2,null,3,3,3,3]")
add("Diameter of Binary Tree",
    "root = [1,2,3,4,5]", "root = [1,2]", "root = [1]", "root = [1,2,3,4,5,6,7]",
    "root = [1,2,3,null,4]", "root = [2,3,4,5]", "root = [1,2,3,4,5,null,6,null,7]",
    "root = [1,2,3,4,5,6,7,8,9,10]", "root = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-4,null,5,null,null,null,6,-3]",
    "root = [1,2,3,null,4,5]")
add("Balanced Binary Tree",
    "root = [3,9,20,null,null,15,7]", "root = [1,2,2,3,3,null,null,4,4]", "root = [1]",
    "root = [1,2,2,3,3,4,4]", "root = []", "root = [1,2,3,4,5,6,7,8,9]",
    "root = [1,2,2,3,null,null,3,4]", "root = [1,2,3,4]", "root = [2,1,3,4,5,6,7]",
    "root = [1,2,2,3,3,3,3,4,4,4,4,5,5]")
