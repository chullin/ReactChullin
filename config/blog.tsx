import { Code2, Bot, Terminal, Globe, Hash, BookOpen, Cpu, Braces, RefreshCcw, Layers, Database } from 'lucide-react';

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
  {
    id: 'leetcode',
    label: 'LeetCode 系列',
    icon: <Code2 size={22} />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    chipColor: 'primary',
    description: '從 HashMap 到 Bit Manipulation，22 個主題帶你系統性建立演算法思維。',
    posts: [
      {
            title: "Math 數學解題技巧",
            subtitle: "#9 Palindrome Number · #50 Pow(x, n) · #202 Happy Number · #204 Count Primes — 快速冪、篩法、Floyd 判環，把數學性質變成演算法武器",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep22-math",
            isExternal: false,
            ep: "EP.22"
      },
      {
            title: "Bit Manipulation 位元操作的魔法",
            subtitle: "#191 Number of 1 Bits · #338 Counting Bits · #268 Missing Number · #136 Single Number — 用 XOR 與位移取代迴圈，寫出令人拍案的 O(1) 解法",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep21-bit-manipulation",
            isExternal: false,
            ep: "EP.21"
      },
      {
            title: "EP.20 — Heap：從 Top K Frequent 到 heapq 底層",
            subtitle: "#347 Top K Frequent Elements — 從 Counter.most_common、串列生成式、heapq.nlargest / nsmallest，一路理解 heapq 常用函式與 binary heap 結構",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep20-heap",
            isExternal: false,
            ep: "EP.20"
      },
      {
            title: "EP.19 — Trie： 為字串搜尋而生的樹",
            subtitle: "#208 Implement Trie · #211 Add and Search Words · #648 Replace Words — 從零實作 Trie，到 DFS 萬用字元搜尋",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep19-trie",
            isExternal: false,
            ep: "EP.19"
      },
      {
            title: "EP.18 — Monotonic Stack： 維持單調的 Stack",
            subtitle: "#739 Daily Temperatures · #496 Next Greater Element · #42 Trapping Rain Water — 從 O(n²) 暴力到 O(n) 的關鍵資料結構",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep18-monotonic-stack",
            isExternal: false,
            ep: "EP.18"
      },
      {
            title: "EP.17 — Intervals： 先排序，再掃一遍",
            subtitle: "#56 Merge Intervals · #435 Non-overlapping Intervals · #253 Meeting Rooms II — 所有區間題的共同鑰匙：按 start 排序",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep17-intervals",
            isExternal: false,
            ep: "EP.17"
      },
      {
            title: "EP.16 — Greedy： 每一步都選當下最好的",
            subtitle: "#55 Jump Game · #45 Jump Game II · #134 Gas Station — 貪心演算法不是亂猜，是有數學保證的局部最優",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep16-greedy",
            isExternal: false,
            ep: "EP.16"
      },
      {
            title: "EP.15 — Backtracking： 走不通就退回來",
            subtitle: "#78 Subsets · #46 Permutations · #39 Combination Sum — 一個框架搞定所有「列出所有可能」的問題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep15-backtracking",
            isExternal: false,
            ep: "EP.15"
      },
      {
            title: "EP.14 — Graph 進階： 拓撲排序與環的偵測",
            subtitle: "#207 Course Schedule · #210 Course Schedule II — Kahn's Algorithm、DFS Cycle Detection、有向圖的排序問題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep14-graph-topo",
            isExternal: false,
            ep: "EP.14"
      },
      {
            title: "EP.13 — Graph 入門： DFS 在圖上長什麼樣子",
            subtitle: "#200 Number of Islands · #133 Clone Graph — Grid DFS、visited 集合、adjacency list 三個核心概念",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep13-graph-dfs",
            isExternal: false,
            ep: "EP.13"
      },
      {
            title: "EP.12 — DP 進階： 最佳化、序列、分割",
            subtitle: "#322 Coin Change · #300 Longest Increasing Subsequence · #139 Word Break — 三種進階 DP 模板，處理無限選擇、序列比對、字串分割",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep12-dp-advanced",
            isExternal: false,
            ep: "EP.12"
      },
      {
            title: "Dynamic Programming 把大問題拆成子問題，然後記住答案",
            subtitle: "#70 Climbing Stairs · #198 House Robber — 用兩題打通 1D DP 的思維",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep11-dp-basics",
            isExternal: false,
            ep: "EP.11"
      },
      {
            title: "Tree BFS & BST 層序遍歷、驗證 BST、找共同祖先",
            subtitle: "#102 Level Order · #98 Validate BST · #235 LCA — 掌握二元搜尋樹的遍歷、驗證與共同祖先尋找，打通樹狀結構的核心操作。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep10-tree-bfs-bst",
            isExternal: false,
            ep: "EP.10"
      },
      {
            title: "Tree & DFS 遞迴的本質，就是信任自己",
            subtitle: "#104 Max Depth · #100 Same Tree · #226 Invert — 三題打通 DFS 思維",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep09-tree-dfs",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "Linked List Pointer 操作的思維方式",
            subtitle: "#206 Reverse · #21 Merge · #141 Cycle — Linked List 三大核心題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep08-linked-list",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "Binary Search 每次砍掉一半，O(log n) 的魔法",
            subtitle: "#704 Binary Search · #33 Search in Rotated Sorted Array — 深入二分搜尋的邊界控制與旋轉陣列查找，寫出 bug-free 的高效 O(log n) 解法。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep07-binary-search",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "Stack 後進先出，解決「配對」問題",
            subtitle: "#20 Valid Parentheses — Stack 最經典的應用，也是單調棧的入口",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep06-stack",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "Sliding Window 用一個視窗掃過整個陣列",
            subtitle: "#121 Best Time to Buy and Sell Stock — Sliding Window 最直觀的入門題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep05-sliding-window",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "Two Pointers 從 \"0P\" 踩坑說起",
            subtitle: "#125 Valid Palindrome — 一個 Bug 讓我徹底理解 Two Pointers",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep04-two-pointers",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "#49 Group Anagrams defaultdict 的正確用法",
            subtitle: "排序作為 key，用 defaultdict 分組——理解這兩件事就解開這題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep03-group-anagrams",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "Set vs Dict 選對資料結構，解題事半功倍",
            subtitle: "#217 Contains Duplicate · #242 Valid Anagram — 選對適合的哈希表與集合結構，將時間複雜度降到 O(n) 的基礎實戰。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep02-set-vs-dict",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "#1 Two Sum 從暴力解到 HashMap 思維",
            subtitle: "同一題三種解法，複雜度從 O(n²) 降到 O(n)",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/ep01-two-sum",
            isExternal: false,
            ep: "EP.01"
      },
      {
            title: "LeetCode Python 踩坑紀錄",
            subtitle: "那些刷題時讓我卡關的 Python 細節，整理給自己也給你",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/python-pitfalls",
            isExternal: false
      },
      {
            title: "Python 算法學習復盤 投票、鏈表與 Top-K 的深度解析",
            subtitle: "從投票法、鏈表操作到 Top-K 問題，整理 Python 演算法練習中的關鍵觀念與常見陷阱。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/leetcode/python-review",
            isExternal: false
      }
],
  },
  {
    id: 'web-dev',
    label: 'Web 開發系列',
    icon: <Globe size={22} />,
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    chipColor: 'danger',
    description: '從零建立 React + Next.js 作品集，到 Git、Docker、HTML/CSS 工程師必備工具。',
    posts: [
      {
            title: "WebSocket： 打造即時互動的心臟",
            subtitle: "不再被動等待回應。學習如何透過全雙工通訊，實現毫秒級的即時聊天、通知系統與多人協作功能。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep37-websocket-realtime",
            isExternal: false,
            ep: "EP.37"
      },
      {
            title: "GraphQL： 重新定義 API 互動",
            subtitle: "不再被 REST 的多個 Endpoint 所困擾。學習如何讓前端精確定義所需的資料，並透過 Apollo Server 打造高效能的 API 層。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep36-graphql",
            isExternal: false,
            ep: "EP.36"
      },
      {
            title: "國際化（i18n）： 用 next-intl 讓你的網站說多國語言",
            subtitle: "next-intl 路由配置、訊息格式化、複數規則、日期貨幣本地化 — 打造真正的多語言 Next.js 應用",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep35-i18n",
            isExternal: false,
            ep: "EP.35"
      },
      {
            title: "Next.js Middleware 與 Edge Runtime： 在邊緣執行你的邏輯",
            subtitle: "Middleware 攔截請求、Edge Functions、Geolocation 分流 — 讓你的應用響應速度提升到 50ms 以內",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep34-nextjs-middleware",
            isExternal: false,
            ep: "EP.34"
      },
      {
            title: "Progressive Web App（PWA） 完整指南",
            subtitle: "Service Worker、Web App Manifest、Push Notification、Offline First — 讓網頁擁有原生 App 的體驗",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep33-pwa",
            isExternal: false,
            ep: "EP.33"
      },
      {
            title: "Web 效能優化： Core Web Vitals 與 Lighthouse 實戰",
            subtitle: "LCP、INP、CLS 三大指標 — 從分析到實際改善，讓你的 Google Search 評分達到 90+",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep32-web-performance",
            isExternal: false,
            ep: "EP.32"
      },
      {
            title: "Next.js 15 & React 19： Server Actions 與新特性完全指南",
            subtitle: "Server Actions、use() hook、PPR、Turbopack 穩定版 — 2026 年現代全端開發的最新樣貌",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep31-nextjs15",
            isExternal: false,
            ep: "EP.31"
      },
      {
            title: "Web 安全實戰： XSS、CSRF、CSP 防禦",
            subtitle: "跨站腳本攻擊、跨站請求偽造、內容安全策略 — OWASP Top 10 前端工程師必懂的攻防",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep30-web-security",
            isExternal: false,
            ep: "EP.30"
      },
      {
            title: "無障礙設計（a11y）： 讓每個人都能使用你的網站",
            subtitle: "ARIA 屬性、語義化 HTML、鍵盤導航、色彩對比 — 前端面試越來越常考，也是做好產品的必修課",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep29-accessibility",
            isExternal: false,
            ep: "EP.29"
      },
      {
            title: "React Router v6： SPA 路由完整指南",
            subtitle: "BrowserRouter、動態路由 :id、Outlet 巢狀、Loader/Action — 非 Next.js 的 React 應用必學",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep28-react-router",
            isExternal: false,
            ep: "EP.28"
      },
      {
            title: "Zustand： 輕量全域狀態管理",
            subtitle: "比 Redux 簡單 10 倍、比 Context 效能更好 — 2026 年最推薦的 React 狀態管理方案",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep27-zustand",
            isExternal: false,
            ep: "EP.27"
      },
      {
            title: "React 測試實戰： Vitest + Testing Library",
            subtitle: "unit test、user-event 互動、mock API、coverage — 讓你的元件可測試、可維護、讓 CI 不再擋你路",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep26-react-testing",
            isExternal: false,
            ep: "EP.26"
      },
      {
            title: "useReducer： 當 useState 不夠用的時候",
            subtitle: "dispatch / action / reducer 三角關係、購物車實戰 — 從 useState 升級到 useReducer 的正確時機",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep25-usereducer",
            isExternal: false,
            ep: "EP.25"
      },
      {
            title: "Error Boundary 與 Suspense： 優雅的錯誤與 Loading 處理",
            subtitle: "不讓白屏毀掉用戶體驗 — 從 class ErrorBoundary 到 react-error-boundary 套件的完整解法",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep24-error-suspense",
            isExternal: false,
            ep: "EP.24"
      },
      {
            title: "React 效能優化三件套： useMemo、useCallback、React.memo",
            subtitle: "什麼時候用、什麼時候反而變慢 — 搞懂 re-render 原理才能正確優化",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep23-performance",
            isExternal: false,
            ep: "EP.23"
      },
      {
            title: "React 表單實戰： 從 useState 到 react-hook-form",
            subtitle: "非同步驗證、Zod Schema、Server Action — 讓表單開發不再痛苦的完整解法",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep22-react-forms",
            isExternal: false,
            ep: "EP.22"
      },
      {
            title: "Context API：告別 Props Drilling 跨元件共享狀態的正確方式",
            subtitle: "createContext、useContext、ThemeContext 實戰、何時不該用 Context — 從「到處傳 props」的地獄中解脫，學會讓資料在元件樹中「自由流動」。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep21-context",
            isExternal: false,
            ep: "EP.21"
      },
      {
            title: "自訂 Hook：把邏輯從元件裡抽出來 讓元件永遠不超過 100 行",
            subtitle: "useLocalStorage、useDebounce、useFetch — 一旦學會，你的元件永遠不會超過 100 行。 Custom Hook 是 React 開發者從「寫得出來」進化到「寫得好」的關鍵一步。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep20-custom-hooks",
            isExternal: false,
            ep: "EP.20"
      },
      {
            title: "React 怎麼和後端說話 fetch、loading 狀態、錯誤處理全攻略",
            subtitle: "從 useEffect + fetch 到 custom hook，再到 Next.js Server Component 的資料請求演進。 學完這篇，你才算真正能寫一個「連得上後端」的 React 應用。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep19-data-fetching",
            isExternal: false,
            ep: "EP.19"
      },
      {
            title: "我的部落格",
            subtitle: "技術文章、LeetCode 題解、工程師日常——全端開發的心得分享",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep18-app-router",
            isExternal: false,
            ep: "EP.18"
      },
      {
            title: "useState 不只是計數器：五種狀態管理場景 物件狀態、陣列狀態、衍生狀態、多個 state——從入門到實戰全覆蓋",
            subtitle: "表單 10 個欄位要寫 10 個 useState 嗎？splice 為什麼不能用？ 這篇五個場景全部解清楚，讓你不再踩坑。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep17-state-patterns",
            isExternal: false,
            ep: "EP.17"
      },
      {
            title: "useEffect 不是「生命週期」 ——是「監聽資料變化」",
            subtitle: "資料請求、副作用、Cleanup——用三個真實場景搞懂 useEffect， React 最常讓初學者困惑的 Hook。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep16-useeffect",
            isExternal: false,
            ep: "EP.16"
      },
      {
            title: "不用 React，做個動態待辦清單 ——然後你就懂了",
            subtitle: "從「手動操作 DOM 的痛苦」理解 React 為什麼存在。 先用原生 JavaScript 體驗那個痛點，再看 React 如何優雅地解決它。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep15-why-react",
            isExternal: false,
            ep: "EP.15"
      },
      {
            title: "TypeScript 入門：型別是你的隊友 從 JS 工程師的角度理解型別思維",
            subtitle: "TypeScript 不是讓你多寫程式碼的工具——它是讓你少 debug 的工具。 這篇從「為什麼要加型別」出發，帶你掌握 Interface、泛型、嚴格模式等核心概念。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep14-typescript",
            isExternal: false,
            ep: "EP.14"
      },
      {
            title: "Docker 入門：Image、Container、Compose 容器化技術一次搞懂",
            subtitle: "Image 是食譜，Container 是料理 — 從 Hello World 到 docker-compose 部署， 附面試必備概念",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep13-docker",
            isExternal: false,
            ep: "EP.13"
      },
      {
            title: "Git 入門到實戰 版本控制的底層邏輯",
            subtitle: "commit / branch / merge / rebase — 工程師每天都在用， 面試最常考的 10 個問題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep12-git",
            isExternal: false,
            ep: "EP.12"
      },
      {
            title: "Bootstrap 入門 Grid 系統與元件庫",
            subtitle: "12 欄 Grid、RWD Breakpoints、Utility classes — 與 Tailwind 設計哲學的核心差異",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep11-bootstrap",
            isExternal: false,
            ep: "EP.11"
      },
      {
            title: "HTML / CSS 核心概念 前端面試基礎題",
            subtitle: "Box Model、Flexbox、Grid、RWD、Selector — 寫前端 10 年都用得到的基礎，面試必考",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep10-html-css",
            isExternal: false,
            ep: "EP.10"
      },
      {
            title: "部落格導航與搜尋系統 從結構設計到演算法實作",
            subtitle: "如何建立一個可擴充的配置系統？如何實作高效的即時搜尋與滾動追蹤目錄？ 本篇將深度拆解 chullin.tw 的導航架構。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep09-advanced-nav",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "Vercel 部署上線 push 一下，全世界都能看到",
            subtitle: "GitHub + Vercel，免費、自動化、有預覽 URL， 這就是 chullin.tw 的部署方式",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep08-vercel-deploy",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "Framer Motion 讓頁面元素動起來",
            subtitle: "我的網頁所有滑入、淡出、滾動觸發動畫都靠它， 幾行程式碼就能讓靜態頁面瞬間有生命感",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep07-framer-motion",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "HeroUI 元件庫 現成 UI 積木，快速建出美觀介面",
            subtitle: "Card、Button、Chip、Divider — 我的網頁所有 UI 元件都來自這裡， 安裝一次，直接拿來用",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep06-heroui",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "Tailwind CSS 不再寫 CSS 檔，class 就是樣式",
            subtitle: "我的個人網頁沒有任何手寫的 .css 檔案（除了全域設定）， 所有樣式都寫在 className 裡面",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep05-tailwind",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "React 核心概念 Component、JSX、Props、State",
            subtitle: "看懂我的個人網頁每一行程式碼的關鍵 用你已經看過的實際程式碼來說明",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep04-react-component",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "認識 Next.js 專案結構 每個資料夾都有它的職責",
            subtitle: "打開 VS Code 看到一堆資料夾和檔案不知道從哪裡下手？ 這篇帶你一個一個搞清楚它們的用途",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep03-project-structure",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "開發環境建置 從零到跑起第一個畫面",
            subtitle: "安裝 Node.js、設定 VS Code、建立 Next.js 專案， 讓你的電腦能跑和我的個人網頁一樣的技術棧",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep02-setup-env",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "什麼是現代網頁開發？ 從 HTML 到 React 的演進",
            subtitle: "在動手寫第一行程式碼之前，先搞清楚這些名詞： HTML、CSS、JavaScript、React、Next.js 之間的關係",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/web-dev/ep01-modern-web",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'js',
    label: 'JavaScript 系列',
    icon: <Hash size={22} />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    chipColor: 'warning',
    description: 'Closure、Event Loop、Promise — JavaScript 面試最常考的核心概念深度解析。',
    posts: [
      {
            title: "Web APIs 實戰： Web Workers、IndexedDB、Intersection Observer",
            subtitle: "瀏覽器原生 API 的三大場景 — 背景執行緒、離線儲存、懶載入 — 不依賴框架的原生能力",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep09-web-apis",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "Functional Programming in JavaScript： 不可變資料與純函數",
            subtitle: "Immutability、Pure Functions、Compose、Functor、Maybe Monad — 讓你的程式碼更可預測、更好測試",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep08-functional-programming",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "JavaScript 設計模式： Observer、Strategy、Factory 實戰",
            subtitle: "三個最常被問到的設計模式 — 用 React 的真實場景帶你理解「為什麼」而非死背",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep07-design-patterns",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "TypeScript 進階：泛型、 Conditional Types、Utility Types 實戰",
            subtitle: "Generic Constraints、infer、Mapped Types、Template Literal — 從「加冒號」到真正的型別工程師",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep06-typescript-advanced",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "Promise & Async： 異步處理的演進史",
            subtitle: "從混亂的 Callback Hell 到優雅的 Async/Await。徹底掌握 JavaScript 處理資料請求與長時間任務的終極方案。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep05-promise-async",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "Event Loop： 單執行緒的異步奇蹟",
            subtitle: "為什麼 JS 只有一個執行緒卻不會卡死？深入理解 Call Stack、Task Queue 與 Microtasks 的協作模式，掌握前端效能優化的核心。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep04-event-loop",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "Closure & Scope： 掌握 JS 的靈魂核心",
            subtitle: "為什麼函式執行完畢後，還能「記得」外部的變數？這不是魔法，而是 JavaScript 最強大也最令人困惑的機制：閉包與作用域。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep03-closure-scope",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "六個 ES6+ 語法， 讓你看懂所有 React 程式碼",
            subtitle: "箭頭函式、解構、展開、模板字串、import/export、選用鏈—— 一次全學完，從此 React 程式碼不再有看不懂的語法",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep02-es6",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "在學 React 之前， 你必須懂的 JavaScript",
            subtitle: "變數、函式、陣列、物件——React 程式碼裡最常用的四樣東西， 一次全部搞懂，從此看 React 程式碼不再霧煞煞",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/ep01-js-basics",
            isExternal: false,
            ep: "EP.01"
      },
      {
            title: "Event Loop 完整圖解 JS 如何做到「非同步」",
            subtitle: "為什麼 setTimeout 0ms 不是真的立刻執行？ Promise 和 setTimeout 誰先誰後？用互動圖解一次說清楚",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/event-loop",
            isExternal: false
      },
      {
            title: "JS 算法學習復盤 閉包、高階函式與那些坑",
            subtitle: "整理 JavaScript 閉包、高階函式與常見踩坑情境，從錯誤寫法對照正確寫法，建立更穩定的 JS 思維。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/30days-learning-review",
            isExternal: false
      },
      {
            title: "Promise vs async/await 非同步 JS 的現代寫法",
            subtitle: "從 Promise chain 到 async/await，理解非同步流程、錯誤處理與實務中更容易維護的寫法。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/promise-async",
            isExternal: false
      },
      {
            title: "閉包與作用域 JS 最核心的底層機制",
            subtitle: "搞懂作用域鏈、var / let / const 的差異、閉包的形成原理， 以及那些最容易在面試和實際開發中踩到的坑",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/js/closure-scope",
            isExternal: false
      }
],
  },
  {
    id: 'network',
    label: '網路協定系列',
    icon: <Globe size={22} />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    chipColor: 'primary',
    description: '從 TCP/IP 三向交握到 HTTP/3，深入理解現代網路傳輸的底層機制與安全防線。',
    posts: [
      {
            title: "TCP/IP 深度解析： 從握手到揮手的旅程",
            subtitle: "為什麼網路傳輸需要這麼繁雜的步驟？深入探討可靠傳輸背後的設計哲學，掌握擁塞控制與視窗機制。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep09-tcp-ip-deep-dive",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "Security Headers： 網頁安全的隱形防線",
            subtitle: "為什麼加了幾個 Header 就能防禦 90% 的攻擊？從 CORS、CSP 到 HSTS，深度解析現代瀏覽器的安全機制與正確配置方法。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep08-security-headers",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "HTTP/3 與 QUIC：下一代網路協定完全解析 為什麼 HTTP/3 比 HTTP/2 快？",
            subtitle: "QUIC 協定原理、0-RTT 連線、多路複用解決 Head-of-Line Blocking — 從 TCP 的致命缺陷說起，解析 HTTP/3 如何從根本上重新設計網路傳輸層， 並帶來連線遷移、0-RTT 等革命性特性。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep07-http3-quic",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "gRPC：微服務間通訊的 高效選擇",
            subtitle: "Protobuf 二進位編碼、Service 定義、Streaming — 比 REST 更快、強型別、自動生成客戶端",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep06-grpc",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "WebSocket 與 SSE： 即時通訊的兩種選擇",
            subtitle: "WebSocket 雙向連線、Server-Sent Events 單向推送 — 聊天室 vs 即時更新，選對工具",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep05-websocket",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "認證與授權：JWT、OAuth2、Session Cookie vs Token、Refresh Token、第三方登入",
            subtitle: "Authentication（認證）和 Authorization（授權）是兩個不同的問題，卻常被混淆。 選錯機制不只讓系統不安全，還讓使用者體驗變差。這篇帶你理解每種方案的設計邏輯與適用場景。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep04-jwt-oauth2",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "HTTPS 是怎麼加密的？ TLS 握手完全解析",
            subtitle: "對稱加密、非對稱加密、憑證鏈——理解 HTTPS 安全的完整原理。 從「為什麼需要加密」開始，到 TLS 握手的每一步，一次全部說清楚。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep03-https-tls",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "你輸入 google.com 接下來 0.1 秒發生了什麼？",
            subtitle: "DNS 解析、IP 路由、TCP 握手——最經典面試題的完整解答。 很多人能說個大概，但說不完整。這篇從頭到尾把每一步說清楚。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep02-dns-ip",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "HTTP 深挖：從輸入網址到畫面出現 DNS、TCP、TLS、HTTP/1.1、HTTP/2、HTTP/3",
            subtitle: "每次瀏覽器請求都走過一條你看不見的旅程。理解這條路上發生了什麼， 才能真正排查效能問題、理解 HTTPS 的意義，以及為什麼 HTTP/2 比 HTTP/1.1 快。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/network/ep01-http",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'devops',
    label: 'DevOps & 雲端系列',
    icon: <RefreshCcw size={22} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    chipColor: 'success',
    description: 'CI/CD、DevSecOps、基礎設施即程式碼 (IaC)，打造自動化且安全的開發流程。',
    posts: [
      {
            title: "DevSecOps： 將安全植入自動化流程",
            subtitle: "不要讓「安全」成為部署的阻礙。學習如何在 CI/CD 的每一秒鐘，自動偵測漏洞、掃描秘密資訊與保護容器鏡像。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep08-devsecops",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "Terraform：Infrastructure as Code 入門 用程式碼管理雲端基礎設施",
            subtitle: "Provider、Resource、State、Module — 告別手動點選 AWS Console， 把整個雲端基礎設施變成可版本控制、可重現、可自動化的程式碼。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep07-terraform",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "監控告警：Prometheus + Grafana 完整實戰 Metrics 四黃金信號、AlertManager、Dashboard 設計",
            subtitle: "讓問題在用戶發現之前就告警給你 — 從 Node.js 暴露 Metrics， 到 PromQL 查詢、Grafana Dashboard，再到 AlertManager 即時告警。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep06-monitoring",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "藍綠部署與 Canary Release： 零 Downtime 上線策略",
            subtitle: "藍綠切換、Canary 灰度發布、Feature Flag、滾動更新 — 讓每次部署都可以安全回滾",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep05-deployment-strategy",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "Kubernetes 入門： Container 編排的下一步",
            subtitle: "Pod、Deployment、Service、Ingress — 從 Docker Compose 到 K8s 的思維轉換，以及為什麼大公司都在用",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep04-kubernetes",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "Docker Compose： 一個指令啟動整個開發環境",
            subtitle: "services、volumes、networks、depends_on — 讓前後端 + 資料庫一鍵啟動，告別「在我電腦可以跑」",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep03-docker-compose",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "CI/CD 入門：GitHub Actions 自動化你的測試與部署流程",
            subtitle: "每次 Push 都要手動跑測試、手動部署？這不是工程師該做的事。 這篇帶你從零開始設定 GitHub Actions，讓 CI/CD 幫你把守每一道關卡。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep02-github-actions",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "測試金字塔：Unit、Integration、E2E 什麼值得測？怎麼測才有效？",
            subtitle: "「寫測試很浪費時間」是初階工程師的想法。 「不寫測試才是最浪費時間的」是走過大型專案的工程師的體悟。 這篇帶你建立正確的測試心態與實作技巧。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/devops/ep01-test-pyramid",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'system-design',
    label: '系統設計系列',
    icon: <Layers size={22} />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    chipColor: 'danger',
    description: '高併發、負載平衡、快取策略、資料庫設計 — 打造可擴展的大型系統架構。',
    posts: [
      {
            title: "Event Sourcing 與 CQRS： 用事件重建一切",
            subtitle: "Event Store、Command/Query 分離、Projection 重建 — 金融、電商最愛的資料架構模式",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep11-event-sourcing",
            isExternal: false,
            ep: "EP.11"
      },
      {
            title: "CDN 與 Edge Computing： 讓資源在全球 50ms 內送達",
            subtitle: "CDN 原理、Edge Caching、Cache Invalidation、Cloudflare Workers — 大流量系統的靜態資源加速策略",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep10-cdn-edge",
            isExternal: false,
            ep: "EP.10"
      },
      {
            title: "微服務拆分原則 與 Service Mesh",
            subtitle: "Domain-Driven Design、Strangler Fig Pattern、Istio Sidecar — 何時拆、怎麼拆、拆完怎麼管",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep09-microservices",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "搜尋系統：Elasticsearch 入門與全文搜尋設計 Inverted Index、Mapping、Query DSL、Relevance Score",
            subtitle: "從 SQL LIKE 到真正的搜尋引擎 — 理解倒排索引如何讓搜尋從 O(n) 變成 O(1)， 掌握 Query DSL 與 Aggregation，最後整合到 Node.js 生產環境。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep08-elasticsearch",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "限流設計：保護你的系統不被打垮 Token Bucket、Leaky Bucket、Sliding Window、Redis 實作",
            subtitle: "面試最常考的限流演算法完整指南。從演算法原理到 Node.js 單機實作， 再到 Redis 分散式方案，最後討論不同資源的限流策略設計。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep07-rate-limiting",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "Message Queue： 用 Kafka 解耦你的系統",
            subtitle: "Producer / Consumer / Topic / Partition — 高流量系統的非同步事件驅動架構完整指南",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep06-message-queue",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "API 設計： REST、GraphQL、tRPC 三種方案的取捨",
            subtitle: "RESTful 最佳實踐、GraphQL N+1 問題解法、tRPC 零配置型別安全 — 根據情境選對 API 架構",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep05-api-design",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "資料庫設計入門： ER Diagram、一對多、正規化",
            subtitle: "從「一張超大表」的痛苦，到規範化設計的清爽—— 系統設計面試必備。你的表結構決定了系統的上限。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep04-db-design",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "快取策略： 讓系統快 10 倍的關鍵決策",
            subtitle: "「加快取就好了」是最常見的回答，也是最危險的回答。 Cache-aside？Write-through？TTL 設多長？資料更新時怎麼辦？ 這篇帶你搞清楚每一種快取策略的原理與取捨。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep03-cache",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "負載均衡： 讓流量自己找到出路",
            subtitle: "一台伺服器撐不住？加一台就好。但加了之後，誰決定每個請求去哪？ 這篇深入負載均衡的演算法、健康檢查、L4 vs L7 差異， 以及在系統設計面試中如何正確使用它。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep02-load-balancer",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "系統設計思維： 從需求分解到架構決策",
            subtitle: "面試官問「設計一個 Instagram」，你該從哪裡開始？ 這篇建立系統設計的思考框架：如何拆解需求、估算容量、 一步步做出有依據的架構決策。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/system-design/ep01-intro",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'database',
    label: '資料庫系列',
    icon: <Database size={22} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: '從 SQL 優化、Index 原理到 NoSQL 與分散式事務，全面掌握資料儲存技術。',
    posts: [
      {
            title: "PostgreSQL 進階：Window Functions、CTE、EXPLAIN ANALYZE 讓你從「會寫 SQL」進化到「寫好 SQL」",
            subtitle: "ROW_NUMBER、RANK、LAG/LEAD、遞迴 CTE、執行計畫優化 — 讓你從「會寫 SQL」進化到「寫好 SQL」",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep07-postgres-advanced",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "Redis 進階應用：Pub/Sub、Lua Script、分散式鎖 不只是快取的完整應用指南",
            subtitle: "Redis Streams、HyperLogLog、Bloom Filter、分散式鎖實作 — Redis 不只是快取的完整應用指南，從 Pub/Sub 到 Lua Script 原子操作， 解鎖 Redis 的全部潛能。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep06-redis-advanced",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "資料庫 Sharding 與讀寫分離 水平擴展的關鍵決策",
            subtitle: "Hash Sharding、Range Sharding、主從複製、Replication Lag — 千萬級資料的分散式資料庫架構，從讀寫分離到 Sharding，一步步解開水平擴展的謎題。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep05-sharding",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "NoSQL 入門：MongoDB 與選型指南 Document Model、Schema 設計、Aggregation Pipeline、Mongoose",
            subtitle: "什麼時候用 NoSQL，什麼時候堅持 SQL？從 Document Model 的本質出發， 一路走到 Aggregation Pipeline 與實際的 Mongoose 開發，再給你一份清晰的選型決策表。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep04-nosql-mongodb",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "交易與鎖定：ACID 不只是面試題 隔離層級、髒讀、幻讀與死鎖實戰",
            subtitle: "「帳戶轉帳扣了錢卻沒入帳」、「庫存超賣」——這些都是交易設計錯誤的結果。 ACID 保證的不只是理論，而是你的資料在並發情況下不會壞掉的底線。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep03-transaction",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "索引（Index）：為什麼你的查詢這麼慢？ B-Tree 原理、複合索引與 EXPLAIN 實戰",
            subtitle: "同樣的 SQL，在 100 筆資料時跑 1ms，在 1000 萬筆時跑 30 秒。 索引是讓資料庫「秒查」的關鍵，但錯誤的索引策略反而會讓系統更慢。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep02-index",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "SQL 入門：SELECT 不只是查資料 從關聯式資料庫到 JOIN 的完整思維",
            subtitle: "資料庫是每個軟體系統的心臟。學 SQL 不只是背指令， 更要理解「為什麼要這樣設計」。本篇從零開始，帶你建立正確的資料庫思維。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/database/ep01-sql-basics",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'ai',
    label: 'AI 離線部署',
    icon: <Bot size={22} />,
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    chipColor: 'danger',
    description: '在隔離網路環境部署本地 LLM — Ollama、Dify、Transformer TTS 完整實戰。',
    posts: [
      {
            title: "OpenCV XY Vision Automation | 智慧化視覺辨識與自動化操作系統",
            subtitle: "透過 OpenCV 視覺辨識與座標轉換，讓傳統依賴固定 XY 座標的自動化測試，升級為可動態辨識 UI 的智慧化操作系統。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep10-opencv-robot",
            isExternal: false,
            ep: "EP.10"
      },
      {
            title: "Test Management System (TMS) | Legacy System 重構實戰",
            subtitle: "分享如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep09-tms",
            isExternal: false,
            ep: "EP.09"
      },
      {
            title: "從 Transformer 延伸到 ChatGPT",
            subtitle: "Attention 機制如何從語音合成走向通用語言智慧 — BERT 雙向編碼器、GPT 系列、RLHF、到 ChatGPT 的誕生",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep08-transformer-to-gpt",
            isExternal: false,
            ep: "EP.08"
      },
      {
            title: "LLM 微調技術詳解：Adapter, LoRA 與 QLoRA",
            subtitle: "由陳憲億（Joseph Chen）撰寫，深入淺出解析 PEFT 技術，包括 Adapter、LoRA 與 QLoRA 的原理與實作，教你如何在消費級 GPU 上微調大模型。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep07-finetune-lora",
            isExternal: false,
            ep: "EP.07"
      },
      {
            title: "嵌入式落地實戰 模型壓縮、量化與邊緣部署",
            subtitle: "VITS 音質再好，也必須壓縮才能跑在智慧穿戴裝置上。 Pruning、Quantization、Knowledge Distillation——三大壓縮技術的原理與取捨，以及 NPU/DSP 部署的實戰眉角。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep06-tts-edge-deploy",
            isExternal: false,
            ep: "EP.06"
      },
      {
            title: "聲碼器演進與端到端 TTS：從 WaveNet 到 VITS",
            subtitle: "陳憲億（Joseph Chen）深入分析 Tacotron2、FastSpeech2、WaveNet、HiFi-GAN、VITS 五大模型的核心設計邏輯，探討 TTS 如何走向端到端架構。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep05-tts-models",
            isExternal: false,
            ep: "EP.05"
      },
      {
            title: "Transformer & TTS 語音合成架構原理",
            subtitle: "Encoder-Decoder、Self-Attention、從論文到嵌入式推論 碩士論文主題精華整理",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep04-transformer-tts",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "Dify 工作流程設計 在本地 LLM 前加 Orchestration 層",
            subtitle: "No-code AI Pipeline、Knowledge Base、Agent 串接 打造可控的企業級 AI 應用",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep03-dify",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "Ollama 本地 LLM 部署全攻略 含離線環境搬檔教學",
            subtitle: "從安裝 Ollama 到在本地跑第一個推論， 再到如何在完全沒有網路的工廠環境部署模型",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep02-ollama-local-llm",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "什麼是 Air-gapped AI？ 從工廠內網 LLM 說起",
            subtitle: "為什麼有些企業的 AI 不能連網？什麼是隔離網路？ 從我在鴻海深圳廠的實際部署經驗說起",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/ai/ep01-airgapped-intro",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'embedded',
    label: '嵌入式與系統',
    icon: <Cpu size={22} />,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    chipColor: 'default',
    description: 'Linux、Shell Script、嵌入式通訊協定 — 軟體工程師必備的系統底層知識。',
    posts: [
      {
            title: "UART &amp; I2C 嵌入式硬體溝通基礎原理",
            subtitle: "不需要深入硬體，只需理解軟體工程師該懂的通訊概念 — Python pyserial / smbus 實作",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/embedded/ep03-uart-i2c",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "Shell Script 入門 讓工作自動化",
            subtitle: "變數、迴圈、條件判斷、函數 — 10 個工程師實際用到的腳本模板",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/embedded/ep02-shell",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "Linux 基礎指令 嵌入式工程師必知的 20 個指令",
            subtitle: "檔案操作、權限管理、cron 排程、process 管理 — 附面試常考題",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/embedded/ep01-linux",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'python',
    label: 'Python 系列',
    icon: <Terminal size={22} />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    chipColor: 'success',
    description: '正規表達式、OpenCV 自動化、PyTorch 入門、Tkinter GUI — Python 在全棧開發中的實際應用。',
    posts: [
      {
            title: "Python 與 Shell 正規表達式 (Regex) 完全指南",
            subtitle: "從原子組件到實戰提取，掌握全棧開發中最核心的萬用字元搜尋技術。",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/python/ep04-regex",
            isExternal: false,
            ep: "EP.04"
      },
      {
            title: "Tkinter GUI 開發 Python 桌面應用",
            subtitle: "事件驅動設計、Grid 佈局、與 Raspberry Pi 自動化測試的實際整合",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/python/ep03-tkinter",
            isExternal: false,
            ep: "EP.03"
      },
      {
            title: "PyTorch 入門 AI 工程師必備基礎",
            subtitle: "Tensor 操作、autograd、訓練迴圈 — 從 NumPy 思維到深度學習框架",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/python/ep02-pytorch",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "OpenCV + 機械手臂 電腦視覺自動定位系統實戰",
            subtitle: "如何用 Python + OpenCV 讓機械手臂「看到」目標並自動移動到正確位置， 從影像辨識到 XY 軸座標轉換的完整技術拆解",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/python/ep01-opencv-automation",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'lang',
    label: '後端語言',
    icon: <Braces size={22} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    chipColor: 'warning',
    description: 'C 語言與 C# / ASP.NET — 軟體工程師面試必備的後端語言核心概念。',
    posts: [
      {
            title: "C# 與 ASP.NET .NET 工程師面試題",
            subtitle: "型別系統、LINQ、Web API 設計 — C# 語法特性與後端開發核心概念",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/lang/ep02-csharp",
            isExternal: false,
            ep: "EP.02"
      },
      {
            title: "C 語言面試必備 指標與記憶體管理",
            subtitle: "指標基礎、Stack vs Heap、struct、常見面試 Coding 題解析",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/lang/ep01-c",
            isExternal: false,
            ep: "EP.01"
      }
],
  },
  {
    id: 'general',
    label: '一般文章',
    icon: <BookOpen size={22} />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    chipColor: 'default',
    description: '作品集建置心得、技術隨筆，以及那些不屬於任何系列卻值得記錄的事。',
    posts: [
      {
            title: "Man must explore, and this is exploration at its greatest",
            subtitle: "Problems look mighty small from 150 miles up",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/general/man-must-explore",
            isExternal: false
      },
      {
            title: "用 React + Next.js 打造個人作品集",
            subtitle: "從零開始，到 Vercel 部署上線的完整過程",
            date: "2026",
            author: "Joseph Chen",
            href: "/blog/general/building-react-portfolio",
            isExternal: false
      }
],
  },
];
