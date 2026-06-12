import type { Language } from "../../data/mockProblem"
import {
  type HarnessContext,
  type ParsedAssignment,
  isListArrayParam,
  isNestedArray,
  isPlainIntArray,
  isTreeArrayParam,
  parseArrayElements,
  splitTopLevelCommas,
} from "./index"

function toJsValue(value: string): string {
  return value
    .replace(/\btrue\b/g, "true")
    .replace(/\bfalse\b/g, "false")
    .replace(/\bnull\b/g, "null")
}

function toPythonValue(value: string): string {
  return value
    .replace(/\btrue\b/gi, "True")
    .replace(/\bfalse\b/gi, "False")
    .replace(/\bnull\b/gi, "None")
}

const PYTHON_TREE_PRELUDE = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def __peer_build_tree__(nodes):
    if not nodes or nodes[0] is None:
        return None
    root = TreeNode(nodes[0])
    queue = [root]
    i = 1
    while queue and i < len(nodes):
        current = queue.pop(0)
        if i < len(nodes) and nodes[i] is not None:
            current.left = TreeNode(nodes[i])
            queue.append(current.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            current.right = TreeNode(nodes[i])
            queue.append(current.right)
        i += 1
    return root
`

const PYTHON_LIST_PRELUDE = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def __peer_build_list__(values):
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for value in values[1:]:
        current.next = ListNode(value)
        current = current.next
    return head
`

const JS_TREE_PRELUDE = `
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function __peer_build_tree__(nodes) {
  if (!nodes || nodes.length === 0 || nodes[0] == null) return null;
  const root = new TreeNode(nodes[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < nodes.length) {
    const current = queue.shift();
    if (i < nodes.length && nodes[i] != null) {
      current.left = new TreeNode(nodes[i]);
      queue.push(current.left);
    }
    i += 1;
    if (i < nodes.length && nodes[i] != null) {
      current.right = new TreeNode(nodes[i]);
      queue.push(current.right);
    }
    i += 1;
  }
  return root;
}
`

const JS_LIST_PRELUDE = `
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function __peer_build_list__(values) {
  if (!values || values.length === 0) return null;
  const head = new ListNode(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i += 1) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  return head;
}
`

const CPP_TREE_PRELUDE = `
struct TreeNode {
  int val;
  TreeNode *left;
  TreeNode *right;
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* __peer_build_tree__(const vector<optional<int>>& nodes) {
  if (nodes.empty() || !nodes[0].has_value()) return nullptr;
  TreeNode* root = new TreeNode(nodes[0].value());
  queue<TreeNode*> q;
  q.push(root);
  size_t i = 1;
  while (!q.empty() && i < nodes.size()) {
    TreeNode* current = q.front();
    q.pop();
    if (i < nodes.size() && nodes[i].has_value()) {
      current->left = new TreeNode(nodes[i].value());
      q.push(current->left);
    }
    i++;
    if (i < nodes.size() && nodes[i].has_value()) {
      current->right = new TreeNode(nodes[i].value());
      q.push(current->right);
    }
    i++;
  }
  return root;
}
`

const CPP_LIST_PRELUDE = `
struct ListNode {
  int val;
  ListNode *next;
  ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* __peer_build_list__(const vector<int>& values) {
  if (values.empty()) return nullptr;
  ListNode* head = new ListNode(values[0]);
  ListNode* current = head;
  for (size_t i = 1; i < values.size(); ++i) {
    current->next = new ListNode(values[i]);
    current = current->next;
  }
  return head;
}
`

const JAVA_TREE_NODE_CLASS = `
class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode() {}
  TreeNode(int val) { this.val = val; }
  TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
`

const JAVA_LIST_NODE_CLASS = `
class ListNode {
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) {
    this.val = val;
    this.next = next;
  }
}
`

const JAVA_TREE_MAIN_HELPERS = `
  static TreeNode __peer_build_tree__(Integer[] nodes) {
    if (nodes == null || nodes.length == 0 || nodes[0] == null) {
      return null;
    }
    TreeNode root = new TreeNode(nodes[0]);
    java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
    queue.offer(root);
    int i = 1;
    while (!queue.isEmpty() && i < nodes.length) {
      TreeNode current = queue.poll();
      if (i < nodes.length && nodes[i] != null) {
        current.left = new TreeNode(nodes[i]);
        queue.offer(current.left);
      }
      i++;
      if (i < nodes.length && nodes[i] != null) {
        current.right = new TreeNode(nodes[i]);
        queue.offer(current.right);
      }
      i++;
    }
    return root;
  }
`

const JAVA_LIST_MAIN_HELPERS = `
  static ListNode __peer_build_list__(int[] values) {
    if (values == null || values.length == 0) {
      return null;
    }
    ListNode head = new ListNode(values[0]);
    ListNode current = head;
    for (int i = 1; i < values.length; i++) {
      current.next = new ListNode(values[i]);
      current = current.next;
    }
    return head;
  }
`

function userDefinesTreeNode(code: string): boolean {
  return /class\s+TreeNode\b/.test(code)
}

function userDefinesListNode(code: string): boolean {
  return /class\s+ListNode\b/.test(code)
}

function toJavaIntegerArrayAssignment(name: string, value: string): string {
  const elements = parseArrayElements(value)
  if (elements.length === 0) {
    return `Integer[] __${name}_values__ = new Integer[0];`
  }
  const javaElements = elements.map((element) =>
    element.toLowerCase() === "null" ? "null" : element,
  )
  return `Integer[] __${name}_values__ = new Integer[]{${javaElements.join(", ")}};`
}

function toJavaIntArrayAssignment(name: string, value: string): string {
  const elements = parseArrayElements(value)
  if (elements.length === 0) {
    return `int[] __${name}_values__ = new int[0];`
  }
  return `int[] __${name}_values__ = new int[]{${elements.join(", ")}};`
}

function toCppOptionalArrayAssignment(name: string, value: string): string {
  const elements = parseArrayElements(value)
  if (elements.length === 0) {
    return `vector<optional<int>> __${name}_values__ = {};`
  }
  const cppElements = elements.map((element) =>
    element.toLowerCase() === "null" ? "nullopt" : element,
  )
  return `vector<optional<int>> __${name}_values__ = {${cppElements.join(", ")}};`
}

function toJavaAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isTreeArrayParam(name, value)) {
      return toJavaIntegerArrayAssignment(name, value)
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `int[] ${name} = new int[] {};`
    if (isNestedArray(value)) {
      return `var ${name} = ${value};`
    }
    if (isPlainIntArray(value)) {
      return `int[] ${name} = {${parseArrayElements(value).join(", ")}};`
    }
    if (parseArrayElements(value).some((el) => el.toLowerCase() === "null")) {
      return toJavaIntegerArrayAssignment(name, value)
    }
  }
  if (value.startsWith('"')) return `String ${name} = ${value};`
  if (value === "true" || value === "false") return `boolean ${name} = ${value};`
  if (/^-?\d+$/.test(value)) return `int ${name} = ${value};`
  return `var ${name} = ${value};`
}

function toCppAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isTreeArrayParam(name, value)) {
      return toCppOptionalArrayAssignment(name, value)
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `vector<int> ${name} = {};`
    if (isNestedArray(value)) {
      const groups = parseArrayElements(value).map((group) => {
        const nested = group.slice(1, -1).trim()
        return `{${nested}}`
      })
      return `vector<vector<int>> ${name} = {${groups.join(", ")}};`
    }
    return `vector<int> ${name} = {${inner}};`
  }
  if (value.startsWith('"')) return `string ${name} = ${value};`
  if (value === "true" || value === "false") return `bool ${name} = ${value};`
  if (/^-?\d+$/.test(value)) return `int ${name} = ${value};`
  if (/^-?\d+\.\d+$/.test(value)) return `double ${name} = ${value};`
  return `auto ${name} = ${value};`
}

function toGoAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isNestedArray(value)) {
      const groups = parseArrayElements(value).map((group) => {
        const inner = group.slice(1, -1).trim()
        return `[]int{${inner}}`
      })
      return `${name} := [][]int{${groups.join(", ")}}`
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `${name} := []int{}`
    return `${name} := []int{${inner}}`
  }
  if (value.startsWith('"')) return `${name} := ${value}`
  if (value === "true" || value === "false") return `${name} := ${value}`
  if (/^-?\d+$/.test(value)) return `${name} := ${value}`
  return `${name} := ${value}`
}

function toRustAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isNestedArray(value)) {
      const groups = parseArrayElements(value).map((group) => {
        const inner = group.slice(1, -1).trim()
        return `vec![${inner}]`
      })
      return `let ${name} = vec![${groups.join(", ")}];`
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `let ${name} = Vec::<i32>::new();`
    return `let ${name} = vec![${inner}];`
  }
  if (value.startsWith('"')) return `let ${name} = ${value}.to_string();`
  if (value === "true" || value === "false") return `let ${name} = ${value};`
  if (/^-?\d+$/.test(value)) return `let ${name} = ${value};`
  return `let ${name} = ${value};`
}

function toKotlinAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isNestedArray(value)) {
      const groups = parseArrayElements(value).map((group) => {
        const inner = group.slice(1, -1).trim()
        return `intArrayOf(${inner})`
      })
      return `val ${name} = arrayOf(${groups.join(", ")})`
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `val ${name} = intArrayOf()`
    return `val ${name} = intArrayOf(${inner})`
  }
  if (value.startsWith('"')) return `val ${name} = ${value}`
  if (value === "true" || value === "false") return `val ${name} = ${value}`
  if (/^-?\d+$/.test(value)) return `val ${name} = ${value}`
  return `val ${name} = ${value}`
}

function toCSharpAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    if (isNestedArray(value)) {
      const groups = parseArrayElements(value).map((group) => {
        const inner = group.slice(1, -1).trim()
        return `new int[] { ${inner} }`
      })
      return `var ${name} = new int[][] { ${groups.join(", ")} };`
    }
    const inner = value.slice(1, -1).trim()
    if (!inner) return `var ${name} = new int[0];`
    return `var ${name} = new int[] { ${inner} };`
  }
  if (value.startsWith('"')) return `var ${name} = ${value};`
  if (value === "true" || value === "false") return `var ${name} = ${value};`
  if (/^-?\d+$/.test(value)) return `var ${name} = ${value};`
  return `var ${name} = ${value};`
}

function toCAssignment(name: string, value: string): string {
  if (value.startsWith("[")) {
    const elements = parseArrayElements(value)
    if (elements.length === 0) {
      return `int* ${name} = NULL;\nint ${name}_size = 0;`
    }
    return `int ${name}_arr[] = {${elements.join(", ")}};\nint* ${name} = ${name}_arr;\nint ${name}_size = ${elements.length};`
  }
  if (value.startsWith('"')) return `char* ${name} = ${value};`
  if (value === "true" || value === "false") {
    return `bool ${name} = ${value === "true" ? "true" : "false"};`
  }
  if (/^-?\d+$/.test(value)) return `int ${name} = ${value};`
  return `int ${name} = ${value};`
}

function appendPrelude(prelude: string, chunk: string): string {
  return prelude.includes(chunk.slice(0, 20)) ? prelude : prelude + chunk
}

export function buildHarnessContext(
  language: Language,
  assignments: ParsedAssignment[],
  cleanedCode: string,
): HarnessContext {
  const lines: string[] = []
  const args: string[] = []
  let usesTree = false
  let usesList = false
  let prelude = ""
  let mainHelpers = ""

  for (const { name, value } of assignments) {
    if (language === "python") {
      if (isTreeArrayParam(name, value)) {
        usesTree = true
        lines.push(`${name} = __peer_build_tree__(${toPythonValue(value)})`)
        args.push(name)
      } else if (isListArrayParam(name, value)) {
        usesList = true
        lines.push(`${name} = __peer_build_list__(${toPythonValue(value)})`)
        args.push(name)
      } else {
        lines.push(`${name} = ${toPythonValue(value)}`)
        args.push(name)
      }
      continue
    }

    if (language === "javascript") {
      if (isTreeArrayParam(name, value)) {
        usesTree = true
        lines.push(`const ${name} = __peer_build_tree__(${toJsValue(value)});`)
        args.push(name)
      } else if (isListArrayParam(name, value)) {
        usesList = true
        lines.push(`const ${name} = __peer_build_list__(${toJsValue(value)});`)
        args.push(name)
      } else {
        lines.push(`const ${name} = ${toJsValue(value)};`)
        args.push(name)
      }
      continue
    }

    if (language === "java") {
      if (isTreeArrayParam(name, value)) {
        usesTree = true
        lines.push(toJavaIntegerArrayAssignment(name, value))
        lines.push(`TreeNode ${name} = __peer_build_tree__(__${name}_values__);`)
        args.push(name)
      } else if (isListArrayParam(name, value)) {
        usesList = true
        lines.push(toJavaIntArrayAssignment(name, value))
        lines.push(`ListNode ${name} = __peer_build_list__(__${name}_values__);`)
        args.push(name)
      } else {
        lines.push(toJavaAssignment(name, value))
        args.push(name)
      }
      continue
    }

    if (language === "cpp") {
      if (isTreeArrayParam(name, value)) {
        usesTree = true
        lines.push(toCppOptionalArrayAssignment(name, value))
        lines.push(`TreeNode* ${name} = __peer_build_tree__(__${name}_values__);`)
        args.push(name)
      } else if (isListArrayParam(name, value)) {
        usesList = true
        const inner = value.slice(1, -1).trim()
        lines.push(`vector<int> __${name}_values__ = {${inner}};`)
        lines.push(`ListNode* ${name} = __peer_build_list__(__${name}_values__);`)
        args.push(name)
      } else {
        lines.push(toCppAssignment(name, value))
        args.push(name)
      }
      continue
    }

    if (language === "go") {
      lines.push(toGoAssignment(name, value))
      args.push(name)
      continue
    }

    if (language === "rust") {
      lines.push(toRustAssignment(name, value))
      args.push(name)
      continue
    }

    if (language === "kotlin") {
      lines.push(toKotlinAssignment(name, value))
      args.push(name)
      continue
    }

    if (language === "csharp") {
      lines.push(toCSharpAssignment(name, value))
      args.push(name)
      continue
    }

    if (language === "c") {
      lines.push(toCAssignment(name, value))
      args.push(name)
      continue
    }

    lines.push(`${name} = ${toPythonValue(value)}`)
    args.push(name)
  }

  if (usesTree) {
    if (language === "python") prelude = appendPrelude(prelude, PYTHON_TREE_PRELUDE)
    if (language === "javascript") prelude = appendPrelude(prelude, JS_TREE_PRELUDE)
    if (language === "cpp") prelude = appendPrelude(prelude, CPP_TREE_PRELUDE)
    if (language === "java") {
      if (!userDefinesTreeNode(cleanedCode)) {
        prelude = appendPrelude(prelude, JAVA_TREE_NODE_CLASS)
      }
      mainHelpers += JAVA_TREE_MAIN_HELPERS
    }
  }

  if (usesList) {
    if (language === "python") prelude = appendPrelude(prelude, PYTHON_LIST_PRELUDE)
    if (language === "javascript") prelude = appendPrelude(prelude, JS_LIST_PRELUDE)
    if (language === "cpp") prelude = appendPrelude(prelude, CPP_LIST_PRELUDE)
    if (language === "java") {
      if (!userDefinesListNode(cleanedCode)) {
        prelude = appendPrelude(prelude, JAVA_LIST_NODE_CLASS)
      }
      mainHelpers += JAVA_LIST_MAIN_HELPERS
    }
  }

  return {
    assignmentBlock: lines.join("\n"),
    argList: args.join(", "),
    prelude,
    mainHelpers,
    usesTree,
  }
}

export function buildGenericAssignments(
  language: Language,
  assignments: ParsedAssignment[],
): HarnessContext {
  return buildHarnessContext(language, assignments, "")
}
