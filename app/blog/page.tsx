'use client';

import {
  Card,
  CardBody,
  Button,
  Link,
  Divider,
  Chip,
} from '@heroui/react';
import {
  Calendar,
  ArrowRight,
  BookOpen,
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  Code2,
  Globe,
  Cpu,
  Compass,
  ChevronDown,
  ChevronUp,
  Bookmark,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type Post = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  type: string;
  href: string;
  isExternal: boolean;
  ep?: string; // e.g. "EP.01"
};

type Series = {
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

const series: Series[] = [
  {
    id: 'leetcode',
    label: 'LeetCode 系列',
    icon: <Code2 size={22} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    chipColor: 'primary',
    description: '從 HashMap 到圖論，14 個主題帶你系統性地建立演算法思維。',
    comingSoon: ['EP.15 — Backtracking', 'EP.16 — Greedy', 'EP.17 — Intervals'],
    posts: [
      {
        title: 'EP.14 — Graph 拓撲排序',
        subtitle: '#207 Course Schedule · #210 — BFS Kahn 演算法、DFS 後序法',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep14-graph-topo', isExternal: false, ep: 'EP.14',
      },
      {
        title: 'EP.13 — Graph 入門：DFS 走訪',
        subtitle: '#200 Number of Islands · #133 Clone Graph — 鄰接表 + visited 集合',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep13-graph-dfs', isExternal: false, ep: 'EP.13',
      },
      {
        title: 'EP.12 — DP 進階：最佳化、序列、分割',
        subtitle: '#322 Coin Change · #300 LIS · #139 Word Break',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep12-dp-advanced', isExternal: false, ep: 'EP.12',
      },
      {
        title: 'EP.11 — DP 入門：從記憶化到空間最佳化',
        subtitle: '#70 Climbing Stairs · #198 House Robber — 五步框架',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep11-dp-basics', isExternal: false, ep: 'EP.11',
      },
      {
        title: 'EP.10 — Tree BFS & BST',
        subtitle: '#102 Level Order · #98 Validate BST · #235 LCA',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep10-tree-bfs-bst', isExternal: false, ep: 'EP.10',
      },
      {
        title: 'EP.09 — Tree & DFS：遞迴的本質',
        subtitle: '#104 Max Depth · #100 Same Tree · #226 Invert',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep09-tree-dfs', isExternal: false, ep: 'EP.09',
      },
      {
        title: 'EP.08 — Linked List：Pointer 操作',
        subtitle: '#206 Reverse · #21 Merge · #141 Cycle',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep08-linked-list', isExternal: false, ep: 'EP.08',
      },
      {
        title: 'EP.07 — Binary Search',
        subtitle: '#704 Binary Search · #33 Search in Rotated Sorted Array',
        date: 'October 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep07-binary-search', isExternal: false, ep: 'EP.07',
      },
      {
        title: 'EP.06 — Stack：後進先出',
        subtitle: '#20 Valid Parentheses — Stack 最經典的應用',
        date: 'October 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep06-stack', isExternal: false, ep: 'EP.06',
      },
      {
        title: 'EP.05 — Sliding Window',
        subtitle: '#121 Best Time to Buy and Sell Stock',
        date: 'September 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep05-sliding-window', isExternal: false, ep: 'EP.05',
      },
      {
        title: 'EP.04 — Two Pointers：從 "0P" 踩坑說起',
        subtitle: '#125 Valid Palindrome',
        date: 'August 2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep04-two-pointers', isExternal: false, ep: 'EP.04',
      },
      {
        title: 'EP.03 — #49 Group Anagrams：defaultdict 的正確用法',
        subtitle: '排序作為 key，用 defaultdict 分組',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep03-group-anagrams', isExternal: false, ep: 'EP.03',
      },
      {
        title: 'EP.02 — Set vs Dict：選對資料結構',
        subtitle: '#217 Contains Duplicate · #242 Valid Anagram',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep02-set-vs-dict', isExternal: false, ep: 'EP.02',
      },
      {
        title: 'EP.01 — #1 Two Sum：從暴力解到 HashMap 思維',
        subtitle: '同一題三種解法，複雜度從 O(n²) 降到 O(n)',
        date: 'November 2023', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-ep01-two-sum', isExternal: false, ep: 'EP.01',
      },
      {
        title: 'Python 算法學習復盤：投票、鏈表與 Top-K',
        subtitle: 'Boyer-Moore 投票演算法、dummy_head 模式、Heap vs 桶排序 — 從七段對話整理的深度解析',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-python-review', isExternal: false,
      },
      {
        title: 'LeetCode Python 踩坑紀錄',
        subtitle: '那些刷題時讓我卡關的 Python 細節，整理給自己也給你（#1–#7 持續更新）',
        date: 'April 30, 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/leetcode-python-pitfalls', isExternal: false,
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
    comingSoon: ['HeroUI 元件庫使用心得', 'Next.js App Router 深度解析'],
    posts: [
      {
        title: 'Vercel 部署上線 push 一下，全世界都能看到',
        subtitle: 'GitHub + Vercel，免費、自動化、有預覽 URL， 這就是 chullin.vercel.app 的部署方式',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep08-vercel-deploy', isExternal: false, ep: 'EP.08',
      },
      {
        title: 'Framer Motion 讓頁面元素動起來',
        subtitle: '我的網頁所有滑入、淡出、滾動觸發動畫都靠它， 幾行程式碼就能讓靜態頁面瞬間有生命感',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep07-framer-motion', isExternal: false, ep: 'EP.07',
      },
      {
        title: 'HeroUI 元件庫 現成 UI 積木，快速建出美觀介面',
        subtitle: 'Card、Button、Chip、Divider — 我的網頁所有 UI 元件都來自這裡， 安裝一次，直接拿來用',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep06-heroui', isExternal: false, ep: 'EP.06',
      },
      {
        title: 'Tailwind CSS 不再寫 CSS 檔，class 就是樣式',
        subtitle: '我的個人網頁沒有任何手寫的 .css 檔案（除了全域設定）， 所有樣式都寫在 className 裡面',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep05-tailwind', isExternal: false, ep: 'EP.05',
      },
      {
        title: 'React 核心概念 Component、JSX、Props、State',
        subtitle: '看懂我的個人網頁每一行程式碼的關鍵 用你已經看過的實際程式碼來說明',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep04-react-component', isExternal: false, ep: 'EP.04',
      },
      {
        title: '認識 Next.js 專案結構 每個資料夾都有它的職責',
        subtitle: '打開 VS Code 看到一堆資料夾和檔案不知道從哪裡下手？ 這篇帶你一個一個搞清楚它們的用途',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep03-project-structure', isExternal: false, ep: 'EP.03',
      },
      {
        title: '開發環境建置 從零到跑起第一個畫面',
        subtitle: '安裝 Node.js、設定 VS Code、建立 Next.js 專案， 讓你的電腦能跑和我的個人網頁一樣的技術棧',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep02-setup-env', isExternal: false, ep: 'EP.02',
      },
      {
        title: '什麼是現代網頁開發？ 從 HTML 到 React 的演進',
        subtitle: '在動手寫第一行程式碼之前，先搞清楚這些名詞： HTML、CSS、JavaScript、React、Next.js 之間的關係',
        date: '2024', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/web-dev-ep01-modern-web', isExternal: false, ep: 'EP.01',
      },
      {
        title: '用 React + Next.js 打造個人作品集',
        subtitle: '從零開始，到 Vercel 部署上線的完整過程',
        date: 'March 2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/building-react-portfolio', isExternal: false,
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
        href: '/blog/js-promise-async', isExternal: false,
      },
      {
        title: 'Event Loop 完整圖解：JS 如何做到「非同步」',
        subtitle: 'Call Stack、Microtask Queue、Macrotask Queue，用互動圖解說清楚執行順序',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js-event-loop', isExternal: false,
      },
      {
        title: '閉包與作用域：JS 最核心的底層機制',
        subtitle: 'var/let/const 差異、作用域鏈、閉包形成原理與 var+迴圈的經典陷阱',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js-closure-scope', isExternal: false,
      },
      {
        title: 'JS 算法學習復盤 閉包、高階函式與那些坑',
        subtitle: '從 LeetCode 30 Days of JavaScript 學習紀錄出發， 整理那些讓我卡關最久、理解最深的 JS 核心觀念',
        date: '2026', author: 'Joseph Chen', type: 'Internal',
        href: '/blog/js-30days-learning-review', isExternal: false,
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
        href: '/blog/man-must-explore', isExternal: false,
      },
    ],
  },
];

// Compact row for EP posts
function EpRow({ post, color }: { post: Post; color: string }) {
  return (
    <Link
      href={post.href}
      className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors group"
    >
      {post.ep && (
        <span className={`text-[10px] font-black tracking-widest w-12 shrink-0 ${color} opacity-70`}>
          {post.ep}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
          {post.title}
        </p>
        <p className="text-xs text-gray-400 font-medium truncate">{post.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-gray-300 font-bold">{post.date}</span>
        {post.isExternal
          ? <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
          : <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />}
      </div>
    </Link>
  );
}

// Full card for featured / non-EP posts
function PostCard({ post }: { post: Post }) {
  return (
    <Card
      isPressable
      as={Link}
      href={post.href}
      target={post.isExternal ? '_blank' : undefined}
      rel={post.isExternal ? 'noopener noreferrer' : undefined}
      className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white w-full"
    >
      <CardBody className="p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-black text-gray-900 leading-snug">{post.title}</h3>
            {post.isExternal
              ? <ExternalLink size={16} className="text-gray-300 shrink-0 mt-0.5" />
              : <ChevronRight size={18} className="text-gray-300 shrink-0 mt-0.5" />}
          </div>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">{post.subtitle}</p>
          <Divider className="opacity-40" />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <UserIcon size={12} />
            <span className="font-bold">{post.author}</span>
            <span className="opacity-50">·</span>
            <Calendar size={12} />
            <span>{post.date}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SeriesSection({ s, index }: { s: Series; index: number }) {
  const PREVIEW_COUNT = 5;
  const hasMany = s.posts.length > PREVIEW_COUNT;
  const [expanded, setExpanded] = useState(false);

  const visiblePosts = hasMany && !expanded ? s.posts.slice(0, PREVIEW_COUNT) : s.posts;
  const isEpSeries = s.id === 'leetcode' || s.id === 'web';

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-10 h-10 rounded-2xl ${s.bgColor} ${s.color} flex items-center justify-center shrink-0`}>
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`text-xl font-black ${s.color}`}>{s.label}</h2>
            <Chip size="sm" variant="flat" color={s.chipColor} className="font-bold text-[10px]">
              {s.posts.length} 篇{s.comingSoon && s.comingSoon.length > 0 ? ` · ${s.comingSoon.length} 即將推出` : ''}
            </Chip>
          </div>
          <p className="text-sm text-gray-400 font-medium mt-0.5">{s.description}</p>
        </div>
      </div>

      {/* Posts */}
      {s.posts.length === 0 ? (
        <div className="bg-gray-50/60 rounded-3xl p-8 text-center space-y-2">
          <p className="text-sm font-bold text-gray-400">敬請期待</p>
          {s.comingSoon && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {s.comingSoon.map(t => (
                <Chip key={t} size="sm" variant="flat" color="default" className="text-[10px] font-bold opacity-60">{t}</Chip>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={`bg-white rounded-3xl shadow-sm overflow-hidden ${isEpSeries ? 'divide-y divide-gray-50' : 'grid sm:grid-cols-2 gap-3 bg-transparent shadow-none'}`}>
          {isEpSeries ? (
            <>
              {visiblePosts.map((post, i) => (
                <EpRow key={i} post={post} color={s.color} />
              ))}
              {hasMany && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-black ${s.color} opacity-70 hover:opacity-100 transition-opacity`}
                >
                  {expanded ? (
                    <><ChevronUp size={14} /> 收起</>
                  ) : (
                    <><ChevronDown size={14} /> 展開全部 {s.posts.length} 篇</>
                  )}
                </button>
              )}
              {/* Coming Soon for EP series */}
              {s.comingSoon && s.comingSoon.length > 0 && (
                <div className="px-4 py-3 flex items-center gap-3 flex-wrap opacity-40">
                  {s.comingSoon.map(t => (
                    <span key={t} className="text-xs font-bold text-gray-400 border border-dashed border-gray-300 px-3 py-1 rounded-full">
                      {t} — 即將推出
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            visiblePosts.map((post, i) => <PostCard key={i} post={post} />)
          )}
        </div>
      )}
    </motion.section>
  );
}

export default function BlogPage() {
  const totalPosts = series.reduce((acc, s) => acc + s.posts.length, 0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    if (savedBookmarks.length > 0) {
      const allPosts = series.flatMap(s => s.posts);
      const matched = savedBookmarks.map((href: string) => allPosts.find(p => p.href === href)).filter(Boolean) as Post[];
      setBookmarkedPosts(matched);
    }
  }, []);

  return (
    <div className="bg-gray-50/30 min-h-screen pt-20 pb-32">
      <div className="max-w-3xl mx-auto px-6 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black tracking-tight text-gradient">Blog</h1>
          <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            "How far a person can go, it's all about who you're traveling with."
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            {series.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-xs font-black ${s.color} opacity-60 hover:opacity-100 transition-opacity`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {series.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`${s.bgColor} rounded-2xl p-4 flex flex-col gap-1 hover:shadow-md transition-shadow`}>
              <div className={`${s.color}`}>{s.icon}</div>
              <p className="text-lg font-black text-gray-800">{s.posts.length}</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">{s.label}</p>
            </a>
          ))}
        </motion.div>

        {/* Bookmarks Section */}
        {bookmarkedPosts.length > 0 && (
          <div className="space-y-16">
            <SeriesSection 
              index={0}
              s={{
                id: 'bookmarks',
                label: '我的收藏',
                icon: <Bookmark size={22} />,
                color: 'text-red-500',
                bgColor: 'bg-red-50',
                chipColor: 'danger',
                description: '你儲存在這個瀏覽器中的文章',
                posts: bookmarkedPosts
              }} 
            />
          </div>
        )}

        {/* Series Sections */}
        <div className="space-y-16">
          {series.map((s, i) => (
            <div key={s.id} id={s.id}>
              <SeriesSection s={s} index={i} />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <div className="bg-blue-50 p-12 rounded-[40px] space-y-4">
            <BookOpen size={40} className="mx-auto text-blue-400" />
            <h3 className="text-xl font-black text-gray-900">持續更新中</h3>
            <p className="text-gray-400 font-medium text-sm">
              目前共 {totalPosts} 篇文章，新主題持續增加。
            </p>
            <Button as={Link} href="/" color="primary" radius="full" className="font-bold px-8" variant="shadow">
              返回首頁
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
