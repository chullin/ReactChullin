'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Wifi, Zap, RefreshCw, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function WebDevEP19() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.19</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              React 怎麼和後端說話<br />
              <span className="text-emerald-200">fetch、loading 狀態、錯誤處理全攻略</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              從 useEffect + fetch 到 custom hook，再到 Next.js Server Component 的資料請求演進。
              學完這篇，你才算真正能寫一個「連得上後端」的 React 應用。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> fetch · useEffect · SWR · Server Component</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-400 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「我有一個 API：<code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono text-base">GET /api/users/1</code> 回傳 <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono text-base">{`{ name: 'Joseph', email: '...' }`}</code>。怎麼在 React 裡顯示這個資料？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這個問題聽起來很簡單，但實際上藏著好幾個坑——loading 中要顯示什麼？
                    請求失敗怎麼辦？userId 變了要不要重新請求？這篇從最基本的方法開始，
                    逐步演化到更好的寫法，每一步都說清楚「為什麼要這樣改」。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Section 1: fetch + useEffect */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Wifi className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">最基本的 fetch + useEffect</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            先看最直覺的版本。你有一個 userId，想要拿這個 user 的資料。
            React 裡「有副作用的事（呼叫 API、操作 DOM）」都要放進 <code className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">useEffect</code>——
            這是 React 的規定，不是建議。
          </p>

          <CodeBlock
            title="UserProfile.tsx — 基本 fetch 版本"
            lang="tsx"
            code={`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        // 注意！fetch 不會在 4xx/5xx 時丟出 Error
        // 你要自己檢查 res.ok
        if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
        return res.json();
      })
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [userId]);  // userId 變了就重新 fetch

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`}
          />

          <Card className="border-l-4 border-l-amber-400 bg-amber-50 border-0 shadow-none">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-800 mb-1">fetch 的最大陷阱</p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    很多人以為 <code className="bg-amber-100 px-1 rounded font-mono">fetch</code> 拿到 404 或 500 會自動進 <code className="bg-amber-100 px-1 rounded font-mono">.catch()</code>，其實不會。
                    <code className="bg-amber-100 px-1 rounded font-mono">fetch</code> 只有在「網路斷線」時才丟出 Error。
                    只要收到 Response（不管是 200 還是 500），它都視為「成功」。
                    所以你必須手動檢查 <code className="bg-amber-100 px-1 rounded font-mono">res.ok</code>。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed">
            這個版本是可以運作的，但有一個問題：當 userId 從 1 改成 2 時，
            畫面會先顯示 user 1 的資料（舊的 state），等新資料回來才更新。
            加上 <code className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">setIsLoading(true)</code> 在最前面可以解決這個問題——
            切換 userId 時立刻重置。
          </p>
        </motion.section>

        <Divider />

        {/* Section 2: Skeleton Loading */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Skeleton Loading——Loading Spinner 的進化版</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Loading spinner（轉圈圈）有個問題：使用者不知道等一下會出現什麼，
            心裡沒有預期，感覺等更久。Skeleton 的原理是「先畫出內容的骨架」，
            讓使用者知道「等一下大概會在這裡出現一個標題、這裡出現兩行文字」——
            心理上感覺更快，即使實際等待時間一樣。
          </p>

          <p className="text-gray-600 leading-relaxed">
            Facebook、LinkedIn、YouTube 都用 Skeleton，不是沒有原因的。
          </p>

          <CodeBlock
            title="UserSkeleton.tsx — Tailwind 動畫實現"
            lang="tsx"
            code={`function UserSkeleton() {
  return (
    // animate-pulse：Tailwind 的內建 CSS 動畫，會讓元素閃爍
    <div className="animate-pulse">
      {/* 模擬標題的位置和大小 */}
      <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
      {/* 模擬 email 欄位 */}
      <div className="h-4 bg-gray-200 rounded w-64 mb-2" />
      {/* 模擬其他文字 */}
      <div className="h-4 bg-gray-200 rounded w-32" />
    </div>
  );
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... fetch 邏輯不變

  // 把 "載入中..." 換成 Skeleton
  if (isLoading) return <UserSkeleton />;
  if (error) return <div className="text-red-500">錯誤：{error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`}
          />

          <Card className="border-0 shadow-md bg-teal-50">
            <CardBody className="p-6">
              <p className="font-bold text-teal-800 mb-2">Skeleton 設計技巧</p>
              <ul className="space-y-1.5 text-teal-700 text-sm">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5 text-teal-500" /> Skeleton 的形狀要盡量接近真實內容的形狀</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5 text-teal-500" /> 文字行高 <code className="bg-teal-100 px-1 rounded font-mono">h-4</code> 或 <code className="bg-teal-100 px-1 rounded font-mono">h-5</code>，標題 <code className="bg-teal-100 px-1 rounded font-mono">h-7</code> 或 <code className="bg-teal-100 px-1 rounded font-mono">h-8</code></li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5 text-teal-500" /> 寬度不要都一樣長，錯落排列更像真實文字</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5 text-teal-500" /> 顏色用 <code className="bg-teal-100 px-1 rounded font-mono">bg-gray-200</code>，不要太深也不要太淺</li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Section 3: Custom Hook */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">把 fetch 邏輯抽成 Custom Hook</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            如果你有很多頁面都需要 fetch 資料——使用者資料、文章列表、留言——
            每個都寫一遍 isLoading、isError、setData，很快就累了，而且改一個地方要改很多次。
          </p>

          <p className="text-gray-600 leading-relaxed">
            Custom Hook 的精髓就是：<strong>把重複的邏輯裝進一個函數，讓別人只要給我 URL，我就給你 data + loading + error。</strong>
            這個版本還加了 <code className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">AbortController</code>——
            當組件卸載時（例如使用者切走這頁），取消還在進行中的請求，避免記憶體洩漏。
          </p>

          <CodeBlock
            title="hooks/useFetch.ts — 可複用的 fetch hook"
            lang="tsx"
            code={`// hooks/useFetch.ts
import { useState, useEffect } from 'react';

function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;  // url 是 null 時跳過（等條件準備好）

    setIsLoading(true);
    setError(null);

    // AbortController：用來取消進行中的 fetch
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(err => {
        // AbortError 是「主動取消」，不是真的錯誤，忽略它
        if (err.name === 'AbortError') return;
        setError(err.message);
        setIsLoading(false);
      });

    // Cleanup 函數：組件卸載時執行，取消請求
    return () => controller.abort();
  }, [url]);  // url 改變就重新 fetch

  return { data, isLoading, error };
}`}
          />

          <p className="text-gray-600 leading-relaxed">
            有了這個 hook，使用端變得非常簡潔。原本一個元件要寫 20 行 fetch 邏輯，
            現在只要一行：
          </p>

          <CodeBlock
            title="UserProfile.tsx — 使用 useFetch"
            lang="tsx"
            code={`// 使用端：超級簡潔
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useFetch<User>(
    \`/api/users/\${userId}\`
  );

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
}

// 同樣的 hook，用在文章列表
function ArticleList() {
  const { data: articles, isLoading } = useFetch<Article[]>('/api/articles');

  if (isLoading) return <ArticleSkeleton />;
  return (
    <ul>
      {articles?.map(a => <li key={a.id}>{a.title}</li>)}
    </ul>
  );
}`}
          />

          <Card className="border-l-4 border-l-emerald-500 border-0 shadow-none bg-emerald-50">
            <CardBody className="p-6">
              <p className="font-bold text-emerald-800 mb-2">AbortController 為什麼重要？</p>
              <p className="text-emerald-700 text-sm leading-relaxed">
                想像使用者快速切換 Tab，每次切換都觸發一個新的 fetch 請求。
                沒有 AbortController 的話，舊的請求還在跑，等它回來時可能已經跑到別的頁面了——
                這時 <code className="bg-emerald-100 px-1 rounded font-mono">setState</code> 在已卸載的組件上執行，
                React 會顯示 warning，嚴重時還會造成 UI 資料錯亂（顯示到其他 tab 的資料）。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Section 4: SWR */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-cyan-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼 SWR 比手動 useEffect 更好</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            自己寫的 <code className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">useFetch</code> 有個盲點：
            每次元件重新 mount，就會重新請求一次 API，就算資料根本沒變。
            SWR（stale-while-revalidate）是 Vercel 出的 library，解決的正是這個問題。
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: '自動快取',
                desc: '同一個 URL 在同一個 session 裡不重複請求。A 元件問過 /api/users/1，B 元件問同一個 URL 直接拿快取。',
                color: 'bg-emerald-50 border-emerald-200',
                textColor: 'text-emerald-700',
                titleColor: 'text-emerald-800',
              },
              {
                title: '自動重新驗證',
                desc: '切去別的瀏覽器 Tab 再切回來，SWR 會悄悄在背景重新驗證資料有沒有過期——不需要 F5。',
                color: 'bg-teal-50 border-teal-200',
                textColor: 'text-teal-700',
                titleColor: 'text-teal-800',
              },
              {
                title: '自動重試',
                desc: '網路一時斷線請求失敗？SWR 會自動等一下重試，不需要你手動處理 retry 邏輯。',
                color: 'bg-cyan-50 border-cyan-200',
                textColor: 'text-cyan-700',
                titleColor: 'text-cyan-800',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color} shadow-none`}>
                <CardBody className="p-5">
                  <p className={`font-bold mb-2 ${item.titleColor}`}>{item.title}</p>
                  <p className={`text-sm leading-relaxed ${item.textColor}`}>{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <CodeBlock
            title="UserProfile.tsx — SWR 版本"
            lang="tsx"
            code={`// 安裝：npm install swr
import useSWR from 'swr';

// fetcher 函數：SWR 需要你告訴它「怎麼 fetch」
// 這樣設計是讓你可以換成 axios、graphql client 等
const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  });

function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, isLoading } = useSWR(
    \`/api/users/\${userId}\`,  // Key（也是 URL）
    fetcher                    // 如何 fetch
  );

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// 進階：全域設定 fetcher，不用每次都傳
// app/layout.tsx 或 _app.tsx
import { SWRConfig } from 'swr';

export default function RootLayout({ children }) {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then(r => r.json()) }}>
      {children}
    </SWRConfig>
  );
}

// 之後的用法可以省略 fetcher 參數
const { data } = useSWR('/api/users/1');`}
          />
        </motion.section>

        <Divider />

        {/* Section 5: Server Component */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Server className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Next.js Server Component — 最現代的方式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            前面說的 useEffect、useFetch、SWR 都是「在瀏覽器裡 fetch」——
            代表你的 API URL 會被使用者看到、頁面初次載入時有 loading 畫面、
            沒有 JavaScript 就沒有資料。
          </p>

          <p className="text-gray-600 leading-relaxed">
            Next.js 的 Server Component 把這件事翻轉過來：
            <strong>fetch 發生在伺服器上，完成後才把 HTML 送到瀏覽器。</strong>
            使用者看到的第一個畫面就已經有資料了，不需要 loading。
          </p>

          <CodeBlock
            title="app/users/[id]/page.tsx — Server Component（不需要 useState、useEffect）"
            lang="tsx"
            code={`// 注意：沒有 'use client'，這是 Server Component
// 可以直接寫 async function，在伺服器上執行

async function UserPage({ params }: { params: { id: string } }) {
  // 直接 await，就像 Node.js 寫法
  // API 金鑰、資料庫連線字串都不會暴露給瀏覽器
  const user = await fetch(
    \`https://api.example.com/users/\${params.id}\`,
    {
      // Next.js 擴充了 fetch，支援細粒度快取控制
      next: { revalidate: 60 }  // 這份資料 60 秒後重新驗證
      // 或者：cache: 'no-store'  // 每次請求都重新 fetch（動態資料）
      // 或者：cache: 'force-cache'  // 永久快取（靜態資料）
    }
  ).then(res => {
    if (!res.ok) throw new Error('User not found');
    return res.json();
  });

  // 直接 return JSX，資料在 HTML 裡，不需要等 JavaScript 載入
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
}

export default UserPage;`}
          />

          <Card className="border-l-4 border-l-cyan-500 border-0 shadow-none bg-cyan-50">
            <CardBody className="p-6">
              <p className="font-bold text-cyan-800 mb-2">Server Component 的限制</p>
              <p className="text-cyan-700 text-sm leading-relaxed mb-3">
                Server Component 在伺服器上執行，所以它沒有 useState、useEffect、onClick 等瀏覽器能力。
                如果你的頁面有互動（按鈕、表單、滾動事件），那些部分要另外拆成 Client Component（加上 <code className="bg-cyan-100 px-1 rounded font-mono">'use client'</code>），
                讓 Server Component 負責「拿資料」，Client Component 負責「互動」。
              </p>
              <p className="text-cyan-700 text-sm">
                這就是 Next.js App Router 的核心設計：大部分頁面可以是 Server Component（快、SEO 好），只有需要互動的小塊才 Client Component。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 比較表格 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-black text-gray-900">四種方法怎麼選？</h2>

          <p className="text-gray-600 leading-relaxed">
            不同方法適合不同場景，沒有哪一個是萬能的。看這個表格快速定位：
          </p>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                      <th className="px-5 py-3.5 text-left font-bold">方法</th>
                      <th className="px-5 py-3.5 text-left font-bold">適合場景</th>
                      <th className="px-5 py-3.5 text-left font-bold">缺點</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        method: 'fetch + useEffect',
                        when: '快速原型、學習理解原理',
                        con: '切換 userId 可能有 race condition，沒有快取',
                        bg: 'bg-white',
                      },
                      {
                        method: 'useFetch custom hook',
                        when: '中小型專案、想保持輕量',
                        con: '沒有跨組件快取，每次 mount 重新請求',
                        bg: 'bg-gray-50',
                      },
                      {
                        method: 'SWR',
                        when: 'Client-side 資料，需要自動快取/重驗',
                        con: '多一個依賴，需要理解 SWR 的快取模型',
                        bg: 'bg-white',
                      },
                      {
                        method: 'Server Component',
                        when: 'SEO 重要、初始資料、敏感 API',
                        con: '無法互動，互動部分要另外 Client Component',
                        bg: 'bg-gray-50',
                      },
                    ].map((row, i) => (
                      <tr key={i} className={row.bg}>
                        <td className="px-5 py-4 font-mono font-bold text-emerald-700">{row.method}</td>
                        <td className="px-5 py-4 text-gray-700">{row.when}</td>
                        <td className="px-5 py-4 text-gray-500">{row.con}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed">
            <strong>實際建議：</strong>Next.js 專案優先用 Server Component 處理初始資料載入；
            需要即時更新、使用者互動觸發的 fetch 用 SWR；如果不想多一個套件，自己寫 useFetch 也夠用。
            純學習或做 side project，直接 fetch + useEffect 最快上手。
          </p>
        </motion.section>

        <Divider />

        {/* 總結 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-black text-gray-900">總結</h2>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardBody className="p-8">
              <div className="space-y-4">
                {[
                  { step: '01', text: '最基本：fetch + useEffect + 三個 state（data、isLoading、error）——理解原理必學。' },
                  { step: '02', text: 'Skeleton 比 Loading Spinner 有更好的使用者體驗，用 animate-pulse 簡單實現。' },
                  { step: '03', text: 'Custom hook（useFetch）把重複邏輯封裝起來，記得加 AbortController 防止記憶體洩漏。' },
                  { step: '04', text: 'SWR 提供自動快取、重新驗證、重試，Client-side 資料的最佳選擇。' },
                  { step: '05', text: 'Next.js Server Component 在伺服器上 fetch，不需要 loading 狀態，SEO 友好，是最現代的方式。' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="bg-emerald-600 text-white text-xs font-black px-2 py-1 rounded shrink-0">{item.step}</span>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Divider className="mb-8" />
          <div className="flex flex-wrap gap-2">
            {['React', 'fetch', 'useEffect', 'SWR', 'Custom Hook', '資料請求', 'Loading Skeleton', 'Server Component', 'EP.19'].map(tag => (
              <Chip key={tag} variant="flat" color="success" size="sm" className="font-medium">{tag}</Chip>
            ))}
          </div>
        </motion.section>

        {/* Nav */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep18-app-router">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">上一篇</p>
                      <p className="font-bold text-gray-700 group-hover:text-emerald-700 transition-colors text-sm">EP.18 App Router</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep05-tailwind">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">下一篇</p>
                      <p className="font-bold text-gray-700 group-hover:text-emerald-700 transition-colors text-sm">EP.05 Tailwind CSS</p>
                    </div>
                    <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
