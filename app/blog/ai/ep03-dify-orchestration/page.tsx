'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Cpu, GitBranch, Zap, Workflow } from 'lucide-react';
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

export default function AiEP03Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-6">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white font-black px-4 py-1.5 rounded-full text-xs">EP.03</Chip>
              <Chip size="sm" variant="flat" className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">AI 離線部署</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Dify 工作流程設計<br />
              <span className="text-blue-300 text-3xl md:text-4xl">Orchestration：打造可控的 AI Agent</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
              單純的 Chat 已經不夠了。透過 Dify 的編排能力，<br />
              在本地 LLM 上層建構穩定的業務邏輯流程。
            </p>
            <div className="flex items-center justify-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Workflow size={14} /> Dify · Agent · LLMOps</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「大模型是極其強大但難以預測的引擎。Orchestration（編排）的角色，就是為這台引擎裝上方向盤與排檔桿，
                  確保輸出的內容符合預定的業務規範。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Why Dify? */}
        <section>
          <SectionHeader icon={Cpu} title="1. 為什麼在本地環境需要 Dify？" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              在前面的章節，我們已經學會如何用 Ollama 跑起 LLM。但當你要實作「讀取 PDF 並回答問題」或「根據輸入自動發送郵件」時，
              單靠一段 Prompt 是不夠的。這就是 <strong>LLMOps 平台</strong> 出現的原因。
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Zap size={20} className="text-amber-500 shrink-0 mt-1" />
                <span><strong>可視化工作流</strong>：像畫流程圖一樣定義 AI 的思考步驟。</span>
              </li>
              <li className="flex gap-3">
                <Zap size={20} className="text-amber-500 shrink-0 mt-1" />
                <span><strong>知識庫 (RAG)</strong>：輕鬆處理本地文件的向量化與檢索。</span>
              </li>
              <li className="flex gap-3">
                <Zap size={20} className="text-amber-500 shrink-0 mt-1" />
                <span><strong>API 封裝</strong>：直接將設計好的 Agent 變成標準的 REST API 給前端調用。</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Orchestration Architecture */}
        <section>
          <SectionHeader icon={GitBranch} title="2. 工作流編排架構" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              一個標準的 Dify Workflow 通常由多個「節點」構成。理解數據如何在節點間流動是核心。
            </p>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <p className="font-black text-slate-800 mb-6 text-center">典型 RAG 工作流</p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 p-3 bg-white border rounded-xl text-center shadow-sm text-sm font-bold">Start: 使用者提問</div>
                <div className="h-6 w-0.5 bg-slate-300" />
                <div className="w-48 p-3 bg-blue-50 border border-blue-200 rounded-xl text-center shadow-sm text-sm font-bold text-blue-700">Knowledge: 檢索本地 SOP</div>
                <div className="h-6 w-0.5 bg-slate-300" />
                <div className="w-48 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center shadow-sm text-sm font-bold text-indigo-700">LLM: 整合資訊並回答</div>
                <div className="h-6 w-0.5 bg-slate-300" />
                <div className="w-48 p-3 bg-white border rounded-xl text-center shadow-sm text-sm font-bold">End: 輸出結果</div>
              </div>
            </div>
            <p>
              在 Dify 中，你可以使用 <strong>Template</strong> 節點來精確控制 Prompt 的格式，例如：
            </p>
            <CodeBlock
              title="Prompt Template"
              lang="text"
              code={`你是工廠維護專家。請根據以下參考資料回答使用者的問題。
---
參考資料：{{ knowledge_context }}
---
問題：{{ query }}`}
            />
          </div>
        </section>

        {/* 3. Integration with Ollama */}
        <section>
          <SectionHeader icon={Zap} title="3. 整合 Ollama 實戰" color="text-amber-600 bg-amber-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              要在 Dify 裡使用本地模型，最關鍵的一步是讓 Dify 容器能夠存取到主機上的 Ollama 服務。
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <p className="font-black text-amber-900 mb-3">設定關鍵：host.docker.internal</p>
              <p className="text-amber-800 text-sm">
                當 Dify 在 Docker 容器中執行時，它不能直接訪問 <code>localhost:11434</code>。
                在 Dify 的模型供應商設定中，位址應填寫為：
              </p>
              <code className="block bg-white p-3 rounded-lg text-amber-900 font-mono text-xs my-3 border border-amber-200">
                http://host.docker.internal:11434
              </code>
              <p className="text-amber-700 text-xs italic">
                * 注意：同時也需要將 Ollama 的環境變數 <code>OLLAMA_HOST</code> 設定為 <code>0.0.0.0</code>。
              </p>
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6">這篇學到什麼？</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🛠️</span>
                <p className="text-blue-100">Dify 提供了可視化的編排界面，大幅降低了開發複雜 AI 應用的門檻。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🏗️</span>
                <p className="text-blue-100">透過 RAG（檢索增強生成），我們能讓本地 LLM 回答關於私有文檔的問題。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🔌</span>
                <p className="text-blue-100">學會了如何在 Docker 環境下打通與 Ollama 的通訊隧道。</p>
              </div>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep02-ollama-local-llm" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.02 — Ollama 本地部署</p>
            <p className="text-sm text-gray-500 mt-1">從安裝到離線搬檔</p>
          </Link>
          <Link href="/blog/ai/ep04-transformer-tts" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.04 — Transformer & TTS</p>
            <p className="text-sm text-gray-500 mt-1">語音合成架構原理</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-indigo-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Dify', 'Orchestration', 'Agent', 'RAG', 'LLMOps', 'EP.03'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
