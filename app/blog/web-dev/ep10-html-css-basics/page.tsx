'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Layout, Smartphone, Box, Maximize } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const SectionHeader = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <h2 className="text-3xl font-black text-gray-900">{title}</h2>
  </div>
);

export default function WebDevEP10() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.10</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              HTML/CSS 核心概念<br />
              <span className="text-teal-200 text-3xl md:text-4xl">Box Model、Flexbox、Grid 與 RWD</span>
            </h1>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl font-medium">
              前端面試最常考的基礎題：從排版邏輯到響應式設計，<br />
              徹底搞懂現代網頁佈局的底層機制。
            </p>
            <div className="flex items-center gap-6 text-teal-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> CSS 核心 · 面試必備</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「即便現代框架如 React、Tailwind 讓我們開發變快，但如果你不懂 Box Model 或 Flexbox 的縮放原理，
                  當 UI 出現奇怪的跑版時，你將無從下手。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Box Model */}
        <section>
          <SectionHeader icon={Box} title="1. Box Model (盒模型)" color="text-teal-600 bg-teal-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              在 CSS 中，所有的元素都被視為一個「矩形盒子」。這就是所謂的 <strong>Box Model</strong>。
              它由內而外包含四個部分：
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { label: 'Content', desc: '內容區', color: 'bg-blue-100 text-blue-700' },
                { label: 'Padding', desc: '內邊距', color: 'bg-green-100 text-green-700' },
                { label: 'Border', desc: '邊框', color: 'bg-yellow-100 text-yellow-700' },
                { label: 'Margin', desc: '外邊距', color: 'bg-red-100 text-red-700' },
              ].map(item => (
                <div key={item.label} className={`p-4 rounded-2xl text-center ${item.color}`}>
                  <p className="font-black text-sm">{item.label}</p>
                  <p className="text-xs opacity-80 font-bold">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <p className="font-black text-amber-900">面試陷阱題：box-sizing</p>
              <p className="text-amber-800 text-sm">
                如果你設定 <code>width: 100px; padding: 20px;</code>，這個元素最後的總寬度是多少？
              </p>
              <ul className="space-y-2 text-amber-900/80 text-sm">
                <li>• <code>content-box</code> (預設): 140px (100 + 20*2)</li>
                <li>• <code>border-box</code>: 100px (Padding 會被擠在 100px 內)</li>
              </ul>
              <p className="text-amber-700 text-xs italic">💡 實戰建議：現代專案通常會全域設定 <code>box-sizing: border-box</code>。</p>
            </div>
          </div>
        </section>

        {/* 2. Flexbox */}
        <section>
          <SectionHeader icon={Layout} title="2. Flexbox 一維排版" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Flexbox 是為了一維排版（列 Row 或 欄 Column）設計的，非常適合處理元件內部的對齊。
            </p>
            <CodeBlock
              title="Flexbox 常用語法"
              lang="css"
              code={`.container {
  display: flex;
  flex-direction: row;      /* 決定主軸方向 */
  justify-content: center;  /* 主軸對齊方式 */
  align-items: center;      /* 副軸對齊方式 */
  flex-wrap: wrap;          /* 超出寬度是否換行 */
}`}
            />
            <p className="text-gray-500 text-sm italic">
              💡 核心思維：Flexbox 的強大在於「伸縮（Flexibility）」，它能自動分配剩餘空間。
            </p>
          </div>
        </section>

        {/* 3. Grid */}
        <section>
          <SectionHeader icon={Maximize} title="3. Grid 二維排版" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              如果 Flexbox 是在一條線上排隊，Grid 就是在一個方格內佈陣。它適合處理整頁的大範圍佈局。
            </p>
            <CodeBlock
              title="Grid 聖杯佈局示例"
              lang="css"
              code={`.layout {
  display: grid;
  grid-template-columns: 200px 1fr; /* 左側固定，右側自動填滿 */
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}`}
            />
            <p className="text-gray-500 text-sm italic">
              💡 區分：小元件（按鈕組、導航欄）用 Flex；大架構（側邊欄、瀑布流卡片）用 Grid。
            </p>
          </div>
        </section>

        {/* 4. RWD */}
        <section>
          <SectionHeader icon={Smartphone} title="4. RWD 響應式設計" color="text-rose-600 bg-rose-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Responsive Web Design (RWD) 讓網頁在手機、平板、桌機都能有最佳呈現。
            </p>
            <div className="space-y-4">
              <p className="font-bold text-gray-900 text-xl">三個核心要素：</p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-rose-500 font-black">1.</span>
                  <div>
                    <span className="font-bold text-gray-800">Viewport Meta Tag</span>
                    <p className="text-sm">告訴瀏覽器寬度要等於設備寬度，不要自動縮放頁面。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-500 font-black">2.</span>
                  <div>
                    <span className="font-bold text-gray-800">Media Queries</span>
                    <p className="text-sm">根據寬度 (Breakpoint) 套用不同的 CSS。</p>
                    <CodeBlock lang="css" code={`@media (max-width: 768px) {\n  .sidebar { display: none; }\n}`} />
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-500 font-black">3.</span>
                  <div>
                    <span className="font-bold text-gray-800">Mobile First</span>
                    <p className="text-sm">先寫手機版的樣式，再用 <code>min-width</code> 擴充大螢幕樣式。這也是 Tailwind 的預設邏輯。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Zap size={24} /> 面試官可能會問...
            </h2>
            <div className="space-y-6">
              {[
                { q: '請解釋 Box Model 是什麼？', a: 'CSS 如何計算元素大小，包含 Content, Padding, Border, Margin。' },
                { q: 'Flexbox 與 Grid 的差別？', a: '一維 vs 二維；內容驅動 vs 佈局驅動。' },
                { q: '什麼是 CSS 權重 (Specificity)？', a: 'ID > Class > Tag。Inline style 最強，!important 是核武器。' },
                { q: '如何達成垂直水平置中？', a: 'Flex + justify-content: center + align-items: center。' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-black text-emerald-200">Q: {item.q}</p>
                  <p className="text-white/90">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep09-advanced-nav" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.09 — 導航與搜尋系統</p>
            <p className="text-sm text-gray-500 mt-1">結構設計與搜尋演算法</p>
          </Link>
          <Link href="/blog/web-dev/ep11-bootstrap-basics" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.11 — Bootstrap 入門</p>
            <p className="text-sm text-gray-500 mt-1">Grid 系統與 Tailwind 對比</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['HTML', 'CSS', 'Flexbox', 'Grid', 'RWD', 'Interview', 'EP.10'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}

const Zap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
