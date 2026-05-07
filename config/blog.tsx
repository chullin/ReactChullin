import { Code2, Bot, Terminal, Globe, Hash, BookOpen, Cpu, Braces } from 'lucide-react';

export type Post = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  href: string;
  isExternal: boolean;
  ep?: string;
};

export type Series = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  chipColor: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
  description: string;
  posts: Post[];
  comingSoon?: string[];
};

export const series: Series[] = [
  /* ──────────────────── LeetCode ──────────────────── */
  {
    id: 'leetcode',
    label: 'LeetCode 系列',
    icon: <Code2 size={22} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    chipColor: 'primary',
    description: '從 HashMap 到 Bit Manipulation，22 個主題帶你系統性建立演算法思維。',
    comingSoon: [],
    posts: [
      { title: 'EP.22 — Math：數學解題技巧', subtitle: '#9 Palindrome Number · #50 Pow(x,n) · #202 Happy Number · #204 Count Primes — 快速冪、Sieve、Floyd 判環', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep22-math', isExternal: false, ep: 'EP.22' },
      { title: 'EP.21 — Bit Manipulation：位元操作的魔法', subtitle: '#191 Number of 1 Bits · #338 Counting Bits · #268 Missing Number · #136 Single Number — XOR 與 Brian Kernighan', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep21-bit-manipulation', isExternal: false, ep: 'EP.21' },
      { title: 'EP.20 — Heap：永遠能找到最大或最小', subtitle: '#215 Kth Largest · #347 Top K Frequent · #295 Find Median from Data Stream — heapq 實戰與雙 Heap 技巧', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep20-heap', isExternal: false, ep: 'EP.20' },
      { title: 'EP.19 — Trie：為字串搜尋而生的樹', subtitle: '#208 Implement Trie · #211 Add and Search Words · #648 Replace Words — 前綴共享，O(L) 查詢', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep19-trie', isExternal: false, ep: 'EP.19' },
      { title: 'EP.18 — Monotonic Stack：維持單調的 Stack', subtitle: '#739 Daily Temperatures · #496 Next Greater Element · #42 Trapping Rain Water — 從 O(n²) 到 O(n)', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep18-monotonic-stack', isExternal: false, ep: 'EP.18' },
      { title: 'EP.17 — Intervals：先排序，再掃一遍', subtitle: '#56 Merge Intervals · #435 Non-overlapping · #253 Meeting Rooms II — 所有區間題的共同鑰匙', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep17-intervals', isExternal: false, ep: 'EP.17' },
      { title: 'EP.16 — Greedy：每一步都選當下最好的', subtitle: '#55 Jump Game · #45 Jump Game II · #134 Gas Station — 貪心演算法的數學保證', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep16-greedy', isExternal: false, ep: 'EP.16' },
      { title: 'EP.15 — Backtracking：走不通就退回來', subtitle: '#78 Subsets · #46 Permutations · #39 Combination Sum — 一個框架搞定所有「列出所有可能」', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep15-backtracking', isExternal: false, ep: 'EP.15' },
      { title: 'EP.14 — Graph 進階：拓撲排序與環的偵測', subtitle: "#207 Course Schedule · #210 Course Schedule II — Kahn's Algorithm、BFS 與 DFS 判環", date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep14-graph-topo', isExternal: false, ep: 'EP.14' },
      { title: 'EP.13 — Graph 入門：DFS 在圖上長什麼樣子', subtitle: '#200 Number of Islands · #133 Clone Graph — Grid DFS、visited 集合、adjacency list', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep13-graph-dfs', isExternal: false, ep: 'EP.13' },
      { title: 'EP.12 — DP 進階：最佳化、序列、分割', subtitle: '#322 Coin Change · #300 LIS · #139 Word Break — 三種進階 DP 模板', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep12-dp-advanced', isExternal: false, ep: 'EP.12' },
      { title: 'EP.11 — DP 入門：把大問題拆成子問題', subtitle: '#70 Climbing Stairs · #198 House Robber — 記憶化搜尋到 Bottom-up DP', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep11-dp-basics', isExternal: false, ep: 'EP.11' },
      { title: 'EP.10 — Tree BFS & BST', subtitle: '#102 Level Order · #98 Validate BST · #235 LCA — 層序遍歷、驗證 BST、找共同祖先', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep10-tree-bfs-bst', isExternal: false, ep: 'EP.10' },
      { title: 'EP.09 — Tree & DFS：遞迴的本質，就是信任自己', subtitle: '#104 Max Depth · #543 Diameter · #110 Balanced BST — 4步遞迴框架', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep09-tree-dfs', isExternal: false, ep: 'EP.09' },
      { title: 'EP.08 — Linked List：Pointer 操作的思維方式', subtitle: '#206 Reverse · #21 Merge Two · #141 Cycle Detection — 雙指標與虛擬頭節點', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep08-linked-list', isExternal: false, ep: 'EP.08' },
      { title: 'EP.07 — Binary Search：每次砍掉一半', subtitle: '#704 Binary Search · #33 Search in Rotated · #153 Find Minimum — 左閉右開模板', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep07-binary-search', isExternal: false, ep: 'EP.07' },
      { title: 'EP.06 — Stack：後進先出，解決「配對」問題', subtitle: '#20 Valid Parentheses · #84 Largest Rectangle — Stack 的本質是「暫存待處理的事」', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep06-stack', isExternal: false, ep: 'EP.06' },
      { title: 'EP.05 — Sliding Window：用一個視窗掃過整個陣列', subtitle: '#121 Best Time to Buy Stock · #3 Longest Substring — O(n) 取代雙迴圈', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep05-sliding-window', isExternal: false, ep: 'EP.05' },
      { title: 'EP.04 — Two Pointers：從「0P Bug」說起', subtitle: '#125 Valid Palindrome · #167 Two Sum II — 左右指標逼近法', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep04-two-pointers', isExternal: false, ep: 'EP.04' },
      { title: 'EP.03 — Group Anagrams：defaultdict 的正確用法', subtitle: '#49 Group Anagrams — 用 sorted tuple 當 key，defaultdict(list) 分組', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep03-group-anagrams', isExternal: false, ep: 'EP.03' },
      { title: 'EP.02 — Set vs Dict：選對資料結構', subtitle: 'set 的 O(1) 查找 vs dict 的鍵值對，什麼時候用哪個？', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep02-set-vs-dict', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — Two Sum：HashMap 思維入門', subtitle: '#1 Two Sum — 從暴力解 O(n²) 到 HashMap O(n)，LeetCode 第一課', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/ep01-two-sum', isExternal: false, ep: 'EP.01' },
      { title: 'LeetCode Python 踩坑紀錄', subtitle: '那些刷題時讓我卡關的 Python 細節 — 可變預設值、淺拷貝、整數溢出', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/python-pitfalls', isExternal: false },
      { title: 'LeetCode Python 複習筆記', subtitle: '從零開始的 Python 語法整理，配合刷題加速上手', date: '2026', author: 'Joseph Chen', href: '/blog/leetcode/python-review', isExternal: false },
    ],
  },

  /* ──────────────────── Web Dev ──────────────────── */
  {
    id: 'web',
    label: 'Web 開發系列',
    icon: <Globe size={22} />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    chipColor: 'secondary',
    description: '從零建立 React + Next.js 作品集，到 Git、Docker、HTML/CSS 工程師必備工具。',
    comingSoon: [],
    posts: [
      { title: 'EP.13 — Docker 入門：Container、Image、Compose 一次搞懂', subtitle: 'Image 是食譜、Container 是料理 — Docker 核心概念與面試必備問題', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep13-docker', isExternal: false, ep: 'EP.13' },
      { title: 'EP.12 — Git 入門到實戰：commit / branch / rebase 原理', subtitle: '工程師每天都在用，但真的懂嗎？面試最常考的 10 個 Git 問題', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep12-git', isExternal: false, ep: 'EP.12' },
      { title: 'EP.11 — Bootstrap 入門：Grid 系統與元件庫', subtitle: '12 欄 Grid、RWD Breakpoint、與 Tailwind 的設計哲學比較', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep11-bootstrap', isExternal: false, ep: 'EP.11' },
      { title: 'EP.10 — HTML/CSS 核心概念：前端面試基礎題', subtitle: 'Box Model、Flexbox、Grid、RWD — 寫前端 10 年都用得到的基礎', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep10-html-css', isExternal: false, ep: 'EP.10' },
      { title: 'EP.09 — 部落格導航與搜尋系統', subtitle: '從結構設計到演算法實作 — config/blog.tsx、即時搜尋、IntersectionObserver TOC', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep09-advanced-nav', isExternal: false, ep: 'EP.09' },
      { title: 'EP.08 — Vercel 部署上線', subtitle: 'push 一下，全世界都能看到 — Preview Deploy、環境變數、自訂網域', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep08-vercel-deploy', isExternal: false, ep: 'EP.08' },
      { title: 'EP.07 — Framer Motion：讓頁面元素動起來', subtitle: 'motion.div、AnimatePresence、viewport 觸發動畫 — 4 個常用 Pattern', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep07-framer-motion', isExternal: false, ep: 'EP.07' },
      { title: 'EP.06 — HeroUI 元件庫：現成 UI 積木', subtitle: '快速建出美觀介面 — Card、Modal、Chip、Accordion 實戰', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep06-heroui', isExternal: false, ep: 'EP.06' },
      { title: 'EP.05 — Tailwind CSS：不再寫 CSS 檔', subtitle: 'utility-first 設計哲學，class 就是樣式 — 30 個最常用 class 整理', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep05-tailwind', isExternal: false, ep: 'EP.05' },
      { title: 'EP.04 — React 核心概念', subtitle: 'Component、JSX、Props、State、useEffect — 你需要知道的 React 基礎', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep04-react-component', isExternal: false, ep: 'EP.04' },
      { title: 'EP.03 — 認識 Next.js 專案結構', subtitle: '每個資料夾都有它的職責 — app/、components/、public/ 詳解', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep03-project-structure', isExternal: false, ep: 'EP.03' },
      { title: 'EP.02 — 開發環境建置：從零到跑起第一個畫面', subtitle: 'Node.js、VS Code、Next.js create — 讓你的環境跑起來', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep02-setup-env', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — 什麼是現代網頁開發？', subtitle: '從 HTML 到 React 的演進 — 為什麼要學 Component-based 開發', date: '2026', author: 'Joseph Chen', href: '/blog/web-dev/ep01-modern-web', isExternal: false, ep: 'EP.01' },
    ],
  },

  /* ──────────────────── AI 離線部署 ──────────────────── */
  {
    id: 'ai',
    label: 'AI 離線部署',
    icon: <Bot size={22} />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    chipColor: 'secondary',
    description: '在隔離網路環境部署本地 LLM — Ollama、Dify、Transformer TTS 完整實戰。',
    comingSoon: [],
    posts: [
      { title: 'EP.08 — 從 Transformer 延伸到 ChatGPT', subtitle: 'BERT、GPT、LLM 的演進史 — 從語音合成到通用語言智慧的跨越', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep08-transformer-to-gpt', isExternal: false, ep: 'EP.08' },
      { title: 'EP.07 — Fine-tuning 實戰：LoRA 與 Adapter', subtitle: '加上 ASR 語音辨識基礎與 Whisper 微調 — 參數高效微調 (PEFT) 的優雅方案', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep07-finetune-lora', isExternal: false, ep: 'EP.07' },
      { title: 'EP.06 — 嵌入式落地實戰', subtitle: '模型壓縮、量化與邊緣部署 — Pruning、Quantization、Knowledge Distillation 原理與實戰', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep06-tts-edge-deploy', isExternal: false, ep: 'EP.06' },
      { title: 'EP.05 — 聲碼器演進與端到端 TTS', subtitle: 'Tacotron2、FastSpeech2、WaveNet、HiFi-GAN、VITS——五大模型核心邏輯與端到端架構', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep05-tts-models', isExternal: false, ep: 'EP.05' },
      { title: 'EP.04 — Transformer & TTS：語音合成架構原理', subtitle: 'Encoder-Decoder、Attention Mechanism、從論文到嵌入式推論 — 碩士論文主題精華', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep04-transformer-tts', isExternal: false, ep: 'EP.04' },
      { title: 'EP.03 — Dify 工作流程設計：在本地 LLM 前加 Orchestration 層', subtitle: 'No-code AI Pipeline、Knowledge Base、Agent 串接 — 打造可控的企業級 AI 應用', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep03-dify', isExternal: false, ep: 'EP.03' },
      { title: 'EP.02 — Ollama 本地 LLM 部署全攻略', subtitle: '含離線環境搬檔教學 — 下載 .tar、複製到目標機、systemd 服務設定', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep02-ollama-local-llm', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — 什麼是 Air-gapped AI？', subtitle: '從工廠內網 LLM 說起 — 為什麼工廠需要離線 AI，以及挑戰與解法', date: '2026', author: 'Joseph Chen', href: '/blog/ai/ep01-airgapped-intro', isExternal: false, ep: 'EP.01' },
    ],
  },

  /* ──────────────────── Embedded & Systems ──────────────────── */
  {
    id: 'embedded',
    label: '嵌入式與系統',
    icon: <Cpu size={22} />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    chipColor: 'default',
    description: 'Linux、Shell Script、嵌入式通訊協定 — 軟體工程師必備的系統底層知識。',
    comingSoon: [],
    posts: [
      { title: 'EP.03 — UART & I2C：嵌入式硬體溝通基礎原理', subtitle: '不需要深入硬體，只需理解軟體工程師該懂的通訊概念與 Python 實作', date: '2026', author: 'Joseph Chen', href: '/blog/embedded/ep03-uart-i2c', isExternal: false, ep: 'EP.03' },
      { title: 'EP.02 — Shell Script 入門：讓工作自動化', subtitle: '變數、迴圈、條件判斷、函數 — 10 個工程師實際用到的腳本模板', date: '2026', author: 'Joseph Chen', href: '/blog/embedded/ep02-shell', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — Linux 基礎指令：嵌入式工程師必知的 20 個指令', subtitle: '檔案操作、權限管理、cron 排程、process 管理 — 附面試常考題', date: '2026', author: 'Joseph Chen', href: '/blog/embedded/ep01-linux', isExternal: false, ep: 'EP.01' },
    ],
  },

  /* ──────────────────── Python 系列 ──────────────────── */
  {
    id: 'python',
    label: 'Python 系列',
    icon: <Terminal size={22} />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    chipColor: 'success',
    description: 'OpenCV 自動化、PyTorch 入門、Tkinter GUI — Python 在工作中的實際應用。',
    comingSoon: [],
    posts: [
      { title: 'EP.03 — Tkinter GUI：Python 桌面應用開發', subtitle: '事件驅動設計、Grid 佈局、與 Raspberry Pi 自動化測試的實際整合', date: '2026', author: 'Joseph Chen', href: '/blog/python/ep03-tkinter', isExternal: false, ep: 'EP.03' },
      { title: 'EP.02 — PyTorch 入門：AI 工程師必備基礎', subtitle: 'Tensor 操作、autograd、訓練迴圈 — 從 NumPy 思維到深度學習框架', date: '2026', author: 'Joseph Chen', href: '/blog/python/ep02-pytorch', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — OpenCV + 機械手臂：電腦視覺自動定位系統', subtitle: 'HSV 顏色過濾、仿射變換校準、serial 控制手臂 — 實際工廠部署案例', date: '2026', author: 'Joseph Chen', href: '/blog/python/ep01-opencv-automation', isExternal: false, ep: 'EP.01' },
    ],
  },

  /* ──────────────────── Backend Languages ──────────────────── */
  {
    id: 'lang',
    label: '後端語言',
    icon: <Braces size={22} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: 'C 語言與 C# / ASP.NET — 軟體工程師面試必備的後端語言核心概念。',
    comingSoon: [],
    posts: [
      { title: 'EP.02 — C# 與 ASP.NET：.NET 工程師面試題', subtitle: '型別系統、LINQ、Web API 設計 — C# 語法特性與後端開發核心概念', date: '2026', author: 'Joseph Chen', href: '/blog/lang/ep02-csharp', isExternal: false, ep: 'EP.02' },
      { title: 'EP.01 — C 語言面試必備：指標與記憶體管理', subtitle: '指標基礎、Stack vs Heap、struct、常見面試 Coding 題解析', date: '2026', author: 'Joseph Chen', href: '/blog/lang/ep01-c', isExternal: false, ep: 'EP.01' },
    ],
  },

  /* ──────────────────── JavaScript ──────────────────── */
  {
    id: 'js',
    label: 'JavaScript 系列',
    icon: <Hash size={22} />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    chipColor: 'warning',
    description: 'Closure、Event Loop、Promise — JavaScript 面試最常考的核心概念深度解析。',
    comingSoon: [],
    posts: [
      { title: 'JavaScript 30 天學習回顧', subtitle: '從零開始的 JS 學習旅程，踩過的坑與學到的最重要觀念', date: '2026', author: 'Joseph Chen', href: '/blog/js/30days-learning-review', isExternal: false },
      { title: 'Promise & Async/Await：非同步 JS 完整指南', subtitle: 'Promise chain、async/await 語法糖、錯誤處理 — 面試必考題解析', date: '2026', author: 'Joseph Chen', href: '/blog/js/promise-async', isExternal: false },
      { title: 'Event Loop：JavaScript 如何做到非同步？', subtitle: 'Call Stack、Task Queue、Microtask Queue — 搞懂 JS 執行環境', date: '2026', author: 'Joseph Chen', href: '/blog/js/event-loop', isExternal: false },
      { title: 'Closure × Scope：JavaScript 最常被問的面試題', subtitle: '閉包原理、作用域鏈、常見陷阱 — 從原理到面試答法', date: '2026', author: 'Joseph Chen', href: '/blog/js/closure-scope', isExternal: false },
    ],
  },

  /* ──────────────────── General ──────────────────── */
  {
    id: 'general',
    label: '一般文章',
    icon: <BookOpen size={22} />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    chipColor: 'default',
    description: '作品集建置心得、技術隨筆，以及那些不屬於任何系列卻值得記錄的事。',
    comingSoon: [],
    posts: [
      { title: '用 React + Next.js 打造個人作品集', subtitle: '從零開始，到 Vercel 部署上線 — 解決 Git 分支衝突與生產環境配置的完整紀錄', date: '2026', author: 'Joseph Chen', href: '/blog/general/building-react-portfolio', isExternal: false },
      { title: 'Man must explore, and this is exploration at its greatest', subtitle: 'Problems look mighty small from 150 miles up', date: '2023', author: 'Joseph Chen', href: '/blog/general/man-must-explore', isExternal: false },
    ],
  },
];
