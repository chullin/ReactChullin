'use client';

import { Card, CardBody, Chip, Divider, Input, Accordion, AccordionItem } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Search, Layers, Navigation2, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ tech, complexity }: { tech: string; complexity: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold">🛠 Tech: {tech}</span>
    <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-bold">⚙️ Complexity: {complexity}</span>
  </div>
);

export default function WebDevEP09() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.09</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              部落格導航與搜尋系統<br />
              <span className="text-blue-200">從結構設計到演算法實作</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              如何建立一個可擴充的配置系統？如何實作高效的即時搜尋與滾動追蹤目錄？
              本篇將深度拆解 chullin.vercel.app 的導航架構。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> React · IntersectionObserver · Filter Search</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        
        {/* 開場 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「當文章超過 50 篇時，傳統的上下篇導航已經不夠用了。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    隨著 LeetCode 系列與 AI 專題的增加，使用者需要更直覺的方式在不同類別間跳轉。
                    我決定實作一個「全站導覽抽屜」與「動態目錄系統」。這不僅是 UI 的改變，
                    更是從硬編碼（Hardcoded）轉向配置驅動（Configuration-driven）的重大重構。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 核心架構：Single Source of Truth */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-blue-600" />
            <h2 className="text-3xl font-black text-gray-900">核心架構：單一數據源</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            為了避免每次新增文章都要修改多個地方，我建立了一個中心化的配置檔 <code>config/blog.tsx</code>。
            所有的導航組件、搜尋引擎、甚至是首頁的文章清單，都從這個檔案讀取數據。
          </p>
          
          <CodeBlock
            title="config/blog.tsx"
            lang="typescript"
            code={`export type Post = {
  title: string;
  subtitle: string;
  href: string;
  ep?: string;
  // ... 其他元數據
};

export type Series = {
  id: string;
  label: string;
  posts: Post[];
  // ... 類別資訊
};

export const series: Series[] = [
  { id: 'leetcode', label: 'LeetCode 系列', posts: [...] },
  { id: 'ai', label: 'AI 離線部署', posts: [...] },
];`}
          />
          <p className="text-gray-500 text-sm italic">
            💡 優點：當我移動檔案目錄（如將文章歸類到 leetcode 資料夾）時，只需更新這裡的 href，全站導航就會自動同步。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 實戰一：全站即時搜尋演算法 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Search className="text-indigo-600" />
            <h2 className="text-3xl font-black text-gray-900">實戰一：全站即時搜尋</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            懸浮導覽列中的搜尋框使用了<strong>雙層過濾演算法</strong>。它不僅過濾文章標題，
            還會根據類別名稱進行匹配。
          </p>

          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <p className="font-black text-indigo-800 mb-4">搜尋邏輯虛擬碼</p>
            <ol className="list-decimal list-inside space-y-2 text-indigo-900/80 text-sm font-medium">
              <li>使用者輸入關鍵字 (Query)</li>
              <li>過濾 Series：
                <ul className="pl-6 list-disc text-xs mt-1 text-indigo-700">
                  <li>若 Series 標籤符合 Query → 保留該系列所有文章</li>
                  <li>若 Series 標籤不符 → 檢查該系列下的每一篇文章</li>
                </ul>
              </li>
              <li>過濾 Post：檢查標題或副標題是否包含 Query</li>
              <li>重新封裝：只顯示有匹配結果的類別</li>
            </ol>
          </div>

          <CodeBlock
            title="FloatingNav.tsx (Search Logic)"
            lang="typescript"
            code={`const filteredSeries = series.map(s => {
  // 1. 如果類別名稱本身就匹配，直接回傳整個類別
  if (s.label.toLowerCase().includes(query.toLowerCase())) return s;

  // 2. 否則過濾底下的文章
  const filteredPosts = s.posts.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return { ...s, posts: filteredPosts };
}).filter(s => s.posts.length > 0); // 3. 只留下有文章的類別`}
          />
          <ComplexityBadge tech="React useMemo + Filter" complexity="O(S * P) - S=類別數, P=文章數" />
        </section>

        <Divider className="opacity-30" />

        {/* 實戰二：目錄 (TOC) 的滾動追蹤 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Navigation2 className="text-violet-600" />
            <h2 className="text-3xl font-black text-gray-900">實戰二：動態目錄與滾動追蹤</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            目錄 (Table of Contents) 必須具備兩個核心功能：<strong>自動提取標題</strong>與<strong>滾動高亮</strong>。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-slate-50">
              <CardBody className="p-6">
                <p className="font-black text-slate-800 mb-2">自動提取</p>
                <p className="text-sm text-slate-600">
                  使用 <code>document.querySelectorAll('h2, h3')</code>。
                  為了避免抓到頁首或頁尾，我們將範圍限制在 <code>article</code> 標籤內。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 bg-violet-50">
              <CardBody className="p-6">
                <p className="font-black text-violet-800 mb-2">滾動追蹤</p>
                <p className="text-sm text-violet-600">
                  放棄監聽 scroll 事件（效能差），改用 <code>IntersectionObserver</code>。
                  當標題進入視窗頂部 20% 範圍時，觸發高亮。
                </p>
              </CardBody>
            </Card>
          </div>

          <CodeBlock
            title="TOC.tsx (Intersection Observer)"
            lang="typescript"
            code={`useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // 找出目前正在視窗中且最靠近頂部的標題
      const visible = entries.find(e => e.isIntersecting);
      if (visible) setActiveId(visible.target.id);
    },
    { rootMargin: '-100px 0px -80% 0px' } // 觸發區間設定在視窗上方
  );

  headings.forEach(h => {
    const el = document.getElementById(h.id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [headings]);`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 效能優化：Framer Motion 與 Layout */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-amber-600" />
            <h2 className="text-3xl font-black text-gray-900">效能與交互體驗優化</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">✨</div>
              <div>
                <p className="font-black text-gray-900">佈局抖動防止</p>
                <p className="text-gray-600 text-sm">
                  導覽列抽屜開啟時，會導致頁面滾動條消失，產生佈局跳動。
                  我使用了 <code>HeroUI</code> 的 <code>Drawer</code> 組件，它會自動處理 <code>overflow: hidden</code> 與 padding 補償。
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">🎭</div>
              <div>
                <p className="font-black text-gray-900">流暢過場動畫</p>
                <p className="text-gray-600 text-sm">
                  使用 <code>framer-motion</code> 的 <code>AnimatePresence</code>。
                  當使用者在導覽列中切換類別時，文章清單會以微小的位移與淡入效果呈現，減少視覺疲勞。
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '📋', text: '配置驅動設計：將所有文章元數據抽離至 config.tsx，達成 Single Source of Truth。' },
                { emoji: '🔍', text: '層次化搜尋：先匹配類別，再匹配文章，提升搜尋的相關性與效率。' },
                { emoji: '👁️', text: 'IntersectionObserver：高效實作目錄高亮，避免 scroll 事件導致的 CPU 負載。' },
                { emoji: '📐', text: '響應式導航：寬螢幕使用 TOC，所有設備支援 Floating Sidebar，確保一致的跳轉體驗。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep08-vercel-deploy" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — Vercel 部署</p>
            <p className="text-sm text-gray-500 mt-1">GitHub + Vercel，免費上線全攻略</p>
          </Link>
          <Link href="/blog/web-dev/ep10-html-css-basics" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.10 — HTML/CSS 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Box Model、Flexbox、Grid、RWD</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Next.js', 'React', 'Navigation', 'Search Algorithm', 'IntersectionObserver', 'Performance', 'EP.09'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
