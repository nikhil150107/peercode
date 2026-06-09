from generate_hidden_tests import add

add("Valid Anagram",
    's = "anagram", t = "nagaram"', 's = "rat", t = "car"', 's = "a", t = "a"',
    's = "ab", t = "ba"', 's = "abc", t = "cba"', 's = "listen", t = "silent"',
    's = "hello", t = "bello"', 's = "aa", t = "a"', 's = "aacc", t = "ccac"',
    's = "abcdefghijklmnopqrstuvwxyz", t = "zyxwvutsrqponmlkjihgfedcba"')
add("Reverse String",
    's = ["h","e","l","l","o"]', 's = ["H","a","n","n","a","h"]', 's = ["a"]',
    's = ["a","b"]', 's = ["a","b","c","d","e"]', 's = ["z","y","x"]',
    's = ["1","2","3"]', 's = ["A"," ","B"]', 's = ["r","a","c","e","c","a","r"]',
    's = ["p","e","e","r","c","o","d","e"]')
add("Find the Index of the First Occurrence in a String",
    'haystack = "sadbutsad", needle = "sad"', 'haystack = "leetcode", needle = "leeto"',
    'haystack = "hello", needle = "ll"', 'haystack = "aaaaa", needle = "bba"',
    'haystack = "mississippi", needle = "issip"', 'haystack = "a", needle = "a"',
    'haystack = "abc", needle = "c"', 'haystack = "abc", needle = "abcd"',
    'haystack = "aaa", needle = "aaaa"', 'haystack = "abcabcabc", needle = "cab"')
add("Longest Common Prefix",
    'strs = ["flower","flow","flight"]', 'strs = ["dog","racecar","car"]', 'strs = ["a"]',
    'strs = ["ab","a"]', 'strs = ["","b"]', 'strs = ["c","c"]',
    'strs = ["interspecies","interstellar","interstate"]', 'strs = ["throne","throne"]',
    'strs = ["abab","aba",""]', 'strs = ["a","ab","abc"]')
add("Reverse Words in a String III",
    's = "Let''s take LeetCode contest"', 's = "God Ding"', 's = "a good   example"',
    's = "hello"', 's = "a b c"', 's = "Alice   Bob  Charlie"',
    's = "peer code rocks"', 's = "One Two Three"', 's = "a"', 's = "ab cd ef"')
add("Valid Parentheses",
    's = "[]"', 's = "(]"', 's = "([)]"', 's = "{[]}"', 's = "(((((((()"',
    's = "()[]{}"', 's = "()"', "s = \"({[]})\"", 's = "]"', "s = \"([{}])\"")
add("Longest Palindromic Substring",
    's = "babad"', 's = "cbbd"', 's = "a"', 's = "ac"', 's = "bb"',
    's = "ccc"', 's = "bananas"', 's = "forgeeksskeegfor"', 's = "abcba"',
    's = "xaabacxcabaaxcabaax"')
add("String to Integer (atoi)",
    's = "42"', 's = "   -42"', 's = "4193 with words"', 's = "words and 987"',
    's = "-91283472332"', 's = "91283472332"', 's = "0-1"', 's = "  +0 123"',
    's = "   +0 123"', 's = "+1"')
