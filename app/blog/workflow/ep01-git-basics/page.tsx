'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, GitBranch, GitCommit, GitPullRequest, Zap, ShieldCheck } from 'lucide-react';
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

export default function WorkflowEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">工具與開發流程</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Git 入門到實戰<br />
              <span className="text-blue-300 text-3xl md:text-4xl">Commit、Branch、Rebase 原理與面試題</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl font-medium">
              不只是存檔工具：深入理解分散式版本控制的核心邏輯，<br />
              應對團隊協作中的分支管理與衝突挑戰。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><GitBranch size={14} /> Git · Workflow</span>
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
                  「Git 是開發者的時光機。如果你不懂它的底層原理，這台時光機隨時可能發生『時空衝突』。
                  掌握 Git，是從獨立開發走向團隊協作的第一步。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Git 三階段 */}
        <section>
          <SectionHeader icon={GitCommit} title="1. Git 的三個區域" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Git 與其他版本控制系統最大的不同，在於它引入了 <strong>Staging Area (暫存區)</strong>。
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <p className="font-bold text-slate-800 text-sm">Working Directory</p>
                <p className="text-xs text-slate-500">你正在修改的檔案</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                <p className="font-bold text-blue-800 text-sm">Staging Area</p>
                <p className="text-xs text-blue-500"><code>git add</code> 後的狀態</p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                <p className="font-bold text-indigo-800 text-sm">Repository</p>
                <p className="text-xs text-indigo-500"><code>git commit</code> 完成存檔</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Merge vs Rebase */}
        <section>
          <SectionHeader icon={GitPullRequest} title="2. Merge vs Rebase：整合的藝術" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              這是面試中最常被問到的問題。兩者都能整合分支，但對「歷史紀錄」的處理方式截然不同。
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-black text-gray-900">Merge (合併)</p>
                <p className="text-sm">保留完整的分支開發軌跡。會產生一個額外的 "Merge Commit"。適合公共分支。</p>
              </div>
              <div className="space-y-3">
                <p className="font-black text-gray-900">Rebase (變基)</p>
                <p className="text-sm">重新定義分支的起點。會讓 Commit 歷史變成一條直線。適合個人 Feature 分支。</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <p className="font-black text-amber-900 mb-2 italic">⚠️ 黃金法則：絕對不要在公共分支 (如 main) 進行 Rebase！</p>
            </div>
          </div>
        </section>

        {/* 3. Interview Questions */}
        <section>
          <SectionHeader icon={ShieldCheck} title="3. Git 面試常考 10 題精選" color="text-emerald-600 bg-emerald-50" />
          <div className="space-y-6">
            {[
              { q: 'git reset --hard 與 --soft 的差別？', a: 'Soft 只撤銷 Commit，保留 Staging 內容；Hard 會連 Working Directory 的修改都抹除。' },
              { q: '如何處理 Git 衝突 (Conflict)？', a: '手動編輯衝突檔案，移除標記 (<<<<)，重新 git add 並 commit。' },
              { q: '什麼是 git cherry-pick？', a: '挑選特定的某個 Commit 應用到當前分支，而不是合併整個分支。' },
              { q: 'git stash 的用途？', a: '暫存當前未完成的修改，讓你能切換到其他分支處理緊急任務。' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
                <p className="font-black text-gray-900">Q: {item.q}</p>
                <p className="text-sm text-gray-600">A: {item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到目錄</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">查看所有系列</p>
          </Link>
          <Link href="/blog/workflow/ep02-docker-basics" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — Docker 入門</p>
            <p className="text-sm text-gray-500 mt-1">Image, Container, Compose</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Git', 'VCS', 'Workflow', 'Branch', 'Merge', 'Rebase', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
