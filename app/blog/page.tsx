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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
        title: 'LeetCode Python 踩坑紀錄',
        subtitle: '那些刷題時讓我卡關的 Python 細節，整理給自己也給你',
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
    comingSoon: ['Event Loop 完整圖解', 'Promise vs async/await', '閉包與作用域'],
    posts: [],
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
  const isEpSeries = s.id === 'leetcode';

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
