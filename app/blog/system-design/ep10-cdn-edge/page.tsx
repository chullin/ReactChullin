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
  Globe,
  Zap,
  RefreshCw,
  Code2,
  Server,
  Shield,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  CloudLightning,
  Network
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP10() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.10</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              CDN 與 Edge Computing：<br />
              <span className="text-cyan-200">讓資源在全球 50ms 內送達</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              CDN 原理、Edge Caching、Cache Invalidation、Cloudflare Workers — 大流量系統的靜態資源加速策略
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> CDN · Edge · Cache Invalidation · Cloudflare</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：沒有 CDN 的世界 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Globe size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：沒有 CDN 的世界是什麼樣子？</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            在深入理解 CDN 之前，先想像一個沒有 CDN 的場景：你在高雄的電腦上，打開一個伺服器架在美國東岸的網站。
            每一個請求——HTML、CSS、JavaScript、圖片——都需要跑完整的美洲太平洋路線。
          </p>

          <Card className="border border-red-200 bg-red-50 mb-6">
            <CardBody className="p-5">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-600" />
                沒有 CDN：台灣用戶訪問美國伺服器
              </h3>
              <CodeBlock language="text">
{`   台灣用戶（高雄）
    ↓ 發出 HTTP 請求
    ↓ 跨越太平洋光纖（物理延遲：約 60-80ms 單程）
美國東岸 Origin Server（紐約）
    ↓ 處理請求（伺服器計算時間）
    ↓ 回傳資源，再跑一次太平洋
台灣用戶（高雄）

TCP 單次往返（RTT）：150-200ms
加上伺服器處理時間 + TCP 握手 + TLS 握手：
總延遲：300-500ms 以上

如果頁面有 20 個資源（HTML + CSS + JS + 圖片）：
最壞情況：300ms × 20 = 6 秒才能載入完畢   `}
</CodeBlock>
            </CardBody>
          </Card>

          <Card className="border border-green-200 bg-green-50 mb-6">
            <CardBody className="p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                有 CDN：資料近在咫尺
              </h3>
              <CodeBlock language="text">
{`   台灣用戶（高雄）
    ↓ DNS 解析：自動導向最近的 CDN 節點
    ↓ 連接台灣或亞洲的 CDN PoP（Point of Presence）
台灣 CDN PoP（延遲：5-20ms）
    ↓ 快取命中！直接從本地 SSD 讀取資源
台灣用戶（高雄）

RTT：10-40ms（縮短 10 倍以上）
頁面 20 個資源：因為 HTTP/2 多路複用，
快取命中的資源幾乎同時回傳

使用者感受：頁面「秒開」   `}
</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-6">
            CDN 的核心理念只有一句話：<strong>「把資料放到距離用戶最近的地方」</strong>。
            這個看似簡單的想法，背後是全球數百個 PoP 節點的基礎建設，以及複雜的快取管理機制。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">為什麼延遲很重要？數字說話</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-indigo-200 bg-indigo-50">
              <CardBody className="p-4 text-center">
                <p className="text-3xl font-black text-indigo-700 mb-1">100ms</p>
                <p className="text-indigo-600 text-sm">Amazon 研究：每 100ms 延遲損失 1% 銷售額</p>
              </CardBody>
            </Card>
            <Card className="border border-blue-200 bg-blue-50">
              <CardBody className="p-4 text-center">
                <p className="text-3xl font-black text-blue-700 mb-1">53%</p>
                <p className="text-blue-600 text-sm">Google 研究：行動用戶在 3 秒內未載入完成就會離開</p>
              </CardBody>
            </Card>
            <Card className="border border-cyan-200 bg-cyan-50">
              <CardBody className="p-4 text-center">
                <p className="text-3xl font-black text-cyan-700 mb-1">10×</p>
                <p className="text-cyan-600 text-sm">CDN 帶來的延遲改善倍數（跨洲際場景）</p>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：CDN 如何工作 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Network size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：CDN 如何工作？</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            CDN 的運作核心是「快取」。每個 CDN 的 PoP（Point of Presence，接入點）節點都有本地的儲存空間。
            當用戶發出請求時，CDN 會先檢查本地是否有這份資源的副本，根據結果分三種情況處理。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">三種快取狀態：Hit、Miss、Stale</h3>

          <CodeBlock language="text">
{`   第一個用戶（Cache Miss）：
User → CDN PoP [找不到快取] → Origin Server [拿資源]
     → CDN PoP [儲存副本，設定過期時間]
     → User
延遲：完整的來回時間（包含到 Origin 的距離）

之後的用戶（Cache Hit）：
User → CDN PoP [找到快取，直接回傳！] → User
延遲：只有用戶到 CDN PoP 的距離（最快）

快取過期後（Stale / Expired）：
User → CDN PoP [快取存在但已過期]
     → Origin Server [重新驗證，詢問資源是否有變更]
     → 如果沒變更：304 Not Modified，CDN 更新過期時間，回傳快取內容
     → 如果有變更：200 OK，CDN 更新快取副本
     → User   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">HTTP Cache Headers：告訴 CDN 如何快取</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            CDN 不會自己決定要快取什麼、快取多久——一切都由 HTTP Response Headers 控制。
            最重要的 Header 是 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Cache-Control</code>。
          </p>

          <CodeBlock language="text">
{`   # ── 場景 1：靜態資源（JS、CSS、圖片）── 永久快取
Cache-Control: public, max-age=31536000, immutable
# public    → CDN（共享快取）和瀏覽器都可以快取
# max-age   → 快取有效期（秒），31536000 秒 = 1 年
# immutable → 告訴瀏覽器「這個 URL 的資源永遠不會變」，不需要重新驗證
# 前提：URL 中帶有 content hash（如 app-a8f3c2d5.js），變更時換新 URL

# ── 場景 2：API 響應 ── 短暫快取 + 背景更新
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
# s-maxage  → 只對共享快取（CDN）有效，優先級高於 max-age
# stale-while-revalidate → 快取過期後，最多可以繼續用舊快取 86400 秒，
#             同時在背景異步地去 Origin 更新快取
# 效果：用戶永遠看到快速回應，不會因為快取過期而感受到延遲

# ── 場景 3：登入後的個人化頁面 ── 只在瀏覽器快取
Cache-Control: private, no-cache
# private   → 只有用戶的瀏覽器可以快取，CDN 不能快取（因為每個人內容不同）
# no-cache  → 每次使用前都必須向 Origin 重新驗證（但可以複用快取的資料）

# ── 場景 4：支付頁面、敏感資料 ── 完全不快取
Cache-Control: no-store
# no-store  → 任何地方都不允許儲存，每次都重新從 Origin 取得

# ── 輔助 Header ──
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d"
# ETag 是資源的「指紋」，用於重新驗證時判斷資源是否有變化
# 瀏覽器下次請求時帶上：If-None-Match: "33a64df551..."
# 如果資源沒變，Origin 回傳 304 Not Modified（省去傳輸資源體積）

Last-Modified: Thu, 08 May 2026 00:00:00 GMT
# 類似 ETag，但以時間作為驗證依據
# 精度較低（秒級），推薦優先使用 ETag   `}
</CodeBlock>

          <Card className="border border-blue-200 bg-blue-50 mt-6">
            <CardBody className="p-5">
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>s-maxage vs max-age：</strong>
                <code className="bg-blue-100 px-1 rounded mx-1">max-age</code> 對瀏覽器和 CDN 都有效，
                <code className="bg-blue-100 px-1 rounded mx-1">s-maxage</code>（shared maxage）只對 CDN 等共享快取有效。
                當兩個同時出現，CDN 優先使用 <code className="bg-blue-100 px-1 rounded mx-1">s-maxage</code>。
                這讓你可以給 CDN 更長的快取時間，同時控制瀏覽器更短的快取時間。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Cache Invalidation ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <RefreshCw size={20} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Cache Invalidation — 快取更新的藝術</h2>
          </div>

          <Card className="border border-amber-200 bg-amber-50 mb-6">
            <CardBody className="p-5">
              <p className="text-amber-800 text-base font-medium italic leading-relaxed">
                「電腦科學中有兩件真正難的事：命名，以及快取失效（Cache Invalidation）。」
                — Phil Karlton（Netscape 工程師）
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-6">
            快取的問題在於：當你設定了 1 小時的快取，但 5 分鐘後你發現內容有錯誤需要更新，怎麼辦？
            這就是快取失效（Cache Invalidation）要解決的問題。以下是三種主要策略。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">策略一：Purge by URL（即時清除特定 URL）</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            最直接的方式：呼叫 CDN 的 API，強制刪除特定 URL 的快取副本。
            下次有用戶請求時，CDN 會重新向 Origin 拉取最新內容。
          </p>

          <CodeBlock language="bash">
{`   # Cloudflare Cache Purge API
curl -X POST \
  "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "files": [
      "https://example.com/articles/123",
      "https://example.com/articles/123/cover.jpg"
    ]
  }'

# 回應：
# { "success": true, "result": { "id": "9a7806061c..." } }
# 通常在幾秒內生效，全球 300+ 個節點同步清除   `}
</CodeBlock>

          <p className="text-gray-700 leading-relaxed mb-4 mt-4">
            <strong>限制：</strong>你必須知道所有受影響的 URL。如果一篇文章同時出現在首頁、分類頁、標籤頁，
            你需要清除所有相關的 URL，容易遺漏。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">策略二：Cache-Busting（快取破壞）</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            不直接清除快取，而是<strong>改變 URL</strong>，讓 CDN 把它當作全新的資源來處理。
            舊 URL 的快取會自然過期，新 URL 會建立新的快取。
          </p>

          <CodeBlock language="html">
{`   <!-- 方式一：Query String 版本號（不推薦） -->
<!-- 有些 CDN 會忽略 Query String，不保證快取更新 -->
<link rel="stylesheet" href="/styles.css?v=2.1.0">
<script src="/app.js?v=a8f3c2d"></script>

<!-- 方式二：把 Content Hash 放在檔名中（推薦） -->
<!-- 每次檔案內容改變，hash 就不同，CDN 把它當新資源 -->
<!-- Next.js、Vite、Webpack 會在 Build 時自動做這件事 -->
<script src="/_next/static/chunks/app-a8f3c2d5.js"></script>
<link rel="stylesheet" href="/_next/static/css/3f8a9b2c.css">

<!-- 因為 URL 變了，可以安心設定 1 年的永久快取 -->
<!-- Cache-Control: public, max-age=31536000, immutable -->   `}
</CodeBlock>

          <p className="text-gray-700 leading-relaxed mb-4 mt-4">
            <strong>優點：</strong>不需要呼叫 CDN API，完全由 Build 工具自動處理，零運維成本。
            <br />
            <strong>限制：</strong>只適合靜態資源（JS、CSS、圖片），不適合動態 API 響應（URL 固定）。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">策略三：Surrogate Keys（Cache Tags）</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            最強大的策略：給快取的內容打「標籤（Tag）」，然後可以一次性清除所有帶某個標籤的快取。
            Cloudflare、Fastly 都支援這個功能。
          </p>

          <CodeBlock language="javascript">
{`   // ── 步驟 1：API 回應時加上 Cache-Tag Header ──
// app/api/articles/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const article = await db.article.findUnique({ where: { id: params.id } });

  return Response.json(article, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      // 給這個響應打上標籤：文章 ID、作者 ID、分類 ID
      // Cloudflare 使用 Cache-Tag，Fastly 使用 Surrogate-Key
      'Cache-Tag': [
        \`article:\${params.id}\`,
        \`author:\${article.authorId}\`,
        \`category:\${article.categoryId}\`,
      ].join(','),
    },
  });
}

// ── 步驟 2：當文章更新時，一次清除所有相關快取 ──
async function onArticleUpdate(articleId: string) {
  // 清除這篇文章的所有快取（文章頁、API 響應、可能出現在的任何地方）
  await fetch(
    \`https://api.cloudflare.com/client/v4/zones/\${process.env.CF_ZONE_ID}/purge_cache\`,
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.CF_API_TOKEN}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [\`article:\${articleId}\`],
      }),
    }
  );
  // 所有帶 article:123 標籤的快取（無論 URL 是什麼）都會被清除！
}

// ── 實際觸發時機 ──
// CMS webhook → API endpoint → onArticleUpdate()
// 或在 CMS 操作完成後，由 Next.js Server Action 呼叫   `}
</CodeBlock>

          <Card className="border border-indigo-200 bg-indigo-50 mt-6">
            <CardBody className="p-5">
              <p className="text-indigo-800 text-sm leading-relaxed">
                <strong>三種策略的選用時機：</strong>靜態資源（JS/CSS）優先用 Cache-Busting（Build 工具自動處理）；
                API 響應且有明確 URL 時用 Purge by URL；API 響應且一個資源會影響多個 URL 時，用 Surrogate Keys。
                大型系統通常三種策略並用。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：Edge Computing ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <CloudLightning size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：Edge Computing — 在 CDN 節點上執行程式碼</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            傳統 CDN 只能快取靜態資源：HTML、JS、CSS、圖片。
            如果你需要執行邏輯（驗證、個人化、A/B 測試），請求就必須一路跑到 Origin Server。
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Edge Computing</strong> 改變了這個模式：它讓你可以在 CDN 的 PoP 節點上直接執行 JavaScript，
            在靠近用戶的地方完成邏輯處理，不需要再跑一趟 Origin。
          </p>

          <CodeBlock language="text">
{`   傳統 CDN 架構（靜態快取）：
                       ┌─────────────────────┐
Request → CDN PoP ──→ │  Origin Server       │
          ↑只能快取    │  （所有邏輯在這裡）   │
          靜態資源     └─────────────────────┘

Edge Computing 架構：
          ┌─────────────────────────────────────────┐
Request → │  CDN PoP（Edge Runtime）                │ ──→ Origin Server
          │  ✓ A/B Testing                           │     （只處理真正
          │  ✓ 認證驗證                              │      需要 DB 的請求）
          │  ✓ 安全 Headers                          │
          │  ✓ 地理重定向                             │
          │  ✓ 快取邏輯                              │
          └─────────────────────────────────────────┘
          延遲：10-20ms（就在用戶旁邊）   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">Cloudflare Workers 實際範例</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            Cloudflare Workers 是目前最成熟的 Edge Runtime，在全球 300+ 個節點上執行，
            使用標準的 Web APIs（<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Request</code>、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Response</code>、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">fetch</code>）撰寫。
          </p>

          <CodeBlock language="javascript">
{`   // wrangler.toml 部署設定（Cloudflare Workers）
// name = "my-edge-worker"
// main = "src/worker.js"
// compatibility_date = "2026-01-01"

// src/worker.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── 使用案例 1：A/B Testing 在邊緣執行 ──
    // 不需要打到 Origin，直接在 CDN 節點決定版本
    if (url.pathname === '/') {
      // 讀取或設定 A/B 測試 Cookie
      const cookie = request.headers.get('Cookie') ?? '';
      let group = cookie.match(/ab_group=([AB])/)?.[1];

      if (!group) {
        // 新用戶：隨機分配組別
        group = Math.random() < 0.5 ? 'A' : 'B';
      }

      const targetUrl = group === 'A'
        ? new URL('/landing-v1', url.origin)
        : new URL('/landing-v2', url.origin);

      const response = await fetch(targetUrl.toString(), request);

      // 回傳結果，並設定 Cookie 記住組別
      const newResponse = new Response(response.body, response);
      if (!cookie.includes('ab_group=')) {
        newResponse.headers.append(
          'Set-Cookie',
          \`ab_group=\${group}; Path=/; Max-Age=2592000; SameSite=Lax\`
        );
      }
      newResponse.headers.set('X-AB-Group', group);
      return newResponse;
    }

    // ── 使用案例 2：在邊緣加上安全 Headers ──
    // 不影響 Origin，在邊緣統一注入安全 Headers
    const response = await fetch(request);
    const secureResponse = new Response(response.body, {
      status: response.status,
      headers: new Headers(response.headers),
    });

    const securityHeaders = {
      'X-Frame-Options':           'DENY',
      'X-Content-Type-Options':    'nosniff',
      'X-XSS-Protection':          '1; mode=block',
      'Referrer-Policy':           'strict-origin-when-cross-origin',
      'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    };

    Object.entries(securityHeaders).forEach(([key, value]) => {
      secureResponse.headers.set(key, value);
    });

    return secureResponse;
  },
};   `}
</CodeBlock>

          <CodeBlock language="javascript">
{`   // ── 使用案例 3：邊緣地理重定向 ──
export default {
  async fetch(request, env) {
    const country = request.cf?.country ?? 'US'; // Cloudflare 自動注入地理資訊
    const url = new URL(request.url);

    // 根據用戶所在地自動導向對應語系
    if (url.pathname === '/' && !url.searchParams.has('no-redirect')) {
      const langMap = {
        'TW': '/zh-TW',
        'JP': '/ja',
        'KR': '/ko',
        'US': '/en',
        'GB': '/en',
      };
      const targetLang = langMap[country] ?? '/en';
      return Response.redirect(\`\${url.origin}\${targetLang}\`, 302);
    }

    // ── 使用案例 4：邊緣 Rate Limiting（簡易版）──
    const clientIP = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const rateLimitKey = \`rate:\${clientIP}:\${Math.floor(Date.now() / 60000)}\`; // 每分鐘

    // 使用 Cloudflare KV 儲存計數器
    const current = parseInt(await env.KV.get(rateLimitKey) ?? '0');
    if (current >= 100) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '60' },
      });
    }

    await env.KV.put(rateLimitKey, String(current + 1), { expirationTtl: 120 });

    return fetch(request);
  },
};   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Next.js 與 CDN 最佳實踐 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：Next.js 與 CDN 的最佳實踐</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Next.js App Router 對 CDN 優化有完善的支援。理解這些設定可以讓你的應用在
            Vercel、Cloudflare 或任何 CDN 上都能達到最佳效果。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">next.config.ts 設定</h3>

          <CodeBlock language="typescript">
{`   // next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── 1. 自訂 Build ID（讓快取破壞可預測）──
  generateBuildId: async () => {
    // 使用 Git Commit Hash 作為 Build ID
    // 每次部署都有唯一 ID，靜態資源 URL 也會跟著變化
    return process.env.GIT_HASH ?? 'local-dev';
  },

  // ── 2. 指定 CDN 來源 ──
  // 靜態資源（JS、CSS、圖片）會從這個 CDN URL 提供
  // 而不是從你的 Origin Server
  assetPrefix: process.env.CDN_URL ?? '',
  // 例如：CDN_URL=https://cdn.example.com
  // 結果：/_next/static/chunks/app-abc123.js
  //       → https://cdn.example.com/_next/static/chunks/app-abc123.js

  // ── 3. 圖片最佳化設定 ──
  images: {
    // 允許的外部圖片 Domain
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    // 支援的現代圖片格式（按優先級排序）
    formats: ['image/avif', 'image/webp'],
    // 圖片最小化快取時間（秒）
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 天
  },

  // ── 4. 自訂 HTTP Headers ──
  async headers() {
    return [
      {
        // 靜態資源：帶有 content hash 的 URL，永久快取
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 圖片：1 個月快取
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">API Route 的快取設定</h3>

          <CodeBlock language="typescript">
{`   // app/api/articles/route.ts
// Next.js App Router 的 Route Handler

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';

  const articles = await db.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    skip: (parseInt(page) - 1) * 10,
    take: 10,
  });

  return Response.json(articles, {
    headers: {
      // CDN 快取 1 小時，過期後可繼續用舊快取（最多 24 小時），同時背景更新
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      // Surrogate Keys：方便批次失效
      'Cache-Tag': 'articles',
      // 加上 Vary：確保不同語系/地區的請求各自快取
      'Vary': 'Accept-Language',
    },
  });
}

// app/api/articles/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = await db.article.findUnique({
    where: { id: params.id },
    include: { author: true, tags: true },
  });

  if (!article) {
    return Response.json({ error: 'Not Found' }, { status: 404 });
  }

  return Response.json(article, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Cache-Tag': [\`article:\${params.id}\`, \`author:\${article.authorId}\`].join(','),
    },
  });
}

// 觸發快取失效：在文章更新後呼叫
// app/api/admin/articles/[id]/route.ts
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const updated = await db.article.update({
    where: { id: params.id },
    data,
  });

  // 文章更新後，清除 CDN 快取
  await fetch(
    \`https://api.cloudflare.com/client/v4/zones/\${process.env.CF_ZONE_ID}/purge_cache\`,
    {
      method: 'POST',
      headers: { 'Authorization': \`Bearer \${process.env.CF_API_TOKEN}\` },
      body: JSON.stringify({ tags: [\`article:\${params.id}\`] }),
    }
  );

  // 同時觸發 Next.js 的 On-Demand Revalidation
  revalidateTag(\`article-\${params.id}\`);

  return Response.json(updated);
}   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：CDN 選型與架構決策 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <BarChart3 size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：CDN 的選型與架構決策</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            市場上主要的 CDN 提供商各有其定位。以下是三個最常見選項的比較，以及如何根據你的架構做選擇。
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Cloudflare */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Shield size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">Cloudflare</h3>
                    <p className="text-orange-600 text-sm font-medium">最大全球網路 · 安全優先</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-2">優點</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 300+ PoP，覆蓋全球最廣</li>
                      <li>• 內建 DDoS 防護、WAF</li>
                      <li>• 免費方案可用（個人網站夠用）</li>
                      <li>• Cloudflare Workers：強大的 Edge Runtime</li>
                      <li>• Cache-Tag 支援，快取失效精準</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">考量</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 需要將 DNS 移至 Cloudflare 管理</li>
                      <li>• Enterprise 功能費用較高</li>
                    </ul>
                    <p className="font-semibold text-blue-700 mt-3 mb-1">Edge Runtime</p>
                    <p className="text-blue-600 text-sm">Cloudflare Workers（全球最快）</p>
                    <p className="font-semibold text-gray-700 mt-3 mb-1">適合</p>
                    <p className="text-gray-600 text-sm">大多數網站，尤其需要安全保護時</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* AWS CloudFront */}
            <Card className="border border-yellow-200 bg-yellow-50">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Server size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">AWS CloudFront</h3>
                    <p className="text-yellow-600 text-sm font-medium">AWS 生態整合 · 企業首選</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-2">優點</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 與 S3、EC2、API Gateway 無縫整合</li>
                      <li>• Origin Shield：減少到 Origin 的請求</li>
                      <li>• 細緻的快取行為設定</li>
                      <li>• 支援 WebSocket、HTTP/3</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">考量</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 配置較複雜，學習曲線陡</li>
                      <li>• PoP 數量不如 Cloudflare（600+）</li>
                      <li>• 費用按流量計算，大流量較貴</li>
                    </ul>
                    <p className="font-semibold text-blue-700 mt-3 mb-1">Edge Runtime</p>
                    <p className="text-blue-600 text-sm">Lambda@Edge / CloudFront Functions</p>
                    <p className="font-semibold text-gray-700 mt-3 mb-1">適合</p>
                    <p className="text-gray-600 text-sm">已在 AWS 生態的企業團隊</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Vercel Edge Network */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900">Vercel Edge Network</h3>
                    <p className="text-blue-600 text-sm font-medium">Next.js 深度整合 · 零配置</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-2">優點</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 與 Next.js App Router 深度整合</li>
                      <li>• 零配置：部署即自動啟用 CDN</li>
                      <li>• ISR（Incremental Static Regeneration）</li>
                      <li>• <code className="bg-blue-100 px-1 rounded">revalidateTag()</code> / <code className="bg-blue-100 px-1 rounded">revalidatePath()</code></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">考量</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 綁定 Vercel 平台（Vendor lock-in）</li>
                      <li>• Pro 方案後費用較高</li>
                      <li>• 自訂空間不如 Cloudflare</li>
                    </ul>
                    <p className="font-semibold text-blue-700 mt-3 mb-1">Edge Runtime</p>
                    <p className="text-blue-600 text-sm">Vercel Edge Functions</p>
                    <p className="font-semibold text-gray-700 mt-3 mb-1">適合</p>
                    <p className="text-gray-600 text-sm">Next.js 應用，快速交付優先</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">CDN 快取命中率診斷</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            部署 CDN 後，如何確認快取是否真的在運作？用
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">curl</code> 查看 Response Headers 是最快的方式。
          </p>

          <CodeBlock language="bash">
{`   # 用 curl 的 -I 參數只取 Response Headers（不下載 Body）
curl -I https://example.com/image.jpg

# ── Cloudflare 的 CDN 狀態 Header ──
# CF-Cache-Status: HIT      → 快取命中（Cloudflare 直接回傳）
# CF-Cache-Status: MISS     → 快取未命中（從 Origin 拉取）
# CF-Cache-Status: EXPIRED  → 快取已過期（重新驗證中）
# CF-Cache-Status: BYPASS   → 快取被跳過（有 Cookie 或私人請求）
# CF-Cache-Status: DYNAMIC  → 動態內容，不快取
# Age: 3600                 → 這份快取已存在 3600 秒（1 小時）

# ── AWS CloudFront 的 CDN 狀態 Header ──
# X-Cache: Hit from cloudfront   → 快取命中
# X-Cache: Miss from cloudfront  → 快取未命中
# X-Amz-Cf-Pop: NRT57-C2        → 你連接的 PoP（NRT = 東京）

# ── 完整診斷指令：重複跑兩次，確認快取命中 ──
for i in 1 2; do
  echo "Request $i:"
  curl -sI https://example.com/api/articles | grep -E "(CF-Cache-Status|Age|Cache-Control|X-Cache)"
  echo "---"
done

# 理想輸出：
# Request 1:
# CF-Cache-Status: MISS
# Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
# ---
# Request 2:
# CF-Cache-Status: HIT
# Age: 2
# Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
# ---

# ── 快取命中率計算 ──
# 目標：靜態資源命中率 > 99%，API 命中率 > 80%
# 可在 Cloudflare Dashboard 的 Analytics 頁面直接查看   `}
</CodeBlock>

          <Card className="border border-green-200 bg-green-50 mt-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800 text-sm font-semibold mb-2">CDN 效能優化 Checklist</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>✓ 靜態資源（JS/CSS）使用 Content Hash 命名，設定永久快取</li>
                    <li>✓ 圖片設定至少 30 天快取，啟用 WebP/AVIF 自動轉換</li>
                    <li>✓ API 響應加上 <code className="bg-green-100 px-1 rounded">Cache-Tag</code> 便於精準失效</li>
                    <li>✓ 個人化內容使用 <code className="bg-green-100 px-1 rounded">Cache-Control: private</code></li>
                    <li>✓ 定期用 curl 確認 CF-Cache-Status: HIT</li>
                    <li>✓ 在 CDN Dashboard 監控快取命中率，目標 &gt; 90%</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {[
            'CDN',
            'Edge Computing',
            'Cache Invalidation',
            'Cloudflare Workers',
            'Web Performance',
            'Cache-Control',
            'Next.js',
            'HTTP Headers',
          ].map(tag => (
            <Chip key={tag} variant="flat" className="bg-blue-100 text-blue-800">
              {tag}
            </Chip>
          ))}
        </motion.section>

        {/* ── Navigation ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-4"
        >
          <Link
            href="/blog/system-design/ep09-microservices"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>← EP.09 微服務</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 font-semibold cursor-not-allowed">
            <span>EP.11 →（Coming Soon）</span>
            <ArrowRight size={18} />
          </div>
        </motion.div>

      </article>
    </div>
  );
}
