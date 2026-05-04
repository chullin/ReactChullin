'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Layout, Monitor, MousePointer2, Cpu, Settings } from 'lucide-react';
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

export default function PythonEP09() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.09</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">Python 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Tkinter GUI 開發<br />
              <span className="text-blue-200 text-3xl md:text-4xl">事件驅動設計與 Raspberry Pi 自動化測試應用</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl font-medium">
              將腳本轉化為工具：利用 Python 內建庫建構視窗介面，<br />
              實現產線自動化測試系統 (SCT) 的控制中心。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Cpu size={14} /> Tkinter · SCT · Raspberry Pi</span>
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
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「雖然網頁介面現在很流行，但在工廠產線的離線環境中，一個穩定、免安裝、
                  與系統高度整合的桌面 GUI 仍然是自動化測試系統的首選。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Event-Driven Design */}
        <section>
          <SectionHeader icon={MousePointer2} title="1. 事件驅動設計 (Event-Driven)" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              不同於循序執行的腳本，GUI 程式的核心是 <code>mainloop</code>。它會不斷監聽使用者的操作（如點擊按鈕），並觸發對應的函式。
            </p>
            <CodeBlock
              title="Tkinter 基本架構"
              lang="python"
              code={`import tkinter as tk

def on_start_test():
    print("測試開始...")

root = tk.Tk()
root.title("SCT 測試控制台")

# 建立按鈕並綁定事件
btn = tk.Button(root, text="Start Test", command=on_start_test)
btn.pack(pady=20)

root.mainloop() # 進入無限循環，等待事件`}
            />
          </div>
        </section>

        {/* 2. Layout Management */}
        <section>
          <SectionHeader icon={Layout} title="2. 元件配置管理" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Tkinter 提供三種主要的配置方式：<code>pack</code>、<code>grid</code> 與 <code>place</code>。
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-16">pack</span>
                <p className="text-sm">簡單堆疊（上下左右），適合簡單的工具介面。</p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-16">grid</span>
                <p className="text-sm">網格佈局（類似 Excel），是實作複雜產線面板的最強工具。</p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 w-16">place</span>
                <p className="text-sm">絕對座標定位，較不靈活，但在固定解析度的嵌入式螢幕中很有用。</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Raspberry Pi 實戰應用 */}
        <section>
          <SectionHeader icon={Cpu} title="3. Raspberry Pi 與自動化測試 (SCT)" color="text-slate-600 bg-slate-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              在我的工作經驗中，曾利用 Raspberry Pi 搭建自動化測試站點。Tkinter 擔任了「控制中心」的角色：
            </p>
            <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Monitor size={20} /></div>
                <div>
                  <p className="font-black text-gray-900">即時狀態回饋</p>
                  <p className="text-sm text-gray-600">透過 Label 顯示當前測試進度（如：CPU 溫度、I/O 狀態）。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><Settings size={20} /></div>
                <div>
                  <p className="font-black text-gray-900">硬體參數配置</p>
                  <p className="text-sm text-gray-600">讓技術員能透過下拉選單選擇不同的產品型號進行測試。</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm italic">
              💡 實戰技巧：由於 Tkinter 是 Single-threaded，耗時的硬體通訊應使用 <code>threading</code> 或 <code>root.after()</code> 來避免介面卡頓。
            </p>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6">為什麼選擇 Tkinter？</h2>
            <div className="space-y-4 text-blue-50">
              <p>1. <strong>無需額外安裝</strong>：它是 Python 內建庫，非常適合受限環境（如生產線電腦）。</p>
              <p>2. <strong>輕量級</strong>：在 Raspberry Pi 這種運算資源有限的設備上執行非常流暢。</p>
              <p>3. <strong>跨平台</strong>：同一套代碼可以在 Windows 測試，然後無縫遷移到 Linux 生產線。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/python/ep08-pytorch-basics" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — PyTorch 入門</p>
            <p className="text-sm text-gray-500 mt-1">Tensor 操作與訓練迴圈</p>
          </Link>
          <Link href="/blog" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">系列結束</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">回到部落格目錄</p>
            <p className="text-sm text-gray-500 mt-1">查看更多文章</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Python', 'Tkinter', 'GUI', 'Raspberry Pi', 'Automation', 'EP.09'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
