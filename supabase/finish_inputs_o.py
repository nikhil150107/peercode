from generate_hidden_tests import add

add("Reverse Linked List",
    "head = [1]", "head = [2,1]", "head = [3,2,1]", "head = []", "head = [1,2,3,4,5,6,7,8,9,10]",
    "head = [1,2,3,4,5]", "head = [5,4,3,2,1]", "head = [1,2]", "head = [10,20,30]", "head = [1,1,1,1]")
add("Merge Two Sorted Lists",
    "list1 = [1], list2 = [2]", "list1 = [1,2,3], list2 = []", "list1 = [], list2 = [1,2,3]",
    "list1 = [2], list2 = [1]", "list1 = [1,3,5], list2 = [2,4,6]", "list1 = [1,2,4], list2 = [1,3,4]",
    "list1 = [], list2 = []", "list1 = [1,1,1], list2 = [2,2,2]", "list1 = [5], list2 = [1,2,3,4,6]",
    "list1 = [1,2,3,4,5], list2 = [6,7,8,9,10]")
add("Linked List Cycle",
    "head = [3,2,0,-4], pos = 1", "head = [1,2], pos = 0", "head = [1], pos = -1",
    "head = [1,2,3,4,5], pos = -1", "head = [1,2,3,4], pos = 2", "head = [1], pos = 0",
    "head = [1,2,3], pos = -1", "head = [1,2,3,4,5,6,7,8,9,10], pos = 5", "head = [], pos = -1",
    "head = [1,2], pos = -1")
add("Remove Nth Node From End of List",
    "head = [1,2,3,4,5], n = 2", "head = [1], n = 1", "head = [1,2], n = 1", "head = [1,2,3], n = 3",
    "head = [1,2,3,4,5], n = 5", "head = [1,2,3,4,5], n = 1", "head = [1,2,3,4,5,6,7,8,9,10], n = 10",
    "head = [1,2,3,4,5,6], n = 3", "head = [1,2], n = 2", "head = [1,2,3,4], n = 4")
add("Copy List with Random Pointer",
    "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", "head = [[1,1],[2,1]]", "head = [[3,null],[3,0],[3,null]]",
    "head = []", "head = [[1,null]]", "head = [[1,0],[2,1],[3,2]]", "head = [[1,null],[2,null],[3,null]]",
    "head = [[1,1],[2,0]]", "head = [[7,null],[13,0],[11,4],[10,2],[1,0],[8,5]]", "head = [[1,0],[1,0],[1,0]]")
