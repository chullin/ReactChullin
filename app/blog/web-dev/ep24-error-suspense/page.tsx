'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
  Code2,
  Layers,
  ShieldAlert,
  RefreshCw,
  Package,
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

export default function WebDevEP24() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-800 via-gray-700 to-zinc-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.24</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Development Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Error Boundary 與 Suspense：<br />
              <span className="text-slate-300">優雅的錯誤與 Loading 處理</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              不讓白屏毀掉用戶體驗 — 從 class ErrorBoundary 到 react-error-boundary 套件的完整解法
            </p>
            <div className="flex items-center gap-6 text-slate-300 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 13 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Error Boundary · Suspense · react-error-boundary</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：痛點 ────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-slate-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：痛點 — JavaScript 錯誤讓整個頁面崩潰</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            你有沒有遇過這種情況：app 在某個用戶端出現了一個罕見的 API 回應——
            比如 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">user.profile</code> 是 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">null</code>——
            然後整個畫面就變成一片空白，連錯誤訊息都看不到。
            用戶茫然地重新整理，然後放棄。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            這就是 React 未捕獲錯誤的預設行為：<strong className="text-slate-700">整個 React 元件樹 unmount，白屏。</strong>
          </p>

          <CodeBlock language="tsx">
{` // 一個元件的 TypeError 會讓整個 React tree 崩潰
function UserCard({ user }) {
  // 如果 API 回傳 null，或者 profile 欄位不存在
  // 這行就會拋出：TypeError: Cannot read properties of null (reading 'avatar')
  return <div>{user.profile.avatar}</div>;
}

// 上層元件無法用 try/catch 攔截——React 渲染過程中的錯誤
// 不是 JavaScript 執行期的同步錯誤，try/catch 攔不住
function App() {
  try {
    return <UserCard user={null} />; // ← 這裡 try/catch 沒用
  } catch (e) {
    // 永遠不會執行到這裡
    return <div>錯了</div>;
  }
}

// 用戶只看到一片白屏，還不知道發生了什麼事。
// 這就是為什麼需要 Error Boundary。 `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 border-l-4 border-slate-500">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <ShieldAlert size={28} className="text-slate-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">為什麼 try/catch 攔不住渲染錯誤？</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    React 的 render 是在 React 內部的調度機制中執行的，而不是在你的程式碼的呼叫堆疊上。
                    當 React 呼叫 <code className="bg-gray-100 px-1 rounded">UserCard</code> 的 render 並拋出錯誤時，
                    錯誤會沿著 React 自己的 fiber 樹往上傳播，不是沿著你的 JavaScript 呼叫堆疊。
                    所以包在外面的 try/catch 完全攔不到。
                    Error Boundary 是 React 提供的特殊機制，讓你可以「在元件樹層面」攔截這類錯誤。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md bg-red-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-800 mb-2 text-sm flex items-center gap-2">
                  <AlertTriangle size={14} />
                  沒有 Error Boundary
                </h4>
                <ul className="space-y-1.5 text-xs text-red-700">
                  <li>• 任何一個子元件拋出錯誤</li>
                  <li>• 整個 React tree 崩潰並 unmount</li>
                  <li>• 用戶看到白屏，完全不知道發生什麼</li>
                  <li>• 你也不知道錯在哪，因為沒有上報</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-green-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-green-800 mb-2 text-sm flex items-center gap-2">
                  <CheckCircle size={14} />
                  有 Error Boundary
                </h4>
                <ul className="space-y-1.5 text-xs text-green-700">
                  <li>• 錯誤被最近的 Error Boundary 攔截</li>
                  <li>• 顯示優雅的 fallback UI（「發生了一點問題」）</li>
                  <li>• 頁面其他部分正常運作</li>
                  <li>• 錯誤資訊上報到監控服務（Sentry 等）</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Class Component Error Boundary ──────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-gray-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：Class Component Error Boundary</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            Error Boundary 目前只能用 class component 實作。這是 React 刻意保留的少數幾個「必須用 class」的場景之一。
          </p>

          <Card className="border-0 shadow-md bg-slate-50 mb-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-slate-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>為什麼必須用 class component？</strong>
                  因為 Error Boundary 需要兩個特殊的生命週期方法：
                  <code className="bg-gray-100 px-1 rounded mx-1">getDerivedStateFromError</code>（在渲染階段捕獲錯誤並更新 state）和
                  <code className="bg-gray-100 px-1 rounded mx-1">componentDidCatch</code>（在提交階段捕獲錯誤，適合做 side effect 如上報到監控服務）。
                  目前 React 還沒有提供對應的 Hook，所以無法用函式元件實作。
                </p>
              </div>
            </CardBody>
          </Card>

          <CodeBlock language="tsx">
{` import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  // ── 在渲染階段捕獲錯誤 ────────────────────────────────────────
  // 這是一個靜態方法，接收錯誤，回傳要更新的 state
  // 類似於 getDerivedStateFromProps，但用於錯誤情況
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 告訴 React：有錯誤了，切換到 fallback UI
    return { hasError: true, error };
  }

  // ── 在提交階段捕獲錯誤（適合做 side effect）─────────────────
  // errorInfo.componentStack：發生錯誤的完整元件呼叫堆疊
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 上報到錯誤監控服務（Sentry、Datadog、LogRocket 等）
    console.error('元件錯誤：', error);
    console.error('元件堆疊：', errorInfo.componentStack);

    // 實際專案中這裡通常是：
    // Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 顯示 fallback UI：優先用 prop 傳入的，否則用預設的
      return this.props.fallback ?? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={20} className="text-red-500" />
            <h3 className="font-bold text-red-700">發生了一點問題</h3>
          </div>
          <p className="text-red-600 text-sm mb-4">
            {this.state.error?.message ?? '未知的錯誤'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
          >
            重試
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">使用方式</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            Error Boundary 的粒度由你決定。可以包整個 app，也可以只包特定的 widget。
            粒度越細，錯誤影響範圍越小：
          </p>
          <CodeBlock language="tsx">
{` // ── 方式一：包整個 app（粒度最粗）──────────────────────────────
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Router />
    </ErrorBoundary>
  );
}

// ── 方式二：包個別 widget（粒度最細，推薦）────────────────────
function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 每個 widget 各自有 ErrorBoundary */}
      {/* 某個 widget 崩潰，其他的繼續正常顯示 */}
      <ErrorBoundary fallback={<WidgetError name="銷售報表" />}>
        <SalesChart />
      </ErrorBoundary>

      <ErrorBoundary fallback={<WidgetError name="用戶列表" />}>
        <UserList />
      </ErrorBoundary>

      <ErrorBoundary fallback={<WidgetError name="庫存狀態" />}>
        <InventoryStatus />
      </ErrorBoundary>
    </div>
  );
}

// ── Error Boundary 捕獲不到的錯誤 ───────────────────────────────
// 以下這些情況 Error Boundary 無法捕獲（需要用其他方式處理）：
//
// 1. 事件處理器中的錯誤（用 try/catch 處理）
// 2. 非同步程式碼（setTimeout、Promise）
// 3. Server-side rendering 中的錯誤
// 4. Error Boundary 元件本身的錯誤（往上傳給父層的 Error Boundary） `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Suspense ──────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
              <RefreshCw size={20} className="text-zinc-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：Suspense — 處理「正在載入中」的狀態</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            Error Boundary 處理「出錯了」的情況，而 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">Suspense</code> 處理「正在等待」的情況。
            它讓你用宣告式的方式描述 loading 狀態，不需要在每個元件裡寫 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">isLoading &&</code>。
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">最常見的用法：React.lazy 程式碼分割</h3>

          <CodeBlock language="tsx">
{` import { Suspense, lazy } from 'react';

// React.lazy 讓你把大型元件「懶載入」——只在需要的時候才下載這個 chunk
// import() 回傳一個 Promise，React 會等它 resolve
const HeavyDashboard = lazy(() => import('./HeavyDashboard'));
const AnalyticsChart = lazy(() => import('./AnalyticsChart'));

function App() {
  return (
    // Suspense 的 fallback 在 lazy 元件載入完成前顯示
    <Suspense fallback={<div className="animate-pulse">載入中...</div>}>
      <HeavyDashboard />
    </Suspense>
  );
}

// ── 一個 Suspense 可以包多個 lazy 元件 ───────────────────────────
// 等所有 lazy 元件都載入完才顯示，期間顯示 fallback
function AdminPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HeavyDashboard />
      <AnalyticsChart />
    </Suspense>
  );
}

// ── 巢狀 Suspense：精細控制各區塊的 loading 狀態 ─────────────────
function Layout() {
  return (
    <div>
      {/* Sidebar 先載入完就先顯示，不等 Content */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>

      {/* Content 有自己的 loading 狀態 */}
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
    </div>
  );
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">三個 Suspense 使用場景</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                  <Layers size={16} className="text-slate-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">1. Code Splitting</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  用 <code className="bg-gray-100 px-1 rounded">React.lazy</code> 把大型元件拆成獨立 chunk，
                  首次載入只下載必要的程式碼，大幅減少 bundle size。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Zap size={16} className="text-gray-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">2. 資料請求</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  配合支援 Suspense 的 library（SWR、React Query、Relay），
                  資料載入中時自動顯示 fallback，不需要手動管理 isLoading。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center mb-3">
                  <Code2 size={16} className="text-zinc-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">3. Server Component</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Next.js App Router 原生支援。Server Component 在伺服器端取資料時，
                  客戶端顯示 Suspense fallback，資料就緒後串流回來。
                </p>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">Next.js 的 loading.tsx — Suspense 的語法糖</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            在 Next.js App Router 中，你不需要手動寫 Suspense——只要在資料夾放一個 <code className="bg-gray-100 px-1 rounded text-sm">loading.tsx</code>，
            Next.js 會自動把它包進 Suspense 的 fallback：
          </p>
          <CodeBlock language="tsx">
{` // app/dashboard/loading.tsx
// Next.js 自動把這個包進 <Suspense fallback={<Loading />}>
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      {/* Skeleton UI */}
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
      <div className="h-64 bg-gray-200 rounded" />
    </div>
  );
}

// app/dashboard/page.tsx（Server Component）
// 這個頁面在 await 的期間，loading.tsx 就會顯示
async function DashboardPage() {
  // 這個 await 讓 Suspense 知道要顯示 fallback
  const data = await fetchDashboardData(); // 慢慢等...

  return <DashboardContent data={data} />;
}

// 等同於手動寫：
// <Suspense fallback={<Loading />}>
//   <DashboardPage />
// </Suspense> `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：搭配使用 ──────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-slate-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：搭配使用 — 完整的容錯架構</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            生產環境中，ErrorBoundary 和 Suspense 幾乎總是一起出現：
            Suspense 處理正常的「等待中」流程，ErrorBoundary 處理意外的「出錯了」情況。
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">標準的組合模式</h3>
          <CodeBlock language="tsx">
{` // ErrorBoundary 在外層，Suspense 在內層
// 這樣的順序讓 Suspense 的錯誤（例如 lazy 載入失敗）也能被 ErrorBoundary 攔截
function Dashboard() {
  return (
    <ErrorBoundary fallback={<ErrorCard message="Dashboard 發生錯誤" />}>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </ErrorBoundary>
  );
}

// ── 更精細的粒度：各區塊各自有容錯 ──────────────────────────────
function ComplexPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 左欄：有自己的 ErrorBoundary 和 Suspense */}
      <ErrorBoundary fallback={<WidgetError name="用戶資訊" />}>
        <Suspense fallback={<UserCardSkeleton />}>
          <UserInfoWidget />
        </Suspense>
      </ErrorBoundary>

      {/* 右欄：獨立的容錯機制 */}
      <ErrorBoundary fallback={<WidgetError name="統計圖表" />}>
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// ── 可複用的容錯包裝元件 ─────────────────────────────────────────
interface AsyncBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;    // loading 中顯示的 UI
  errorFallback?: React.ReactNode; // 出錯時顯示的 UI
}

function AsyncBoundary({ children, fallback, errorFallback }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback ?? <DefaultSkeleton />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// 使用：更簡潔
function Dashboard() {
  return (
    <AsyncBoundary
      fallback={<DashboardSkeleton />}
      errorFallback={<ErrorCard message="Dashboard 發生錯誤" />}
    >
      <DashboardContent />
    </AsyncBoundary>
  );
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Next.js App Router 中的 error.tsx</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            就像 <code className="bg-gray-100 px-1 rounded text-sm">loading.tsx</code> 是 Suspense 的語法糖，
            <code className="bg-gray-100 px-1 rounded text-sm">error.tsx</code> 就是 Error Boundary 的語法糖——
            Next.js 自動幫你創建一個 Error Boundary，用 error.tsx 當 fallback：
          </p>
          <CodeBlock language="tsx">
{` // app/dashboard/error.tsx
'use client'; // 必須是 Client Component，因為 Error Boundary 只能在客戶端

interface DashboardErrorProps {
  error: Error & { digest?: string }; // digest 是 Next.js 產生的錯誤 ID
  reset: () => void;                  // 重試函式：讓 Next.js 重新渲染這個路由
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  // 在 useEffect 中上報錯誤（避免在渲染中產生 side effect）
  useEffect(() => {
    console.error('Dashboard 頁面錯誤：', error);
    // Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <ShieldAlert size={48} className="text-red-400" />
      <h2 className="text-xl font-bold text-gray-800">Dashboard 發生了問題</h2>
      <p className="text-gray-500 text-sm">
        錯誤代碼：{error.digest ?? '未知'}
      </p>
      <button
        onClick={reset} // 這會讓 Next.js 重新嘗試渲染整個路由區段
        className="bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-slate-700"
      >
        重試
      </button>
    </div>
  );
}

// ── error.tsx 的作用域 ─────────────────────────────────────────────
// app/
//   error.tsx         ← 捕獲 app 目錄下所有路由的錯誤（全域 fallback）
//   dashboard/
//     error.tsx       ← 只捕獲 /dashboard 路由的錯誤
//     page.tsx
//   settings/
//     error.tsx       ← 只捕獲 /settings 路由的錯誤
//     page.tsx

// 注意：error.tsx 無法捕獲同層 layout.tsx 的錯誤
// layout 的錯誤需要在父層的 error.tsx 處理 `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：react-error-boundary ──────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
              <Package size={20} className="text-zinc-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：react-error-boundary 套件 — 不要自己寫 class</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            自己實作 class Error Boundary 沒有問題，但有一個成熟的套件可以幫你省掉樣板程式碼，
            並提供更多功能：<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">react-error-boundary</code>。
          </p>

          <Card className="border-0 shadow-md bg-slate-50 mb-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-slate-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  這個套件由 Brian Vaughn（React 核心團隊前成員）維護，是業界最廣泛使用的 Error Boundary 解法。
                  它把自己寫 class 元件的工作抽象掉，讓你可以完全用函式元件的方式使用 Error Boundary。
                </p>
              </div>
            </CardBody>
          </Card>

          <CodeBlock language="bash">
{` npm install react-error-boundary `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">基本用法：FallbackComponent</h3>
          <CodeBlock language="tsx">
{` import { ErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void; // 呼叫這個重置 Error Boundary 狀態
}

// fallback 元件：接收 error 和 resetErrorBoundary
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="p-6 bg-red-50 border border-red-200 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle size={20} className="text-red-500" />
        <h3 className="font-bold text-red-700">發生了一點問題</h3>
      </div>
      <p className="text-red-600 text-sm mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
      >
        重試
      </button>
    </div>
  );
}

// 使用方式：傳入 FallbackComponent
function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // resetErrorBoundary 被呼叫後，這裡執行
        // 適合重置 app 的相關狀態（例如清除快取、重新初始化）
        queryClient.clear(); // React Query 範例
      }}
      onError={(error, info) => {
        // 每次捕獲到錯誤都會呼叫
        // 適合上報到監控服務
        console.error('捕獲錯誤：', error, info.componentStack);
        // Sentry.captureException(error, { extra: info });
      }}
    >
      <MyApp />
    </ErrorBoundary>
  );
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">useErrorBoundary — 在 async 操作中手動觸發</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            前面提過，Error Boundary 捕獲不到非同步錯誤（例如 <code className="bg-gray-100 px-1 rounded text-sm">fetch</code> 失敗、
            <code className="bg-gray-100 px-1 rounded text-sm">setTimeout</code> 內部的錯誤）。
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useErrorBoundary</code> 讓你把這些錯誤手動「拋進」最近的 Error Boundary：
          </p>
          <CodeBlock language="tsx">
{` import { useErrorBoundary } from 'react-error-boundary';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\\`/api/users/\\${userId}\\`);

        if (!response.ok) {
          // API 回傳 4xx / 5xx：拋給最近的 ErrorBoundary 處理
          throw new Error(\\`API 錯誤：\\${response.status} \\${response.statusText}\\`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        // 手動把錯誤送給 Error Boundary
        // 這讓 ErrorBoundary 可以顯示 fallback UI 並上報
        showBoundary(error);
      }
    }

    fetchUser();
  }, [userId, showBoundary]);

  if (!user) return <UserSkeleton />;
  return <UserCard user={user} />;
}

// 這個元件需要被 ErrorBoundary 包裹才能使用 showBoundary
function ProfilePage() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => console.error('Profile 錯誤：', error)}
    >
      <UserProfile userId="123" />
    </ErrorBoundary>
  );
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">resetKeys — 根據 props 改變自動重置</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            當用戶切換路由（例如從 userId=1 切到 userId=2），你希望 Error Boundary 自動重試，而不是一直顯示錯誤 UI。
            <code className="bg-gray-100 px-1 rounded text-sm">resetKeys</code> 讓你指定「某個 prop 改變時，自動重置 Error Boundary」：
          </p>
          <CodeBlock language="tsx">
{` function ProfilePage({ userId }: { userId: string }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      // userId 改變時，自動重置 Error Boundary，重新嘗試渲染
      resetKeys={[userId]}
      onReset={() => {
        console.log('Error Boundary 重置了，新的 userId：', userId);
      }}
    >
      <UserProfile userId={userId} />
    </ErrorBoundary>
  );
}

// ── 完整的使用範例：結合 Suspense 和 react-error-boundary ─────────
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function AnalyticsDashboard({ reportId }: { reportId: string }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="p-6 text-center">
          <p className="text-red-600 mb-3">圖表載入失敗：{error.message}</p>
          <button onClick={resetErrorBoundary} className="btn-primary">重試</button>
        </div>
      )}
      resetKeys={[reportId]}
      onError={(error) => {
        // Sentry.captureException(error);
        console.error('Analytics 錯誤：', error);
      }}
    >
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart reportId={reportId} />
      </Suspense>
    </ErrorBoundary>
  );
} `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700 text-white">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldAlert size={20} className="text-slate-300" />
                react-error-boundary vs 自己實作的比較
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-slate-300 mb-3">自己實作（class component）</p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2"><span className="text-white/40 shrink-0">•</span> 需要寫 class component 樣板</li>
                    <li className="flex items-start gap-2"><span className="text-white/40 shrink-0">•</span> 無法在函式元件中使用 Hook</li>
                    <li className="flex items-start gap-2"><span className="text-white/40 shrink-0">•</span> 無 useErrorBoundary（手動拋錯很麻煩）</li>
                    <li className="flex items-start gap-2"><span className="text-white/40 shrink-0">•</span> resetKeys 要自己實作</li>
                    <li className="flex items-start gap-2"><span className="text-white/40 shrink-0">•</span> 適合：不想加依賴的小型專案</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-300 mb-3">react-error-boundary 套件</p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0">•</span> 完全函式元件的使用方式</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0">•</span> useErrorBoundary 輕鬆處理 async 錯誤</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0">•</span> resetKeys 自動根據 props 重置</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0">•</span> onError / onReset callbacks</li>
                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0">•</span> 適合：幾乎所有生產環境專案</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['Error Boundary', 'Suspense', 'React.lazy', 'Code Splitting', 'Error Handling', 'React'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                classNames={{
                  base: 'bg-slate-100 text-slate-700',
                  content: 'font-medium text-xs',
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Navigation ───────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep23-performance">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-slate-600 transition-colors">
                    EP.23 React 效能優化
                  </p>
                  <p className="text-gray-400 text-xs mt-1">useMemo、useCallback、React.memo 三件套</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep25-usereducer">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>下一篇</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-slate-600 transition-colors">
                    EP.25 useReducer
                  </p>
                  <p className="text-gray-400 text-xs mt-1">複雜狀態管理的正確解法</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
