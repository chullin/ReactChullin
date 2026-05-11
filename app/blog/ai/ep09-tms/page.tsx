'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowRight,
  Database,
  Code2,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Paintbrush,
  Rocket
} from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';

const InfoBox = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
  const styles = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className={`border rounded-2xl p-5 my-4 ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
};

export default function AiEP09Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase text-[10px]">
                自動化管理
              </Chip>
              <Chip size="sm" variant="flat" className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase text-[10px]">
                EP.09
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Test Management System (TMS)<br />
              <span className="text-blue-300 text-3xl sm:text-4xl">從 Legacy Code 到實驗室核心基礎設施</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              從維護上萬行 legacy code，到逐步推動 Python3 與 React 現代化遷移。<br />
              這篇文章分享我如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Author Metadata */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024 - 2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>10 min read</span></div>
            <div className="flex items-center gap-1.5"><Database size={16} /> <span>系統開發</span></div>
          </div>
        </div>

        {/* Intro Section */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            在手機測試實驗室中，每天都會產生大量測試資料、問題回報與驗證紀錄。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            在導入 TMS 之前，許多流程仍依賴 Excel、手動文件與口頭溝通，不但難以追蹤，也容易發生資訊不同步與版本混亂的問題。
            這篇文章將帶你深入了解這套系統如何從一套典型大型 Legacy System，逐步演進為實驗室成員每天必用的核心平台。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 系統核心功能 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">TMS 解決了什麼問題？</h2>
          <p className="text-gray-700 leading-relaxed">
            TMS 將原本分散的測試流程全面資訊化，提供了一個企業級的標準化協作平台。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: '測試報告管理', desc: '工程師透過網頁記錄問題、步驟與附件，系統自動產生標準化報告，大幅減少重複撰寫文件的時間。', icon: '📝' },
              { title: '內部系統資料同步', desc: '與客戶內部系統進行資料同步與狀態驗證，降低人工更新與資訊錯誤風險。', icon: '🔗' },
              { title: '排程與進度追蹤', desc: '即時追蹤全實驗室測試進度與排程，確保生產線各環節專案都能如期交付。', icon: '📅' },
              { title: '倉庫與物料追蹤', desc: '精確追蹤實驗室中的設備與物料狀態，避免測試流程因資源調度不當而中斷。', icon: '📦' }
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-black text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 技術債與重構 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">典型大型 Legacy System 的維護問題</h2>
          <p className="text-gray-700 leading-relaxed">
            TMS 是一套運行多年的核心系統，當我接手時，面對的是典型的技術債挑戰：
          </p>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-red-800">
              <AlertTriangle size={20} /> 診斷系統現況
            </h3>
            <ul className="space-y-3 text-sm text-red-700">
              <li className="flex items-start gap-2">
                <Code2 size={16} className="mt-0.5 shrink-0" />
                <span><strong>大量硬編碼 (Hard Code)</strong>：許多查詢條件與流程邏輯直接寫死於程式中，導致維護與擴充困難。</span>
              </li>
              <li className="flex items-start gap-2">
                <Code2 size={16} className="mt-0.5 shrink-0" />
                <span><strong>高耦合架構</strong>：單一頁面包含大量業務邏輯與資料處理流程，缺乏模組化設計。</span>
              </li>
              <li className="flex items-start gap-2">
                <Code2 size={16} className="mt-0.5 shrink-0" />
                <span><strong>缺乏文件與命名一致性</strong>：變數與函式命名不統一，且缺少註解與技術文件，增加後續維護成本。</span>
              </li>
            </ul>
          </div>

          <InfoBox type="tip">
            <strong>重構策略：</strong> 
            由於系統已經是實驗室日常運作的核心基礎設施，因此全面重寫的風險極高。
            我採取的是「漸進式重構 (Incremental Refactoring)」策略：先從小功能與低風險模組開始整理，逐步補上註解、拆分邏輯與降低耦合度，確保在不影響既有流程的前提下持續改善系統品質。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 實際開發工作 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">我實際參與的開發工作</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Legacy Code 重構', desc: '整理高耦合程式邏輯、補上註解與逐步模組化，大幅降低後續維護與新功能開發成本。', icon: <Settings className="text-blue-500" /> },
              { title: '測試流程功能開發', desc: '根據現場測試工程師的反饋，開發新功能與優化既有作業流程，提升整體作業效率。', icon: <CheckCircle2 className="text-blue-500" /> },
              { title: 'UI / UX 改善', desc: '重新調整介面排版、配色與表單流程，將複雜的資訊以更直覺的方式呈現，優化操作體驗。', icon: <Paintbrush className="text-blue-500" /> },
              { title: '系統現代化升級', desc: '逐步推動核心架構從 Python2 向 Python3 遷移，並規劃引入 React 進行前端組件化升級。', icon: <Rocket className="text-blue-500" /> }
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <p className="font-black text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 技術棧展示 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">技術棧 (Tech Stack)</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Backend', val: 'Python 2.x / Django (Legacy)' },
              { label: 'Frontend', val: 'jQuery / HTML / CSS' },
              { label: 'Database', val: 'PostgreSQL' },
              { label: 'Server', val: 'Nginx / Internal Server' }
            ].map(item => (
              <div key={item.label} className="flex flex-col bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                <span className="font-bold text-gray-800">{item.val}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 總結成果 */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900">實戰反思</h2>
            </div>
            <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
              <p>
                維護大型 Legacy System 讓我深刻體會到：真正困難的工程問題，通常不是「如何重新設計」，
                而是如何在系統持續運作、多人依賴與需求不斷變動的情況下，安全地持續演進。
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl border border-blue-100">
                  <CheckCircle2 className="text-green-500" size={16} /> 堅持漸進式重構降低風險
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl border border-blue-100">
                  <CheckCircle2 className="text-green-500" size={16} /> 透過技術升級解決長遠債務
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <BlogRelatedPosts currentPostHref="/blog/ai/ep09-tms" category="ai" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 pt-10">
          <Link href="/blog/ai/ep08-transformer-to-gpt" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — 從 Transformer 到 GPT</p>
          </Link>
          <Link href="/blog/ai/ep10-opencv-robot" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.10 — OpenCV Robot Vision</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
          </Link>
        </div>
      </article>

      {/* Structured Data for SEO */}
      <Script id="blog-json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Test Management System (TMS) | Legacy System 重構實戰",
          "description": "分享如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。",
          "author": {
            "@type": "Person",
            "name": "陳憲億 Joseph Chen"
          },
          "datePublished": "2025-05-10",
          "image": "https://chullin.tw/assets/profile3.png",
          "publisher": {
            "@type": "Organization",
            "name": "Joseph Chen Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chullin.tw/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://chullin.tw/blog/ai/ep09-tms"
          }
        })}
      </Script>
    </div>
  );
}
