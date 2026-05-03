'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Folder, FileText, Settings, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const FileTree = ({ items }: { items: { indent: number; name: string; type: 'folder' | 'file'; desc?: string; highlight?: boolean }[] }) => (
  <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm space-y-1.5 my-6">
    {items.map((item, i) => (
      <div key={i} className={`flex items-start gap-2 ${item.highlight ? 'bg-violet-500/20 rounded-lg px-2 py-1 -mx-2' : ''}`} style={{ paddingLeft: `${item.indent * 20}px` }}>
        <span className="shrink-0 mt-0.5">
          {item.type === 'folder' ? '📁' : '📄'}
        </span>
        <span className={`${item.highlight ? 'text-violet-300 font-black' : 'text-gray-300'}`}>{item.name}</span>
        {item.desc && <span className="text-gray-500 text-xs ml-2">— {item.desc}</span>}
      </div>
    ))}
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip:  'bg-green-50 border-green-100 text-green-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default function WebDevEP03Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Folder size={400} strokeWidth={0.5} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.03</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              認識 Next.js 專案結構<br />
              <span className="text-violet-300">每個資料夾都有它的職責</span>
            </h1>
            <p className="text-indigo-200 text-lg font-medium max-w-2xl mx-auto">
              打開 VS Code 看到一堆資料夾和檔案不知道從哪裡下手？<br />
              這篇帶你一個一個搞清楚它們的用途
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
            EP.02 建好了專案，用 VS Code 打開之後，你看到的可能是這樣：
          </p>
          <FileTree items={[
            { indent: 0, name: 'my-portfolio/', type: 'folder' },
            { indent: 1, name: 'app/', type: 'folder', desc: '你 90% 的時間都在這裡' },
            { indent: 1, name: 'components/', type: 'folder', desc: '（需要自己建）可重用的 UI 元件' },
            { indent: 1, name: 'public/', type: 'folder', desc: '圖片、字型等靜態資源' },
            { indent: 1, name: 'node_modules/', type: 'folder', desc: '套件安裝位置，不需要動它' },
            { indent: 1, name: 'next.config.js', type: 'file', desc: 'Next.js 設定檔' },
            { indent: 1, name: 'tailwind.config.ts', type: 'file', desc: 'Tailwind CSS 設定' },
            { indent: 1, name: 'tsconfig.json', type: 'file', desc: 'TypeScript 設定' },
            { indent: 1, name: 'package.json', type: 'file', desc: '套件清單與 npm scripts' },
          ]} />
          <p className="text-gray-700 leading-relaxed">
            看起來很複雜？其實你需要了解的只有幾個核心位置。這篇會從「最常用」的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">app/</code> 開始，
            然後介紹你的個人網頁實際用到的每一個部分。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* app/ 資料夾 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Folder size={22} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">app/ — 你的主戰場</h2>
              <p className="text-gray-500 text-sm font-medium">App Router 的核心，所有頁面都在這裡</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Next.js 14 開始採用 <strong>App Router</strong>：資料夾結構 = 路由（URL 路徑）。看一下我的個人網頁的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">app/</code> 長什麼樣子：
          </p>

          <FileTree items={[
            { indent: 0, name: 'app/', type: 'folder' },
            { indent: 1, name: 'page.tsx', type: 'file', desc: '首頁 → chullin.vercel.app/', highlight: true },
            { indent: 1, name: 'layout.tsx', type: 'file', desc: '全站共用的外殼（Navbar、Footer）', highlight: true },
            { indent: 1, name: 'globals.css', type: 'file', desc: '全域 CSS，設定字型、顏色等' },
            { indent: 1, name: 'blog/', type: 'folder' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '部落格列表頁 → /blog', highlight: true },
            { indent: 2, name: 'leetcode-ep01-two-sum/', type: 'folder' },
            { indent: 3, name: 'page.tsx', type: 'file', desc: '→ /blog/leetcode-ep01-two-sum' },
            { indent: 1, name: 'projects/', type: 'folder' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '→ /projects' },
            { indent: 1, name: 'resume/', type: 'folder' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '→ /resume' },
            { indent: 1, name: 'contact/', type: 'folder' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '→ /contact' },
          ]} />

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-violet-800">App Router 的核心規則</p>
            <div className="space-y-2 text-violet-700 text-sm">
              <p>• 資料夾名稱 = URL 路徑的一段</p>
              <p>• 每個資料夾裡的 <code className="bg-violet-100 px-1 rounded font-mono">page.tsx</code> = 這個路徑的頁面</p>
              <p>• <code className="bg-violet-100 px-1 rounded font-mono">app/blog/page.tsx</code> 對應 URL <code className="bg-violet-100 px-1 rounded font-mono">/blog</code></p>
              <p>• 想新增一個頁面，建一個資料夾 + 在裡面放 <code className="bg-violet-100 px-1 rounded font-mono">page.tsx</code> 就好</p>
            </div>
          </div>
        </section>

        {/* layout.tsx 深入解釋 */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900">layout.tsx — 全站共用的外殼</h3>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">layout.tsx</code> 是一個特殊的檔案，它是所有頁面的「外殼」。
            不管你去哪個 URL，layout 都會被套用。
          </p>
          <p className="text-gray-700 leading-relaxed">
            我的個人網頁在 layout.tsx 裡放了 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">&lt;Navbar /&gt;</code> 和 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">&lt;Footer /&gt;</code>，
            所以每個頁面都自動有 Navbar 和 Footer，不需要每個頁面都加一次：
          </p>
          <CodeBlock title="app/layout.tsx（簡化版）" lang="tsx" code={`export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />        {/* 每個頁面都有 Navbar */}
        <main>
          {children}    {/* 這裡才是各頁面的內容 */}
        </main>
        <Footer />        {/* 每個頁面都有 Footer */}
      </body>
    </html>
  );
}`} />
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">{'{children}'}</code> 是 React 的概念，代表「子頁面的內容」。
            當你前往 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">/blog</code> 時，
            children 就是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">blog/page.tsx</code> 的內容。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* components/ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">components/ — 可重用的 UI 元件</h2>
              <p className="text-gray-500 text-sm font-medium">你自己寫的共用元件放這裡</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">components/</code> 資料夾是你自己建的（create-next-app 不會自動建），
            用來放「多個頁面都會用到的」UI 元件。
          </p>

          <FileTree items={[
            { indent: 0, name: 'components/', type: 'folder' },
            { indent: 1, name: 'Navbar.tsx', type: 'file', desc: '頂部導覽列，layout.tsx 引入它' },
            { indent: 1, name: 'Footer.tsx', type: 'file', desc: '底部資訊列' },
            { indent: 1, name: 'ContactForm.tsx', type: 'file', desc: '聯絡表單，contact 頁面引入它' },
          ]} />

          <Callout type="tip">
            <strong>元件 vs 頁面</strong>：
            <ul className="mt-1 space-y-1 list-disc list-inside">
              <li><strong>頁面（page.tsx）</strong>：對應一個 URL，放在 app/ 下</li>
              <li><strong>元件（component）</strong>：可重用的 UI 積木，放在 components/</li>
            </ul>
            元件本身沒有 URL，它被頁面或 layout 引入使用。
          </Callout>

          <p className="text-gray-700 leading-relaxed">
            以 Navbar 為例，它的程式碼大概長這樣：
          </p>
          <CodeBlock title="components/Navbar.tsx（簡化版）" lang="tsx" code={`'use client';  // 這個元件要在瀏覽器執行（有互動）

import Link from 'next/link';
import { Button } from '@heroui/react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-black text-xl">Joseph</Link>
        <div className="flex gap-4">
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/resume">Resume</Link>
        </div>
      </div>
    </nav>
  );
}`} />
        </section>

        <Divider className="opacity-30" />

        {/* public/ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">public/ — 靜態資源</h2>
          <p className="text-gray-700 leading-relaxed">
            所有不需要被 JavaScript 處理的靜態檔案（圖片、PDF 履歷、robots.txt）都放在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">public/</code>。
          </p>
          <FileTree items={[
            { indent: 0, name: 'public/', type: 'folder' },
            { indent: 1, name: 'assets/', type: 'folder' },
            { indent: 2, name: 'profile.png', type: 'file', desc: '個人照片' },
            { indent: 2, name: 'resume.pdf', type: 'file', desc: 'PDF 履歷' },
            { indent: 1, name: 'favicon.ico', type: 'file', desc: '瀏覽器分頁的小圖示' },
          ]} />
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">public/</code> 裡的東西可以直接用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">/</code> 路徑存取。
            例如 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">public/assets/profile.png</code> 在程式碼裡用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">/assets/profile.png</code> 就能引用。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 設定檔 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center">
              <Settings size={22} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">設定檔們</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                file: 'package.json',
                desc: '整個專案的身份證',
                content: `記錄：\n• 專案名稱、版本\n• 所有依賴套件（dependencies）\n• npm scripts（dev、build、start）\n\n你 npm install 過的套件都會記在這裡。`,
                code: `"scripts": {\n  "dev": "next dev",   // npm run dev 啟動開發伺服器\n  "build": "next build", // 打包產品版\n  "start": "next start"  // 執行打包後的版本\n}`,
              },
              {
                file: 'tailwind.config.ts',
                desc: 'Tailwind CSS 設定',
                content: `最重要的設定是 content 陣列（告訴 Tailwind 要掃描哪些檔案），和 plugins（加入 HeroUI 的 Tailwind 支援）。`,
                code: `const config = {\n  content: [\n    "./app/**/*.{js,ts,jsx,tsx}",\n    "./components/**/*.{js,ts,jsx,tsx}",\n    "./node_modules/@heroui/theme/dist/**/*.{js,ts}",\n  ],\n  plugins: [heroui()],\n};`,
              },
              {
                file: 'next.config.js',
                desc: 'Next.js 設定',
                content: `通常不需要動，但有些場景需要修改，例如允許外部圖片的域名（images.domains），或設定環境變數。`,
                code: `const nextConfig = {\n  images: {\n    domains: ['github.com'],  // 允許 GitHub 的圖片\n  },\n};\n\nmodule.exports = nextConfig;`,
              },
              {
                file: 'tsconfig.json',
                desc: 'TypeScript 設定',
                content: `最常用到的是 paths 設定，讓你可以用 @ 代替繁瑣的相對路徑。例如 @/components/Navbar 而不是 ../../components/Navbar。`,
                code: `{\n  "compilerOptions": {\n    "paths": {\n      "@/*": ["./*"]  // @ 代表專案根目錄\n    }\n  }\n}`,
              },
            ].map(({ file, desc, content, code }) => (
              <div key={file} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 flex items-center gap-3">
                  <code className="text-violet-700 font-black text-base">{file}</code>
                  <span className="text-gray-400 text-sm">— {desc}</span>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{content}</p>
                </div>
                <CodeBlock title={file} lang="js" code={code} />
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 我的個人網頁完整結構 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">我的個人網頁完整結構</h2>
          <p className="text-gray-700 leading-relaxed">
            做為參考，以下是我的個人網頁（chullin.vercel.app）的 app/ 結構，
            每個資料夾對應一個功能頁面：
          </p>
          <FileTree items={[
            { indent: 0, name: 'app/', type: 'folder' },
            { indent: 1, name: 'page.tsx', type: 'file', desc: '首頁（自我介紹）', highlight: true },
            { indent: 1, name: 'layout.tsx', type: 'file', desc: '全站 Navbar + Footer', highlight: true },
            { indent: 1, name: 'globals.css', type: 'file', desc: '全域樣式' },
            { indent: 1, name: 'blog/', type: 'folder', desc: '部落格功能' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '/blog — 文章列表' },
            { indent: 2, name: 'leetcode-ep01-two-sum/', type: 'folder' },
            { indent: 3, name: 'page.tsx', type: 'file', desc: '/blog/leetcode/ep01-two-sum' },
            { indent: 1, name: 'projects/', type: 'folder', desc: '作品集' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '/projects' },
            { indent: 1, name: 'resume/', type: 'folder', desc: '履歷' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '/resume' },
            { indent: 1, name: 'contact/', type: 'folder', desc: '聯絡表單' },
            { indent: 2, name: 'page.tsx', type: 'file', desc: '/contact' },
            { indent: 1, name: 'flashcards/', type: 'folder', desc: '英文單字練習工具' },
            { indent: 1, name: 'snake/', type: 'folder', desc: '貪吃蛇遊戲（互動展示）' },
          ]} />
          <Callout type="info">
            <strong>為什麼有 flashcards 和 snake？</strong> 這些是「互動展示」頁面，展示我用 React 可以做出的互動功能。作品集不只有靜態頁面，這樣更有說服力。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 實戰：新增一個頁面 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實戰：新增一個「About」頁面</h2>
          <p className="text-gray-700 leading-relaxed">
            光看不如動手。用 3 個步驟新增一個 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">/about</code> 頁面：
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center font-black text-sm shrink-0">1</div>
              <div>
                <p className="font-bold text-gray-900">在 app/ 下建立 about/ 資料夾</p>
                <CodeBlock title="terminal" code={`mkdir app/about`} />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center font-black text-sm shrink-0">2</div>
              <div>
                <p className="font-bold text-gray-900">在 about/ 裡新增 page.tsx</p>
                <CodeBlock title="app/about/page.tsx" lang="tsx" code={`export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-24">
      <h1 className="text-5xl font-black">About Me</h1>
      <p className="text-gray-500 mt-4 text-xl">
        Hi, I'm Joseph Chen, a Software Engineer.
      </p>
    </div>
  );
}`} />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center font-black text-sm shrink-0">3</div>
              <div>
                <p className="font-bold text-gray-900">打開瀏覽器前往 localhost:3000/about</p>
                <p className="text-gray-500 text-sm mt-1">你應該會看到「About Me」的標題。路由是自動建立的，不需要任何額外設定。</p>
              </div>
            </div>
          </div>
          <Callout type="tip">
            這就是 Next.js App Router 最直覺的地方：<strong>資料夾即路由</strong>。新增頁面只需要建資料夾 + 放 page.tsx，其他什麼都不用做。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-violet-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📁', text: 'app/ 是主戰場，資料夾結構就是 URL 路徑，page.tsx 就是頁面' },
                { emoji: '🏗️', text: 'layout.tsx 是全站外殼，Navbar 和 Footer 只需要寫一次' },
                { emoji: '🧩', text: 'components/ 放可重用元件（Navbar、Footer），多頁面共用' },
                { emoji: '🖼️', text: 'public/ 放靜態資源（圖片、PDF），直接用 /filename 路徑引用' },
                { emoji: '⚙️', text: 'package.json（套件清單）、tailwind.config.ts（樣式設定）、tsconfig.json（路徑縮寫）' },
                { emoji: '✨', text: '新增頁面：在 app/ 下建資料夾 + 放 page.tsx，一分鐘搞定' },
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
          <Link href="/blog/web-dev/ep02-setup-env" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — 開發環境建置</p>
            <p className="text-sm text-gray-500 mt-1">Node.js、VS Code、第一個專案</p>
          </Link>
          <Link href="/blog/web-dev/ep04-react-component" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.04 — React 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Component、JSX、Props，讀懂每一行程式碼</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'Next.js', 'App Router', '專案結構', 'EP.03'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
