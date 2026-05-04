'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Box, Container, Layers, Zap, Server } from 'lucide-react';
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

export default function WorkflowEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">工具與開發流程</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Docker 入門<br />
              <span className="text-blue-300 text-3xl md:text-4xl">Image、Container、Compose 一次搞懂</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl font-medium">
              環境一致性的終極解決方案：<br />
              從建構映像檔到多容器編排，徹底解決「我電腦上明明可以跑」的問題。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Box size={14} /> Docker · DevOps</span>
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
                  「Docker 的出現，讓軟體分發從『傳送代碼』變成了『傳送貨櫃』。
                  你不需要再為不同伺服器的環境設定而頭痛，因為貨櫃裡已經裝好了所有東西。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Core Concepts */}
        <section>
          <SectionHeader icon={Layers} title="1. 核心概念：Image vs Container" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              理解 Docker 就像理解物件導向編程：<strong>Image 是類別 (Class)，Container 是實例 (Instance)</strong>。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-2">
                <p className="font-black text-slate-800 flex items-center gap-2"><Box size={18} className="text-blue-600" /> Image (映像檔)</p>
                <p className="text-sm">唯讀的模板，包含了執行程式所需的所有環境、套件與代碼。一旦建構完成就不會改變。</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-2">
                <p className="font-black text-slate-800 flex items-center gap-2"><Container size={18} className="text-blue-600" /> Container (容器)</p>
                <p className="text-sm">映像檔的可執行實體。它可以被啟動、停止、刪除，並且擁有自己獨立的檔案系統與網路空間。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Dockerfile */}
        <section>
          <SectionHeader icon={Zap} title="2. Dockerfile：建構藍圖" color="text-amber-600 bg-amber-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Dockerfile 是一個文字檔，記錄了你如何從一個乾淨的系統一步步建構成你需要的映像檔。
            </p>
            <CodeBlock
              title="簡單的 Node.js Dockerfile"
              lang="dockerfile"
              code={`# 1. 使用官方 Node 映像檔作為基礎
FROM node:18-alpine

# 2. 設定工作目錄
WORKDIR /app

# 3. 複製相依性設定並安裝
COPY package*.json ./
RUN npm install

# 4. 複製所有原始碼
COPY . .

# 5. 定義啟動指令
CMD ["npm", "run", "dev"]`}
            />
          </div>
        </section>

        {/* 3. Docker Compose */}
        <section>
          <SectionHeader icon={Server} title="3. Docker Compose：多容器協作" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              當你的應用需要「資料庫 + 後端 API + 前端」時，手動啟動三個容器太麻煩了。<code>docker-compose.yml</code> 讓你一鍵啟動整個服務棧。
            </p>
            <CodeBlock
              title="docker-compose.yml 示例"
              lang="yaml"
              code={`version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password`}
            />
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6">🚀 Docker 面試必備概念</h2>
            <div className="space-y-4 text-blue-100">
              <p>• <strong>Docker vs VM</strong>：Docker 共享 Host OS 核心，輕量且啟動快；VM 模擬整個硬體與 OS，重量且慢。</p>
              <p>• <strong>Volume (資料卷)</strong>：容器刪除後資料會消失，必須掛載 Volume 才能實現資料持久化。</p>
              <p>• <strong>Network</strong>：容器之間預設是隔離的，可以透過 Docker Network 讓它們互相通訊。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/workflow/ep01-git-basics" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.01 — Git 入門實戰</p>
            <p className="text-sm text-gray-500 mt-1">Commit, Branch, Rebase 原理</p>
          </Link>
          <Link href="/blog" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">系列結束</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">回到部落格目錄</p>
            <p className="text-sm text-gray-500 mt-1">查看更多文章</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Docker', 'Container', 'Dockerfile', 'DevOps', 'Infrastructure', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
