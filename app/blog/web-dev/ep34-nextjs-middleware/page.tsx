'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Lock,
  Globe,
  Zap,
  ShieldAlert,
  FlaskConical,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Server
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

export default function WebDevEP34() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.34</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Next.js Middleware 與 Edge Runtime：<br />
              <span className="text-slate-300">在邊緣執行你的邏輯</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Middleware 攔截請求、Edge Functions、Geolocation 分流 — 讓你的應用響應速度提升到 50ms 以內
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Middleware · Edge · A/B Testing · Rate Limiting</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：什麼是 Middleware ────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Server className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：什麼是 Middleware？為什麼需要它？
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Next.js Middleware 是每個請求進入你的 Next.js 應用之前的「守門員」——一段在 Edge Runtime 上執行的程式碼，能在請求到達 Page 或 API Route 之前攔截、修改、或重導向它。由於執行在邊緣節點（離用戶最近的伺服器），延遲通常在 50ms 以內，遠優於傳統 Server-Side 邏輯。
              </p>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mb-6 font-mono text-sm text-center">
                <p className="text-slate-400 mb-3 text-xs">請求處理流程</p>
                <div className="flex items-center justify-center gap-3 flex-wrap text-xs">
                  <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg">Browser Request</span>
                  <span className="text-slate-400">↓</span>
                  <span className="bg-slate-600 text-white px-3 py-1.5 rounded-lg">[Next.js Middleware]</span>
                  <span className="text-slate-400 text-xs">← 在這裡決定：重導向？修改 Header？判斷身份？</span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                  <span className="text-slate-400">↓</span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap text-xs">
                  <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg">Next.js Pages</span>
                  <span className="text-slate-400">/</span>
                  <span className="bg-purple-600 text-white px-3 py-1.5 rounded-lg">API Routes</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-4">適合在 Middleware 做的事</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: '身份驗證',
                    desc: '在請求到達 Page 之前就判斷用戶是否登入，未登入直接重導向到 /login，不需要在每個 Page 重複寫這個邏輯。',
                    icon: Lock,
                    color: 'blue',
                  },
                  {
                    title: 'A/B Testing',
                    desc: '隨機將用戶分配到 A 或 B 組，用 URL Rewrite 讓他們看到不同版本的頁面，URL 對用戶透明，資料收集由 Middleware 處理。',
                    icon: FlaskConical,
                    color: 'purple',
                  },
                  {
                    title: '地理分流（Geolocation）',
                    desc: '根據用戶的 IP 位址判斷所在國家，自動導向對應地區的版本（台灣 → /tw、日本 → /jp），無需用戶手動切換。',
                    icon: MapPin,
                    color: 'emerald',
                  },
                  {
                    title: '速率限制（Rate Limiting）',
                    desc: '在 Edge 層就擋掉過多請求，保護你的 API 不被濫用，而不需要讓請求跑到 Origin Server 才被擋下。',
                    icon: ShieldAlert,
                    color: 'red',
                  },
                  {
                    title: '語言偵測',
                    desc: '讀取 Accept-Language Header，自動導向用戶語言的版本（zh-TW → /tw、en → /en），提升國際化體驗。',
                    icon: Globe,
                    color: 'orange',
                  },
                  {
                    title: '請求/回應修改',
                    desc: '在請求中注入自訂 Header（如 x-user-id、x-country），讓後面的 Page 和 API Route 能直接讀取，無需重複驗證。',
                    icon: Zap,
                    color: 'yellow',
                  },
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`text-${color}-600`} size={16} />
                      <p className={`font-bold text-${color}-800 text-sm`}>{title}</p>
                    </div>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700 text-sm font-medium mb-1">Middleware vs API Route vs Server Component — 怎麼選？</p>
                <div className="space-y-2 mt-2">
                  {[
                    { when: '每個請求都要執行的邏輯（驗證、日誌、分流）', use: 'Middleware', color: 'slate' },
                    { when: '特定的資料操作或複雜的業務邏輯', use: 'API Route / Server Action', color: 'blue' },
                    { when: '首次渲染時需要資料的頁面邏輯', use: 'Server Component', color: 'emerald' },
                  ].map(({ when, use, color }) => (
                    <div key={when} className="flex items-start gap-2">
                      <span className={`text-xs font-medium text-${color}-600 shrink-0 mt-0.5`}>{use}：</span>
                      <span className="text-slate-600 text-xs">{when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：基礎 Middleware 語法 ─────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Zap className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：基礎 Middleware 語法
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Middleware 的入口是專案根目錄下的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">middleware.ts</code>（與 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">app/</code> 資料夾同層），匯出一個 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">middleware</code> 函式和一個 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">config</code>（用來控制哪些路徑觸發 Middleware）。
              </p>

              <CodeBlock language="typescript">
{`   // middleware.ts（放在專案根目錄，與 app/ 同層）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  console.log(\`[Middleware] \${request.method} \${pathname}\`);

  // 1. 讀取 Cookie
  const token = request.cookies.get('auth-token')?.value;

  // 2. 讀取 Header
  const country = request.headers.get('x-vercel-ip-country');

  // 3. 直接放行（繼續往下）
  return NextResponse.next();

  // 或者 4. 重導向（URL 改變，瀏覽器發出新請求）
  // return NextResponse.redirect(new URL('/login', request.url));

  // 或者 5. 改寫路徑（URL 不變，但實際渲染不同 page）
  // return NextResponse.rewrite(new URL('/dashboard-v2', request.url));
}

// 控制哪些路徑會觸發 Middleware
export const config = {
  matcher: [
    // 只匹配這些路徑
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
    // 排除靜態資源（避免 Middleware 處理 _next/static 等不必要的請求）
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};   `}
</CodeBlock>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {[
                  {
                    method: 'NextResponse.next()',
                    desc: '放行請求，繼續正常處理。可以在呼叫前修改 request headers，將資訊傳遞給 Page/API Route。',
                    color: 'green',
                  },
                  {
                    method: 'NextResponse.redirect()',
                    desc: '重導向到新 URL，瀏覽器會收到 307/308 回應並發出新請求。URL 會改變，用於身份驗證失敗等情境。',
                    color: 'orange',
                  },
                  {
                    method: 'NextResponse.rewrite()',
                    desc: '在不改變瀏覽器 URL 的情況下，渲染不同的 Page。用於 A/B Testing、地理分流等需要透明切換的場景。',
                    color: 'blue',
                  },
                ].map(({ method, desc, color }) => (
                  <div key={method} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`font-mono text-${color}-800 text-xs font-bold mb-2`}>{method}</p>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">matcher 的撰寫技巧</p>
                    <ul className="text-amber-700 text-xs space-y-1 leading-relaxed">
                      <li>• <code className="bg-amber-100 px-1 rounded font-mono">/dashboard/:path*</code> — 匹配 /dashboard 及所有子路徑</li>
                      <li>• <code className="bg-amber-100 px-1 rounded font-mono">/((?!_next).*)</code> — 排除以 _next 開頭的路徑（靜態資源）</li>
                      <li>• 把最常觸發的路徑過濾器放在最前面，節省 Middleware 執行資源</li>
                      <li>• 靜態資源（圖片、字體）進入 Middleware 毫無意義，務必排除</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：身份驗證 Middleware ──────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Lock className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：身份驗證 Middleware
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                把身份驗證邏輯放在 Middleware 是最理想的做法：一處集中管理，保護所有需要登入的路徑，不需要在每個 Page 或 API Route 重複撰寫。用戶嘗試存取受保護頁面時，Middleware 會在請求到達 Page 之前就判斷並重導向，避免任何受保護內容被渲染。
              </p>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-blue-800 text-sm font-medium mb-1">為什麼在 Middleware 用 jose 而不是 jsonwebtoken？</p>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      Middleware 執行在 Edge Runtime，Edge Runtime 不支援 Node.js 的原生 <code className="bg-blue-100 px-1 rounded font-mono">crypto</code> 模組，而 <code className="bg-blue-100 px-1 rounded font-mono">jsonwebtoken</code> 依賴它。<code className="bg-blue-100 px-1 rounded font-mono">jose</code> 是專為 Web 標準 Crypto API 設計的 JWT 程式庫，完全相容 Edge Runtime。
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock language="typescript">
{`   // middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const PUBLIC_PATHS = ['/', '/login', '/register', '/blog'];
const AUTH_PATHS = ['/dashboard', '/profile', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公開路徑直接放行
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 需要身份驗證的路徑
  if (AUTH_PATHS.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // 未登入 → 導向 login，並記住原始路徑
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // 驗證 JWT（在 Edge Runtime 中用 jose，不能用 jsonwebtoken）
      const { payload } = await jwtVerify(token, JWT_SECRET);

      // 將用戶 ID 加入 header，讓後面的 API 可以讀取
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.sub as string);
      response.headers.set('x-user-role', payload.role as string);
      return response;

    } catch {
      // Token 無效 → 清除 cookie 並導向 login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};   `}
</CodeBlock>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-700 text-sm font-medium mb-3">在 Page 中讀取 Middleware 注入的 Header</p>
                <CodeBlock language="typescript">
{`   // app/dashboard/page.tsx（Server Component）
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const headersList = await headers();

  // 讀取 Middleware 注入的用戶資訊
  const userId = headersList.get('x-user-id');
  const userRole = headersList.get('x-user-role');

  // 直接使用，不需要再驗證一次 JWT
  const user = await getUserById(userId!);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {userRole === 'admin' && <AdminPanel />}
    </div>
  );
}   `}
</CodeBlock>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：A/B Testing 與 Geolocation ───────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <FlaskConical className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：A/B Testing 與 Geolocation 分流
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Middleware 的 URL Rewrite 能力讓 A/B Testing 和地理分流的實作變得優雅：用戶看到的 URL 不變，但實際渲染的頁面可以完全不同。這比傳統的 Client-Side A/B Testing（用 JavaScript 在前端切換）更可靠——不會有 Flash of Original Content（FOUC）問題，也不會被 Ad Blocker 干擾。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">A/B Testing 實作</h3>
              <CodeBlock language="typescript">
{`   // middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // A/B Test：隨機將用戶分配到 A 或 B 組
  const abGroup = request.cookies.get('ab-group')?.value;

  if (request.nextUrl.pathname === '/pricing') {
    const group = abGroup ?? (Math.random() < 0.5 ? 'A' : 'B');

    // 改寫路徑（用戶看到的 URL 還是 /pricing）
    const response = NextResponse.rewrite(
      new URL(\`/pricing-\${group}\`, request.url)
    );

    // 記住這次的分組（7天），確保用戶每次看到同一個版本
    if (!abGroup) {
      response.cookies.set('ab-group', group, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return response;
  }
}   `}
</CodeBlock>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 my-6">
                <p className="text-purple-800 text-sm font-medium mb-2">你需要額外建立的頁面</p>
                <ul className="text-purple-700 text-xs space-y-1 leading-relaxed">
                  <li>• <code className="bg-purple-100 px-1 rounded font-mono">app/pricing-A/page.tsx</code> — A 組看到的定價頁（例如：強調年費方案）</li>
                  <li>• <code className="bg-purple-100 px-1 rounded font-mono">app/pricing-B/page.tsx</code> — B 組看到的定價頁（例如：強調月費方案）</li>
                  <li>• 兩個頁面的 URL 對用戶透明，他們看到的都是 <code className="bg-purple-100 px-1 rounded font-mono">/pricing</code></li>
                </ul>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">Geolocation 分流（Vercel Edge Network 提供）</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                部署在 Vercel 上時，Edge Network 會自動在每個請求中注入地理位置相關的 Header，你在 Middleware 中可以直接讀取，不需要額外的 IP 查詢服務。
              </p>
              <CodeBlock language="typescript">
{`   export function middleware(request: NextRequest) {
  // Vercel 自動注入地理位置 header
  const country = request.headers.get('x-vercel-ip-country') ?? 'US';
  const city = request.headers.get('x-vercel-ip-city');

  // 根據國家導向不同地區的頁面
  if (request.nextUrl.pathname === '/') {
    if (country === 'TW') {
      return NextResponse.rewrite(new URL('/tw', request.url));
    }
    if (country === 'JP') {
      return NextResponse.rewrite(new URL('/jp', request.url));
    }
  }

  // 將地理資訊傳遞給 page components
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  if (city) response.headers.set('x-city', city);
  return response;
}   `}
</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-slate-700 text-sm font-bold mb-2">Vercel 提供的 Geo Headers</p>
                  <ul className="text-slate-600 text-xs space-y-1.5 font-mono">
                    <li>x-vercel-ip-country — 國家代碼（TW、JP、US）</li>
                    <li>x-vercel-ip-country-region — 地區代碼</li>
                    <li>x-vercel-ip-city — 城市名稱</li>
                    <li>x-vercel-ip-latitude — 緯度</li>
                    <li>x-vercel-ip-longitude — 經度</li>
                  </ul>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="text-emerald-700 text-sm font-bold mb-2">常見 Geolocation 應用場景</p>
                  <ul className="text-emerald-600 text-xs space-y-1.5 leading-relaxed">
                    <li>• 自動切換語言版本</li>
                    <li>• 顯示當地貨幣與定價</li>
                    <li>• 合規性（GDPR / CCPA 通知）</li>
                    <li>• 內容授權地區限制</li>
                    <li>• 當地特色活動或促銷</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：Edge Runtime 限制與優化 ──────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Zap className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：Edge Runtime 限制與優化
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Edge Runtime 是一個輕量化的 JavaScript 執行環境，基於 Web 標準 API（而非 Node.js）。它讓程式碼能在 Cloudflare Workers、Vercel Edge Functions 等邊緣節點執行，全球延遲通常低於 50ms。但輕量化意味著限制——並非所有 Node.js 模組都能在 Edge Runtime 中使用。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="font-bold text-red-800 text-sm mb-3">❌ 不能在 Edge Runtime 中使用</p>
                  <ul className="text-red-700 text-xs space-y-1.5 font-mono leading-relaxed">
                    <li>• Node.js fs 模組（檔案系統）</li>
                    <li>• Node.js net 模組（TCP 連線）</li>
                    <li>• jsonwebtoken（依賴 Node.js crypto）</li>
                    <li>• bcrypt（原生 addon）</li>
                    <li>• 大型 npm 包（bundle size 限制）</li>
                    <li>• 直接連接資料庫（Prisma Client 不支援）</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-bold text-green-800 text-sm mb-3">✅ 可以在 Edge Runtime 中使用</p>
                  <ul className="text-green-700 text-xs space-y-1.5 font-mono leading-relaxed">
                    <li>• fetch API（HTTP 請求）</li>
                    <li>• Web Crypto API（加密）</li>
                    <li>• URL、URLSearchParams</li>
                    <li>• TextEncoder / TextDecoder</li>
                    <li>• jose（Edge 相容的 JWT 庫）</li>
                    <li>• cookies()、headers() API</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">明確指定 Edge Runtime</h3>
              <CodeBlock language="typescript">
{`   // 在 Middleware 中預設就是 Edge Runtime
// 不需要額外宣告

// 明確指定 Edge Runtime（用於 API Route）：
export const runtime = 'edge';

// 在 API Route 中同樣可以指定：
// app/api/fast-route/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // 這個 API 會在 Cloudflare Workers / Vercel Edge 上跑
  // 全球延遲 < 50ms
  return Response.json({ message: 'From the edge!' });
}

// ❌ 在 Edge Runtime 中不能用這些：
// - Node.js fs 模組
// - Node.js net 模組
// - jsonwebtoken（因為用了 Node.js crypto）
// - 大型 npm 包（bundle size 有限制）

// ✅ 可以用這些：
// - fetch API
// - Web Crypto API
// - URL、URLSearchParams
// - TextEncoder / TextDecoder
// - jose（JWT 的 Edge 相容版本）
// - cookies、headers   `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Edge Runtime 的資料庫存取方案</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Middleware 中不能直接連接傳統資料庫（因為 TCP 連線問題）。如果需要在邊緣層做基於資料庫的決策，有幾個常見的替代方案：
              </p>
              <div className="space-y-3">
                {[
                  {
                    solution: 'Upstash Redis',
                    desc: '基於 HTTP 的 Redis，完全相容 Edge Runtime。適合快取、Session 儲存、Rate Limiting 計數器等需要低延遲讀寫的場景。',
                    color: 'red',
                  },
                  {
                    solution: 'Cloudflare KV / D1',
                    desc: 'Cloudflare 提供的邊緣儲存方案。KV 是鍵值存儲，D1 是 SQLite 資料庫，都可以在 Edge Worker 中直接存取。',
                    color: 'orange',
                  },
                  {
                    solution: 'JWT / Cookie（無狀態）',
                    desc: '將必要資訊（用戶 ID、角色、權限）編碼在 JWT 中，Middleware 直接解析 JWT 取得資訊，完全不需要資料庫查詢。',
                    color: 'blue',
                  },
                ].map(({ solution, desc, color }) => (
                  <div key={solution} className={`flex items-start gap-3 p-3 bg-${color}-50 rounded-lg border border-${color}-100`}>
                    <span className={`bg-${color}-600 text-white text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5`}>{solution}</span>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：Rate Limiting ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-slate-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <ShieldAlert className="text-slate-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：Rate Limiting 在 Middleware 中
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                速率限制（Rate Limiting）是 API 安全的基本防護，能夠防止暴力破解、DoS 攻擊、以及過度使用 API 的行為。在 Middleware 中實作意味著惡意請求在到達 Origin Server 之前就被擋下，節省運算資源。搭配 Upstash Redis 的 HTTP API，可以在 Edge Runtime 中完整實作滑動視窗計數。
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <p className="text-slate-700 text-sm font-medium mb-2">Rate Limiting 演算法比較</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { algo: 'Fixed Window', desc: '每個固定時間視窗（如每分鐘）重置計數器，實作簡單但在視窗邊界可能被突破。', color: 'blue' },
                    { algo: 'Sliding Window', desc: '根據最近 N 秒內的請求數量限制，比 Fixed Window 更平滑，Upstash 推薦方案。', color: 'emerald' },
                    { algo: 'Token Bucket', desc: '以固定速率補充 Token，允許短暫的突發流量，適合需要彈性的 API。', color: 'purple' },
                  ].map(({ algo, desc, color }) => (
                    <div key={algo} className={`p-3 bg-${color}-50 rounded-lg border border-${color}-100`}>
                      <p className={`font-bold text-${color}-800 text-xs mb-1`}>{algo}</p>
                      <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">用 Upstash Redis 實作邊緣層速率限制</h3>
              <CodeBlock language="typescript">
{`   // middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10秒內最多10次
  analytics: true,
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // 用 IP 作為限流 key
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};   `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">根據用戶角色設定不同的限流規則</h3>
              <CodeBlock language="typescript">
{`   // 進階：依用戶角色動態設定 Rate Limit
export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  let userRole = 'anonymous';

  // 解析 JWT 取得用戶角色（不需要資料庫查詢）
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userRole = payload.role as string;
    } catch {
      // Token 無效，視為匿名用戶
    }
  }

  // 不同角色的限流規則
  const limits = {
    admin: Ratelimit.slidingWindow(1000, '1 m'),    // 管理員：每分鐘 1000 次
    premium: Ratelimit.slidingWindow(200, '1 m'),   // 付費用戶：每分鐘 200 次
    user: Ratelimit.slidingWindow(60, '1 m'),       // 一般用戶：每分鐘 60 次
    anonymous: Ratelimit.slidingWindow(10, '1 m'),  // 匿名：每分鐘 10 次
  };

  const limiter = limits[userRole as keyof typeof limits] ?? limits.anonymous;

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter,
  });

  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const key = \`\${userRole}:\${ip}\`; // 用角色+IP 組合 key
  const { success, remaining } = await ratelimit.limit(key);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please upgrade your plan for higher limits.' },
      { status: 429 }
    );
  }

  // 把剩餘次數傳給 API 方便 debug
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  return response;
}   `}
</CodeBlock>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-emerald-800 text-sm font-medium mb-1">Rate Limiting 最佳實踐</p>
                      <ul className="text-emerald-700 text-xs space-y-1 leading-relaxed">
                        <li>• 回傳標準的 Retry-After Header</li>
                        <li>• 在回應中說明限流原因</li>
                        <li>• 對付費用戶提供更高的上限</li>
                        <li>• 記錄被擋下的請求以偵測攻擊</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-red-800 text-sm font-medium mb-1">常見陷阱</p>
                      <ul className="text-red-700 text-xs space-y-1 leading-relaxed">
                        <li>• 用 IP 限流時，NAT 後的辦公室可能共用 IP</li>
                        <li>• x-forwarded-for 可以偽造，高安全場景需要額外驗證</li>
                        <li>• 不要在 Middleware 中做太重的計算，否則失去邊緣加速的優勢</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-slate-800/10 to-zinc-700/10 rounded-xl border border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-slate-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Middleware 是 Next.js 全端架構的最後一塊拼圖</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      把 Middleware 加入你的架構思維後，整個 Next.js 應用的請求處理層次就完整了：Edge Middleware（守門員）→ Server Components（資料獲取）→ Client Components（互動）→ Server Actions（資料變更）。每一層都有明確的職責，整體架構清晰而高效。
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
            {['Next.js', 'Middleware', 'Edge Runtime', 'A/B Testing', 'Rate Limiting', 'Geolocation', 'Authentication'].map((tag) => (
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
            <Link href="/blog/web-dev/ep33-pwa">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-slate-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-slate-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.33 Progressive Web App</p>
                      <p className="text-xs text-gray-400">Service Worker、Manifest、Offline First</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <div className="opacity-50 cursor-not-allowed">
              <Card className="shadow border border-gray-200">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-500 text-sm">EP.35</p>
                      <p className="text-xs text-gray-400">Coming Soon</p>
                    </div>
                    <ArrowRight className="text-gray-400 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
