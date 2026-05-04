import { Code2, Cpu, Zap, Globe, Compass, Database, Settings } from 'lucide-react';
import React from 'react';

export type Post = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  type: string;
  href: string;
  isExternal: boolean;
  ep?: string; // e.g. "EP.01"
};

export type Series = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;         // Tailwind text color
  bgColor: string;       // Tailwind bg for icon badge
  chipColor: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  description: string;
  posts: Post[];
  comingSoon?: string[]; // future labels
};

export const series: Series[] = [
  {
    id: 'ai',
    label: 'AI 離線部署',
    icon: <Cpu size={22} />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    chipColor: 'secondary',
    description: '從鴻海深圳廠的實戰經驗出發，記錄如何在隔離網路中部署 Ollama 大型語言模型。',
    comingSoon: ['EP.05 — RAG 進階：多向量檢索與重排序'],
    posts: [
      {
        title: 'EP.04 — Transformer & TTS：語音合成架構原理，從 Encoder-Decoder 到嵌入式推論',
        subtitle: '解析如何讓機器說出自然人聲：從聲學模型到聲碼器的完整技術拆解',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/ai/ep04-transformer-tts', isExternal: false, ep: 'EP.04',
      },
      {
        title: 'EP.03 — Dify 工作流程設計：在本地 LLM 前加上 Orchestration 層，打造可控的 AI Agent',
        subtitle: '單純的 Chat 已經不夠了：透過 Dify 的編排能力，在本地 LLM 上層建構穩定的業務邏輯流程',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/ai/ep03-dify-orchestration', isExternal: false, ep: 'EP.03',
      },
      {
        title: 'EP.02 — Ollama 本地 LLM 部署全攻略',
        subtitle: '含離線環境搬檔教學：從安裝到第一個推論，解決離線環境模型下載難題',
        date: '2025', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/ai/ep02-ollama-local-llm', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — 什麼是 Air-gapped AI？',
        subtitle: '從工廠內網 LLM 說起：為什麼要隔離網路？離線部署的挑戰與機遇',
        date: '2025', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/ai/ep01-airgapped-intro', isExternal: false, ep: 'EP.01',
      },
    ],
  },
  {
    id: 'python',
    label: 'Python 自動化',
    icon: <Zap size={22} />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    chipColor: 'success',
    description: '利用 Python 解決工廠自動化難題：影像辨識、機械手臂控制與系統整合。',
    comingSoon: ['EP.10 — Pandas 與資料處理實戰'],
    posts: [
      {
        title: 'EP.09 — Tkinter GUI 開發：事件驅動設計、元件配置、與 Raspberry Pi 的自動化測試應用',
        subtitle: '將腳本轉化為工具：利用 Python 內建庫建構視窗介面，實現產線自動化控制中心',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/python/ep09-tkinter-gui', isExternal: false, ep: 'EP.09',
      },
      {
        title: 'EP.08 — PyTorch 入門：Tensor 操作、autograd、訓練迴圈，AI 工程師必備基礎',
        subtitle: '進入深度學習的世界：掌握 PyTorch 的核心機制，從基礎運算到訓練第一個神經網路',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/python/ep08-pytorch-basics', isExternal: false, ep: 'EP.08',
      },
      {
        title: 'EP.01 — OpenCV + 機械手臂',
        subtitle: '電腦視覺自動定位系統實戰：從影像辨識到 XY 軸座標轉換的完整技術拆解',
        date: '2025', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/python/ep01-opencv-automation', isExternal: false, ep: 'EP.01',
      },
    ],
  },
  {
    id: 'leetcode',
    label: 'LeetCode 系列',
    icon: <Code2 size={22} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    chipColor: 'primary',
    description: '從 HashMap 到圖論，20 個主題帶你系統性地建立演算法思維。',
    comingSoon: ['EP.23 — 即將推出'],
    posts: [
      {
        title: 'EP.22 — Math：數學解題技巧',
        subtitle: '#9 Palindrome Number · #50 Pow(x, n) · #202 Happy Number · #204 Count Primes',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep22-math', isExternal: false, ep: 'EP.22',
      },
      {
        title: 'EP.21 — Bit Manipulation：位元操作的魔法',
        subtitle: '#191 Number of 1 Bits · #338 Counting Bits · #268 Missing Number · #136 Single Number',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep21-bit-manipulation', isExternal: false, ep: 'EP.21',
      },
      {
        title: 'EP.20 — Heap：永遠能找到最大或最小',
        subtitle: '#215 Kth Largest Element · #347 Top K Frequent · #295 Find Median from Data Stream',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep20-heap', isExternal: false, ep: 'EP.20',
      },
      {
        title: 'EP.19 — Trie：為字串搜尋而生的樹',
        subtitle: '#208 Implement Trie · #211 Add and Search Words · #648 Replace Words',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep19-trie', isExternal: false, ep: 'EP.19',
      },
      {
        title: 'EP.18 — Monotonic Stack：維持單調的 Stack',
        subtitle: '#739 Daily Temperatures · #496 Next Greater Element · #42 Trapping Rain Water',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep18-monotonic-stack', isExternal: false, ep: 'EP.18',
      },
      {
        title: 'EP.17 — Intervals：先排序，再掃一遍',
        subtitle: '#56 Merge Intervals · #435 Non-overlapping · #253 Meeting Rooms II',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep17-intervals', isExternal: false, ep: 'EP.17',
      },
      {
        title: 'EP.16 — Greedy：每一步都選當下最好的',
        subtitle: '#55 Jump Game · #45 Jump Game II · #134 Gas Station',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep16-greedy', isExternal: false, ep: 'EP.16',
      },
      {
        title: 'EP.15 — Backtracking：走不通就退回來',
        subtitle: '#78 Subsets · #46 Permutations · #39 Combination Sum',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep15-backtracking', isExternal: false, ep: 'EP.15',
      },
      {
        title: 'EP.14 — Graph 拓撲排序',
        subtitle: '#207 Course Schedule · #210 — BFS Kahn 演算法、DFS 後序法',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep14-graph-topo', isExternal: false, ep: 'EP.14',
      },
      {
        title: 'EP.13 — Graph 入門：DFS 走訪',
        subtitle: '#200 Number of Islands · #133 Clone Graph — 鄰接表 + visited 集合',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep13-graph-dfs', isExternal: false, ep: 'EP.13',
      },
      {
        title: 'EP.12 — DP 進階：最佳化、序列、分割',
        subtitle: '#322 Coin Change · #300 LIS · #139 Word Break',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep12-dp-advanced', isExternal: false, ep: 'EP.12',
      },
      {
        title: 'EP.11 — DP 入門：從記憶化到空間最佳化',
        subtitle: '#70 Climbing Stairs · #198 House Robber — 五步框架',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep11-dp-basics', isExternal: false, ep: 'EP.11',
      },
      {
        title: 'EP.10 — Tree BFS & BST',
        subtitle: '#102 Level Order · #98 Validate BST · #235 LCA',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep10-tree-bfs-bst', isExternal: false, ep: 'EP.10',
      },
      {
        title: 'EP.09 — Tree & DFS：遞迴的本質',
        subtitle: '#104 Max Depth · #100 Same Tree · #226 Invert',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep09-tree-dfs', isExternal: false, ep: 'EP.09',
      },
      {
        title: 'EP.08 — Linked List：Pointer 操作',
        subtitle: '#206 Reverse · #21 Merge · #141 Cycle',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep08-linked-list', isExternal: false, ep: 'EP.08',
      },
      {
        title: 'EP.07 — Binary Search',
        subtitle: '#704 Binary Search · #33 Search in Rotated Sorted Array',
        date: 'October 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep07-binary-search', isExternal: false, ep: 'EP.07',
      },
      {
        title: 'EP.06 — Stack：後進先出',
        subtitle: '#20 Valid Parentheses — Stack 最經典的應用',
        date: 'October 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep06-stack', isExternal: false, ep: 'EP.06',
      },
      {
        title: 'EP.05 — Sliding Window',
        subtitle: '#121 Best Time to Buy and Sell Stock',
        date: 'September 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep05-sliding-window', isExternal: false, ep: 'EP.05',
      },
      {
        title: 'EP.04 — Two Pointers：從 "0P" 踩坑說起',
        subtitle: '#125 Valid Palindrome',
        date: 'August 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep04-two-pointers', isExternal: false, ep: 'EP.04',
      },
      {
        title: 'EP.03 — #49 Group Anagrams：defaultdict 的正確用法',
        subtitle: '排序作為 key，用 defaultdict 分組',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep03-group-anagrams', isExternal: false, ep: 'EP.03',
      },
      {
        title: 'EP.02 — Set vs Dict：選對資料結構',
        subtitle: '#217 Contains Duplicate · #242 Valid Anagram',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep02-set-vs-dict', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — #1 Two Sum：從暴力解到 HashMap 思維',
        subtitle: '同一題三種解法，複雜度從 O(n²) 降到 O(n)',
        date: 'November 2023', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/ep01-two-sum', isExternal: false, ep: 'EP.01',
      },
      {
        title: 'Python 算法學習復盤：投票、鏈表與 Top-K',
        subtitle: 'Boyer-Moore 投票演算法、dummy_head 模式、Heap vs 桶排序 — 從七段對話整理的深度解析',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/python-review', isExternal: false,
      },
      {
        title: 'LeetCode Python 踩坑紀錄',
        subtitle: '那些刷題時讓我卡關的 Python 細節，整理給自己也給你（#1–#7 持續更新）',
        date: 'April 30, 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode/python-pitfalls', isExternal: false,
      },
    ],
  },
  {
    id: 'web',
    label: '個人網頁開發',
    icon: <Globe size={22} />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    chipColor: 'secondary',
    description: '從無到有建立個人作品集，記錄技術選型、踩坑與部署的完整過程。',
    comingSoon: ['EP.12 — HeroUI 元件庫使用心得'],
    posts: [
      {
        title: 'EP.11 — Bootstrap 入門：Grid 系統、元件庫、與 Tailwind 的設計哲學比較',
        subtitle: '曾經統治前端世界的 CSS 框架皇者，從快速原型開發到現代實務中的定位',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep11-bootstrap-basics', isExternal: false, ep: 'EP.11',
      },
      {
        title: 'EP.10 — HTML/CSS 核心概念：Box Model、Flexbox、Grid、RWD，前端面試最常考的基礎題',
        subtitle: '徹底搞懂現代網頁佈局的底層機制，從盒模型到響應式設計實戰',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep10-html-css-basics', isExternal: false, ep: 'EP.10',
      },
      {
        title: 'EP.09 — 部落格導覽與搜尋系統實戰',
        subtitle: '結構設計、雙層搜尋演算法與 IntersectionObserver 滾動追蹤',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep09-advanced-nav', isExternal: false, ep: 'EP.09',
      },
      {
        title: 'EP.08 — Vercel 部署上線 push 一下，全世界都能看到',
        subtitle: 'GitHub + Vercel，免費、自動化、有預覽 URL， 這就是 chullin.vercel.app 的部署方式',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep08-vercel-deploy', isExternal: false, ep: 'EP.08',
      },
      {
        title: 'EP.07 — Framer Motion 讓頁面元素動起來',
        subtitle: '我的網頁所有滑入、淡出、滾動觸發動畫都靠它， 幾行程式碼就能讓靜態頁面瞬間有生命感',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep07-framer-motion', isExternal: false, ep: 'EP.07',
      },
      {
        title: 'EP.06 — HeroUI 元件庫 現成 UI 積木，快速建出美觀介面',
        subtitle: 'Card、Button、Chip、Divider — 我的網頁所有 UI 元件都來自這裡， 安裝一次，直接拿來用',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep06-heroui', isExternal: false, ep: 'EP.06',
      },
      {
        title: 'EP.05 — Tailwind CSS 不再寫 CSS 檔，class 就是樣式',
        subtitle: '我的個人網頁沒有任何手寫的 .css 檔案（除了全域設定）， 所有樣式都寫在 className 裡面',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep05-tailwind', isExternal: false, ep: 'EP.05',
      },
      {
        title: 'EP.04 — React 核心概念 Component、JSX、Props、State',
        subtitle: '看懂我的個人網頁每一行程式碼的關鍵 用你已經看過的實際程式碼來說明',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep04-react-component', isExternal: false, ep: 'EP.04',
      },
      {
        title: 'EP.03 — 認識 Next.js 專案結構 每個資料夾都有它的職責',
        subtitle: '打開 VS Code 看到一堆資料夾 and 檔案不知道從哪裡下手？ 這篇帶你一個一個搞清楚它們的用途',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep03-project-structure', isExternal: false, ep: 'EP.03',
      },
      {
        title: 'EP.02 — 開發環境建置 從零到跑起第一個畫面',
        subtitle: '安裝 Node.js、設定 VS Code、建立 Next.js 專案， 讓你的電腦能跑和我的個人網頁一樣的技術棧',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep02-setup-env', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — 什麼是現代網頁開發？ 從 HTML 到 React 的演進',
        subtitle: '在動手寫第一行程式碼之前，先搞清楚這些名詞： HTML、CSS、JavaScript、React、Next.js 之間的關係',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev/ep01-modern-web', isExternal: false, ep: 'EP.01',
      },
      {
        title: '用 React + Next.js 打造個人作品集',
        subtitle: '從零開始，到 Vercel 部署上線的完整過程',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/general/building-react-portfolio', isExternal: false,
      },
    ],
  },
  {
    id: 'js',
    label: 'JavaScript 深度',
    icon: <Code2 size={22} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: '深入 JS 核心概念：閉包、非同步、原型鏈與現代語法。',
    comingSoon: [],
    posts: [
      {
        title: 'Promise vs async/await：非同步 JS 的現代寫法',
        subtitle: '從 Callback Hell 到 Promise 鏈，再到 async/await，搞懂陷阱與最佳實踐',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js/promise-async', isExternal: false,
      },
      {
        title: 'Event Loop 完整圖解：JS 如何做到「非同步」',
        subtitle: 'Call Stack、Microtask Queue、Macrotask Queue，用互動圖解說清楚執行順序',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js/event-loop', isExternal: false,
      },
      {
        title: '閉包與作用域：JS 最核心的底層機制',
        subtitle: 'var/let/const 差異、作用域鏈、閉包形成原理與 var+迴圈的經典陷阱',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js/closure-scope', isExternal: false,
      },
      {
        title: 'JS 算法學習復盤 閉包、高階函式與那些坑',
        subtitle: '從 LeetCode 30 Days of JavaScript 學習紀錄出發， 整理那些讓我卡關最久、理解最深的 JS 核心觀念',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js/30days-learning-review', isExternal: false,
      },
    ],
  },
  {
    id: 'backend',
    label: '後端語言',
    icon: <Database size={22} />,
    color: 'text-slate-700',
    bgColor: 'bg-slate-50',
    chipColor: 'default',
    description: '從底層 C 語言到現代化 C# / .NET 框架，建立紮實的後端開發與面試競爭力。',
    comingSoon: ['EP.03 — Java Spring Boot 入門'],
    posts: [
      {
        title: 'EP.02 — C# 與 ASP.NET 基礎：型別系統、LINQ、Web API 設計，.NET 工程師面試題',
        subtitle: '現代化企業開發的首選：從強型別語言特性到高性能 Web API 的建構藝術',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/backend/ep02-csharp-aspnet', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — C 語言面試必備：指標、記憶體管理、常見 Coding 題解析',
        subtitle: '深入計算機底層：掌握 C 語言最核心的靈魂，應對韌體與後端效能開發的面試挑戰',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/backend/ep01-c-basics', isExternal: false, ep: 'EP.01',
      },
    ],
  },
  {
    id: 'embedded',
    label: '嵌入式與系統',
    icon: <Cpu size={22} />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    chipColor: 'warning',
    description: '從 Linux 底層指令到硬體通訊協定，記錄嵌入式開發與系統自動化的核心技術。',
    comingSoon: ['EP.04 — Docker 容器化與嵌入式部署'],
    posts: [
      {
        title: 'EP.03 — UART & I2C 通訊協定：嵌入式硬體溝通原理，Python 實作與面試常考題',
        subtitle: '硬體工程師與軟體工程師的共同語言：掌握 UART 與 I2C 的底層機制與除錯技巧',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/embedded/ep03-uart-i2c', isExternal: false, ep: 'EP.03',
      },
      {
        title: 'EP.02 — Shell Script 入門：變數、迴圈、條件判斷，10 個讓工作自動化的腳本模板',
        subtitle: '告別重複勞動：掌握 Bash 腳本核心語法，打造高效的自動化開發環境',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/embedded/ep02-shell-script', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — Linux 基礎指令：檔案操作、權限、cron、process，嵌入式工程師必知的 20 個指令',
        subtitle: '進入 Linux 世界的第一步：從檔案管理到系統監控，掌握最核心的命令列工具',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/embedded/ep01-linux-basics', isExternal: false, ep: 'EP.01',
      },
    ],
  },
  {
    id: 'workflow',
    label: '工具與開發流程',
    icon: <Settings size={22} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    chipColor: 'primary',
    description: '從版本控制到容器化部署，掌握工程師必備的現代開發工具鏈。',
    comingSoon: ['EP.03 — CI/CD 自動化部署實戰'],
    posts: [
      {
        title: 'EP.02 — Docker 入門：Image、Container、Compose 一次搞懂，面試必備概念',
        subtitle: '環境一致性的終極解決方案：從建構映像檔到多容器編排的完整指南',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/workflow/ep02-docker-basics', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — Git 入門到實戰：commit / branch / rebase 原理，面試最常考的 10 題',
        subtitle: '不只是存檔：掌握版本控制的底層邏輯，應對團隊協作中的各種挑戰',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/workflow/ep01-git-basics', isExternal: false, ep: 'EP.01',
      },
    ],
  },
  {
    id: 'other',
    label: '其他文章',
    icon: <Compass size={22} />,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    chipColor: 'default',
    description: '技術筆記、隨筆與探索。',
    comingSoon: [],
    posts: [
      {
        title: '錄製音檔、安裝 TensorFlow、設置 Python 虛擬環境',
        subtitle: '請確保您已經安裝了適當的 GPU 驅動程序，並且您的 GPU 支持 CUDA',
        date: 'December 16, 2023', author: 'Joseph Chen', type: 'External',
        href: 'https://chullin.github.io/Exploring-Neural-Networks/', isExternal: true,
      },
      {
        title: 'Man must explore, and this is exploration at its greatest',
        subtitle: 'Problems look mighty small from 150 miles up',
        date: 'August 24, 2023', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/general/man-must-explore', isExternal: false,
      },
    ],
  },
];
