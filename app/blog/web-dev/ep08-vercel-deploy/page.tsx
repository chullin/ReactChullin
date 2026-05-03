'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, CheckCircle, Globe, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = { info: 'bg-blue-50 border-blue-100 text-blue-800', warn: 'bg-amber-50 border-amber-100 text-amber-800', tip: 'bg-green-50 border-green-100 text-green-800' };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3"><span className="text-xl shrink-0">{icons[type]}</span><div className="text-sm leading-relaxed">{children}</div></div>
    </div>
  );
};

const Step = ({ n, title, badge, children }: { n: number; title: string; badge?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black text-base shrink-0">{n}</div>
      <h3 className="text-xl font-black text-gray-900">{title}</h3>
      {badge && <Chip size="sm" variant="flat" color="success" className="font-bold text-[10px]">{badge}</Chip>}
    </div>
    <div className="ml-12 space-y-4">{children}</div>
  </div>
);

export default function WebDevEP08Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-zinc-900 to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Globe size={500} strokeWidth={0.3} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-white/10 text-gray-300 border-white/20 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-white/10 text-gray-300 border-white/20 font-bold uppercase text-[10px]">EP.08</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Vercel 部署上線<br />
              <span className="text-gray-300">push 一下，全世界都能看到</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
              GitHub + Vercel，免費、自動化、有預覽 URL，<br />
              這就是 chullin.vercel.app 的部署方式
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 text-gray-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm"><Calendar size={13} /><span>2024</span></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            做到這篇，你已經有了一個在本機跑起來的個人網頁。最後一步：把它放到網路上，讓任何人都能用網址訪問。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            我選擇 <strong>Vercel</strong>。它是 Next.js 的親生父母（Vercel 公司開發了 Next.js），對 Next.js 的支援是最好的。
            更重要的是：<strong>對個人專案完全免費，而且設定超簡單</strong>。
          </p>

          {/* 流程圖 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-700 text-sm uppercase tracking-wider mb-5">部署流程一覽</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { icon: '💻', label: '本機開發', sub: 'localhost:3000' },
                { icon: '→', label: '', sub: '' },
                { icon: '🐙', label: 'push 到 GitHub', sub: 'git push' },
                { icon: '→', label: '', sub: '' },
                { icon: '▲', label: 'Vercel 自動建置', sub: '約 1–2 分鐘' },
                { icon: '→', label: '', sub: '' },
                { icon: '🌍', label: '上線！', sub: 'xxx.vercel.app' },
              ].map(({ icon, label, sub }, i) => (
                icon === '→'
                  ? <span key={i} className="text-gray-300 font-black text-2xl">→</span>
                  : (
                    <div key={i} className="flex flex-col items-center gap-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                      <span className="text-2xl">{icon}</span>
                      <span className="text-xs font-black text-gray-700">{label}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{sub}</span>
                    </div>
                  )
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            設定好之後，每次你 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">git push</code>，Vercel 會自動偵測到並重新部署。<strong>完全不需要手動操作</strong>。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Git 基礎 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">前置：Git 基礎</h2>
          <p className="text-gray-700 leading-relaxed">
            Vercel 需要從 GitHub 拉你的程式碼，所以先要把專案推到 GitHub。如果你還沒用過 Git，這裡快速介紹你需要知道的幾個指令：
          </p>

          <div className="space-y-4">
            {[
              {
                cmd: 'git init',
                desc: '在專案資料夾初始化 Git，只做一次',
              },
              {
                cmd: 'git add .',
                desc: '把所有改動的檔案加入暫存區（準備提交）',
              },
              {
                cmd: 'git commit -m "first commit"',
                desc: '建立一個提交（快照），記錄這個時間點的程式碼狀態',
              },
              {
                cmd: 'git remote add origin https://github.com/你的帳號/專案名.git',
                desc: '連接到 GitHub 上的遠端倉庫',
              },
              {
                cmd: 'git push -u origin main',
                desc: '把程式碼推送到 GitHub',
              },
            ].map(({ cmd, desc }) => (
              <div key={cmd} className="bg-gray-50 rounded-2xl p-5 space-y-2">
                <code className="font-mono text-sm font-black text-gray-900 bg-gray-800 text-green-400 px-3 py-1 rounded-lg block">{cmd}</code>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <Callout type="tip">
            <strong>create-next-app 已經幫你 git init 了！</strong> 用 create-next-app 建立的專案，初始化時已自動執行 git init。你只需要建立 GitHub repo 並 push 即可，不需要再 git init。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 部署步驟 */}
        <section className="space-y-10">
          <h2 className="text-3xl font-black text-gray-900">部署步驟：從零到上線</h2>

          <Step n={1} title="在 GitHub 建立 Repository">
            <p className="text-gray-700 text-sm leading-relaxed">
              前往 <code className="bg-gray-100 px-1 rounded font-mono text-xs">github.com</code>，登入後點右上角 <strong>「+」→「New repository」</strong>。
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {[
                  { f: 'Repository name', v: '你的專案名稱，例如 my-portfolio' },
                  { f: 'Visibility', v: 'Public（Vercel 免費方案可用私有 repo，但 Public 更方便）' },
                  { f: 'Initialize README', v: '不要勾選（你的本機已有程式碼，不需要）' },
                ].map(({ f, v }) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="font-black text-gray-500 shrink-0 text-xs w-28">{f}：</span>
                    <span className="text-gray-600 text-xs">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm">建立後，GitHub 會給你一個 URL，類似 <code className="bg-gray-100 px-1 rounded font-mono text-xs">https://github.com/你的帳號/my-portfolio.git</code>。</p>
          </Step>

          <Step n={2} title="把本機程式碼推到 GitHub">
            <CodeBlock title="terminal — 依序執行" code={`# 如果還沒有任何 commit
git add .
git commit -m "initial commit"

# 連接遠端倉庫（把 URL 換成你的）
git remote add origin https://github.com/你的帳號/my-portfolio.git
git branch -M main

# 推送
git push -u origin main`} />
            <p className="text-gray-700 text-sm">推送成功後，到 GitHub 頁面重整，應該能看到你的程式碼出現在上面。</p>
          </Step>

          <Step n={3} title="在 Vercel 連接 GitHub" badge="最重要">
            <p className="text-gray-700 text-sm leading-relaxed">
              前往 <code className="bg-gray-100 px-1 rounded font-mono text-xs">vercel.com</code>，點 <strong>Sign Up → Continue with GitHub</strong>（用 GitHub 帳號登入）。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              登入後進入 Dashboard，點 <strong>「Add New → Project」</strong>：
            </p>
            <div className="space-y-3">
              {[
                { n: '①', t: '選擇 GitHub repo', d: '在列表裡找到剛才建立的 my-portfolio，點「Import」' },
                { n: '②', t: '設定（幾乎不需要改）', d: 'Framework Preset 會自動偵測為 Next.js。Build Command、Output Directory 都不用動。' },
                { n: '③', t: '點「Deploy」', d: 'Vercel 會開始建置，大約 1–2 分鐘後完成' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <span className="font-black text-gray-400 shrink-0">{n}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout type="tip">
              建置完成後，Vercel 會給你一個 URL，格式是 <code>專案名稱.vercel.app</code>。我的是 <code>chullin.vercel.app</code>。<strong>這個 URL 是永久的，馬上可以分享給別人。</strong>
            </Callout>
          </Step>

          <Step n={4} title="之後每次更新：只要 git push">
            <p className="text-gray-700 text-sm leading-relaxed">
              連接好之後，之後修改程式碼、想更新線上版本，只需要：
            </p>
            <CodeBlock title="terminal — 每次更新的固定流程" code={`# 查看哪些檔案改動了
git status

# 加入所有改動
git add .

# 寫 commit 說明（描述這次改了什麼）
git commit -m "add EP.08 blog post"

# 推送 → Vercel 自動重新部署
git push`} />
            <p className="text-gray-700 text-sm">
              Push 之後大約 30 秒到 2 分鐘，Vercel 就完成重新部署，線上版本自動更新。
            </p>
          </Step>
        </section>

        <Divider className="opacity-30" />

        {/* 環境變數 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">環境變數（敏感資料保護）</h2>
          <p className="text-gray-700 leading-relaxed">
            如果你的專案有用到 API 金鑰（例如 EmailJS 的 Key、Google 的 API），絕對不能直接寫在程式碼裡推上 GitHub，要用環境變數：
          </p>
          <CodeBlock title=".env.local（只在本機，不推到 GitHub）" lang="bash" code={`# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx`} />
          <CodeBlock title="程式碼裡用 process.env 存取" lang="tsx" code={`// 用 process.env 讀取
emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  formData,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);`} />
          <p className="text-gray-700 leading-relaxed">
            然後在 Vercel 的 Dashboard 裡設定同樣的環境變數：
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="font-bold text-gray-900">Vercel Dashboard → 你的專案 → Settings → Environment Variables</p>
            <p className="text-gray-500 text-sm">在這裡把 .env.local 裡的 key-value 輸入進去，Vercel 建置時會自動注入這些變數。</p>
          </div>
          <Callout type="warn">
            <strong>記得把 .env.local 加入 .gitignore！</strong> create-next-app 已經自動把它加進去了，所以通常不用擔心。但建立新專案時最好確認一下 .gitignore 裡有沒有 <code>.env.local</code>。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* Preview Deployments */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Preview Deployments — 分支預覽</h2>
          <p className="text-gray-700 leading-relaxed">
            Vercel 有一個很實用的功能：<strong>每個 Git branch 都有獨立的預覽 URL</strong>。
          </p>
          <p className="text-gray-700 leading-relaxed">
            你在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">main</code> branch push → 正式環境更新。
            你在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">feature/new-design</code> branch push → 產生一個臨時的預覽 URL，不影響正式網站。
          </p>
          <CodeBlock title="terminal — 使用 feature branch 安全預覽" code={`# 建立新分支
git checkout -b feature/add-contact-page

# 做修改...
git add .
git commit -m "add contact page"
git push origin feature/add-contact-page
# Vercel 自動給你 https://my-portfolio-git-feature-add-contact-page-xxxx.vercel.app

# 預覽沒問題後，合併到 main
git checkout main
git merge feature/add-contact-page
git push origin main  # ← 這才更新正式網站`} />
          <Callout type="info">
            這個功能讓你可以「先看到效果再上線」。我自己每次做大的 UI 改動都會開新 branch，確認預覽 URL 沒問題才 merge 到 main。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 自訂網域 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">自訂網域（選用）</h2>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">xxx.vercel.app</code> 是免費的。如果你想要像 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">josephchen.dev</code> 這樣的自訂網域，需要另外購買。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
              <p className="font-black text-gray-900">購買網域</p>
              <p className="text-gray-500 text-sm leading-relaxed">Namecheap、GoDaddy、Google Domains（現已轉移到 Squarespace）等平台，.dev 或 .io 約 10–20 美金/年。</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
              <p className="font-black text-gray-900">在 Vercel 設定</p>
              <p className="text-gray-500 text-sm leading-relaxed">Dashboard → Settings → Domains → 輸入網域 → 在你的 DNS 提供商加入 Vercel 指定的 A record 或 CNAME。</p>
            </div>
          </div>
          <Callout type="tip">
            個人作品集用 <code>xxx.vercel.app</code> 完全夠用，面試官和 HR 看的是內容，不是域名。等你確定長期使用這個網頁了再考慮買網域。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 完整技術棧回顧 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">系列完結：完整技術棧一覽</h2>
          <p className="text-gray-700 leading-relaxed">
            走完 8 篇，你現在了解了打造我的個人網頁所用到的每一塊拼圖：
          </p>
          <div className="space-y-3">
            {[
              { ep: 'EP.01', name: '現代網頁開發', icon: '🗺️', desc: '從 HTML/CSS/JS 到 React 到 Next.js 的演進地圖' },
              { ep: 'EP.02', name: '開發環境建置', icon: '🛠️', desc: 'Node.js + VS Code + create-next-app + npm run dev' },
              { ep: 'EP.03', name: 'Next.js 專案結構', icon: '📁', desc: 'app/ 路由規則、layout.tsx、components/、public/' },
              { ep: 'EP.04', name: 'React 核心概念', icon: '⚛️', desc: 'Component、JSX、Props、useState、use client' },
              { ep: 'EP.05', name: 'Tailwind CSS', icon: '🎨', desc: 'class 名稱即樣式、響應式前綴、flex/grid 排版' },
              { ep: 'EP.06', name: 'HeroUI 元件庫', icon: '🧩', desc: 'Card、Button、Chip — 現成 UI 積木直接用' },
              { ep: 'EP.07', name: 'Framer Motion', icon: '✨', desc: 'motion.div、whileInView、spring 動畫' },
              { ep: 'EP.08', name: 'Vercel 部署', icon: '🌍', desc: 'GitHub push → 自動部署，免費上線 vercel.app' },
            ].map(({ ep, name, icon, desc }) => (
              <div key={ep} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-14 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-[11px] shrink-0">{ep}</div>
                <span className="text-2xl shrink-0">{icon}</span>
                <div className="flex-1">
                  <p className="font-black text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{desc}</p>
                </div>
                <CheckCircle size={18} className="text-green-500 shrink-0" />
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-gray-50 to-zinc-50 border border-gray-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-gray-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '▲', text: 'Vercel 是 Next.js 親生父母，對 Next.js 支援最好，個人方案免費' },
                { emoji: '🔄', text: '設定好之後：git push → Vercel 自動偵測 → 自動建置 → 自動上線，完全不需要手動操作' },
                { emoji: '🔐', text: '敏感資料放 .env.local，不推 GitHub；在 Vercel Dashboard 另外設定環境變數' },
                { emoji: '🌿', text: 'Preview Deployments：feature branch push 產生臨時預覽 URL，確認沒問題再 merge 到 main' },
                { emoji: '🌐', text: '預設域名 xxx.vercel.app 完全夠用，有需要再買自訂網域' },
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
          <Link href="/blog/web-dev/ep07-framer-motion" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.07 — Framer Motion</p>
            <p className="text-sm text-gray-500 mt-1">讓頁面元素動起來</p>
          </Link>
          <Link href="/blog" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">系列結束</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">回到部落格</p>
            <p className="text-sm text-gray-500 mt-1">查看所有文章</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'Vercel', '部署', 'GitHub', 'CI/CD', 'EP.08'].map((tag) => (
            <Chip key={tag} variant="flat" color="default" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
