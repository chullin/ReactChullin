'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title, lang = 'tsx' }: { code: string; title?: string; lang?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? lang}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = { info: 'bg-blue-50 border-blue-100 text-blue-800', warn: 'bg-amber-50 border-amber-100 text-amber-800', tip: 'bg-green-50 border-green-100 text-green-800' };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3"><span className="text-xl shrink-0">{icons[type]}</span><div className="text-sm leading-relaxed">{children}</div></div>
    </div>
  );
};

const Comparison = ({ left, right, leftLabel, rightLabel }: { left: string; right: string; leftLabel: string; rightLabel: string }) => (
  <div className="grid sm:grid-cols-2 gap-4 my-6">
    <div>
      <p className="text-xs font-black text-red-500 uppercase mb-2">{leftLabel}</p>
      <div className="rounded-2xl overflow-hidden shadow">
        <pre className="bg-gray-900 text-red-400 font-mono text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre">{left}</pre>
      </div>
    </div>
    <div>
      <p className="text-xs font-black text-green-500 uppercase mb-2">{rightLabel}</p>
      <div className="rounded-2xl overflow-hidden shadow">
        <pre className="bg-gray-900 text-green-400 font-mono text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre">{right}</pre>
      </div>
    </div>
  </div>
);

export default function WebDevEP04Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">EP.04</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              React 核心概念<br />
              <span className="text-cyan-300">Component、JSX、Props、State</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto">
              看懂我的個人網頁每一行程式碼的關鍵<br />
              用你已經看過的實際程式碼來說明
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-100 text-cyan-600 p-2.5 rounded-full"><User size={18} /></div>
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
            打開我的個人網頁任何一個 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">page.tsx</code> 檔案，你會看到滿滿的這種東西：
          </p>
          <CodeBlock title="你看到但還不懂的程式碼" code={`export default function BlogPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <h1 className="text-5xl font-black text-gradient">Blog</h1>
      <PostCard post={post} />
    </div>
  );
}`} />
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇結束後，你會看懂上面每一行在做什麼。我們從最基本的概念開始。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* PART 1: Component */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">1. Component — 積木式 UI</h2>
          <p className="text-gray-700 leading-relaxed">
            React 的核心思想是：把整個頁面拆成一個個獨立的「元件（Component）」。
            每個 Component 就是一個 <strong>JavaScript 函式，回傳 UI</strong>。
          </p>
          <CodeBlock title="最簡單的 Component" code={`// 定義一個元件
function MyButton() {
  return (
    <button>點我</button>
  );
}

// 在別的地方使用它（像 HTML tag 一樣）
function App() {
  return (
    <div>
      <MyButton />   {/* 用了三次，只需要寫一次程式碼 */}
      <MyButton />
      <MyButton />
    </div>
  );
}`} />

          <p className="text-gray-700 leading-relaxed">
            我的個人網頁的 Navbar 就是一個 Component，寫在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">components/Navbar.tsx</code>，
            然後在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">layout.tsx</code> 裡使用一次，但每個頁面都能看到它：
          </p>
          <CodeBlock title="layout.tsx — 使用 Navbar Component" code={`import Navbar from '@/components/Navbar';  // 引入

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />       {/* 使用，像 HTML tag 一樣 */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}`} />

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-cyan-800">Component 三個重要規則</p>
            <div className="space-y-2 text-cyan-700 text-sm">
              <p>• 函式名稱必須<strong>大寫開頭</strong>（MyButton、Navbar），小寫開頭的是 HTML 原生 tag（div、button）</p>
              <p>• 每個 Component 必須回傳 <strong>單一根元素</strong>（用一個 div 或 <code className="bg-cyan-100 px-1 rounded font-mono">&lt;&gt;</code> 包住）</p>
              <p>• Component 可以巢狀使用，就像積木可以組合</p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* PART 2: JSX */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">2. JSX — 在 JS 裡寫 HTML</h2>
          <p className="text-gray-700 leading-relaxed">
            你可能注意到 React 程式碼裡有奇怪的 HTML-like 語法，這叫 <strong>JSX（JavaScript XML）</strong>。
            它讓你可以在 JavaScript 函式裡直接寫「像 HTML 的東西」。
          </p>
          <Callout type="info">
            JSX 不是真正的 HTML。它最終會被編譯成 JavaScript。只是長得像 HTML，讓程式碼更好讀。
          </Callout>

          <h3 className="text-xl font-black text-gray-900">JSX 和 HTML 的差異</h3>
          <Comparison
            leftLabel="❌ HTML（不是 JSX）"
            rightLabel="✅ JSX（React 用的）"
            left={`<!-- HTML -->
<div class="container">
  <label for="name">Name</label>
  <img src="photo.jpg">
</div>`}
            right={`// JSX
<div className="container">
  <label htmlFor="name">Name</label>
  <img src="photo.jpg" />
</div>`}
          />

          <div className="space-y-3">
            {[
              { h: 'class → className', d: 'class 是 JavaScript 的保留字，JSX 改用 className' },
              { h: 'for → htmlFor', d: 'for 也是保留字（for 迴圈），改用 htmlFor' },
              { h: '自閉合 tag 必須加 /', d: '<img />、<br />、<input /> 必須有結尾斜線' },
            ].map(({ h, d }) => (
              <div key={h} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-amber-500 font-black text-sm shrink-0">⚠</span>
                <div><p className="font-bold text-gray-900 text-sm">{h}</p><p className="text-gray-500 text-xs mt-0.5">{d}</p></div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-gray-900">JSX 裡嵌入 JavaScript — 用 {'{}'}</h3>
          <p className="text-gray-700 leading-relaxed">
            JSX 裡用大括號 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">{'{}'}</code> 就能嵌入任何 JavaScript 表達式：
          </p>
          <CodeBlock title="JSX 嵌入 JavaScript" code={`function ProfileCard() {
  const name = "Joseph Chen";
  const year = 2024;
  const skills = ["Python", "React", "Next.js"];

  return (
    <div>
      <h1>{name}</h1>                          {/* 變數 */}
      <p>{'年份：' + year}</p>                   {/* 字串連接 */}
      <p>{skills.length} 個技能</p>              {/* 計算 */}
      <p>{year > 2020 ? '近期' : '早期'}</p>     {/* 三元運算子 */}
    </div>
  );
}`} />

          <p className="text-gray-700 leading-relaxed">
            看一個我的網頁的實際例子，blog/page.tsx 裡的這段：
          </p>
          <CodeBlock title="blog/page.tsx — 實際應用" code={`// series 是一個陣列，.map() 讓每個元素都產生一張卡片
{series.map((s, i) => (
  <a key={s.id} href={\`#\${s.id}\`}>
    <p className="text-lg font-black">{s.posts.length}</p>  {/* 顯示文章數 */}
    <p>{s.label}</p>                                        {/* 顯示系列名稱 */}
  </a>
))}`} />

          <Callout type="tip">
            <strong>.map() 是 React 中渲染列表的標準方式。</strong>把陣列的每個元素轉換成 JSX，就是一排卡片或列表。記得每個元素要加 <code>key</code> 屬性（唯一值），React 用它來識別哪個元素改變了。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* PART 3: Props */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">3. Props — 傳資料給 Component</h2>
          <p className="text-gray-700 leading-relaxed">
            Props（Properties）是從父元件傳給子元件的資料。就像 HTML 的屬性（<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">src</code>、<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">href</code>），
            Props 讓同一個 Component 能顯示不同的內容。
          </p>
          <CodeBlock title="Props 基本概念" code={`// 定義接收 props 的元件
function PostTitle({ title, date, author }) {   // 解構 props
  return (
    <div>
      <h2>{title}</h2>
      <p>{author} · {date}</p>
    </div>
  );
}

// 使用時傳入 props
function BlogPage() {
  return (
    <div>
      <PostTitle
        title="EP.01 — Two Sum"
        date="2024"
        author="Joseph Chen"
      />
      <PostTitle
        title="EP.02 — Set vs Dict"
        date="2024"
        author="Joseph Chen"
      />
    </div>
  );
}`} />

          <p className="text-gray-700 leading-relaxed">
            我的 blog/page.tsx 裡的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">EpRow</code> 元件就是這樣運作的，
            接收一個 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">post</code> 物件和 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">color</code>：
          </p>
          <CodeBlock title="blog/page.tsx — 實際的 Props 使用" code={`// 定義：接收 post 和 color 兩個 props
function EpRow({ post, color }: { post: Post; color: string }) {
  return (
    <Link href={post.href}>
      <span className={color}>{post.ep}</span>
      <p>{post.title}</p>
      <p>{post.subtitle}</p>
    </Link>
  );
}

// 使用：傳入 post 和 color
{visiblePosts.map((post, i) => (
  <EpRow key={i} post={post} color={s.color} />
))}`} />

          <h3 className="text-xl font-black text-gray-900">TypeScript 的型別標注</h3>
          <p className="text-gray-700 leading-relaxed">
            你可能注意到 Props 後面有 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">: {'{'} post: Post; color: string {'}'}</code>，
            這是 TypeScript 的型別標注，告訴編輯器「post 要是 Post 類型，color 要是字串」。
            如果你傳錯型別，VS Code 會立即顯示紅線提醒你。
          </p>
          <CodeBlock title="TypeScript 型別定義" code={`// 先定義 Post 的結構
type Post = {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  href: string;
  isExternal: boolean;
  ep?: string;  // ? 代表可選（optional）
};

// 然後在 props 裡使用這個型別
function EpRow({ post, color }: { post: Post; color: string }) {
  // TypeScript 現在知道 post.title 一定存在
  // 如果你打 post.xxx（不存在的欄位），VS Code 立即報錯
}`} />
          <Callout type="info">
            TypeScript 是「加了型別系統的 JavaScript」。主要好處是：<strong>在寫程式時就能發現 Bug</strong>，而不是等到上線才出錯。所有 .tsx 檔案都是 TypeScript + JSX。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* PART 4: State */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">4. useState — 管理動態狀態</h2>
          <p className="text-gray-700 leading-relaxed">
            State（狀態）是 Component 內部的「會改變的資料」。每次 state 改變，React 會自動重新渲染 UI。
          </p>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">useState</code> 是 React 的 Hook，用法是：
          </p>
          <CodeBlock title="useState 基本語法" code={`import { useState } from 'react';

function Counter() {
  // [當前值, 更新函式] = useState(初始值)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>目前計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>重設</button>
    </div>
  );
}`} />

          <p className="text-gray-700 leading-relaxed">
            我的 blog/page.tsx 裡用 useState 控制「展開/收起」的功能：
          </p>
          <CodeBlock title="blog/page.tsx — 實際的 useState" code={`function SeriesSection({ s }) {
  // expanded：目前是否展開（初始值 false = 收起）
  const [expanded, setExpanded] = useState(false);

  // 根據 expanded 決定要顯示幾篇
  const visiblePosts = !expanded ? s.posts.slice(0, 5) : s.posts;

  return (
    <div>
      {visiblePosts.map(...)}  {/* 顯示文章 */}

      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? '收起' : '展開全部'}  {/* 文字也會跟著變 */}
      </button>
    </div>
  );
}`} />

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-blue-800">State 更新的關鍵：一定要用 setter 函式</p>
            <Comparison
              leftLabel="❌ 這樣不會觸發重新渲染"
              rightLabel="✅ 這樣才正確"
              left={`// 直接修改 state 變數 → React 不知道改了
expanded = true;
count = count + 1;`}
              right={`// 用 setter 函式 → React 知道要更新 UI
setExpanded(true);
setCount(count + 1);`}
            />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* PART 5: use client */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">5. 'use client' — 哪裡執行很重要</h2>
          <p className="text-gray-700 leading-relaxed">
            你一定注意到幾乎每個 page.tsx 開頭都有這行：
          </p>
          <CodeBlock title="page.tsx 頂部" code={`'use client';  // ← 這是什麼？`} />
          <p className="text-gray-700 leading-relaxed">
            Next.js 有兩種 Component：
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <p className="font-black text-gray-900">Server Component（預設）</p>
              <p className="text-gray-600 text-sm leading-relaxed">在伺服器執行，HTML 直接輸出給瀏覽器。<strong>不能用 useState、onClick 等互動功能。</strong> 適合靜態展示。</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 space-y-2">
              <p className="font-black text-cyan-900">'use client' Component</p>
              <p className="text-cyan-700 text-sm leading-relaxed">在瀏覽器執行，<strong>可以用 useState、useEffect、onClick</strong> 等互動功能。凡是有互動的頁面都要加這行。</p>
            </div>
          </div>
          <Callout type="tip">
            <strong>什麼時候要加 'use client'？</strong> 只要你的 Component 裡用到：
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              <li>useState、useEffect 等 React Hooks</li>
              <li>onClick、onChange 等事件處理器</li>
              <li>framer-motion 的動畫</li>
            </ul>
            就要在檔案頂部加 <code>'use client'</code>。我的網頁幾乎每個頁面都有互動，所以都有加。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 綜合範例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">綜合範例：拆解首頁的程式碼</h2>
          <p className="text-gray-700 leading-relaxed">
            現在用學到的概念，完整讀懂首頁 Hero 區塊的一小段：
          </p>
          <CodeBlock title="app/page.tsx（首頁片段）" code={`'use client';                         // 有 framer-motion，需要在瀏覽器執行

import { Button, Link, Chip } from '@heroui/react';  // 引入元件庫的元件
import { ArrowRight } from 'lucide-react';            // 引入圖示
import { motion } from 'framer-motion';               // 引入動畫庫

export default function Home() {       // ← Component（大寫開頭的函式）
  return (                             // ← 回傳 JSX
    <div className="bg-white">         // ← className 不是 class（JSX 規則）
      <motion.div                      // ← motion.div 是帶動畫的 div
        initial={{ opacity: 0, y: 30 }}// ← Props：初始狀態（透明 + 往下偏移）
        animate={{ opacity: 1, y: 0 }} // ← Props：目標狀態（不透明 + 回到原位）
        transition={{ duration: 0.8 }} // ← Props：動畫持續 0.8 秒
      >
        <h1 className="text-7xl font-black">
          I think, therefore I am       // ← 純文字，不需要 {}
        </h1>
        <Button
          as={Link}                     // ← Props：讓 Button 渲染成 Link
          href="/resume"                // ← Props：連結目標
          color="primary"               // ← Props：HeroUI 的主題色
          endContent={<ArrowRight />}   // ← Props：傳 JSX 作為值（用 {}）
        >
          View Resume
        </Button>
      </motion.div>
    </div>
  );
}`} />
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🧩', text: 'Component = 大寫開頭的函式，回傳 JSX。積木式組合，寫一次到處用' },
                { emoji: '📝', text: 'JSX 像 HTML 但不一樣：class→className、for→htmlFor、自閉合 tag 要加 /' },
                { emoji: '⚡', text: 'JSX 裡用 {} 嵌入 JS 表達式，.map() 渲染列表時記得加 key' },
                { emoji: '📦', text: 'Props 是從外部傳進 Component 的資料，讓同個元件顯示不同內容' },
                { emoji: '🔄', text: 'useState 管理會變動的狀態，改變 state 一定要用 setter，React 才會重新渲染' },
                { emoji: '🖥️', text: "'use client' 讓 Component 在瀏覽器執行，有互動（Hook、事件）就要加" },
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
          <Link href="/blog/web-dev-ep03-project-structure" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.03 — 認識專案結構</p>
            <p className="text-sm text-gray-500 mt-1">app/、components/、page.tsx</p>
          </Link>
          <Link href="/blog/web-dev-ep05-tailwind" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.05 — Tailwind CSS</p>
            <p className="text-sm text-gray-500 mt-1">不再寫 CSS 檔，用 class 直接設計樣式</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'React', 'JSX', 'Props', 'useState', 'TypeScript', 'EP.04'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
