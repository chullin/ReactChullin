'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Layout, Box, Zap, Layers } from 'lucide-react';
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

export default function WebDevEP11() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.11</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Bootstrap 入門<br />
              <span className="text-purple-200 text-3xl md:text-4xl">Grid 系統、元件庫與 Tailwind 哲學對比</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl font-medium">
              曾經統治前端世界的 CSS 框架皇者：<br />
              從快速原型開發到現代實務中的定位。
            </p>
            <div className="flex items-center gap-6 text-purple-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Bootstrap · UI Framework</span>
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
                <Quote size={32} className="text-purple-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「Bootstrap 是許多前端工程師的第一個框架。它帶來的 12 欄位 Grid 系統徹底改變了 RWD 的開發方式，
                  但也因為過於沉重的『標籤感』在近年受到了 Tailwind 的挑戰。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Grid System */}
        <section>
          <SectionHeader icon={Layout} title="1. 經典 12 欄位 Grid 系統" color="text-purple-600 bg-purple-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Bootstrap 的 Grid 系統核心是三個 class：<code>container</code>、<code>row</code>、<code>col</code>。
              它將頁面劃分為 12 等分，讓你輕鬆定義不同螢幕尺寸下的佔比。
            </p>
            <CodeBlock
              title="Bootstrap Grid 示例"
              lang="html"
              code={`<div class="container">
  <div class="row">
    <div class="col-md-8 col-sm-12">左側大區塊 (手機全寬, 平板以上佔 8/12)</div>
    <div class="col-md-4 col-sm-12">右側側邊欄 (手機全寬, 平板以上佔 4/12)</div>
  </div>
</div>`}
            />
            <p className="text-gray-500 text-sm italic">
              💡 重點：Row 必須放在 Container 內，Col 必須放在 Row 內。這是 Bootstrap 排版的鐵律。
            </p>
          </div>
        </section>

        {/* 2. Components */}
        <section>
          <SectionHeader icon={Layers} title="2. 成熟的 UI 元件庫" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Bootstrap 最強大之處在於它提供了「一整套」現成的元件：按鈕、導航欄、彈窗 (Modal)、卡片。
              你只需要複製貼上 HTML 結構，就能擁有一個看起來還不錯的後台系統或原型。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-0 bg-slate-50">
                <CardBody className="p-6">
                  <p className="font-black text-slate-800 mb-2">優點：開發速度極快</p>
                  <p className="text-sm text-slate-600">
                    適合對設計要求不高、需要快速上線的後台管理系統 (Admin Dashboard)。
                  </p>
                </CardBody>
              </Card>
              <Card className="border-0 bg-slate-50">
                <CardBody className="p-6">
                  <p className="font-black text-slate-800 mb-2">缺點：風格單一</p>
                  <p className="text-sm text-slate-600">
                    「一眼就能看出是用 Bootstrap 做的」，定制化程度較低。
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Bootstrap vs Tailwind */}
        <section>
          <SectionHeader icon={Zap} title="3. Bootstrap vs Tailwind：設計哲學之爭" color="text-amber-600 bg-amber-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              這是目前前端開發者最常爭議的話題。兩者的核心差異在於<strong>封裝程度</strong>。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-4 font-black text-gray-700 rounded-tl-xl">特性</th>
                    <th className="p-4 font-black text-gray-700">Bootstrap (Component-First)</th>
                    <th className="p-4 font-black text-gray-700 rounded-tr-xl">Tailwind (Utility-First)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className="p-4 font-bold">基本單位</td>
                    <td className="p-4 text-purple-600"><code>.btn</code>, <code>.card</code> (大積木)</td>
                    <td className="p-4 text-blue-600"><code>.flex</code>, <code>.p-4</code> (小積木)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">自定義空間</td>
                    <td className="p-4">較低，通常需要蓋過 (Override) 原生 CSS</td>
                    <td className="p-4 text-green-600">極高，像是在 HTML 裡寫 CSS</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">開發速度</td>
                    <td className="p-4">原型開發極快</td>
                    <td className="p-4">熟練後也很快，但初期需要查表</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">檔案體積</td>
                    <td className="p-4">較大 (包含大量未使用的樣式)</td>
                    <td className="p-4 text-green-600">小 (Tree-shaking 只留下有用到的)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 結論 */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Comparison size={24} /> 我該選哪一個？
            </h2>
            <div className="space-y-4 text-white/90">
              <p>
                <strong>選 Bootstrap，如果：</strong><br />
                - 你正在開發內部的後台系統、工具網站。<br />
                - 你沒有設計師，且不希望花太多時間調樣式。<br />
                - 專案需要快速產出一個「堪用」的 Demo。
              </p>
              <Divider className="bg-white/20" />
              <p>
                <strong>選 Tailwind CSS，如果：</strong><br />
                - 你有精細的 UI 設計稿 (Figma) 需要 1:1 還原。<br />
                - 你追求極致的性能與最小的 CSS 體積。<br />
                - 你希望建立自己的設計系統 (Design System)。
              </p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep10-html-css-basics" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.10 — HTML/CSS 核心</p>
            <p className="text-sm text-gray-500 mt-1">從盒模型到響應式設計</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.12 — 即將推出</p>
            <p className="text-sm text-gray-400 mt-1">敬請期待</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Bootstrap', 'Grid', 'UI Library', 'Tailwind CSS', 'CSS Framework', 'EP.11'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}

const Comparison = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M21 3 14 10" /><path d="m3 3 7 7" /><path d="m14 14 7 7" /><path d="m10 10-7 7" /><path d="M21 21h-5" /><path d="M3 21h5" />
  </svg>
);
