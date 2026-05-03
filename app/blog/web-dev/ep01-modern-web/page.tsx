'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowRight, Bookmark, Share2, Quote, CheckCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const Timeline = ({ steps }: { steps: { year: string; title: string; desc: string; badge?: string }[] }) => (
  <div className="space-y-0 my-6">
    {steps.map((s, i) => (
      <div key={i} className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shrink-0">{s.year}</div>
          {i < steps.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
        </div>
        <div className={`pb-6 ${i === steps.length - 1 ? '' : ''}`}>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-black text-gray-900">{s.title}</p>
            {s.badge && <Chip size="sm" variant="flat" color="primary" className="text-[10px] font-bold">{s.badge}</Chip>}
          </div>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">{s.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default function WebDevEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.01</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              什麼是現代網頁開發？<br />
              <span className="text-violet-300">從 HTML 到 React 的演進</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto">
              在動手寫第一行程式碼之前，先搞清楚這些名詞：<br />
              HTML、CSS、JavaScript、React、Next.js 之間的關係
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 text-violet-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024</span>
              </div>
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
            如果你完全不懂網頁開發，打開 Google 搜尋「如何架設個人網站」，會看到一堆讓你頭暈的名詞：
            React、Vue、Angular、Next.js、Nuxt、Vite、Webpack……
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇文章的目的很簡單：幫你在開始寫程式碼之前，<strong>先建立一張清晰的地圖</strong>。
            你會知道這些名詞是什麼、它們的關係是什麼，以及為什麼我的個人網頁選擇了 React + Next.js。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Web 三本柱 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">網頁的三個核心語言</h2>
          <p className="text-gray-700 leading-relaxed">
            所有的網頁，不管看起來多複雜，底層都是由三種語言組成的。你可以把一個網頁想成蓋房子：
          </p>

          <div className="grid gap-4">
            {[
              {
                icon: '🧱',
                name: 'HTML',
                full: 'HyperText Markup Language',
                role: '房子的骨架（結構）',
                color: 'bg-orange-50 border-orange-100',
                headColor: 'text-orange-800',
                desc: '定義「這裡有一個標題」、「這裡有一段文字」、「這裡有一張圖片」。沒有 HTML，瀏覽器不知道頁面上要放什麼東西。',
                code: `<h1>Joseph Chen</h1>\n<p>Software Engineer</p>\n<img src="photo.jpg" />`,
              },
              {
                icon: '🎨',
                name: 'CSS',
                full: 'Cascading Style Sheets',
                role: '房子的外觀（樣式）',
                color: 'bg-blue-50 border-blue-100',
                headColor: 'text-blue-800',
                desc: '定義「這個標題要用什麼字型」、「這個按鈕是什麼顏色」、「這個圖片要置中」。沒有 CSS，頁面只有黑白文字。',
                code: `h1 {\n  font-size: 48px;\n  color: #1a1a1a;\n}`,
              },
              {
                icon: '⚡',
                name: 'JavaScript',
                full: 'JS',
                role: '房子的電路（互動）',
                color: 'bg-yellow-50 border-yellow-100',
                headColor: 'text-yellow-800',
                desc: '定義「點擊按鈕後發生什麼事」、「這個數據要如何顯示」、「頁面要如何動態更新」。沒有 JS，網頁就是一張死的圖片。',
                code: `button.addEventListener('click', () => {\n  alert('你點我了！');\n});`,
              },
            ].map(({ icon, name, full, role, color, headColor, desc, code }) => (
              <div key={name} className={`border rounded-2xl p-6 ${color}`}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{icon}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-xl font-black ${headColor}`}>{name}</span>
                      <span className="text-gray-400 text-sm font-mono">{full}</span>
                      <span className="text-gray-400 text-sm">— {role}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                    <code className="block bg-white/60 rounded-xl p-3 font-mono text-xs text-gray-700 whitespace-pre">{code}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-900 mb-2">🏠 房子比喻總結</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              HTML 是骨架（牆、地板、屋頂），CSS 是外觀（油漆、家具擺設），JavaScript 是電路（電燈開關、冷氣遙控器）。
              三個缺一不可，你的個人網頁也是這三種語言在底層運作的。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 傳統 vs 現代 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">為什麼不直接寫 HTML/CSS/JS？</h2>
          <p className="text-gray-700 leading-relaxed">
            十年前，你只需要一個文字編輯器，寫一個 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">index.html</code> 就能做出一個網站。
            那為什麼現在大家都在用 React、Next.js 這些框架？
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-red-800 text-lg">😓 純 HTML/CSS/JS 的痛點</p>
              <ul className="space-y-2 text-red-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">❌</span>
                  <span><strong>重複程式碼太多：</strong>Navbar、Footer 每個頁面都要複製貼上一次</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">❌</span>
                  <span><strong>狀態管理困難：</strong>「按鈕被點了幾次」這種動態數據很難追蹤</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">❌</span>
                  <span><strong>頁面更新慢：</strong>每次點連結都要整頁重新載入</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">❌</span>
                  <span><strong>難以維護：</strong>一個小改動可能要改十幾個地方</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-green-800 text-lg">✅ React 框架帶來什麼</p>
              <ul className="space-y-2 text-green-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span><strong>元件化：</strong>Navbar 寫一次，全站共用，改一處處處改</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span><strong>狀態管理：</strong>useState 讓動態數據的追蹤變直覺</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span><strong>SPA/局部更新：</strong>只更新有變動的部分，不整頁刷新</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  <span><strong>龐大生態：</strong>幾乎任何功能都有現成的套件</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 演進時間軸 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">React → Next.js 的演進</h2>
          <p className="text-gray-700 leading-relaxed">
            React 和 Next.js 是什麼關係？簡單說：React 是一個 <strong>UI 函式庫</strong>，Next.js 是基於 React 的 <strong>完整框架</strong>。
          </p>
          <Timeline steps={[
            {
              year: '2013',
              title: 'React 誕生',
              desc: 'Facebook 開源 React。核心概念：把 UI 拆成一個個「元件（Component）」，每個元件管理自己的狀態與渲染。',
              badge: 'Meta 開源',
            },
            {
              year: '2016',
              title: 'Next.js 誕生',
              desc: 'Vercel（當時叫 Zeit）推出 Next.js，在 React 之上加入了：路由系統、Server-Side Rendering（SSR）、靜態生成（SSG）、API Routes。',
              badge: 'Vercel 出品',
            },
            {
              year: '2022',
              title: 'Next.js 13 — App Router',
              desc: '重大更新：引入 App Router，所有路由靠資料夾結構自動產生。Server Component 讓部分程式碼只在伺服器執行，提升效能。',
              badge: '目前主流',
            },
            {
              year: '現在',
              title: '我的個人網頁用的版本',
              desc: 'Next.js 16 + React 19 + TypeScript + Tailwind CSS + HeroUI + Framer Motion + Vercel 部署。這整個系列會一步步拆解每一塊。',
              badge: 'chullin.vercel.app',
            },
          ]} />

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
            <p className="font-black text-violet-800 mb-2">React vs Next.js — 一句話區分</p>
            <p className="text-violet-700 text-sm leading-relaxed">
              <strong>React</strong> 是積木（提供 Component、狀態管理的基本工具）。
              <strong>Next.js</strong> 是積木盒（提供路由、部署、效能最佳化等整套解決方案，內建 React）。
              你可以只用 React 不用 Next.js，但要付出更多自行設定的成本。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 我的網頁技術棧 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">我的個人網頁用了哪些技術？</h2>
          <p className="text-gray-700 leading-relaxed">
            打開 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">package.json</code> 就能看到一個專案用了哪些套件。以下是我的網頁的技術棧，這個系列每一篇都會深入介紹其中一塊：
          </p>
          <div className="space-y-3">
            {[
              { name: 'Next.js 16', role: '框架骨幹', desc: '路由、SSR/SSG、API Routes，整個網頁的基礎', ep: 'EP.02、EP.03、EP.08', color: 'bg-gray-900 text-white' },
              { name: 'React 19', role: 'UI 引擎', desc: 'Component 化開發，管理頁面狀態與渲染', ep: 'EP.04', color: 'bg-cyan-500 text-white' },
              { name: 'TypeScript', role: '型別安全', desc: 'JavaScript 的超集，加入型別系統防止 Bug', ep: 'EP.04', color: 'bg-blue-600 text-white' },
              { name: 'Tailwind CSS', role: '樣式系統', desc: '用 class 名稱寫樣式，不用再寫獨立的 CSS 檔案', ep: 'EP.05', color: 'bg-teal-500 text-white' },
              { name: 'HeroUI', role: '元件庫', desc: '現成的 Card、Button、Chip 等 UI 元件', ep: 'EP.06', color: 'bg-violet-600 text-white' },
              { name: 'Framer Motion', role: '動畫', desc: '讓元素滑入、淡出等動畫效果', ep: 'EP.07', color: 'bg-pink-500 text-white' },
              { name: 'Vercel', role: '部署平台', desc: 'GitHub push → 自動部署上線，免費方案夠用', ep: 'EP.08', color: 'bg-black text-white' },
            ].map(({ name, role, desc, ep, color }) => (
              <div key={name} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4">
                <div className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 ${color}`}>{name}</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">{role}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <div className="text-[10px] font-bold text-gray-300 shrink-0">詳見 {ep}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 這篇學到什麼 */}
        <section>
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-violet-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🧱', text: 'HTML = 結構，CSS = 樣式，JavaScript = 互動。三者是所有網頁的底層基礎' },
                { emoji: '⚡', text: 'React 解決了「元件重複、狀態難管理、頁面整頁刷新」三大痛點' },
                { emoji: '🏗️', text: 'Next.js 是 React 的完整框架，加入路由、SSR、部署最佳化' },
                { emoji: '🗺️', text: '我的網頁用了 Next.js + Tailwind + HeroUI + Framer Motion，這個系列會逐一拆解' },
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
          <Link href="/blog/web-dev/ep02-setup-env" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — 開發環境建置</p>
            <p className="text-sm text-gray-500 mt-1">Node.js、VS Code、建立第一個專案</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'React', 'Next.js', '入門', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
