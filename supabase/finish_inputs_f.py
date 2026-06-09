from generate_hidden_tests import add

add("Zigzag Conversion",
    's = "PAYPALISHIRING", numRows = 3', 's = "PAYPALISHIRING", numRows = 4', 's = "A", numRows = 1',
    's = "AB", numRows = 1', 's = "ABC", numRows = 2', 's = "ABCDEF", numRows = 5',
    's = "ABCDEFGHI", numRows = 4', 's = "ABCD", numRows = 2', 's = "ABCDE", numRows = 4',
    's = "A,B,C", numRows = 2')
add("Letter Combinations of a Phone Number",
    'digits = "23"', 'digits = ""', 'digits = "2"', 'digits = "9"', 'digits = "79"',
    'digits = "234"', 'digits = "22"', 'digits = "56"', 'digits = "8"', 'digits = "47"')
add("Generate Parentheses",
    'n = 3', 'n = 1', 'n = 2', 'n = 4', 'n = 5', 'n = 6', 'n = 7', 'n = 8', 'n = 2', 'n = 3')
add("Decode String",
    's = "3[a]2[bc]"', 's = "3[a2[c]]"', 's = "2[abc]3[cd]ef"', 's = "abc3[cd]xyz"',
    's = "10[a]"', 's = "100[leetcode]"', 's = "3[z]2[2[y]pq4[2[jk]e1[f]]]ef"',
    's = "2[2[a]]"', 's = "1[a]"', 's = "2[a2[b2[c]]]"')
add("Palindromic Substrings",
    's = "abc"', 's = "aaa"', 's = "a"', 's = "aa"', 's = "aba"',
    's = "abcba"', 's = "fdsklf"', 's = "aaaaa"', 's = "abba"', 's = "xxyyyxyxyxx"')
add("Minimum Window Substring",
    's = "ADOBECODEBANC", t = "ABC"', 's = "a", t = "a"', 's = "a", t = "aa"',
    's = "ab", t = "b"', 's = "bba", t = "ab"', 's = "cabwefgewcwaefgcf", t = "cae"',
    's = "abc", t = "ac"', 's = "aaflslflsldkalskaaa", t = "aaa"', 's = "abcabdebac", t = "abcde"',
    's = "aa", t = "aa"')
add("Regular Expression Matching",
    's = "aa", p = "a"', 's = "aa", p = "a*"', 's = "ab", p = ".*"', 's = "aab", p = "c*a*b"',
    's = "mississippi", p = "mis*is*p*."', 's = "ab", p = ".*c"', 's = "aaa", p = "a*a"',
    's = "a", p = "ab*"', 's = "bbbba", p = "aaaa*b*"', 's = "abc", p = "abc*"')
