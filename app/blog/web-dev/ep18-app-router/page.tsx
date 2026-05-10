'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Server, Monitor, FolderOpen, Globe, Layout, Tag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function WebDevEP18() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.18</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Next.js App Router：Server Component、路由、Layout 一次搞懂<br />
              <span className="text-slate-300">&apos;use client&apos; 為什麼重要、動態路由 [slug]、Metadata API——現代 Next.js 完整指南</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              EP.04 留下的伏筆在這裡補完。理解 App Router 的架構，
              你就能從零架出一個完整、SEO 友好、高效能的部落格系統。
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Next.js · App Router · Server Component · Layout</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-slate-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「EP.04 在最後說了 &apos;use client&apos; 很重要，但只有一句話就帶過了。
                    這篇補完：什麼時候要加 &apos;use client&apos;？Next.js 的路由怎麼運作？Layout 是什麼？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    讀完這篇，你就能獨立架出一個完整的部落格系統——包含動態路由、巢狀 Layout、SEO 最佳化。
                    一起把 App Router 的拼圖全部拼起來。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 1: Server Component Revolution */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Server className="text-slate-700" size={28} />
            <h2 className="text-3xl font-black text-gray-900">App Router 的革命：Server Component</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            在 Next.js 13 的 App Router 出現之前，所有 Component 都在瀏覽器（Client）執行。
            App Router 帶來了一個根本性的改變：<strong>Component 預設在伺服器上執行</strong>，
            HTML 直接傳給瀏覽器，只有需要互動的部分才下載 JavaScript。
          </p>

          <Card className="border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 shadow-none">
            <CardBody className="p-6">
              <p className="text-gray-700 leading-relaxed text-base">
                <strong className="text-green-700">比喻：</strong>
                就像餐廳的「外帶」和「內用」。
                Server Component 是廚房做好打包好的便當，直接送過來——快而且 SEO 友好。
                Client Component 是你坐在餐廳裡，廚師在你面前現做——可以互動，但需要載入 JavaScript。
                好的 Next.js 架構就是：大部分點外帶，只有需要互動的部分才內用。
              </p>
            </CardBody>
          </Card>

          <CodeBlock
            title="server-vs-client.tsx"
            lang="typescript"
            code={`// ─── Server Component（預設，不加 'use client'）───────────────
// 在伺服器上執行，HTML 直接傳給瀏覽器
// ✅ 可以直接 await fetch（不需要 useEffect）
// ✅ 可以直接讀資料庫（在伺服器上！）
// ✅ 不會把 API key 暴露給前端
// ❌ 不能用 useState、useEffect、onClick 等

async function BlogPost({ slug }: { slug: string }) {
  // 在伺服器上直接請求，沒有 Loading 狀態問題
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// ─── Client Component（加了 'use client'）─────────────────────
// 在瀏覽器上執行（同時也在伺服器上做 SSR 的初次渲染）
// ✅ 可以用 useState、useEffect
// ✅ 可以處理事件（onClick、onChange）
// ✅ 可以用瀏覽器 API（localStorage, window）
// ❌ 不能直接 async/await（需要放在 useEffect 裡）

'use client';

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(42);

  function handleLike() {
    setLiked(prev => !prev);
    setCount(prev => liked ? prev - 1 : prev + 1);
  }

  return (
    <button onClick={handleLike} className="flex items-center gap-2">
      <span>{liked ? '❤️' : '🤍'}</span>
      <span>{count}</span>
    </button>
  );
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: When to use 'use client' */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Monitor className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">什麼時候需要 &apos;use client&apos;</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-zinc-800">
                  <th className="text-left px-5 py-4 font-black text-white">需要 &apos;use client&apos;</th>
                  <th className="text-left px-5 py-4 font-black text-slate-300">不需要（Server Component 更好）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['useState、useEffect、useRef', '靜態資料展示（文章內容、列表）'],
                  ['onClick、onChange 等事件處理', '直接 fetch API 取資料'],
                  ['瀏覽器 API（localStorage, window, document）', '讀取資料庫、檔案系統'],
                  ['動畫（framer-motion 的 motion 元件）', 'SEO 重要的頁面（搜尋引擎可以爬到）'],
                  ['即時互動（搜尋、表單、計時器）', '不含互動的純展示 UI'],
                ].map(([client, server], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-800">{client}</td>
                    <td className="px-5 py-3.5 text-gray-500">{server}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="border border-amber-100 bg-amber-50 shadow-none">
            <CardBody className="p-5">
              <p className="font-black text-amber-800 mb-2">黃金原則：把互動推到葉子節點</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                盡量讓大型的「容器 Component」保持 Server Component，
                只把真正需要互動的<strong>小組件</strong>標記為 Client Component。
                例如：文章頁面（Server Component）→ 文章內容（Server Component）→ 按讚按鈕（Client Component）。
                這樣大部分 HTML 都在伺服器產生，JavaScript bundle 最小化。
              </p>
            </CardBody>
          </Card>

          <CodeBlock
            title="component-tree-pattern.tsx"
            lang="typescript"
            code={`// ✅ 好的架構：Server Component 包著小 Client Component
// app/blog/[slug]/page.tsx（Server Component）
async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);  // 直接在伺服器取資料

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* 只有按讚按鈕需要互動，只有它是 Client Component */}
      <LikeButton postId={post.id} initialCount={post.likes} />

      {/* 留言區需要輸入，也是 Client Component */}
      <CommentSection postId={post.id} />
    </article>
  );
}

// ❌ 不好的架構：因為一個按鈕，整個頁面變成 Client Component
'use client';  // 只是因為要加 LikeButton 就把整頁標記？

async function BlogPostPage() {
  // 現在要用 useEffect 取資料，增加複雜度
  // 頁面初始載入是空的，SEO 不友好
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: File Structure */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FolderOpen className="text-yellow-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">App Router 的檔案結構</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            App Router 的核心概念是<strong>檔案即路由</strong>。
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono mx-1">app/</code>
            目錄下的每個資料夾對應一個 URL 路徑，每個特殊檔名都有固定用途。
          </p>

          <CodeBlock
            title="app/ 目錄結構"
            lang="bash"
            code={`app/
├── page.tsx          → 網站首頁 (/)
├── layout.tsx        → 全站 Layout（導覽列、頁腳）
├── loading.tsx       → 全站載入中畫面（自動！）
├── error.tsx         → 全站錯誤邊界（自動！）
├── not-found.tsx     → 404 頁面
│
├── blog/
│   ├── page.tsx      → 部落格列表頁 (/blog)
│   ├── layout.tsx    → 只有 /blog/* 才有的 Layout
│   └── [slug]/
│       ├── page.tsx  → 個別文章 (/blog/hello-world)
│       └── loading.tsx → 文章專用載入畫面
│
├── (marketing)/      → 分組路由（括號不影響 URL）
│   ├── about/
│   │   └── page.tsx  → (/about)
│   └── contact/
│       └── page.tsx  → (/contact)
│
└── api/
    └── posts/
        └── route.ts  → API 端點 (/api/posts)`}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { file: 'page.tsx', desc: '頁面的主要內容，這個路由的 UI', color: 'bg-blue-50 border-blue-100', tc: 'text-blue-700' },
              { file: 'layout.tsx', desc: '包裹子頁面的框架，children 是子頁面', color: 'bg-green-50 border-green-100', tc: 'text-green-700' },
              { file: 'loading.tsx', desc: 'Suspense 邊界，資料載入時自動顯示', color: 'bg-yellow-50 border-yellow-100', tc: 'text-yellow-700' },
              { file: 'error.tsx', desc: '錯誤邊界，子元件 throw 時自動顯示', color: 'bg-red-50 border-red-100', tc: 'text-red-700' },
              { file: 'not-found.tsx', desc: '呼叫 notFound() 時顯示，也是 404', color: 'bg-purple-50 border-purple-100', tc: 'text-purple-700' },
              { file: 'route.ts', desc: 'API 端點，回傳 Response 物件', color: 'bg-slate-50 border-slate-100', tc: 'text-slate-700' },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-4 ${item.color}`}>
                <p className={`font-mono font-black text-sm mb-1 ${item.tc}`}>{item.file}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: Dynamic Routes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Globe className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">動態路由 [slug]</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            部落格文章、產品頁面、用戶個人頁——這些 URL 是「動態的」，
            你不可能為每篇文章建一個獨立的資料夾。
            用方括號 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">[param]</code> 建立動態路由。
          </p>

          <CodeBlock
            title="app/blog/[slug]/page.tsx"
            lang="typescript"
            code={`// [slug] 資料夾名稱中的方括號代表「動態參數」
// 這個 Component 對應所有 /blog/* 的路徑

// TypeScript 型別：params 包含動態參數
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  // params.slug 就是 URL 裡的那段文字
  // 訪問 /blog/hello-world → params.slug = 'hello-world'
  // 訪問 /blog/my-first-post → params.slug = 'my-first-post'

  const post = await getPost(params.slug);

  // 如果找不到文章，顯示 404
  if (!post) {
    notFound();  // 觸發 not-found.tsx
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
    </article>
  );
}`}
          />

          <CodeBlock
            title="靜態生成：generateStaticParams"
            lang="typescript"
            code={`// 告訴 Next.js「這個動態路由有哪些可能的值」
// Next.js 在 build 時就預先產生這些頁面（靜態 HTML），超快！

export async function generateStaticParams() {
  // 這個函數在 build 時在伺服器上執行
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  // 回傳所有可能的 slug 值
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
  // → Next.js 會預先產生 /blog/hello-world、/blog/my-post 等頁面
}

// 如果不加 generateStaticParams：
// → 每次請求時在伺服器上動態產生（SSR）
// → 頁面每次都要等 API 回應

// 如果加了 generateStaticParams：
// → Build 時就預先產生 HTML（SSG）
// → 頁面請求幾乎是即時的（CDN 直接回傳靜態 HTML）`}
          />

          <CodeBlock
            title="巢狀動態路由"
            lang="typescript"
            code={`// 多層動態路由：app/blog/[category]/[slug]/page.tsx
// URL：/blog/react/hooks-intro

export default function PostPage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  // params.category = 'react'
  // params.slug = 'hooks-intro'
  return <div>{params.category} / {params.slug}</div>;
}

// 捕獲所有路徑：app/docs/[...path]/page.tsx
// URL：/docs/a/b/c → params.path = ['a', 'b', 'c']

export default function DocsPage({
  params,
}: {
  params: { path: string[] }
}) {
  return <div>{params.path.join(' > ')}</div>;
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: Layout */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layout className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Layout 的強大功能</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Layout 是 App Router 最強大的概念之一。它是一個「框架」，
            子頁面在它的 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">children</code> 裡渲染，
            切換頁面時 Layout 本身<strong>不會重新渲染</strong>（只有 children 替換）。
          </p>

          <CodeBlock
            title="巢狀 Layout 示範"
            lang="typescript"
            code={`// ─── app/layout.tsx（全站 Root Layout）─────────────────────────
// 每個頁面都有這個 Layout，這裡放導覽列和頁腳
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <Navbar />               {/* 每個頁面都有導覽列 */}
        <main>{children}</main>  {/* 頁面內容在這裡替換 */}
        <Footer />               {/* 每個頁面都有頁腳 */}
      </body>
    </html>
  );
}

// ─── app/blog/layout.tsx（只有 /blog/* 才有的 Layout）───────────
// 這裡可以加只有部落格需要的東西，例如分類側邊欄
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-[1fr_280px] gap-10">
        <div>{children}</div>   {/* 文章內容 */}
        <BlogSidebar />          {/* 只有部落格有的側邊欄 */}
      </div>
    </div>
  );
}

// 訪問 /blog/hello-world 時，渲染結構是：
// RootLayout → BlogLayout → page.tsx
// 也就是：
// <html><body>
//   <Navbar />
//   <main>
//     <div className="max-w-6xl ...">
//       <div>{/* 文章頁面內容 */}</div>
//       <BlogSidebar />
//     </div>
//   </main>
//   <Footer />
// </body></html>`}
          />

          <div className="space-y-4">
            {[
              {
                title: 'Layout 不重新渲染',
                desc: '從 /blog/post-a 切換到 /blog/post-b 時，BlogLayout 不會重新渲染，只有 page.tsx 的內容替換。這讓側邊欄的狀態（例如展開的分類）在頁面切換時保持不變。',
                color: 'bg-blue-50 border-blue-100',
                tc: 'text-blue-800',
                dc: 'text-blue-700',
              },
              {
                title: '分組路由 (group)：不影響 URL 的 Layout',
                desc: '用括號建立的資料夾（例如 (marketing)）不會出現在 URL 裡，但可以有自己的 Layout。適合讓行銷頁面和應用程式頁面用不同的 Layout，而不影響 URL 結構。',
                color: 'bg-purple-50 border-purple-100',
                tc: 'text-purple-800',
                dc: 'text-purple-700',
              },
              {
                title: 'loading.tsx 和 Suspense',
                desc: '在 Layout 旁邊放一個 loading.tsx，Next.js 會自動把 page.tsx 包在 React Suspense 裡。資料還在載入時顯示 loading.tsx，資料到了就替換成 page.tsx。完全不需要手動寫 loading state！',
                color: 'bg-green-50 border-green-100',
                tc: 'text-green-800',
                dc: 'text-green-700',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <p className={`font-black mb-2 ${item.tc}`}>{item.title}</p>
                <p className={`text-sm leading-relaxed ${item.dc}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: Metadata API */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Tag className="text-rose-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Metadata API（SEO 最佳化）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            App Router 提供了一套完整的 Metadata API，讓你在 Server Component 裡直接設定 SEO 相關的 meta tag，
            不需要手動操作 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">&lt;head&gt;</code>。
          </p>

          <CodeBlock
            title="靜態 Metadata"
            lang="typescript"
            code={`// app/page.tsx 或任何 page.tsx / layout.tsx
import type { Metadata } from 'next';

// 直接 export 一個 metadata 物件
export const metadata: Metadata = {
  title: '我的部落格 | Joseph Chen',
  description: '技術文章、LeetCode 題解、工程師日常——全端開發的心得分享',
  keywords: ['React', 'Next.js', 'TypeScript', '前端開發'],
  authors: [{ name: 'Joseph Chen' }],

  // Open Graph（Facebook、LINE 分享時顯示的預覽）
  openGraph: {
    title: '我的部落格',
    description: '技術文章、LeetCode 題解、工程師日常',
    url: 'https://my-blog.vercel.app',
    siteName: '技術筆記',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '部落格封面圖',
      }
    ],
    locale: 'zh_TW',
    type: 'website',
  },

  // Twitter Card（在 Twitter/X 上分享的預覽）
  twitter: {
    card: 'summary_large_image',
    title: '我的部落格',
    description: '技術文章、LeetCode 題解',
    images: ['/og-image.png'],
  },
};`}
          />

          <CodeBlock
            title="動態 Metadata（根據文章資料）"
            lang="typescript"
            code={`// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

// generateMetadata 是一個 async function，可以 fetch 資料
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // 根據 slug 取得文章資料
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: '文章不存在',
    };
  }

  return {
    title: \`\${post.title} | 我的部落格\`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Joseph Chen'],
      images: [
        {
          url: post.coverImage || '/default-og.png',
          width: 1200,
          height: 630,
        }
      ],
    },
  };
}

// Next.js 會自動在 <head> 裡加入對應的 meta tag
// 完全不需要手動寫 <head>！`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: Complete Mental Model */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Next.js App Router 完整心智模型</h2>
          <p className="text-gray-700 leading-relaxed">
            把所有概念串起來，這就是你腦袋裡應該有的 App Router 全貌。
          </p>

          <Card className="border border-slate-200 bg-gradient-to-br from-slate-900 to-zinc-900 shadow-xl">
            <CardBody className="p-8">
              <p className="font-black text-white text-lg mb-6">App Router 架構全覽</p>
              <div className="space-y-5">
                {[
                  {
                    label: '預設行為',
                    content: 'app/ 目錄下所有 Component 預設是 Server Component，在伺服器上執行，HTML 直接給瀏覽器',
                    color: 'border-green-500 text-green-300',
                  },
                  {
                    label: '加 use client',
                    content: "在檔案頂部加 'use client' → 整個檔案和它引入的 Component 變成 Client Component，才能用 useState、onClick 等",
                    color: 'border-blue-500 text-blue-300',
                  },
                  {
                    label: '路由 = 檔案',
                    content: 'app/blog/[slug]/page.tsx 對應 /blog/* URL；[param] 方括號是動態參數；(group) 括號不影響 URL',
                    color: 'border-yellow-500 text-yellow-300',
                  },
                  {
                    label: 'Layout 是巢狀的',
                    content: 'RootLayout → BlogLayout → PostLayout，每層 layout.tsx 包裹子層的 children，切換頁面時 Layout 不重新渲染',
                    color: 'border-purple-500 text-purple-300',
                  },
                  {
                    label: '特殊檔案自動處理',
                    content: 'loading.tsx 自動包 Suspense、error.tsx 自動包 ErrorBoundary、not-found.tsx 對應 notFound()，全部不需要手動設定',
                    color: 'border-rose-500 text-rose-300',
                  },
                  {
                    label: 'SEO 內建',
                    content: 'export const metadata 或 generateMetadata() 直接設定 title、description、Open Graph，Next.js 自動注入 <head>',
                    color: 'border-cyan-500 text-cyan-300',
                  },
                ].map((item, i) => (
                  <div key={i} className={`border-l-4 pl-4 ${item.color}`}>
                    <p className="font-black text-sm mb-1">{item.label}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <CodeBlock
            title="完整範例：部落格架構"
            lang="typescript"
            code={`// 完整的部落格系統，整合所有 App Router 概念

// app/layout.tsx（Root Layout）
export const metadata = {
  title: { template: '%s | 我的部落格', default: '我的部落格' },
  description: '技術文章分享',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// ─────────────────────────────────────────────────────────────────

// app/blog/page.tsx（文章列表，Server Component）
export default async function BlogListPage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return (
    <main>
      <h1>所有文章</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <Link key={post.id} href={\`/blog/\${post.slug}\`}>
            <article>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────

// app/blog/[slug]/page.tsx（個別文章，Server Component）
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((p: Post) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      {/* 只有按讚按鈕需要 Client Component */}
      <LikeButton postId={post.id} />
    </article>
  );
}`}
          />
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep17-state-patterns">
            <div className="bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6 cursor-pointer group border border-transparent hover:border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={16} className="text-gray-300 group-hover:text-slate-500 transition-colors" />
                <p className="text-xs font-bold text-gray-400 uppercase">上一篇</p>
              </div>
              <p className="font-black text-gray-700 group-hover:text-slate-800 transition-colors">EP.17 — useState 五種場景</p>
              <p className="text-sm text-gray-400 mt-1">物件狀態、陣列狀態、衍生狀態</p>
            </div>
          </Link>
          <Link href="/blog/web-dev/ep19-data-fetching">
            <div className="bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6 cursor-pointer group border border-transparent hover:border-slate-200 text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase">下一篇</p>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <p className="font-black text-gray-700 group-hover:text-slate-800 transition-colors">EP.19 — Data Fetching 完整指南</p>
              <p className="text-sm text-gray-400 mt-1">fetch、SWR、React Query</p>
            </div>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Next.js', 'App Router', 'Server Component', '路由', 'Layout', 'Metadata', 'EP.18'].map((tag) => (
            <Chip key={tag} variant="flat" color="default" className="font-bold">{tag}</Chip>
          ))}
        </div>

      </article>
    </div>
  );
}
