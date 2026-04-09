// Pre-populated DSA topics and problems data










































export const TOPICS = [
{ id: "arrays", name: "Arrays", icon: "🔢", color: "chart-1" },
{ id: "strings", name: "Strings", icon: "📝", color: "chart-2" },
{ id: "linked-lists", name: "Linked Lists", icon: "🔗", color: "chart-3" },
{ id: "stacks-queues", name: "Stacks & Queues", icon: "📚", color: "chart-4" },
{ id: "trees", name: "Trees", icon: "🌳", color: "chart-5" },
{ id: "graphs", name: "Graphs", icon: "🕸️", color: "chart-1" },
{ id: "dp", name: "Dynamic Programming", icon: "🧩", color: "chart-2" },
{ id: "greedy", name: "Greedy", icon: "🎯", color: "chart-3" },
{ id: "backtracking", name: "Backtracking", icon: "🔄", color: "chart-4" },
{ id: "binary-search", name: "Binary Search", icon: "🔍", color: "chart-5" },
{ id: "heap", name: "Heap / Priority Queue", icon: "⛰️", color: "chart-1" },
{ id: "sliding-window", name: "Sliding Window", icon: "🪟", color: "chart-2" }];


export const COMPANIES = [
"Google", "Amazon", "Microsoft", "Meta", "Apple",
"Netflix", "Adobe", "Goldman Sachs", "Uber", "Flipkart",
"Oracle", "Samsung", "Infosys", "TCS", "Wipro"];


export const PROBLEMS = [
// Arrays
{ id: "a1", title: "Two Sum", topicId: "arrays", difficulty: "Easy", companies: ["Google", "Amazon", "Meta"] },
{ id: "a2", title: "Best Time to Buy and Sell Stock", topicId: "arrays", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "a3", title: "Contains Duplicate", topicId: "arrays", difficulty: "Easy", companies: ["Apple", "Adobe"] },
{ id: "a4", title: "Maximum Subarray", topicId: "arrays", difficulty: "Medium", companies: ["Google", "Microsoft", "Amazon"] },
{ id: "a5", title: "Product of Array Except Self", topicId: "arrays", difficulty: "Medium", companies: ["Meta", "Amazon"] },
{ id: "a6", title: "3Sum", topicId: "arrays", difficulty: "Medium", companies: ["Google", "Amazon", "Meta"] },
{ id: "a7", title: "Container With Most Water", topicId: "arrays", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "a8", title: "Merge Intervals", topicId: "arrays", difficulty: "Medium", companies: ["Google", "Meta", "Microsoft"] },
{ id: "a9", title: "Trapping Rain Water", topicId: "arrays", difficulty: "Hard", companies: ["Google", "Amazon", "Goldman Sachs"] },
{ id: "a10", title: "First Missing Positive", topicId: "arrays", difficulty: "Hard", companies: ["Amazon", "Microsoft"] },
{ id: "a11", title: "Next Permutation", topicId: "arrays", difficulty: "Medium", companies: ["Google", "Amazon"] },
{ id: "a12", title: "Set Matrix Zeroes", topicId: "arrays", difficulty: "Medium", companies: ["Microsoft", "Oracle"] },

// Strings
{ id: "s1", title: "Valid Anagram", topicId: "strings", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "s2", title: "Valid Palindrome", topicId: "strings", difficulty: "Easy", companies: ["Meta", "Microsoft"] },
{ id: "s3", title: "Longest Substring Without Repeating Characters", topicId: "strings", difficulty: "Medium", companies: ["Amazon", "Google", "Meta"] },
{ id: "s4", title: "Longest Palindromic Substring", topicId: "strings", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "s5", title: "Group Anagrams", topicId: "strings", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "s6", title: "Minimum Window Substring", topicId: "strings", difficulty: "Hard", companies: ["Google", "Meta", "Uber"] },
{ id: "s7", title: "String to Integer (atoi)", topicId: "strings", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "s8", title: "Longest Common Prefix", topicId: "strings", difficulty: "Easy", companies: ["Google", "Adobe"] },
{ id: "s9", title: "Rabin Karp Algorithm", topicId: "strings", difficulty: "Medium", companies: ["Google", "Amazon"] },
{ id: "s10", title: "Z-Algorithm", topicId: "strings", difficulty: "Hard", companies: ["Google"] },

// Linked Lists
{ id: "ll1", title: "Reverse Linked List", topicId: "linked-lists", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "ll2", title: "Merge Two Sorted Lists", topicId: "linked-lists", difficulty: "Easy", companies: ["Amazon", "Apple"] },
{ id: "ll3", title: "Linked List Cycle", topicId: "linked-lists", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "ll4", title: "Remove Nth Node From End", topicId: "linked-lists", difficulty: "Medium", companies: ["Meta", "Amazon"] },
{ id: "ll5", title: "Add Two Numbers", topicId: "linked-lists", difficulty: "Medium", companies: ["Amazon", "Microsoft", "Google"] },
{ id: "ll6", title: "Flatten a Linked List", topicId: "linked-lists", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "ll7", title: "Copy List with Random Pointer", topicId: "linked-lists", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "ll8", title: "LRU Cache", topicId: "linked-lists", difficulty: "Hard", companies: ["Amazon", "Google", "Meta"] },

// Stacks & Queues
{ id: "sq1", title: "Valid Parentheses", topicId: "stacks-queues", difficulty: "Easy", companies: ["Amazon", "Google"] },
{ id: "sq2", title: "Min Stack", topicId: "stacks-queues", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "sq3", title: "Next Greater Element", topicId: "stacks-queues", difficulty: "Medium", companies: ["Amazon", "Goldman Sachs"] },
{ id: "sq4", title: "Implement Queue using Stacks", topicId: "stacks-queues", difficulty: "Easy", companies: ["Microsoft", "Amazon"] },
{ id: "sq5", title: "Sliding Window Maximum", topicId: "stacks-queues", difficulty: "Hard", companies: ["Google", "Amazon"] },
{ id: "sq6", title: "Largest Rectangle in Histogram", topicId: "stacks-queues", difficulty: "Hard", companies: ["Amazon", "Google"] },

// Trees
{ id: "t1", title: "Maximum Depth of Binary Tree", topicId: "trees", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "t2", title: "Invert Binary Tree", topicId: "trees", difficulty: "Easy", companies: ["Google", "Amazon"] },
{ id: "t3", title: "Same Tree", topicId: "trees", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "t4", title: "Binary Tree Level Order Traversal", topicId: "trees", difficulty: "Medium", companies: ["Amazon", "Microsoft", "Meta"] },
{ id: "t5", title: "Validate Binary Search Tree", topicId: "trees", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "t6", title: "Lowest Common Ancestor", topicId: "trees", difficulty: "Medium", companies: ["Amazon", "Google", "Meta"] },
{ id: "t7", title: "Binary Tree Maximum Path Sum", topicId: "trees", difficulty: "Hard", companies: ["Google", "Meta"] },
{ id: "t8", title: "Serialize and Deserialize Binary Tree", topicId: "trees", difficulty: "Hard", companies: ["Amazon", "Google", "Meta"] },
{ id: "t9", title: "Diameter of Binary Tree", topicId: "trees", difficulty: "Easy", companies: ["Meta", "Google"] },
{ id: "t10", title: "Construct Binary Tree from Preorder and Inorder", topicId: "trees", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },

// Graphs
{ id: "g1", title: "Number of Islands", topicId: "graphs", difficulty: "Medium", companies: ["Amazon", "Google", "Meta"] },
{ id: "g2", title: "Clone Graph", topicId: "graphs", difficulty: "Medium", companies: ["Meta", "Google"] },
{ id: "g3", title: "Course Schedule", topicId: "graphs", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "g4", title: "Pacific Atlantic Water Flow", topicId: "graphs", difficulty: "Medium", companies: ["Google", "Amazon"] },
{ id: "g5", title: "Graph Valid Tree", topicId: "graphs", difficulty: "Medium", companies: ["Google", "Meta"] },
{ id: "g6", title: "Word Ladder", topicId: "graphs", difficulty: "Hard", companies: ["Amazon", "Google"] },
{ id: "g7", title: "Dijkstra's Algorithm", topicId: "graphs", difficulty: "Medium", companies: ["Google", "Uber"] },
{ id: "g8", title: "Bellman Ford Algorithm", topicId: "graphs", difficulty: "Medium", companies: ["Amazon", "Goldman Sachs"] },
{ id: "g9", title: "Detect Cycle in Directed Graph", topicId: "graphs", difficulty: "Medium", companies: ["Amazon", "Samsung"] },
{ id: "g10", title: "Topological Sort", topicId: "graphs", difficulty: "Medium", companies: ["Google", "Amazon"] },

// Dynamic Programming
{ id: "dp1", title: "Climbing Stairs", topicId: "dp", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "dp2", title: "Coin Change", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Google"] },
{ id: "dp3", title: "Longest Increasing Subsequence", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Microsoft", "Google"] },
{ id: "dp4", title: "0/1 Knapsack", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Flipkart"] },
{ id: "dp5", title: "Longest Common Subsequence", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Google"] },
{ id: "dp6", title: "Word Break", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Google", "Meta"] },
{ id: "dp7", title: "House Robber", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "dp8", title: "Edit Distance", topicId: "dp", difficulty: "Hard", companies: ["Google", "Amazon"] },
{ id: "dp9", title: "Matrix Chain Multiplication", topicId: "dp", difficulty: "Hard", companies: ["Amazon", "Samsung"] },
{ id: "dp10", title: "Partition Equal Subset Sum", topicId: "dp", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "dp11", title: "Decode Ways", topicId: "dp", difficulty: "Medium", companies: ["Meta", "Google"] },
{ id: "dp12", title: "Unique Paths", topicId: "dp", difficulty: "Medium", companies: ["Google", "Amazon"] },

// Greedy
{ id: "gr1", title: "Activity Selection", topicId: "greedy", difficulty: "Easy", companies: ["Amazon", "Flipkart"] },
{ id: "gr2", title: "Jump Game", topicId: "greedy", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "gr3", title: "Gas Station", topicId: "greedy", difficulty: "Medium", companies: ["Amazon", "Google"] },
{ id: "gr4", title: "Minimum Platforms", topicId: "greedy", difficulty: "Medium", companies: ["Amazon", "Flipkart"] },
{ id: "gr5", title: "Job Sequencing Problem", topicId: "greedy", difficulty: "Medium", companies: ["Amazon", "Samsung"] },
{ id: "gr6", title: "Fractional Knapsack", topicId: "greedy", difficulty: "Medium", companies: ["Amazon", "Flipkart"] },

// Backtracking
{ id: "bt1", title: "Subsets", topicId: "backtracking", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "bt2", title: "Permutations", topicId: "backtracking", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "bt3", title: "Combination Sum", topicId: "backtracking", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "bt4", title: "N-Queens", topicId: "backtracking", difficulty: "Hard", companies: ["Google", "Amazon"] },
{ id: "bt5", title: "Sudoku Solver", topicId: "backtracking", difficulty: "Hard", companies: ["Amazon", "Google"] },
{ id: "bt6", title: "Word Search", topicId: "backtracking", difficulty: "Medium", companies: ["Amazon", "Microsoft"] },
{ id: "bt7", title: "Palindrome Partitioning", topicId: "backtracking", difficulty: "Medium", companies: ["Amazon", "Google"] },

// Binary Search
{ id: "bs1", title: "Binary Search", topicId: "binary-search", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "bs2", title: "Search in Rotated Sorted Array", topicId: "binary-search", difficulty: "Medium", companies: ["Amazon", "Meta", "Microsoft"] },
{ id: "bs3", title: "Find Minimum in Rotated Sorted Array", topicId: "binary-search", difficulty: "Medium", companies: ["Amazon", "Google"] },
{ id: "bs4", title: "Median of Two Sorted Arrays", topicId: "binary-search", difficulty: "Hard", companies: ["Google", "Amazon", "Goldman Sachs"] },
{ id: "bs5", title: "Kth Element of Two Sorted Arrays", topicId: "binary-search", difficulty: "Hard", companies: ["Amazon", "Google"] },
{ id: "bs6", title: "Aggressive Cows", topicId: "binary-search", difficulty: "Hard", companies: ["Amazon", "Flipkart"] },

// Heap
{ id: "h1", title: "Kth Largest Element", topicId: "heap", difficulty: "Medium", companies: ["Amazon", "Meta", "Google"] },
{ id: "h2", title: "Top K Frequent Elements", topicId: "heap", difficulty: "Medium", companies: ["Amazon", "Google"] },
{ id: "h3", title: "Merge K Sorted Lists", topicId: "heap", difficulty: "Hard", companies: ["Amazon", "Google", "Meta"] },
{ id: "h4", title: "Find Median from Data Stream", topicId: "heap", difficulty: "Hard", companies: ["Google", "Amazon"] },
{ id: "h5", title: "Task Scheduler", topicId: "heap", difficulty: "Medium", companies: ["Meta", "Amazon"] },

// Sliding Window
{ id: "sw1", title: "Maximum Sum Subarray of Size K", topicId: "sliding-window", difficulty: "Easy", companies: ["Amazon", "Microsoft"] },
{ id: "sw2", title: "Longest Substring with K Distinct Characters", topicId: "sliding-window", difficulty: "Medium", companies: ["Google", "Amazon"] },
{ id: "sw3", title: "Minimum Size Subarray Sum", topicId: "sliding-window", difficulty: "Medium", companies: ["Amazon", "Meta"] },
{ id: "sw4", title: "Fruit Into Baskets", topicId: "sliding-window", difficulty: "Medium", companies: ["Google", "Amazon"] },
{ id: "sw5", title: "Smallest Window Containing All Characters", topicId: "sliding-window", difficulty: "Hard", companies: ["Amazon", "Google"] }];

export const CORE_TOPICS = [{ id: 'oops', name: 'OOPS', icon: '💻', color: 'chart-1' }, { id: 'dbms', name: 'DBMS', icon: '🗄️', color: 'chart-2' }, { id: 'cn', name: 'Computer Networks', icon: '🌐', color: 'chart-3' }, { id: 'os', name: 'Operating Systems', icon: '🖥️', color: 'chart-4' }];

export const CORE_PROBLEMS = [
  { id: 'core1', title: 'What is Polymorphism?', topicId: 'oops', companies: ['Amazon', 'TCS'], solution: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass. It means "many forms". Common types are Compile-time (Method Overloading) and Run-time (Method Overriding).' },
  { id: 'core2', title: 'Explain the 4 pillars of OOPs', topicId: 'oops', companies: ['Microsoft', 'Infosys'], solution: '1. Encapsulation: Wrapping data and methods into a single unit.\n2. Abstraction: Hiding internal implementation and showing only necessary features.\n3. Inheritance: A class acquiring properties of another class.\n4. Polymorphism: Ability of a method to do different things based on the object it is acting upon.' },
  { id: 'core3', title: 'What are ACID Properties?', topicId: 'dbms', companies: ['Oracle', 'Microsoft'], solution: 'ACID ensures reliable database transactions:\n- Atomicity: "All or nothing" transaction execution.\n- Consistency: DB remains within valid state rules.\n- Isolation: Concurrent transactions do not interfere.\n- Durability: Committed data is saved permanently even if power fails.' },
  { id: 'core4', title: 'Differences between SQL and NoSQL', topicId: 'dbms', companies: ['Amazon', 'Meta'], solution: 'SQL (Relational): Table-based, strict schema, scales vertically, uses ACID (e.g. MySQL, PostgreSQL).\nNoSQL (Non-relational): Document/Key-Value/Graph based, dynamic schema, scales horizontally, uses BASE (e.g. MongoDB, Redis).' },
  { id: 'core5', title: 'What are the layers of the OSI Model?', topicId: 'cn', companies: ['Cisco'], solution: 'Please Do Not Throw Sausage Pizza Away:\n1. Physical (Cables, Bits)\n2. Data Link (MAC, Frames)\n3. Network (IP, Packets)\n4. Transport (TCP/UDP, Segments)\n5. Session (Connections)\n6. Presentation (Encryption/Format)\n7. Application (HTTP, FTP)' },
  { id: 'core6', title: 'TCP vs UDP', topicId: 'cn', companies: ['Google', 'Samsung'], solution: 'TCP: Connection-oriented, reliable, guarantees delivery, slower, handles error checking (e.g. HTTP, SSH).\nUDP: Connectionless, unreliable, no delivery guarantee, faster, skips error checking (e.g. Video Streaming, Gaming).' },
  { id: 'core7', title: 'Explain Deadlock and its prevention', topicId: 'os', companies: ['Google', 'Microsoft'], solution: 'Deadlock happens when a set of processes are blocked because each is holding a resource and waiting for another resource acquired by some other process. Prevention strategies involve breaking one of the 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, or Circular Wait.' },
  { id: 'core8', title: 'What is Virtual Memory?', topicId: 'os', companies: ['Apple', 'Microsoft'], solution: 'A memory management technique that creates an illusion of a very large main memory. It allows execution of processes that are not completely in memory by swapping pages in and out of a secondary storage disk (paging/segmentation).' }
];