'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

export default function AiEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-bold uppercase text-[10px]">
                AI 離線部署
              </Chip>
              <Chip size="sm" variant="flat" className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-bold uppercase text-[10px]">
                EP.01
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              什麼是 Air-gapped AI？<br />
              <span className="text-purple-300">從工廠內網 LLM 說起</span>
            </h1>
            <p className="text-purple-200 text-lg font-medium max-w-2xl mx-auto">
              為什麼有些企業的 AI 不能連網？什麼是隔離網路？<br />
              從我在鴻海深圳廠的實際部署經驗說起
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>8 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>實戰筆記</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            2024 年，我加入鴻海深圳廠，接下了一個特殊任務：在完全沒有網路連線的生產環境裡，
            部署一套可以跑 LLM（大型語言模型）的 AI 平台。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇文章不談程式碼，先把最根本的問題說清楚：<strong>為什麼要離線？什麼是 Air-gapped？這件事難在哪裡？</strong>
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 什麼是 Air-gapped */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Air-gapped 是什麼意思？</h2>
          <p className="text-gray-700 leading-relaxed">
            "Air gap"（氣隙）是一個資安術語，指的是一台機器或整個網路與外部網際網路之間存在「物理隔離」——
            就像兩台電腦之間隔著一段空氣，無法直接連線傳輸資料。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🏭',
                title: '製造工廠',
                desc: '生產線機台不能連外網，避免被駭客入侵或資料外洩。iPhone 組裝廠、晶片廠都是這種環境。',
                color: 'bg-blue-50 border-blue-100',
              },
              {
                icon: '🏦',
                title: '金融機構',
                desc: '交易系統、核心銀行系統與外網完全隔離，防止資安攻擊與法規違規。',
                color: 'bg-green-50 border-green-100',
              },
              {
                icon: '🛡️',
                title: '國防/政府',
                desc: '機密資料系統嚴格隔離，連 USB 都可能被禁，確保國家機密不外洩。',
                color: 'bg-red-50 border-red-100',
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-black text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox type="info">
            <strong>我的情況</strong>：深圳廠的生產網路（Production Network）與辦公網路完全隔離，
            外部 IP 被封鎖。要讓 AI 跑起來，所有模型、套件、工具都必須先在有網路的地方準備好，
            再透過受控管道（審批的隨身碟或內網文件伺服器）搬進去。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 為什麼工廠需要 AI */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">工廠為什麼要跑 LLM？</h2>
          <p className="text-gray-700 leading-relaxed">
            這是我剛接到任務時自己也問的問題。在一個強調精準、標準化的製造環境，AI 能做什麼？
          </p>

          <div className="space-y-3">
            {[
              {
                num: '01',
                title: '知識庫問答',
                desc: '操作 SOP、機台手冊動輒幾百頁，工程師花在找資料的時間佔工作時間 30% 以上。LLM 可以直接回答「這個錯誤代碼怎麼處理」。',
                color: 'bg-purple-500',
              },
              {
                num: '02',
                title: '異常報告生成',
                desc: '每次機台異常都要填一份報告，格式固定但內容重複。LLM 可以從測試 log 自動生成初稿，工程師只需要確認。',
                color: 'bg-blue-500',
              },
              {
                num: '03',
                title: '測試腳本輔助',
                desc: '自動化測試腳本需要持續維護，AI Agent 可以協助生成或偵錯腳本，加速開發週期。',
                color: 'bg-indigo-500',
              },
              {
                num: '04',
                title: '多語言溝通',
                desc: '深圳廠工程師說中文，客戶說英文，印度廠說英文，LLM 可以做即時文件翻譯和溝通輔助。',
                color: 'bg-violet-500',
              },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                  {item.num}
                </div>
                <div>
                  <p className="font-black text-gray-900">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 離線部署的挑戰 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">離線部署難在哪裡？</h2>
          <p className="text-gray-700 leading-relaxed">
            如果你習慣了 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">pip install</code>、
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">docker pull</code>、
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">ollama pull</code>
            這些一行搞定的指令，你就能理解在離線環境裡這些都不能用的痛苦。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-red-800 text-lg">😤 你平常理所當然的事</p>
              <ul className="space-y-2 text-red-700 text-sm">
                {[
                  'pip install requests → 自動從 PyPI 下載',
                  'docker pull ollama/ollama → 從 Docker Hub 拉取',
                  'ollama pull llama3 → 自動下載 4GB 模型',
                  'npm install → 從 npm registry 安裝',
                  'apt-get update → 從網路更新套件',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5">❌</span>
                    <code className="text-xs bg-red-100 px-2 py-0.5 rounded">{t}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-green-800 text-lg">✅ 離線環境的解法</p>
              <ul className="space-y-2 text-green-700 text-sm">
                {[
                  '預先下載所有 wheel 檔，搬進來再安裝',
                  '在有網路的機器 docker save，打包成 tar 檔',
                  '手動下載 .gguf 模型檔，複製到指定路徑',
                  '建立內部 npm/pip mirror，供離線安裝',
                  '將所有依賴打包成離線安裝包',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InfoBox type="warning">
            <strong>最大的坑</strong>：依賴鏈。你以為只需要下載 A，但 A 依賴 B，B 依賴 C，C 依賴 D……
            一不小心就在現場才發現缺了某個套件，而那個套件在網路上只要 3 秒，在離線環境裡可能要等隔天審批才能搬進來。
            所以前置準備必須非常完整，要把依賴樹全部列清楚。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 我的解決方案預覽 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">我用了什麼技術棧？</h2>
          <p className="text-gray-700 leading-relaxed">
            整個離線 AI 平台的核心由三個部分組成，這個系列的後續文章會逐一深入介紹：
          </p>

          <div className="space-y-3">
            {[
              {
                name: 'Ollama',
                role: 'LLM 推論引擎',
                desc: '負責在本地跑語言模型。支援 llama3、qwen2、gemma2 等主流開源模型，API 格式與 OpenAI 相容，整合方便。',
                ep: '→ EP.02 詳細介紹',
                color: 'bg-purple-600 text-white',
              },
              {
                name: 'Dify',
                role: 'AI Orchestration 平台',
                desc: '提供視覺化的 Workflow 設計、RAG（知識庫問答）、API 管理。讓不懂程式的工程師也能建立自己的 AI 應用。',
                ep: '→ EP.03 詳細介紹',
                color: 'bg-blue-600 text-white',
              },
              {
                name: 'Docker / Colima',
                role: '容器化部署',
                desc: '整個平台用 Docker Compose 打包，確保環境一致性。在沒有 Docker Desktop 的 Linux 伺服器上用 Colima 替代。',
                ep: '→ EP.02、EP.03',
                color: 'bg-slate-700 text-white',
              },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 ${item.color}`}>{item.name}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{item.role}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-[10px] font-bold text-gray-300 shrink-0 pt-1">{item.ep}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-purple-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🔒', text: 'Air-gapped 環境指的是與外網物理隔離的網路，廣泛用於製造、金融、國防等高安全需求場景' },
                { emoji: '🏭', text: '工廠 LLM 的主要應用：知識庫問答、異常報告自動化、腳本輔助、多語言溝通' },
                { emoji: '😤', text: '離線部署最大的挑戰是依賴管理：所有套件、模型、映像檔都要預先準備好再搬入' },
                { emoji: '🛠️', text: '我的技術棧：Ollama（推論）+ Dify（應用平台）+ Docker（容器化），後續文章逐一拆解' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-400">這是系列第一篇</p>
          </div>
          <Link href="/blog/ai/ep02-ollama-local-llm" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.02 — Ollama 本地 LLM 部署</p>
            <p className="text-sm text-gray-500 mt-1">從安裝到第一個推論，含離線搬檔教學</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['AI 離線部署', 'Air-gapped', 'LLM', 'Ollama', 'Dify', '企業 AI', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
