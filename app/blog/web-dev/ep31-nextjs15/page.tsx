'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Zap,
  Server,
  Sparkles,
  Layers,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function WebDevEP31() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.31</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Dev Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Next.js 15 & React 19：<br />
              <span className="text-slate-300">Server Actions 與新特性完全指南</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Server Actions、use() hook、PPR、Turbopack 穩定版 — 2026 年現代全端開發的最新樣貌
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Server Actions · PPR · React 19 · Turbopack</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：Next.js 15 重大變化 ─────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Zap className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：Next.js 15 有哪些重大變化
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Next.js 15 是一個里程碑版本，帶來了 React 19 預設整合、Turbopack 正式穩定、以及對 Caching 語義的重大調整。如果你從 Next.js 14 升級，有幾個 Breaking Changes 需要特別注意。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Turbopack 穩定版',
                    desc: 'dev server 速度比 webpack 快 5 倍，HMR（熱更新）快 96.3%。現在是 next dev 的預設打包工具。',
                    icon: '⚡',
                    color: 'yellow',
                  },
                  {
                    title: 'React 19 成為預設',
                    desc: 'use() hook、useOptimistic()、useFormStatus() 等 React 19 新特性開箱即用，不再需要額外安裝 RC 版本。',
                    icon: '⚛️',
                    color: 'blue',
                  },
                  {
                    title: 'Caching 語義更改',
                    desc: '預設不再快取 GET Route Handlers 和 fetch 請求，回歸更直覺的行為。需要快取的地方必須明確宣告。',
                    icon: '🗄️',
                    color: 'purple',
                  },
                  {
                    title: 'after() API',
                    desc: '等 Response 送出後才執行的異步後處理 API。適合寄信、記錄 analytics、通知倉庫等不影響回應時間的工作。',
                    icon: '⏱️',
                    color: 'green',
                  },
                  {
                    title: 'connection() API',
                    desc: '明確標記動態連線依賴，讓 Next.js 在靜態分析時能正確判斷頁面是靜態還是動態，提升 PPR 的準確性。',
                    icon: '🔗',
                    color: 'orange',
                  },
                  {
                    title: 'fetch 預設不再 cache',
                    desc: 'Next.js 14 中 fetch 預設等同 force-cache；15 改為 no-store。這是最容易造成升級問題的改變。',
                    icon: '🔄',
                    color: 'red',
                  },
                ].map(({ title, desc, icon, color }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{icon}</span>
                      <p className={`font-bold text-${color}-800 text-sm`}>{title}</p>
                    </div>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-xs font-mono mb-2"># 快速確認你的 Next.js 版本</p>
                <CodeBlock language="bash">{`# 查看當前版本
npx next --version

# 升級到最新版本
npx @next/codemod@canary upgrade latest`}</CodeBlock>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：Server Actions 完整指南 ──────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Server className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：Server Actions 完整指南
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Server Actions 讓你直接在 Server Component 或 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">'use server'</code> 函式中處理表單提交和資料變更，不需要再手動建立 API Route。背後原理是 Next.js 自動產生一個隱藏的 RPC 端點，前端呼叫時透過 HTTP POST 傳遞序列化的參數。
              </p>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-blue-800 text-sm font-medium mb-1">Server Actions 的核心優勢</p>
                    <ul className="text-blue-700 text-xs space-y-1 leading-relaxed">
                      <li>• 表單送出不需要 JavaScript（Progressive Enhancement）</li>
                      <li>• 資料驗證、資料庫操作都在 Server，不暴露商業邏輯</li>
                      <li>• 自動整合 Next.js 的快取失效（revalidatePath、revalidateTag）</li>
                      <li>• 配合 useActionState 可以無縫處理 loading 和 error 狀態</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">建立 Server Action（actions.ts）</h3>
              <CodeBlock language="tsx">{`// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
  tags: z.string().optional(),
});

export async function createPost(prevState: any, formData: FormData) {
  // 1. 解析並驗證 formData
  const validated = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.get('tags'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  // 2. 寫入資料庫（直接在 Server 上，不需要 API Route）
  await db.post.create({ data: validated.data });

  // 3. 更新快取（告訴 Next.js /blog 頁面的資料過期了）
  revalidatePath('/blog');

  // 4. 導向新頁面
  redirect('/blog');
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">在 Client Component 中使用 useActionState</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">useActionState</code> 是 React 19 的新 Hook（取代了 Next.js 14 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">useFormState</code>），讓你能追蹤 Server Action 的狀態（回傳值和 pending 狀態）。
              </p>
              <CodeBlock language="tsx">{`'use client';
import { useActionState } from 'react';
import { createPost } from './actions';

export function CreatePostForm() {
  // useActionState(action, initialState)
  // 回傳：[目前狀態, action 函式, isPending]
  const [state, action, isPending] = useActionState(createPost, null);

  return (
    <form action={action}>
      <div className="space-y-4">
        <div>
          <input
            name="title"
            placeholder="文章標題"
            className="w-full border rounded-lg px-3 py-2"
          />
          {state?.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
          )}
        </div>

        <div>
          <textarea
            name="content"
            placeholder="文章內容（至少 10 字）"
            className="w-full border rounded-lg px-3 py-2 h-40"
          />
          {state?.errors?.content && (
            <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
          )}
        </div>

        <input name="tags" placeholder="標籤（選填）" className="w-full border rounded-lg px-3 py-2" />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
        >
          {isPending ? '送出中...' : '發布文章'}
        </button>
      </div>
    </form>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">在 Server Component 中直接使用</h3>
              <CodeBlock language="tsx">{`// app/blog/new/page.tsx — Server Component（不需要 'use client'）
export default function NewPostPage() {
  // Server Action 可以直接定義在 Server Component 內
  async function handleCreate(formData: FormData) {
    'use server';  // 這個函式在 Server 上執行

    const title = formData.get('title') as string;
    await db.post.create({ data: { title } });
    revalidatePath('/blog');
    redirect('/blog');
  }

  return (
    // 直接把 Server Action 傳給 form 的 action 屬性
    <form action={handleCreate}>
      <input name="title" placeholder="標題" />
      <button type="submit">建立</button>
    </form>
  );
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：React 19 新特性 ──────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Sparkles className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：React 19 新特性
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                React 19 帶來了幾個解決長久以來「非同步狀態管理」痛點的新 API。核心哲學是：讓 React 本身就能處理非同步資料流，不再需要依賴 react-query 或 SWR 才能有好的 DX。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-2">use() Hook — 一統天下的資料讀取</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">use()</code> 是一個特殊的 Hook，可以讀取 Promise 和 Context。與其他 Hook 不同，它可以在條件式和迴圈中使用。配合 Suspense，它讓 Promise 的消費變得極其簡潔。
              </p>
              <CodeBlock language="tsx">{`// use() 可以讀取 Promise 和 Context（Suspense 必須包裹）
import { use, Suspense } from 'react';

async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

// Server Component 傳 Promise 給 Client Component（不用 await！）
// 好處：Server 可以立刻渲染骨架，fetch 在背景繼續跑
function UserProfilePage({ params }: { params: { id: string } }) {
  const userPromise = fetchUser(params.id);  // 注意：不用 await

  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Client Component 用 use() 消費 Promise
// 如果 Promise 還沒 resolve，React 會暫停（Suspend）這個元件
// Suspense boundary 的 fallback 會顯示到資料準備好
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);  // 阻塞式讀取，但 UI 不會凍結

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
}

// use() 也可以讀取 Context（與 useContext 的差異：可用在條件式中）
import { ThemeContext } from './ThemeContext';

function ConditionalThemedButton({ showTheme }: { showTheme: boolean }) {
  // ✅ use() 可以在條件式中，useContext 不行
  if (showTheme) {
    const theme = use(ThemeContext);
    return <button style={{ background: theme.primary }}>按鈕</button>;
  }
  return <button>按鈕</button>;
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-2 mt-8">useOptimistic() — 樂觀更新</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                樂觀更新（Optimistic Update）的概念是：假設操作會成功，立刻更新 UI；如果實際操作失敗，再 rollback 回原本的狀態。以前需要手動管理這個邏輯，<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">useOptimistic</code> 讓這件事變成兩行。
              </p>
              <CodeBlock language="tsx">{`'use client';
import { useOptimistic } from 'react';

function LikeButton({ postId, initialLikeCount }: { postId: string; initialLikeCount: number }) {
  // useOptimistic(初始值, 更新函式)
  // 更新函式接收 (目前狀態, 操作的 payload)，回傳樂觀狀態
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikeCount,
    (state, amount: number) => state + amount
  );

  async function handleLike() {
    addOptimisticLike(1);   // 立刻顯示 +1（樂觀更新）

    try {
      await likePost(postId); // 實際 API call
    } catch {
      // 如果失敗，React 自動 rollback 到 initialLikeCount
      // 不需要手動處理
    }
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
    >
      <span>❤️</span>
      <span className="font-medium">{optimisticLikes}</span>
    </button>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-2 mt-8">useFormStatus() — 表單送出狀態</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">useFormStatus</code> 讓你在表單的子元件中存取表單的送出狀態，不需要把 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">isPending</code> 一層層往下傳。這個 Hook 必須在 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{'<form>'}</code> 內部的元件中使用。
              </p>
              <CodeBlock language="tsx">{`import { useFormStatus } from 'react-dom';

// 這個元件可以在任何 <form> 內部使用，不需要額外 props
function SubmitButton() {
  // pending 在表單送出時自動變成 true
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          送出中...
        </span>
      ) : '送出'}
    </button>
  );
}

// 在任何表單中直接使用，不需要傳 isPending props
function MyForm() {
  return (
    <form action={someServerAction}>
      <input name="email" type="email" />
      <SubmitButton />  {/* 自動感應所在表單的狀態 */}
    </form>
  );
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：PPR ──────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Layers className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：PPR（Partial Prerendering）
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                PPR 是 Next.js 15 最具革命性的功能：在同一個頁面中同時擁有靜態和動態內容，打破了「整頁要嘛全靜態、要嘛全動態」的限制。它結合了 SSG 的速度優勢和 SSR 的動態能力，是現代全端架構的重大突破。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    mode: '傳統 SSG',
                    desc: '整頁靜態，速度快但資料可能過期，無法個人化',
                    pros: '速度極快',
                    cons: '無法顯示動態/個人化內容',
                    color: 'green',
                  },
                  {
                    mode: '傳統 SSR',
                    desc: '整頁動態，每次請求都重新渲染，速度受資料庫影響',
                    pros: '資料即時',
                    cons: 'TTFB 慢，受限於最慢的資料查詢',
                    color: 'orange',
                  },
                  {
                    mode: 'PPR',
                    desc: '靜態骨架瞬間顯示，動態部分（Suspense 包裹）後續填入',
                    pros: '骨架瞬間顯示 + 資料即時',
                    cons: '需要明確用 Suspense 包裹動態部分',
                    color: 'blue',
                  },
                ].map(({ mode, desc, pros, cons, color }) => (
                  <div key={mode} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200`}>
                    <p className={`font-bold text-${color}-800 mb-2 text-sm`}>{mode}</p>
                    <p className={`text-${color}-700 text-xs mb-3 leading-relaxed`}>{desc}</p>
                    <p className={`text-xs text-${color}-600 mb-1`}><span className="font-medium">優點：</span>{pros}</p>
                    <p className={`text-xs text-${color}-600`}><span className="font-medium">缺點：</span>{cons}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">開啟 PPR</h3>
              <CodeBlock language="tsx">{`// next.config.ts — 開啟實驗性 PPR
const nextConfig = {
  experimental: {
    ppr: 'incremental',  // 'incremental' 讓你逐頁採用，不需要全站一起改
  },
};

export default nextConfig;`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">實際頁面示例</h3>
              <CodeBlock language="tsx">{`// app/product/[id]/page.tsx
import { Suspense } from 'react';

// 每個頁面需要明確 opt-in
export const experimental_ppr = true;

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* 靜態部分：立刻顯示（預渲染在 CDN 邊緣節點） */}
      {/* ProductHero 從靜態資料讀取商品基本資訊 */}
      <ProductHero productId={params.id} />

      {/* 靜態部分：商品詳細描述 */}
      <ProductDescription productId={params.id} />

      {/* 動態部分：等資料才顯示（但不阻塞靜態部分） */}
      {/* 用戶評論需要從資料庫即時讀取 */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>

      {/* 動態部分：需要知道目前用戶是誰才能個人化 */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations productId={params.id} />
      </Suspense>

      {/* 動態部分：庫存數量需要即時資料 */}
      <Suspense fallback={<StockSkeleton />}>
        <StockStatus productId={params.id} />
      </Suspense>
    </div>
  );
}

// PPR 的工作流程：
// 1. Build time：Next.js 預渲染靜態部分（ProductHero + ProductDescription）
// 2. Request time：靜態部分從 CDN 立刻回傳，瀏覽器立刻顯示
// 3. 同時：動態部分（Reviews、Recommendations、Stock）開始 streaming
// 4. 動態部分資料準備好後，React 用實際內容取代 Skeleton`}</CodeBlock>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">PPR 目前仍是實驗性功能</p>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Next.js 15 中 PPR 仍標記為 <code className="bg-amber-100 px-1 rounded font-mono">experimental</code>，API 可能在正式版前有所調整。生產環境使用前請確認 Next.js 的版本更新說明。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：Caching 語義更改 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Database className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：Caching 語義更改
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Next.js 15 對 Caching 的語義做了重大調整，目的是讓行為更符合開發者的直覺。Next.js 14 的「預設全部快取」策略在大型應用中造成了許多意外的資料過期問題，15 版本回歸到更顯式（explicit）的快取控制。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="font-bold text-orange-800 mb-2 text-sm">Next.js 14 行為</p>
                  <ul className="text-orange-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• <code className="bg-orange-100 px-1 rounded font-mono">fetch()</code> 預設等同 <code className="bg-orange-100 px-1 rounded font-mono">force-cache</code></li>
                    <li>• GET Route Handlers 預設被快取</li>
                    <li>• 需要動態行為的地方要明確 opt-out</li>
                    <li>• 容易造成「改了資料，頁面沒更新」的困惑</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-bold text-green-800 mb-2 text-sm">Next.js 15 行為（更直覺）</p>
                  <ul className="text-green-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• <code className="bg-green-100 px-1 rounded font-mono">fetch()</code> 預設等同 <code className="bg-green-100 px-1 rounded font-mono">no-store</code></li>
                    <li>• GET Route Handlers 預設不快取</li>
                    <li>• 需要快取的地方要明確 opt-in</li>
                    <li>• 行為符合大多數開發者的預期</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">fetch 快取行為對比</h3>
              <CodeBlock language="typescript">{`// ─── Next.js 14（預設 cache）───
fetch('https://api.example.com/data');
// 等同於：fetch('https://api.example.com/data', { cache: 'force-cache' })
// 資料會被永久快取，只有手動 revalidate 才更新

// ─── Next.js 15（預設不 cache！）───
fetch('https://api.example.com/data');
// 等同於：fetch('https://api.example.com/data', { cache: 'no-store' })
// 每次請求都向 origin server 重新取得資料

// ─────────────────────────────────────────────────
// 如果升級到 15 後需要快取，現在必須明確指定：

// 靜態資料（永遠快取，直到手動 revalidate）
fetch('https://api.example.com/static', {
  cache: 'force-cache',
});

// ISR：每小時重新驗證一次（Time-based Revalidation）
fetch('https://api.example.com/articles', {
  next: { revalidate: 3600 },  // 3600 秒 = 1 小時
});

// On-demand Revalidation：設定 tag，可以手動觸發失效
fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});

// 之後在 Server Action 或 Route Handler 中觸發失效：
// import { revalidateTag } from 'next/cache';
// revalidateTag('posts');`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">unstable_cache — 資料層快取</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                當你使用 ORM（如 Prisma）或直接查詢資料庫時，<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">unstable_cache</code> 讓你能在資料層加上快取，而不是在 HTTP 層。
              </p>
              <CodeBlock language="typescript">{`import { unstable_cache } from 'next/cache';

// 包裝需要快取的資料查詢函式
const getCachedUser = unstable_cache(
  // 實際的查詢函式
  async (id: string) => db.user.findUnique({ where: { id } }),
  // Cache key（陣列）
  ['user'],
  // 快取選項
  {
    revalidate: 60,           // 60 秒後重新驗證
    tags: ['user-data'],      // 可以用 revalidateTag('user-data') 手動失效
  }
);

// 使用時和一般函式一樣，但結果會被快取
async function UserPage({ params }: { params: { id: string } }) {
  // 同樣的 id，60 秒內只查一次資料庫
  const user = await getCachedUser(params.id);
  return <div>{user?.name}</div>;
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：after() API ──────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <RefreshCw className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：after() API — 異步後處理
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">after()</code> 是 Next.js 15 新增的 API，讓你能在 Response 發送給用戶之後才執行某些工作。解決了一個長久以來的痛點：寄送確認信、記錄 analytics、通知其他服務，這些工作不應該讓用戶等待，但以前只能放在 Response 之前執行。
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <p className="text-slate-700 text-sm font-medium mb-2">after() 的使用情境</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '寄送訂單確認信（不需要讓用戶等郵件服務）',
                    '記錄 analytics 事件（非同步，不影響主流程）',
                    '通知倉庫出貨系統（第三方 API call）',
                    '更新搜尋索引（如 Algolia、Elasticsearch）',
                    '發送 Slack 通知給內部團隊',
                    '清理暫存的上傳檔案',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                      <p className="text-slate-600 text-xs leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">在 Route Handler 中使用</h3>
              <CodeBlock language="typescript">{`import { after } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  // 主要業務邏輯（用戶需要等這個完成）
  const result = await createOrder(data);

  // after() 內的工作在 Response 送出後才執行
  // 用戶不需要等這些工作完成
  after(async () => {
    // 寄送確認信（可能需要 500ms，不應阻塞 Response）
    await sendConfirmationEmail(result.userId, result.orderId);

    // 記錄 analytics（非同步，失敗也沒關係）
    await updateAnalytics({
      event: 'order_created',
      userId: result.userId,
      amount: result.total,
    });

    // 通知倉庫系統
    await notifyWarehouse(result.items);

    // 更新搜尋索引
    await searchIndex.update('orders', result);
  });

  // 這個 Response 立刻回傳，不等 after() 內的工作
  return Response.json({ orderId: result.id, status: 'created' });
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">在 Server Action 中使用</h3>
              <CodeBlock language="typescript">{`'use server';
import { after } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function submitComment(formData: FormData) {
  const content = formData.get('content') as string;
  const postId = formData.get('postId') as string;

  // 主要操作：存入資料庫
  const comment = await db.comment.create({
    data: { content, postId },
  });

  // 快取失效（同步，確保用戶看到最新資料）
  revalidatePath(\`/blog/\${postId}\`);

  // 後處理（非同步，不阻塞用戶）
  after(async () => {
    // 通知文章作者有新留言
    const post = await db.post.findUnique({ where: { id: postId } });
    await sendCommentNotification(post!.authorId, comment.id);

    // 更新文章的留言計數（可以稍後做）
    await db.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });
  });
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 7：升級指南 ──────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <AlertTriangle className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 7：升級指南 — 從 Next.js 14 到 15
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Next.js 15 提供了官方 codemod 工具自動處理大部分的 Breaking Changes，但仍有一些需要手動確認的地方。以下是升級前必須了解的重要改變。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">使用官方 codemod 升級</h3>
              <CodeBlock language="bash">{`# 升級指令（自動更新 package.json 並執行 codemod）
npx @next/codemod@canary upgrade latest

# 或者手動升級
npm install next@latest react@latest react-dom@latest

# 執行特定 codemod
npx @next/codemod@latest next-async-request-api .`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-4 mt-8">主要 Breaking Changes</h3>

              <div className="space-y-4">
                {[
                  {
                    title: '1. fetch 預設不再 cache',
                    desc: '最容易造成升級問題的改變。如果你的頁面依賴 Next.js 14 的隱式快取，升級後可能會因為每次都重新 fetch 而變慢，或者快取設計需要重新規劃。',
                    fix: `// 檢查所有 fetch，需要 cache 的加上明確選項：
fetch('/api/data', {
  cache: 'force-cache',        // 永久快取
  // 或
  next: { revalidate: 3600 }, // ISR
});`,
                    severity: 'high',
                  },
                  {
                    title: '2. cookies() / headers() 現在是 async',
                    desc: 'Next.js 15 中讀取 cookies 和 headers 需要 await。這個改變讓 Next.js 在靜態分析時能更準確地判斷頁面的動態性。',
                    fix: `// ❌ Next.js 14 寫法
import { cookies } from 'next/headers';
const cookieStore = cookies();
const token = cookieStore.get('token');

// ✅ Next.js 15 寫法
import { cookies } from 'next/headers';
const cookieStore = await cookies();  // 需要 await
const token = cookieStore.get('token');`,
                    severity: 'high',
                  },
                  {
                    title: '3. params 和 searchParams 現在是 Promise',
                    desc: 'Page 和 Layout 的 params、searchParams props 現在是 Promise，需要先 await 才能使用。codemod 可以自動修復大部分情況。',
                    fix: `// ❌ Next.js 14 寫法
export default function Page({ params, searchParams }) {
  const { id } = params;           // 直接使用
  const query = searchParams.q;    // 直接使用
}

// ✅ Next.js 15 寫法
export default async function Page({ params, searchParams }) {
  const { id } = await params;           // 需要 await
  const { q } = await searchParams;      // 需要 await
}`,
                    severity: 'high',
                  },
                  {
                    title: '4. GET Route Handlers 不再預設 cache',
                    desc: 'GET Route Handlers 在 Next.js 14 中如果沒有動態行為（沒用 cookies、headers 等），會被靜態快取。Next.js 15 改為預設不快取，行為更一致。',
                    fix: `// 如果 GET Route Handler 需要被快取（例如靜態 API）：
export const dynamic = 'force-static';  // 強制靜態快取

export async function GET() {
  const data = await getStaticData();
  return Response.json(data);
}`,
                    severity: 'medium',
                  },
                ].map(({ title, desc, fix, severity }) => {
                  const colors = {
                    high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600', text: 'text-red-800', label: 'Breaking Change' },
                    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-600', text: 'text-yellow-800', label: '需注意' },
                  }[severity];

                  return (
                    <div key={title} className={`p-5 ${colors.bg} rounded-xl border ${colors.border}`}>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h4 className={`font-bold ${colors.text} text-sm`}>{title}</h4>
                        <span className={`${colors.badge} text-white text-xs px-2 py-0.5 rounded-full shrink-0`}>{colors.label}</span>
                      </div>
                      <p className={`${colors.text} text-xs mb-4 leading-relaxed opacity-80`}>{desc}</p>
                      <CodeBlock language="typescript">{fix}</CodeBlock>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-black/5 to-slate-800/5 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">升級後的效益</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      完成升級後，你的應用將擁有 Turbopack 帶來的開發速度提升、React 19 的 Concurrent 特性、更直覺的 Caching 行為，以及 PPR 的靜態+動態混合能力。這些改變讓 Next.js 更接近「一個函式的抽象層」的願景 — 你只需要描述「要做什麼」，框架負責以最有效率的方式執行。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['Next.js 15', 'React 19', 'Server Actions', 'PPR', 'useOptimistic', 'use()'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-slate-100 text-slate-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep30-web-security">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-slate-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-slate-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.30 Web 安全實戰</p>
                      <p className="text-xs text-gray-400">XSS、CSRF、CSP 防禦</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep32-web-performance">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-slate-400">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.32 Web 效能優化</p>
                      <p className="text-xs text-gray-400">Core Web Vitals、Lighthouse 實戰</p>
                    </div>
                    <ArrowRight className="text-slate-500 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
