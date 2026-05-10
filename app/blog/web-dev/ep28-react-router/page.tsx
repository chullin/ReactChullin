'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  Globe,
  Route,
  GitBranch,
  Navigation,
  Layers,
  Search,
  Database,
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

export default function WebDevEP28() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-red-800 via-rose-700 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.28</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">React 實戰系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              React Router v6：<br />
              <span className="text-pink-300">SPA 路由完整指南</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              BrowserRouter、動態路由 :id、Outlet 巢狀、Loader/Action — 非 Next.js 的 React 應用必學
            </p>
            <div className="flex items-center gap-6 text-pink-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> BrowserRouter · Outlet · Loader</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：為什麼需要路由 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Globe className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：為什麼需要路由
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                在沒有路由之前，React SPA（Single Page Application）整個網站只有一個 URL（<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/</code>）。用戶按上一頁、加書籤、分享連結，全部都回到首頁，完全無法指向特定內容。React Router 讓你的 SPA 有真正意義上的 URL，讓每個畫面都有自己的地址。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-4">SPA 路由的核心原理</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-700 mb-2">沒有路由的問題</p>
                  <ul className="text-red-600 text-sm space-y-1.5">
                    <li>• 所有頁面共用 <code className="bg-red-100 px-1 rounded">/</code></li>
                    <li>• 上一頁按鈕無效</li>
                    <li>• 書籤永遠回到首頁</li>
                    <li>• 分享連結無法指向特定頁面</li>
                    <li>• SEO 幾乎不可能</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-2">有路由之後</p>
                  <ul className="text-green-600 text-sm space-y-1.5">
                    <li>• 每個頁面有獨立 URL</li>
                    <li>• 瀏覽器歷史記錄正常運作</li>
                    <li>• 書籤可以指向任意頁面</li>
                    <li>• 分享連結可以精確導向</li>
                    <li>• SSR/預渲染配合 SEO</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-4">React Router vs Next.js App Router</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                你可能會問：「我已經在用 Next.js 了，為什麼要學 React Router？」答案是：<strong>不是所有 React 專案都是 Next.js</strong>。
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-rose-600 to-pink-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg">比較</th>
                      <th className="px-4 py-3 text-center">Next.js App Router</th>
                      <th className="px-4 py-3 text-center rounded-tr-lg">React Router v6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['路由方式', '檔案系統（EP.18 已學）', '程式碼定義'],
                      ['適用環境', 'Next.js 框架', 'CRA / Vite / 任何 React'],
                      ['SSR 支援', '原生支援', '需另外配置'],
                      ['路由定義', 'app/page.tsx 自動對應', '<Route> 組件聲明'],
                      ['資料載入', 'Server Components / fetch', 'loader / action（v6.4+）'],
                      ['部署', 'Vercel 最佳化', '任何靜態主機'],
                    ].map(([label, nextjs, rr], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{nextjs}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{rr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="text-rose-800 text-sm leading-relaxed">
                  <strong>學習這篇的意義：</strong>React Router 是全球最多 React 專案使用的路由方案，閱讀大量開源專案、維護舊版 React app、或到不使用 Next.js 的公司工作，都會需要它。它的概念也有助於更深入理解 Next.js 路由的設計思路。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：基本設定 ────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-pink-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Route className="text-pink-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：基本設定
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                React Router v6 的安裝與初始設定非常簡單。核心概念只有三個：<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">BrowserRouter</code>（提供路由環境）、<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Routes + Route</code>（定義路由規則）、<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Link</code>（宣告式導航連結）。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">安裝</h3>
              <CodeBlock language="bash">{`npm install react-router-dom

# react-router-dom 是專給 web 環境的版本
# react-router-native 是 React Native 版本
# 一般 web 專案只需要安裝 react-router-dom`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">入口點設定（main.tsx）</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">BrowserRouter</code> 必須包在最外層，提供路由的 context 給所有子元件使用。它內部使用瀏覽器的 History API 來同步 URL 與 UI。
              </p>
              <CodeBlock language="tsx">{`// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* BrowserRouter 讓整個 App 都能使用 React Router 的 hooks */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// 其他可用的 Router 類型（依場景選擇）：
// <HashRouter>    → URL 使用 # 符號（不需要伺服器配置，如 /#/about）
// <MemoryRouter>  → URL 儲存在記憶體（測試環境、React Native）
// <StaticRouter>  → SSR 伺服器端渲染使用`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">App.tsx — 定義所有路由</h3>
              <CodeBlock language="tsx">{`// App.tsx
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      {/* 導覽列：使用 Link 而非 <a>，Link 不會觸發整頁刷新 */}
      <nav className="flex gap-4 p-4 bg-gray-100">
        {/* Link：基本的宣告式導航 */}
        <Link to="/">首頁</Link>
        <Link to="/about">關於</Link>

        {/* NavLink：會自動加上 active class，適合導覽列 */}
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
          }
        >
          部落格
        </NavLink>
      </nav>

      {/* Routes：路由出口，渲染第一個匹配的 Route */}
      <Routes>
        {/* 精確匹配 / */}
        <Route path="/" element={<Home />} />

        {/* 匹配 /about */}
        <Route path="/about" element={<About />} />

        {/* 匹配 /blog（精確） */}
        <Route path="/blog" element={<BlogList />} />

        {/* 動態路由：:id 是參數，匹配 /blog/123、/blog/abc 等 */}
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* 404 fallback：* 匹配所有未匹配的路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}`}</CodeBlock>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-pink-800 text-sm font-medium mb-1">Link vs NavLink 的差別</p>
                <p className="text-pink-700 text-sm leading-relaxed">
                  <code className="bg-pink-100 px-1 rounded">Link</code> 是基本的路由連結，相當於不會觸發整頁刷新的 <code className="bg-pink-100 px-1 rounded">&lt;a&gt;</code>。<code className="bg-pink-100 px-1 rounded">NavLink</code> 在 URL 匹配時，className 函式會收到 <code className="bg-pink-100 px-1 rounded">&#123; isActive &#125;</code>，讓你可以動態設定「選中」樣式，非常適合導覽列。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：動態路由與 useParams ────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <GitBranch className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：動態路由與 useParams
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                動態路由是 SPA 最常用的功能之一，讓同一個元件可以根據 URL 參數渲染不同內容。路由定義中的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">:id</code> 語法表示這段路徑是動態參數，在元件中用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useParams</code> 取得。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">useParams 基本用法</h3>
              <CodeBlock language="tsx">{`// pages/BlogPost.tsx
// 對應路由：<Route path="/blog/:id" element={<BlogPost />} />
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
};

function BlogPost() {
  // useParams 回傳一個物件，key 對應路由中的 :參數名稱
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(\`/api/posts/\${id}\`)
      .then(r => {
        if (!r.ok) throw new Error('文章不存在');
        return r.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);  // id 改變時重新 fetch（例如從 /blog/1 navigate 到 /blog/2）

  if (loading) return <div className="p-8 text-center">載入中...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">作者：{post.author}</p>
      <div className="prose">{post.content}</div>
    </article>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">多層動態路由</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                一個路由中可以有多個動態參數。例如「某位使用者的特定文章」，URL 結構為 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/users/:userId/posts/:postId</code>。
              </p>
              <CodeBlock language="tsx">{`// 路由定義
<Route path="/users/:userId/posts/:postId" element={<UserPost />} />

// 元件中取得多個參數
function UserPost() {
  const { userId, postId } = useParams<{ userId: string; postId: string }>();

  // URL: /users/42/posts/100
  // userId = "42"
  // postId = "100"

  // 注意：useParams 回傳的值永遠是 string
  // 如果需要數字，需要自行轉換：
  const numericId = Number(postId);

  return (
    <div>
      <h1>使用者 {userId} 的文章 #{postId}</h1>
    </div>
  );
}

// 更多動態路由範例：
// /products/:category/:productId
// /dashboard/:orgId/settings/:settingId
// /files/:folderId/:fileId/preview`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Optional 參數與萬用路由</h3>
              <CodeBlock language="tsx">{`// v6.4+ 語法：? 表示可選參數
<Route path="/blog/:id?" element={<BlogPost />} />
// 匹配 /blog 和 /blog/123

// * 萬用路由：匹配剩餘所有路徑段
<Route path="/files/*" element={<FileExplorer />} />

function FileExplorer() {
  // URL: /files/documents/2026/report.pdf
  // * 匹配到 "documents/2026/report.pdf"
  const params = useParams();
  const filePath = params['*'];  // "documents/2026/report.pdf"
  return <div>檔案路徑：{filePath}</div>;
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：巢狀路由與 Outlet ───────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-pink-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Layers className="text-pink-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：巢狀路由與 Outlet
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                巢狀路由（Nested Routes）是 React Router v6 最強大的功能之一。它讓你定義共享 Layout 的路由群組，子路由的內容渲染在父路由 Layout 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;Outlet /&gt;</code> 位置。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">巢狀路由的實際場景</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                最典型的例子是後台 Dashboard：左側有導覽列（Sidebar），右側渲染不同的子頁面，但 Sidebar 永遠保持在畫面上。
              </p>
              <CodeBlock language="tsx">{`// App.tsx — 定義巢狀路由結構
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* 公開路由 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 巢狀路由：DashboardLayout 是父路由的元件 */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* index route：匹配 /dashboard（精確）*/}
        <Route index element={<DashboardHome />} />

        {/* 子路由：匹配 /dashboard/profile */}
        <Route path="profile" element={<Profile />} />

        {/* 子路由：匹配 /dashboard/settings */}
        <Route path="settings" element={<Settings />} />

        {/* 子路由可以繼續嵌套！匹配 /dashboard/settings/security */}
        {/* <Route path="settings/security" element={<Security />} /> */}
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">DashboardLayout 元件</h3>
              <CodeBlock language="tsx">{`// layouts/DashboardLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar：永遠顯示 */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">後台管理</h1>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end  // 加上 end 才只在精確匹配 /dashboard 時 active
            className={({ isActive }) =>
              \`block px-4 py-2 rounded \${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}\`
            }
          >
            總覽
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              \`block px-4 py-2 rounded \${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}\`
            }
          >
            個人資料
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              \`block px-4 py-2 rounded \${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}\`
            }
          >
            設定
          </NavLink>
        </nav>
      </aside>

      {/* 主要內容區：子路由渲染在這裡 */}
      <main className="flex-1 p-8">
        {/* Outlet 是關鍵：子路由的元件會渲染在這個位置 */}
        <Outlet />
        {/* 當 URL 是 /dashboard         → 渲染 <DashboardHome /> */}
        {/* 當 URL 是 /dashboard/profile  → 渲染 <Profile /> */}
        {/* 當 URL 是 /dashboard/settings → 渲染 <Settings /> */}
      </main>
    </div>
  );
}

// Outlet Context：可以透過 Outlet 傳遞資料給子路由
// function DashboardLayout() {
//   const [user, setUser] = useState(null);
//   return (
//     <div>
//       <Sidebar />
//       <Outlet context={{ user, setUser }} />
//     </div>
//   );
// }
//
// // 子路由中取得
// const { user } = useOutletContext<{ user: User }>();`}</CodeBlock>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-pink-800 text-sm font-medium mb-1">index route 的用途</p>
                <p className="text-pink-700 text-sm leading-relaxed">
                  <code className="bg-pink-100 px-1 rounded">&lt;Route index /&gt;</code> 相當於父路由的「預設子頁面」。當 URL 精確匹配父路由時（例如 <code className="bg-pink-100 px-1 rounded">/dashboard</code>），渲染 index 的元件。沒有 index route 的話，精確匹配父路由時 Outlet 會是空的。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：useNavigate ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Navigation className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：程式化導航 — useNavigate
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Link</code> 是使用者點擊觸發的宣告式導航。但很多情境需要在程式碼中觸發導航，例如：登入成功後跳轉到 dashboard、表單送出後跳轉到列表頁、沒有登入時重定向到登入頁。這時要用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useNavigate</code>。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">基本用法</h3>
              <CodeBlock language="tsx">{`// pages/Login.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      // 登入成功：導向 dashboard
      // replace: true → 不留下登入頁的歷史記錄（避免按上一頁回到登入頁）
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setLoading(false);
      // 顯示錯誤訊息
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="密碼" />
      <button type="submit" disabled={loading}>
        {loading ? '登入中...' : '登入'}
      </button>
    </form>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">navigate 的各種用法</h3>
              <CodeBlock language="tsx">{`import { useNavigate } from 'react-router-dom';

function SomeComponent() {
  const navigate = useNavigate();

  // 基本導航
  navigate('/dashboard');

  // replace：不加歷史記錄（按上一頁不會回到這頁）
  navigate('/login', { replace: true });

  // 相對導航：-1 是上一頁，1 是下一頁（就像 history.go()）
  navigate(-1);  // 上一頁
  navigate(1);   // 下一頁（如果有的話）

  // 傳遞 state（不出現在 URL 中，適合暫時性資料）
  navigate('/checkout', {
    state: {
      from: 'cart',
      items: selectedItems,  // 可以傳複雜物件
    }
  });

  return null;
}

// 在目標頁面讀取 state
import { useLocation } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const state = location.state as { from: string; items: CartItem[] } | null;

  console.log(state?.from);   // 'cart'
  console.log(state?.items);  // 購物車商品

  // 注意：state 在重新整理後會消失
  // 如果需要持久化，改用 useSearchParams 或 localStorage

  return <div>結帳頁</div>;
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Protected Route — 路由守衛</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                結合 useNavigate 和 useEffect 可以實作「需要登入才能訪問」的路由保護：
              </p>
              <CodeBlock language="tsx">{`// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

function ProtectedRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    // 用 <Navigate> 組件做宣告式重定向
    // replace 確保不留歷史記錄
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;  // 已登入：正常渲染子路由
}

// 在路由定義中使用
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<BlogList />} />

      {/* 用 ProtectedRoute 包住需要保護的路由 */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：Loader 和 Action ────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-pink-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Database className="text-pink-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：Loader 和 Action（v6.4+ 的資料路由）
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                React Router v6.4 引入了「資料路由」（Data Routers）的概念，這是一個重大升級。它讓路由本身可以負責資料載入（Loader）和資料提交（Action），概念上與 Next.js 的 Server Components 和 Server Actions 非常相近，但在純客戶端環境中運行。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">從 BrowserRouter 遷移到 createBrowserRouter</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                使用 Loader/Action 需要改用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">createBrowserRouter</code> 的物件定義方式，而不是 JSX 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;Route&gt;</code> 元件。
              </p>
              <CodeBlock language="tsx">{`// main.tsx — 使用 createBrowserRouter
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogPost, { loader as blogLoader } from './pages/BlogPost';
import NewPost, { action as createPostAction } from './pages/NewPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/blog',
    element: <BlogList />,
    loader: blogListLoader,  // 進入這個路由前先執行 loader
  },
  {
    path: '/blog/:id',
    element: <BlogPost />,
    loader: blogLoader,
    errorElement: <BlogError />,  // loader 拋錯時顯示此元件
  },
  {
    path: '/blog/new',
    element: <NewPost />,
    action: createPostAction,    // 表單 POST 時執行 action
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'profile', element: <Profile />, loader: profileLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // 注意：不再使用 <BrowserRouter>，改用 <RouterProvider>
);`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Loader — 路由級別的資料載入</h3>
              <CodeBlock language="tsx">{`// pages/BlogPost.tsx

// Loader 函式：在路由切換時自動執行
// 參數 params 對應路由中的 :id
export async function loader({ params }: { params: { id: string } }) {
  const response = await fetch(\`/api/posts/\${params.id}\`);

  if (!response.ok) {
    // 拋出 Response 物件，React Router 會自動顯示 errorElement
    throw new Response('文章不存在', { status: 404 });
  }

  const post = await response.json();
  return { post };  // 回傳的資料透過 useLoaderData() 取得
}

// 元件：不需要 useEffect + useState + loading state！
import { useLoaderData } from 'react-router-dom';

type LoaderData = { post: { id: string; title: string; content: string } };

function BlogPost() {
  // useLoaderData 直接取得 loader 的回傳值
  // 進入此頁面時，資料一定已經載入完成
  const { post } = useLoaderData() as LoaderData;

  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose">{post.content}</div>
    </article>
  );
}

export default BlogPost;`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Action — 處理表單提交</h3>
              <CodeBlock language="tsx">{`// pages/NewPost.tsx
import { Form, redirect, useActionData } from 'react-router-dom';

// Action 函式：處理 <Form> 的 POST 請求
export async function action({ request }: { request: Request }) {
  // request 是原生的 Web Request 物件
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // 驗證
  if (!title || title.length < 3) {
    return { error: '標題至少需要 3 個字元' };  // 回傳驗證錯誤
  }

  // 送出 API
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    return { error: '發布失敗，請稍後再試' };
  }

  // 成功：重定向到部落格列表
  return redirect('/blog');
}

// 元件：使用 <Form> 而非 <form>
// React Router 的 <Form> 會將提交送給 action 而非伺服器
function NewPost() {
  // useActionData：取得 action 函式的回傳值（例如驗證錯誤）
  const actionData = useActionData() as { error?: string } | undefined;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">新增文章</h1>
      <Form method="post">  {/* 不需要 onSubmit，React Router 自動處理 */}
        <div className="space-y-4">
          <input
            name="title"
            placeholder="文章標題"
            className="w-full border rounded p-2"
          />
          <textarea
            name="content"
            placeholder="文章內容"
            rows={6}
            className="w-full border rounded p-2"
          />
          {actionData?.error && (
            <p className="text-red-500 text-sm">{actionData.error}</p>
          )}
          <button type="submit" className="btn-primary w-full">
            發布文章
          </button>
        </div>
      </Form>
    </div>
  );
}

export default NewPost;`}</CodeBlock>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-pink-800 text-sm font-medium mb-2">Loader vs useEffect 的差異</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-pink-700 text-xs font-medium mb-1">使用 useEffect 的問題</p>
                    <ul className="text-pink-600 text-xs space-y-1">
                      <li>• 元件掛載後才開始 fetch</li>
                      <li>• 需要管理 loading / error state</li>
                      <li>• 頁面出現空白的閃爍</li>
                      <li>• 路由切換時有 loading 空窗</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-pink-700 text-xs font-medium mb-1">使用 Loader 的優點</p>
                    <ul className="text-pink-600 text-xs space-y-1">
                      <li>• 路由切換時平行載入資料</li>
                      <li>• 元件渲染時資料已就緒</li>
                      <li>• 不需要 loading state</li>
                      <li>• 錯誤自動顯示 errorElement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 7：useSearchParams ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Search className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 7：useSearchParams — 查詢字串管理
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                查詢字串（Query String）就是 URL 中 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">?</code> 後面的部分，例如 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/products?category=electronics&page=2</code>。它非常適合用來存放篩選條件、排序方式、分頁等「可以分享、可以書籤」的 UI 狀態。React Router 提供 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useSearchParams</code> 讓你輕鬆讀寫查詢字串。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">基本用法</h3>
              <CodeBlock language="tsx">{`// pages/ProductList.tsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  // useSearchParams 類似 useState，但 state 儲存在 URL 的查詢字串中
  const [searchParams, setSearchParams] = useSearchParams();

  // 讀取查詢字串（型別都是 string | null）
  const category = searchParams.get('category') ?? 'all';
  const page = Number(searchParams.get('page') ?? '1');
  const sortBy = searchParams.get('sort') ?? 'newest';

  // 更新查詢字串（會改變 URL，但不觸發頁面刷新）
  const handleCategoryChange = (cat: string) => {
    setSearchParams({
      category: cat,
      page: '1',     // 切換分類時重置頁數
      sort: sortBy,  // 保留其他現有參數
    });
    // URL 變成 /products?category=electronics&page=1&sort=newest
  };

  const handlePageChange = (newPage: number) => {
    // 更新單一參數，保留其他參數
    setSearchParams(prev => {
      prev.set('page', String(newPage));
      return prev;
    });
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {/* 分類篩選 */}
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">全部分類</option>
          <option value="electronics">電子產品</option>
          <option value="clothing">服飾</option>
          <option value="books">書籍</option>
        </select>

        {/* 排序 */}
        <select
          value={sortBy}
          onChange={(e) => setSearchParams(prev => {
            prev.set('sort', e.target.value);
            return prev;
          })}
          className="border rounded p-2"
        >
          <option value="newest">最新</option>
          <option value="price-asc">價格由低到高</option>
          <option value="price-desc">價格由高到低</option>
        </select>
      </div>

      {/* 商品列表（根據 category 和 sortBy 篩選/排序）*/}
      <ProductGrid category={category} sortBy={sortBy} page={page} />

      {/* 分頁 */}
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {/* 目前的 URL：/products?category=electronics&page=2&sort=price-asc */}
      {/* 使用者可以書籤、分享這個 URL，下次打開還是同樣的篩選狀態 */}
    </div>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">搜尋功能實作</h3>
              <CodeBlock language="tsx">{`// 搜尋列：即時更新 URL 的查詢字串
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim(), page: '1' });
    } else {
      // 清空搜尋：移除 q 參數
      setSearchParams(prev => {
        prev.delete('q');
        prev.delete('page');
        return prev;
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="搜尋商品..."
        className="flex-1 border rounded p-2"
      />
      <button type="submit" className="btn-primary px-6">搜尋</button>
    </form>
  );
}

// 在列表元件中讀取搜尋條件
function ProductGrid() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category') ?? 'all';
  const page = Number(searchParams.get('page') ?? '1');

  // 用 searchParams 作為 useEffect 的依賴
  // URL 改變時自動重新 fetch
  useEffect(() => {
    fetchProducts({ query, category, page });
  }, [query, category, page]);

  return <div>{/* 商品列表 */}</div>;
}`}</CodeBlock>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 text-center">
                  <CheckCircle className="text-rose-500 mx-auto mb-2" size={20} />
                  <p className="text-rose-800 text-sm font-medium">可分享</p>
                  <p className="text-rose-600 text-xs">URL 包含所有篩選狀態</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 text-center">
                  <CheckCircle className="text-rose-500 mx-auto mb-2" size={20} />
                  <p className="text-rose-800 text-sm font-medium">可書籤</p>
                  <p className="text-rose-600 text-xs">下次打開還原篩選條件</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 text-center">
                  <CheckCircle className="text-rose-500 mx-auto mb-2" size={20} />
                  <p className="text-rose-800 text-sm font-medium">上一頁有效</p>
                  <p className="text-rose-600 text-xs">瀏覽器歷史正確記錄</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['React Router', 'SPA', 'useNavigate', 'Outlet', 'Loader', 'React'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-rose-100 text-rose-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep27-zustand">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-rose-300">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-rose-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.27 Zustand</p>
                      <p className="text-xs text-gray-400">輕量全域狀態管理</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep01-modern-web">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-rose-300">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.01 現代網頁開發</p>
                      <p className="text-xs text-gray-400">系列起點，重新出發</p>
                    </div>
                    <ArrowRight className="text-rose-500 shrink-0" size={20} />
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
